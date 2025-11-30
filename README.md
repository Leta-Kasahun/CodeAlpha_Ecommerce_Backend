# 🛍️ CodeAlpha E-Commerce Backend

A complete, production-ready backend API for modern e-commerce platform built for **CodeAlpha Full Stack Development Internship**.

---

### 🚀 Live API  
**BASE URL:**  
👉 [https://ca-ecommerce-api.onrender.com](https://ca-ecommerce-api.onrender.com)


---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** JWT, Bcrypt
- **Email Service:** Nodemailer
- **Deployment:** Render
- **Testing:** Postman/Thunder Client

---

## 📁 Project Structure
<<<<<<< HEAD
```bash
CodeAlpha_Ecommerce_Backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── auth.register.js
│   │   │   ├── auth.login.js
│   │   │   ├── auth.logout.js
│   │   │   └── auth.verifyOTP.js
│   │   │
│   │   ├── product/
│   │   │   ├── productControllers.js
│   │   │   ├── cartControllers.js
│   │   │   ├── orderControllers.js
│   │   │   ├── reviewControllers.js
│   │   │   └── searchControllers.js
│   │   │
│   │   └── users/
│   │       ├── userProfileControllers.js
│   │       └── ownerControllers.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── cartModel.js
│   │   ├── orderModel.js
│   │   ├── paymentModel.js
│   │   └── reviewModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── searchRoutes.js
│   │   ├── sortingRoutes.js
│   │   ├── orderHistoryRoutes.js
│   │   └── userProfileRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   ├── orderService.js
│   │   ├── paymentService.js
│   │   ├── searchService.js
│   │   ├── sortingService.js
│   │   ├── userService.js
│   │   └── addressService.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── emailService.js
│   │   └── emailTemplates.js
│   │
│   └── server.js
│
├── .env
├── package.json
├── package-lock.json
└── README.md
```
>>>>>>> 00ed0b6 (corse is done)

---

## ⭐ Features

### 🔐 Authentication System
- User registration with email OTP verification
- Secure login/logout with JWT tokens
- Password reset functionality
- Email verification for account activation

### 👤 User Management
- User profile management
- Address information storage
- Order history with advanced filtering
- Role-based access (customer/seller)

### 📦 Product Management
- Complete CRUD operations for products
- Product categorization and tagging
- Inventory management
- Image support with URL arrays

### 🔍 Search & Discovery
- Advanced product search with filters
- Real-time search suggestions
- Multiple sorting options (price, date, rating)
- Popular search categories

### 🛒 Shopping Cart
- Add/remove items from cart
- Quantity management
- Cart persistence per user session
- Automatic cart clearing after orders

### 📋 Order System
- Order creation from cart items
- Order status tracking (processing → shipped → completed)
- Order history with advanced filtering
- Shipping address management

### 💳 Payment System
- Payment simulation for orders
- Multiple payment methods support
- Payment status tracking
- Transaction history

### ⭐ Reviews & Ratings
- Product reviews and ratings
- Review management (create, update, delete)
- Product rating calculations
- User review history

### 🏪 Seller Marketplace
- User upgrade to seller role
- Shop profile management
- Product management for sellers
- Order management for shop owners

---

## 🚀 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/user-profile` - Get user profile
- `PUT /api/user-profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (protected)
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Search & Sorting
- `GET /api/search/products` - Search products with filters
- `GET /api/search/suggestions` - Get search suggestions
- `GET /api/search/popular` - Get popular searches
- `GET /api/sort/products` - Sort products

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:id` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/order-history` - Get order history with filters

### Payments
- `POST /api/payments` - Create payment for order
- `PUT /api/payments/:id/process` - Process payment
- `GET /api/payments/history` - Payment history
- `GET /api/payments/order/:id` - Get payment by order

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/product/:id` - Get product reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Seller Features
- `POST /api/owners/upgrade` - Upgrade to seller
- `GET /api/owners/profile` - Get seller profile
- `PUT /api/owners/profile` - Update seller profile

---

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd CodeAlpha_Ecommerce_Backend

npm run dev
<br>
🌐 Deployment
The API is deployed on Render with automatic deployments from GitHub. Environment variables are configured in the Render dashboard for secure production deployment.
<br>
📞 Support
For issues or questions regarding this CodeAlpha internship project:

Email: services@codealpha.tech

Website: www.codealpha.tech
<br>
📄 License
This project is developed as part of the CodeAlpha Full Stack Development Internship program.
<br>
Built with ❤️ for CodeAlpha Full Stack Development Internship
