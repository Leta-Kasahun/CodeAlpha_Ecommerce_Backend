# CodeAlpha E-Commerce Backend

This repository contains the modular, production-ready backend API for a modern e-commerce platform, developed for the CodeAlpha Full Stack Development Internship. It provides secure authentication, product management, shopping cart, orders, reviews, and other essential e-commerce functionalities, powered by MongoDB and deployed on Render.

## Technologies
- Node.js / Express.js
- MongoDB Atlas (Mongoose)
- Render (Deployment)
- Postman (API Testing)
- GitHub (Version Control)

## Features
- User authentication (register, login, logout)
- Product CRUD operations
- Shopping cart management
- Order processing
- Product reviews and ratings
- Wishlist management
- Coupons / discount codes
- Categories and tags
- Admin operations
- Payment gateway integration (placeholder)

## Modular Folder Structure

CodeAlpha_Ecommerce_Backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── reviewController.js
│   │   └── userController.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── cartModel.js
│   │   ├── orderModel.js
│   │   └── reviewModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── formatResponse.js
│   │
│   └── server.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── .env
