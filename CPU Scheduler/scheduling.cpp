#include <scheduling.h>
#include <fstream>
#include <iostream>
#include <list>
#include <queue>
#include <string>
#include <fstream>
using namespace std;

pqueue_arrival read_workload(string filename) {
  pqueue_arrival workload;
  ifstream infile(filename);
  int x, y;
  while(infile >> x >> y){
    Process currProcess;
    currProcess.arrival = x;
    currProcess.duration = y;
    workload.push(currProcess);
  }
  
  return workload;
}

void show_workload(pqueue_arrival workload) {
  pqueue_arrival xs = workload;
  cout << "Workload:" << endl;
  while (!xs.empty()) {
    Process p = xs.top();
    cout << '\t' << p.arrival << ' ' << p.duration << endl;
    xs.pop();
  }
}

void show_processes(list<Process> processes) {
  list<Process> xs = processes;
  cout << "Processes:" << endl;
  while (!xs.empty()) {
    Process p = xs.front();
    cout << "\tarrival=" << p.arrival << ", duration=" << p.duration
         << ", first_run=" << p.first_run << ", completion=" << p.completion
         << endl;
    xs.pop_front();
  }
}

list<Process> fifo(pqueue_arrival workload) {
  list<Process> complete;
  pqueue_arrival q = workload;
  int t = 0;

  while(!q.empty()){
    Process p = q.top();
    q.pop();
    p.first_run = t;
    t += p.duration;
    p.completion = t;
    complete.push_back(p);
  }

  return complete;
}

list<Process> sjf(pqueue_arrival workload) {
  list<Process> complete;
  pqueue_arrival a = workload;
  pqueue_duration d;
  int t = 0;
  while(true){ 
    while(!a.empty()){ //add arrived processes to duration queue
      Process p = a.top();
      if(p.arrival <= t){
        d.push(p);
        a.pop();
      }
      else{
        break;
      }
    } 

    if(!d.empty()){ //arrived processes remaining
      Process curr = d.top();
      d.pop();
      curr.first_run = t;
      t += curr.duration;
      curr.completion = t;
      complete.push_back(curr);
    }
    else{
      t++;
    }

    if(a.empty() && d.empty()){
      break;
    }
  }
  return complete;
}

list<Process> stcf(pqueue_arrival workload) {
  list<Process> complete;
  pqueue_arrival a = workload;
  pqueue_duration d;
  int t = 0;
  int nextArrival = 0;
  while(true){ 
    while(!a.empty()){ //add arrived processes to duration queue
      Process p = a.top();
      if(p.arrival <= t){
        d.push(p);
        a.pop();
      }
      else{
        nextArrival = p.arrival;
        break;
      }
    }

    if(!d.empty()){ //arrived processes remaining
      Process curr = d.top();
      d.pop();

      if((curr.arrival == 0) && (t == 0)){ //first run of process at time zero
        curr.first_run = -1;
      }
      else if((t > 0) && (curr.first_run == 0)){//first run of process 
        curr.first_run = t;
      }

      if(nextArrival <= t){ //reset arrival variable
        nextArrival = 10000000;
      }

      if(t + curr.duration > nextArrival){ //interrupt from new arrival
        curr.duration -= (nextArrival - t);
        t = nextArrival;
        d.push(curr);
      }
      else{ //run process to completion
        t += curr.duration;
        curr.completion = t;
         if(curr.first_run == -1){
          curr.first_run = 0;
        }
        complete.push_back(curr);
      }
    }
    else{
      t++;
    }

    if(a.empty() && d.empty()){
      break;
    }
  }
  return complete;
}

list<Process> rr(pqueue_arrival workload) {
  list<Process> complete;
  pqueue_arrival a = workload;
  list<Process> r;
  int t = 0;
  while(true){ 
    while(!a.empty()){ //add arrived processes to queue
      Process p = a.top();
      if(p.arrival <= t){
        r.push_back(p);
        a.pop();
      }
      else{
        break;
      }
    }

    if(!r.empty()){ //arrived processes remaining
      Process curr = r.front();
      r.pop_front();

      if((curr.arrival == 0) && (t == 0)){ //first run of process at time zero
        curr.first_run = -1;
      }
      else if((t > 0) && (curr.first_run == 0)){//first run of process 
        curr.first_run = t;
      }

      --curr.duration; //1 second of processing time
      t++;
      if(curr.duration > 0){ //process not completed
        r.push_back(curr);
      }
      else{ //process completed
        curr.completion = t;
        if(curr.first_run == -1){
          curr.first_run = 0;
        }
        complete.push_back(curr);
      }
    }
    else{
      t++;
    }

    if(a.empty() && r.empty()){//no processes remaining
      break;
    }
  }
  return complete;
}

float avg_turnaround(list<Process> processes) {
  int size = processes.size();
  int turnSum = 0;
  list<Process> l = processes;
  for(int i = 0; i < size; i++){
    Process p = l.front();
    l.pop_front();
    turnSum += (p.completion - p.arrival);
  }
  return (float) turnSum / size;
}

float avg_response(list<Process> processes) {
    int size = processes.size();
  int respSum = 0;
  list<Process> l = processes;
  for(int i = 0; i < size; i++){
    Process p = l.front();
    l.pop_front();
    respSum += (p.first_run - p.arrival);
  }

  return (float) respSum / size;
}

void show_metrics(list<Process> processes) {
  float avg_t = avg_turnaround(processes);
  float avg_r = avg_response(processes);
  show_processes(processes);
  cout << '\n';
  cout << "Average Turnaround Time: " << avg_t << endl;
  cout << "Average Response Time:   " << avg_r << endl;
}
