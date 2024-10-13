# JWT Authentication using React and Vite

## 1. Introduction

### Project Overview
This project is a frontend web application built with Vite and React. It integrates a backend for JWT-based authentication, which provides a secure way for users to register, log in, and access protected routes in conjunction with the backend.

### Purpose and Goals
The main goal of this project is to offer a seamless front-end interface for a JWT-authenticated system, interacting with a secure backend. It aims to provide users with a smooth login experience and to protect routes using tokens.

### Target Audience
This application is suitable for developers and users who require a front-end interface to interact with JWT-authenticated systems.

## 2. Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/Anass-Dr/JWT-Auth-Front.git
    ```
2. Navigate to the project directory:
   ```sh
   cd JWT-Auth-Front
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```sh
    VITE_API_URL=
    ```
2. Build and start the Docker containers:
    ```sh
     docker-compose up --build -d
     ```
3. Access the application at `http://localhost:5000`.

## 3. Project Structure

### Overview
The project structure is as follows:
```
JWT-Auth-Front/
├── src/
│   ├── components/
│   ├── config/
│   ├── context/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
├── index.html
├── .env
├── Dockerfile
├── docker-compose.yml
├── vite.config.js
└── README.md
```

### Description

- `public/`: Contains public assets like images, icons, etc.
- `src/`: The source code for the application, including components, layouts, pages, and utilities.
- `Dockerfile`: Contains instructions for creating the Docker image.
- `docker-compose.yml`: Used for setting up and managing Docker containers.
- `routes/`: Contains the route files for defining the application routes.
- `.env`: Contains the environment variables for the application.

## 4. Features

- Authentication
    - Registration: Create a new user account.
    - Login: Authenticate users using email and password.
    - Logout: Clear the cookie and log out the user.
    - JWT Validation: Frontend requests are authenticated using the JWT token.
    - Protected Routes: Only accessible with a valid JWT token.
- Responsive Design
    - Built using shadcn for a fully responsive UI.
- Protected Routes
    - Only authenticated users can access certain routes in the application.
- User Interface
    - Clear, intuitive UI built with React and shadcn.


## 5. Packages Used

- `axios`: Promise based HTTP client for the browser and node.js
- `react`: JavaScript library for building user interfaces.
- `react-router-dom`: DOM bindings for React Router.
- `shadcn`: CSS framework for building responsive and modern web applications.
- `vite`: Next generation frontend tooling that sets up quickly.
- `vitest`: Vite plugin for testing with Jest.
- `@testing-library/react`: Simple and complete testing utilities that encourage good testing practices.
- `@testing-library/jest-dom`: Custom jest matchers to test the state of the DOM.
