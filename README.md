# TODO-API Guruji-astro-assignment
 
##Problem Statement 
1. Create a RESTful API that allows users to manage a list of tasks.
2. The API shouldhave the following endpoints:
    1. GET /tasks - Returns a list of all tasks.
    2. GET /tasks/:id - Returns the details of a single task with the given id.
    3. POST /tasks - Creates a new task.
    4. PUT /tasks/:id - Updates the task with the given id.
    5. DELETE /tasks/:id - Deletes the task with the given id.
3. Implement JWT authentication using jsonwebtoken .
4. Users should be able to register, log in, and receive a JWT upon successful authentication.
5. Implement authorization to ensure that only authenticated users can perform CRUD operations on their own tasks.

Bonus features:
1. Implement pagination or sorting functionality for retrieving tasks.
2. Implement filtering or searching functionality to allow users to filter tasks based on certain criteria.
3. Implement role-based access control (RBAC) to allow different levels of access for different users (e.g., admin vs. regular user).


##Functionality 
1. Admin   
    1. sign in and sign up using jwt
    2. view all users
    3. detete user
    4. view all task and apply pagination
    5. view task status wise 
    6. delete task
    7. view specific task by providing id
2. User 
    1. sign in and sign up using jwt
    2. create task
    3. delete task
    4. update task
    5. view all tasks and apply pagination
    6. view specific task by providing id
    7. view task status wise 


##Tools
1. Node Js v-16.18.0
2. Express Js
3. Mongodb 
4. Mongoose
5. jsonwebtoken (genrate jwt)
6. passport-jwt (authentication)


##Setup in Local System

1. git clone "https://github.com/tush8788/TODO-API-Gurujo-astro.git"
2. open command prompt and Type 'npm install' for download all dependencies
3. then just "npm start"/ if npm start is not work just run this command 'node index.js'
4. then go localhost:8000


## How to send authentication req
1. open postman or any other tool, and click any http req (like get,post,put,delete)
2. first login and copy jsonwebtoken token
3. go inside header 
4. filds :- Authorization and inside value paste token after Bearer keyword 
5. (like :- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQyMWFj.0QVbonXvY) 


## API urls for users 
1. create new user
    1. post req :- http://127.0.0.1:8000/user/create
    2. filds :- email, password, confirmpassword

2. login user
    1. post req :- http://127.0.0.1:8000/user/createsession
    2. filds :- email, password

3. create new task [authentication needed]
    1. post req :- http://127.0.0.1:8000/task
    2. filds :- title, description, status (optional) either ["completed","incomplete"]

4. update task [authentication needed]
    1. put req :- http://127.0.0.1:8000/task/64421b601277fe65ee1ceafd  <--task id
    2. filds :- title, description, status (all three are optional you can send only one or two filds also)

5. all task withoout pagination [authentication needed]
    1. get req :- http://127.0.0.1:8000/task

6. all task with pagination [authentication needed]
    1. get req :- http://127.0.0.1:8000/task?page=1 (limit is hard coded not need to send)

7. all task status wise [authentication needed]
    1. get req :- http://127.0.0.1:8000/task/status/incomplete  <-- either completed or incomplete

8. delete task [authentication needed]
    1. delete req :- http://127.0.0.1:8000/task/64421b601277fe65ee1ceafd  <--task id


## API urls for admin
1. create new admin
    1. post req :- http://127.0.0.1:8000/admin/create
    2. filds :- email, password, confirmpassword

2. login admin
    1. post req :- http://127.0.0.1:8000/admin/createsession
    2. filds :- email, password

3. all task withoout pagination [authentication needed]
    1. get req :- http://127.0.0.1:8000/task

4. all task with pagination [authentication needed]
    1. get req :- http://127.0.0.1:8000/task?page=1 (limit is hard coded not need to send)

5. all task status wise [authentication needed]
    1. get req :- http://127.0.0.1:8000/task/status/incomplete  <-- either completed or incomplete

6. delete task [authentication needed]
    1. delete req :- http://127.0.0.1:8000/task/64421b601277fe65ee1ceafd  <--task id

7. all users [authentication needed]
    1. get req :- http://127.0.0.1:8000/admin/allusers

8. delete user []
    1. delete req :- http://127.0.0.1:8000/admin/deleteuser/64421b601277fe65ee1ceafd <--user id
