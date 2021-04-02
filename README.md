# Memo Posts

This is a web app to keep your little memos similar to Google Keep. The backend service is built using Spring Boot and the frontend is built using Angular.

## Enviorment

Please make sure that you have a not-out-of-date NodeJS and Java installed in your enviorment.

## Starting the App
Instructions for starting the app will be provided below. Please assume that at the start of every code block, the current directory is the root directory of this repository.
To start the server:
 

    cd server
    ./mvnw spring-boot:run
  To start the client for the first time, we need to install dependencies first before running it:
  

    cd client
    npm install
    ng serve
   After that, you would only need to start client by typing:
   

    cd client
    ng serve

After starting the app, you may find it on http://127.0.0.1:4200/.
