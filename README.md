# nvx-dipay-test

## Description

`nvx-dipay-test` is a backend application built with Node.js and TypeScript, designed to demonstrate best practices in
API development using MongoDB as the database. The project features a modular structure, environment-based
configuration, and includes scripts for development, testing, and production deployment. It is suitable as a template or
starting point for scalable Node.js REST API projects.

A Postman collection is provided for easy API testing and documentation.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Development Notes](#development-notes)
- [Links](#links)

## Project Structure

- Source code is located in the `src` folder.
- Compiled JavaScript files are output to the `build` folder, as specified by the `outDir` option in `tsconfig.json`.

## Installation

Install dependencies:

```bash
npm install
```

## Environment Setup

1. Make sure MongoDB is running locally or use MongoDB Atlas.
2. Create a `.env` file in the root directory (same level as `package.json`) with the following content:

    ```
    MONGODB_URI="mongodb://localhost:27017/dipayDB" # or your Atlas URI
    PORT="3000" # default port is 3000
    ```

## Running the Project

- **Production build and start:**
  ```bash
  npm start
  ```
- **Run tests:**
  ```bash
  npm run test
  ```
- **Development mode (with hot reload):**
  ```bash
  npm run dev
  ```

## API Documentation

- [Postman API Documentation](https://documenter.getpostman.com/view/3535934/2s93eVXZRu#5c8a7407-f5f0-4407-a839-245cb78c0fe9)

## Development Notes

- Make all source code changes in the `src` folder.
- Ensure MongoDB is running before starting the server.

## Links

- [GitHub Repository](https://github.com/Jkenyut/test_Dipay)

## Contributing

Contributions are highly appreciated! To contribute:

1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes with clear messages.
4. Push your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request describing your changes.

Please ensure your code adheres to the project's coding standards and includes relevant tests and documentation.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit). See the `LICENSE` file for
details.

## Contact

For questions, suggestions, or feedback, please contact:

**Satria Nur Saputro**  
Email: [satrianursaputro06@gmail.com](mailto:satrianursaputro06@gmail.com)
