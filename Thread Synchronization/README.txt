# Project_5
1a. 
Binary semaphores are used to protect critical reigons of code within lines
22-25,  44-48, 49-52
1b. 
A counting semaphore is used to restrict a critical region within lines 29-38 to NUM_OPERATOR
threads.
1c. 
Semaphores are initialized at lines 71-73 and are destroyed at lines 82-88
1d. 
Thread function phonecall exists at line 21, and is implemented properly with pthread_create in main()
1e. 
Timer thread function timer exists at line 16
1f. 
With the exception of the timer thread, phonecall threads are initialized in a loop, filling the 100 element
array. These threads are detached at the end of the phonecall thread function.
1g. 
next_id exists and is updated within a critical region at line 23
1h. 
The phoncall thread updated connected within two critical regions at lines 36 and 50
1k.
User input is checked at the start of main, printing an error message and calling exit() if
irregular input is found
