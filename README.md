# Worker Hiring System

## Prerequisites to use:
* Node
* MongoDB compass to work with mongoDB.
* Postman for requests testing.

## How to use:
* Install Node
* install Git
* Run the command

 
      git clone https://github.com/divaymohan/worker-hiring-backend-service.git
 
* Go to the cloned directory and run:
    
        npm install
 
* To install nodemon globally run :
 
        npm i nodemon -g 
 
* Run command to start server


        nodemon index.js

* if it shows message like listening at 3000 then API is ready to use.

## Requests:
```
Note:-
1. All the content inside '( )' is passed as parameters.

2. If we pass an id in body then that id should be present in database.
```
## 1. Work or Type of job end point :
* ### Get list of all works available. (Get Request):-
```
End Point:- 

localhost:3000/api/hiring/work
```
```json
Response:- 
[
    {
        "_id": "5ed4a904c6161016cc9373a2",
        "work": "job 1",
        "__v": 0
    },
    {
        "_id": "5ed4a90fc6161016cc9373a3",
        "work": "job 2",
        "__v": 0
    },
    {
        "_id": "5ed4a923c6161016cc9373a4",
        "work": "job 3",
        "__v": 0
    },
    {
        "_id": "5ed4aa2ca847e500487779ca",
        "work": "job 4",
        "__v": 0
    }
]
```

* ### Get one work by id (Get Request):-
```
End Point:- 

localhost:3000/api/hiring/work/(id)
``` 
```json
Response:-
{
    "_id": "id",
    "work": "job 1",
    "__v": 0
}
```

* ### Delete one work by id (Delete Request):- 
```
End Point:- 

localhost:3000/api/hiring/work/(id)
```
```json
Response:-

{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}
```
* ### Add new work (post request):-
```    
End Point:-

localhost:3000/api/hiring/work

```
```json
Body:- 
{
    "work": "electrician"
}
```
```json
Response:- 
{
    "_id": "5ed4fa79f661ed3d9458b043",
    "work": "electrician",
    "__v": 0
}
``` 

* ### Update work, work should already exists (Put request):- 
```
End Point:- 

localhost:3000/api/hiring/work/(id)
```
```json
Body:-
{
     "work": "New work"
}
```
```json
{
    "_id": "id",
    "work": "New work",
    "__v": 0
}
```
## 2. Address end point :
* ### get the list of all addresses present in database(Get request):- 
```
End Point:- 

localhost:3000/api/hiring/address
```
```json
Response:-
[
    {
        "country": "India",
        "_id": "5ed4a93dc6161016cc9373a6",
        "city": "delhi",
        "pin": 247345,
        "street": "colony",
        "area": "cyber city",
        "__v": 0
    },
    {
        "country": "India",
        "_id": "5ed4a956c6161016cc9373a9",
        "city": "delhi",
        "pin": 247737,
        "street": "colony",
        "area": "cyber city",
        "__v": 0
    },
    {
        "country": "India",
        "_id": "5ed4dd2813135a1a284efdb1",
        "houseNumber": 34,
        "city": "delhi",
        "pin": 953636,
        "street": "gandhi road",
        "area": "kalyan",
        "landmark": "india gate",
        "__v": 0
    }
]
```
* ### Get one address by id(Get Request):- 
```
End Point:- 

localhost:3000/api/hiring/address/(id)
```
```json
Response:- 
{
    "country": "India",
    "_id": "id",
    "houseNumber": 34,
    "city": "delhi",
    "pin": 953636,
    "street": "gandhi road",
    "area": "kalyan",
    "landmark": "india gate",
    "__v": 0
}
```
