# NVX DiPay Test API


<h3 align="center">🚀 A Scalable Node.js & MongoDB Backend Template 🚀</h3>

<p align="center">
  A backend template built with Node.js and TypeScript, demonstrating best practices for REST API development with MongoDB.
</p>

<p align="center">
  <!-- Badges/Shields -->
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Express-4.x-black?logo=express" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb" alt="MongoDB">
</p>

---

## About The Project

`nvx-dipay-test` is a backend application designed to serve as a robust starting point for scalable REST API projects. It features a modular structure, environment-based configuration, and a full suite of scripts for development, testing, and production. With a focus on clean code and best practices, it's an ideal template for building powerful Node.js applications.

A Postman collection is provided for easy API testing and exploration.

## 🛠️ Tech Stack

-   **Runtime:** [Node.js](https://nodejs.org/en/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))

## 🚀 Getting Started

Follow these steps to get the project set up and running on your local machine.

### 1. Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18.x or later)
-   [npm](https://www.npmjs.com/)
-   A running [MongoDB](https://www.mongodb.com/try/download/community) instance (local or on [Atlas](https://www.mongodb.com/cloud/atlas))

### 2. Installation & Setup

1.  **Clone the repository:**
    ```
    git clone [this project]
    cd project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    -   Create a `.env` file in the project's root directory.
    -   Add your configuration, using `.env.example` as a reference.
        ```env
        # .env
        MONGODB_URI="mongodb://localhost:27017/dipayDB"
        PORT="3000"
        ```

### 3. Running the Project

You can run the application in different modes:

-   **Development Mode (with hot-reloading):**
    ```bash
    npm run dev
    ```
-   **Production Mode:**
    This command first builds the TypeScript source into JavaScript and then starts the server.
    ```bash
    npm start
    ```
-   **Running Tests:**
    ```bash
    npm run test
    ```

The API will be available at `http://localhost:3000` (or the port specified in your `.env` file).

## 📂 Project Structure

The source code is located in the `src` folder and is organized by feature for better maintainability.

```
nvx-dipay-test/
├── build/                # Compiled JavaScript output (generated)
├── src/
│   ├── config/           # Environment configuration
│   ├── controllers/      # Request handlers and business logic
│   ├── models/           # Mongoose data models
│   ├── routes/           # API route definitions
│   ├── services/         # Services for interacting with the database
│   ├── utils/            # Utility functions
│   └── index.ts          # Main application entry point
├── .env.example          # Example environment variables
├── package.json
└── tsconfig.json
```

## 📖 API Documentation

For detailed information on all available endpoints, request/response examples, and to test the API directly, please refer to the Postman collection.

-   [**View Postman Documentation**](https://documenter.getpostman.com/view/3535934/2s93eVXZRu#5c8a7407-f5f0-4407-a839-245cb78c0fe9)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/3535934-08018809-7756-42d3-984e-3c726e632e8c?action=collection%2Ffork&source=rip_markdown)

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, create, and inspire. Any contributions you make are **greatly appreciated**.

1.  **Fork** the repository.
2.  Create a **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your changes (`git commit -m 'feat: Add some AmazingFeature'`).
4.  **Push** to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/license/mit). See the `LICENSE` file for more details.

## 📬 Contact

**Satria Nur Saputro**

-   Email: [satrianursaputro06@gmail.com](mailto:satrianursaputro06@gmail.com)
