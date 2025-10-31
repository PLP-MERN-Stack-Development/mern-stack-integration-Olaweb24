# MERN Stack Blogging Application

This is a full-stack blogging application built using the MERN stack (MongoDB, Express.js, React, Node.js). The project serves as a foundation for building rich, interactive, and scalable blog platforms.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Create, read, update, and delete (CRUD) blog posts
- RESTful API backend
- Responsive React frontend
- Clean, modular codebase

## Project Structure

```
.
├── client/       # React frontend
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── server/       # Node.js/Express backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── ...
├── README.md
└── Week4-Assignment.md
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or Yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-Olaweb24.git
    cd mern-stack-integration-Olaweb24
    ```

2. **Install server dependencies:**
    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1. **Start the backend server:**
    ```bash
    cd server
    npm start
    ```
    The server runs by default on port 5000.

2. **Start the frontend development server:**
    ```bash
    cd ../client
    npm run dev
    ```
    The client runs by default on port 3000 (configured via Vite).

3. **Visit** `http://localhost:3000` in your browser.

## Environment Variables

Copy the `.env.example` files in both `client/` and `server/` directories (if available) to `.env` and update the values as needed.

**Server `.env` example:**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Client `.env` example:**
```
VITE_API_URL=http://localhost:5000
```

## Scripts

- **Server:**  
    - `npm start` – Start the Express server
    - `npm run dev` – Start server with auto-reload (if using nodemon)
- **Client:**  
    - `npm run dev` – Start the React development server (Vite)
    - `npm run build` – Build the production-ready app

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Contact:**  
For questions or feedback, please open an issue or contact the maintainer.
