# Forumly web application
This is a forum-style application that allows users to create posts, like and comment on them, and easily search through posts.

## Technologies Used

Frontend
- **Angular** v15.2.0 (Frontend Framework)
- **Angular Material** v15.2.9 (UI Component Library)
- **RxJS** v7.8.0 (Reactive Extensions for JavaScript)


Backend
- **NestJS** v11.0.1 (Backend Framework)
- **TypeORM** v0.3.20 (ORM)
- **PostgreSQL** v16.8 (Database)
- **bcrypt** v5.1.1 (Password Hashing)
- **jsonwebtoken** v11.0.0 (JWT Authentication)

## Startup commands
1. Install dependencies
   
   Before running the project, install all required dependencies for both frontend and backend. For this, you will need to have **Node.js** installed on your machine (recommended version: 18.x.x or later). This project was developed using **Node.js** v20.18.2.
    ```
    # Install dependencies for backend
    cd backend
    npm install
    ```
    
    ```
    # Install dependencies for frontend
    cd frontend
    npm install
    ```
2. Start PostgreSQL server

   Note for **Windows** users:
    If you're using pgAdmin, the PostgreSQL server usually starts automatically when you launch pgAdmin.
   
   Note for **Linux** users:
   To start the PostgreSQL server manually, use the following command in your terminal:
   ```
   sudo service postgresql start
   ```

3. Run the application
   
   To start the application, make sure to run both the backend and frontend using the following commands:
   ```
   # Run the backend
   cd backend
   npm run start:dev
   ```

   ```
   # Run the frontend
   cd frontend
   ng serve
   ```


    
