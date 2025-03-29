# 📝 todo-api

A modular and clean TODO API built with **Node.js**, **TypeScript**, and **Express**. Designed following **Clean Architecture** principles for scalability and maintainability.

## 🔧 Features

- 🔐 **Authentication (auth module)**  
  User registration and login with **JWT** authentication (`jsonwebtoken`) and secure password hashing using **bcrypt**.

- ✅ **Task Management (todo module)**  
  Full CRUD operations for user-specific todo items.

- 🧼 **Clean Architecture**  
  Clear separation between domain, use cases, interfaces, and infrastructure.

## 🛠️ Tech Stack

- Node.js  
- TypeScript  
- Express.js  
- JSON Web Token (`jsonwebtoken`)  
- Bcrypt  
- Clean Architecture

## 📁 Project Structure

src/
├── config/
│   ├── db.ts
│   ├── env.ts
│   └── jwt.ts
├── helpers/
│   └── hash.ts
├── modules/
│   ├── auth/
│   └── todo/
├── app.ts
└── server.ts
