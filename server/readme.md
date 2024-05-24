DEKHO ISSI FILE KO DEKH K FORMAT SAMAJHANA hai-----------

1) Jab bhi Node.js ka Project banana hai toh sabse phle         planning is important.

    Planning means kitne models honge.
    Jaise agar pinterest ka bana rhe hai tab doo models necessary hai 
    first -> Users
    second -> Post 
    etc.

    Aur agar instagram banana hai tab :- User model , Post model ,comment model , Follower model , like model , message model and notification model.

2) First of all create the --->👨‍💻👊 db.js <--- to connect the backend code with the database.

3) After creating the db.js file , create all the required models
    CREATION OF MODEL🚩🧖‍♂️:
    Abb models creat karo planning k hisab se.
    {If you have two models defined in your models folder, each representing a different type of data, then typically you would have two collections created in MongoDB.}
    Matlab ---> No. of models file inside the models folder is equal to the number of collection in mongodb database.

4) After creating the db.js file , now create controllers .
Controllers is used to act as an intermediary between the models and the views folder.

5) After cretaing the controllers 
    Now create Views folder.

6) After creating the viewws folder , create Routes for both [GET,POST] requests in the routes/api/index.js file.    In this folder, HTML pages will be created which will interact with the user.

7) add the require stuffs in the app.js file (if any required)



-----------------------------------------------------------------------------------------

Running ka flow

---> app.js ------ runs first on running npx nodemon[app.js]
---> It will first connec the database.[db.js]
---> On the user requests , the routes will be handles[Routes] for both GET and POST
---> [Controller] will handle what should happen when a request comes from the client side.
---> The response will then send back to the client side.[controller se bhi humlog page ko render karwa kste hai]
---> [Models]
--->
