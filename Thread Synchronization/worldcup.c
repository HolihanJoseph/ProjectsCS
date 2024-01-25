#include <stddef.h>
#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
static sem_t connected_lock;
static sem_t operators;
static sem_t lock;
static int NUM_OPERATORS = 3;
static int NUM_LINES = 5;
static int connected = 0;    // Callers that are connected
int next_id = 0;
int* t; //global pointer for user input

void* timer(){
  sleep(*t);
  return NULL;
}

void* phonecall(void* vargp) {
    sem_wait(&lock); //step 1: thread attempts to connect
    int id = ++next_id; //increment global variable next_id and assign value to the threads id
    printf("Thread %d is attempting to connect to the call center\n" , id);
    sem_post(&lock);
    
    
    while(1){ //step 2: checking for available lines
      sem_wait(&connected_lock); //enter crtical zone
      if(connected == NUM_LINES){ //No available lines
        sem_post(&connected_lock); //exit critcal zone
        sleep(1); //wait
        continue; //try again
      }
      else{ //Available line
        ++connected; //connected to line, increment connceted
        printf("Thread %d connected to an available line\n", id);
        sem_post(&connected_lock); //exit critcal zone
        break;
        
      }
    } 
   
    sem_wait(&operators); //enter crtial zone (counting semaphore) step 3-6
    printf("Thread %d is speaking to an operator\n", id);
    sleep(1); //simulate asking question
    printf("Thread %d has proposed a question\n", id);
    sem_post(&operators); //exit critcal zone
    sem_wait(&lock);//enter crical zone steps 7-8
    --connected; //caller has hung up, decrement conncected
    printf("Thread %d has hung up\n", id);
    sem_post(&lock); //exit critcal zone
    
    
    pthread_detach(pthread_self());
}

int main(int argc, char **argv) {
  if(argc == 0){ //check for no user input
    printf("Error: No user input given \n"); 
    exit(0);
  }
  else if(atoi(argv[1]) == 0){ //check for irregular input
    printf("Error: Invalid user input given\n"); 
    exit(0);
  }
  int* confrenceTime = (int*)malloc(sizeof(int)); //allocating space for user argument
  int input = atoi(argv[1]); //converst argv[1] to integer
  *confrenceTime = input;
  t = confrenceTime; //assign globally defined pointer with argument value
  sem_init(&lock, 0, 1); //L63-65: intitating semaphores (2 binary, 1 counting)
  sem_init(&connected_lock,0,1);
  sem_init(&operators,0,NUM_OPERATORS);
  pthread_t timerId; //66-67 creating thread for timer func
  pthread_create(&timerId, NULL, timer, NULL);
  pthread_t* idArray;
  idArray = (pthread_t*)malloc(100 * sizeof(pthread_t));  //allocate space for array of threads
  for(int i = 0; i < 100; ++i){ //create array of 100 threads
    pthread_create(&idArray[i], NULL, phonecall, NULL);
  }
  pthread_join(timerId,NULL); //join with timer thread
 sem_t* d; //pointer for semaphore destruction
 d = &lock;
 sem_destroy(d);
 d = &connected_lock;
 sem_destroy(d);
 d = &operators;
 sem_destroy(d);
  exit(0); //end function after the time is up 
}







