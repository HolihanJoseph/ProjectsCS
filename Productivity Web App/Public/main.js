import {createItem, getAllItems, getItemById, updateItem, deleteItem} from './client.js'

document.addEventListener('DOMContentLoaded', async function() {
    // Load checklist items when the page loads
    loadChecklist();
    await updateLocal()
    const button = document.getElementById('toggleButton');
    button.textContent = "📊";
});

//ADD TASK//
document.getElementById('addButton').addEventListener('click', async function() {
    var newTaskInput = document.getElementById('newTaskInput');
    var checklist = document.getElementById('checklist');
    var newTaskName = newTaskInput.value.trim();
  
    if (newTaskName !== '') {
        var newTask = document.createElement('li');
        newTask.innerHTML = `<input type="checkbox" id="${newTaskName}"><label for="${newTaskName}">${newTaskName}</label><button class="removeButton">-</button>`;
        checklist.appendChild(newTask);
        newTask.classList.add('checklist');
        newTaskInput.value = '';
        addCompletionListener(newTask.querySelector('input'));
        const taskData = {name: newTaskName, record:[], max_streak: 0};
        const mongoItem = await createItem(taskData);
        updateLocal();
    } else {
        alert('Please enter a valid task!');
    }
});

//REMOVE TASK//
document.getElementById('checklist').addEventListener('click', function(event) {
    if (event.target.classList.contains('removeButton')) {
        var removedItem = event.target.parentElement.querySelector('label').textContent;
        let task = find(removedItem);
        let itemId = task._id;
        deleteItem(itemId);
        updateLocal();
        event.target.parentElement.remove();
        alert('Task removed.'); 
    }
});

//TASK COMPLETED//
function addCompletionListener(checkbox) {
    checkbox.addEventListener('change', function() {
        var taskName = this.parentElement.querySelector('label').textContent;
        let task = find(taskName);
        if (this.checked) {
            let id = task._id;
            let day = getDate();
            if(task.record[task.record.length - 1] === day){
                return;
            }
            else{
                let taskUpdate = {$push: {record: day}};
                updateItem(id,taskUpdate);
                updateLocal();
            }
        }
    });
}

//LOAD CHECKLIST
function loadChecklist() {
    updateLocal();
    var checklist = document.getElementById('checklist');
    var savedItems = JSON.parse(localStorage.getItem('checklistItems'));
    checklist.classList.add('section');
  
    if (savedItems) {
        savedItems.forEach(function(item) {
            let itemName = item.name;
            var newItem = document.createElement('li');
            checklist.appendChild(newItem);
            newItem.classList.add('checklist');
            newItem.innerHTML = `<input type="checkbox" id="${itemName}"><label for="${itemName}">${itemName}</label><button class="removeButton">-</button>`;
            addCompletionListener(newItem.querySelector('input'));
        });
    }
}

//CHANGE VIEW//
document.getElementById('toggleButton').addEventListener('click', function() {
    var div1 = document.getElementById('myDiv');
    var div2 = document.getElementById('myDiv2');
    let button = document.getElementById('toggleButton');
  
    if (div1.classList.contains('show')) {
        button.textContent = "📊";
        div1.classList.remove('show');
        div1.classList.add('hide');
        div2.classList.remove('hide');
        div2.classList.add('show');
    } else {
        button.textContent ="📋";
        div1.classList.remove('hide');
        div1.classList.add('show');
        div2.classList.remove('show');
        div2.classList.add('hide');
        displayChecklistInfo();
    }
});
        
//DISPLAY STATISTICS
async function displayChecklistInfo() {
    updateLocal();
    var statsDiv = document.getElementById('myDiv');
    var checklist = document.getElementById('checklist').querySelectorAll('label');
    statsDiv.innerHTML = ''; // Clear previous content

    checklist.forEach(async function(item) {
      var taskDiv = document.createElement('div');
      taskDiv.classList.add("section");
      taskDiv.innerHTML = `<h3>${item.textContent}</h3>`;
        
      for (var i = 1; i <= 3; i++) {
        var infoDiv = document.createElement('div');
        infoDiv.classList.add("sub-section");
        if(i === 1){//current streak
            infoDiv.textContent = 'Current Streak: ' + await currentStreak(item.textContent);
        }
        else if(i === 2){ //longest streak
            infoDiv.textContent = 'Longest Streak: ' + getMaxStreak(item.textContent);
        }
        else if(i === 3){ //longest streak
            infoDiv.textContent = 'Completion: ' + percentCompletion(item.textContent) + '%';
        }
       
    
        taskDiv.appendChild(infoDiv);
      }

      statsDiv.appendChild(taskDiv);
    });
}

async function currentStreak(name){
    let taskInfo = find(name);
    const rev = taskInfo.record.toReversed();
    if(rev.length === 0){
        return 0;
    }
    else if(rev.length === 1){
        if(taskInfo.max_streak === 0){
            let maxUpdate = { $set: { max_streak: 1 } };
            await updateItem(taskInfo._id,maxUpdate);
            await updateLocal();
        }
        return 1;
    }
    else{
        let i = 0;
        while (i < rev.length - 1 && rev[i] - 1 === rev[i + 1]) { 
            i++;
        }
        if(i + 1 > taskInfo.max_streak){ 
            let maxUpdate = { $set: { max_streak: i + 1 } };
            await updateItem(taskInfo._id,maxUpdate);
            await updateLocal(); 
        }
        return i + 1;
    }
}


function percentCompletion(name){
    let taskInfo = find(name);
    const r = taskInfo.record;
    if(r.length === 0){
        return 0;
    }
    else{
        const daysPassed = r[r.length - 1] - r[0] + 1;
        const daysCompleted = r.length;
        let result = daysCompleted/daysPassed;
        return Math.trunc(result * 100);
    }
}

function getMaxStreak(name){
    let taskInfo = find(name);
    return taskInfo.max_streak;
}

function getDate(){
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
    const diff = currentDate - startOfYear;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return dayOfYear;
}

async function getDB(){
    const allItems = await getAllItems();
    return allItems;
}

async function updateLocal(){
    await getDB().then(value =>{
        localStorage.setItem('checklistItems',JSON.stringify(value));
    });
}

function find(inputName){
    const savedItems = JSON.parse(localStorage.getItem('checklistItems'));
    const foundObj = savedItems.find(obj => obj.name === inputName);
    return foundObj;
}

