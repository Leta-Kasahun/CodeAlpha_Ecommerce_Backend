🛍️ CODECALPHA E-COMMERCE BACKEND

A complete and modern backend API for building scalable e-commerce applications.

This backend supports user accounts, product catalog, search, cart, orders, payments, reviews, and seller marketplace — all with clean REST endpoints.

🚀 Live API

Base URL: https://ca-ecommerce-api.onrender.com

All API paths listed below should be used together with this base URL.

---
This API powers a full e-commerce platform with:

User registration, login, OTP verification

Profile & address management

Product creation, editing & listing

Product search, sorting & suggestions

Shopping cart with add/update/remove

Order creation & tracking

Payment handling

Review & rating system

Seller account upgrade for users

Front-end teams can use this documentation to test every flow easily without missing any endpoint.
----
🛠️ 2. Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

OTP Verification System

🧪 3. Complete Testing Workflow

Follow these steps when testing the API or connecting from a front-end app.

👤 4. USER REGISTRATION & LOGIN
Register
POST /api/auth/register


Body:

{
  "name": "test user",
  "email": "test@example.com",
  "password": "123456",
  "confirmPassword": "123456"
}

Verify OTP
POST /api/auth/verify-otp


Body:

{
  "email": "test@example.com",
  "otp": "123456"
}

Login
POST /api/auth/login


Body:

{
  "email": "test@example.com",
  "password": "123456"
}

👤 5. PROFILE MANAGEMENT
Get profile
GET /api/user-profile

Update profile
PUT /api/user-profile


Body:

{
  "name": "updated name",
  "phone": "+251911223344",
  "address": {
    "city": "addis ababa",
    "postalCode": "1000",
    "country": "ethiopia"
  }
}

📦 6. PRODUCT MANAGEMENT
Create product
POST /api/products


Body:

{
  "name": "wireless headphones",
  "price": 59.99,
  "quantity": 15,
  "category": "electronics",
  "description": "high-quality headphones",
  "images": ["headphone.jpg"]
}

Get all products
GET /api/products

Get single product
GET /api/products/PRODUCT_ID

Update product
PUT /api/products/PRODUCT_ID


Body:

{
  "price": 49.99,
  "quantity": 10
}

🔍 7. SEARCH & DISCOVERY
Search products
GET /api/search/products?q=wireless&category=electronics&minPrice=20&maxPrice=100

Search suggestions
GET /api/search/suggestions?q=wire

Sort products
GET /api/sort/products?sortBy=price&sortOrder=asc

Popular searches
GET /api/search/popular

🛒 8. SHOPPING CART
Add item
POST /api/cart/add


Body:

{
  "productId": "PRODUCT_ID",
  "quantity": 2
}

Get cart
GET /api/cart

Update cart item
PUT /api/cart/update/PRODUCT_ID


Body:

{
  "quantity": 3
}

Remove item
DELETE /api/cart/remove/PRODUCT_ID

Clear cart
DELETE /api/cart/clear

📦 9. ORDER PROCESSING
Create order
POST /api/orders


Body:

{
  "shippingAddress": {
    "city": "addis ababa",
    "postalCode": "1000",
    "country": "ethiopia"
  },
  "paymentMethod": "card"
}

Get all orders
GET /api/orders

Get single order
GET /api/orders/ORDER_ID

Update order status
PUT /api/orders/ORDER_ID/status


Body:

{
  "status": "shipped"
}

📘 10. ORDER HISTORY
GET /api/order-history?status=completed&minPrice=50&page=1

💳 11. PAYMENT SYSTEM
Create payment
POST /api/payments


Body:

{
  "order": "ORDER_ID",
  "amount": 99.98,
  "method": "card"
}

Process payment
PUT /api/payments/PAYMENT_ID/process


Body:

{
  "status": "success"
}

Payment history
GET /api/payments/history

Get payment by order
GET /api/payments/order/ORDER_ID

⭐ 12. REVIEWS SYSTEM
Add review
POST /api/reviews


Body:

{
  "product": "PRODUCT_ID",
  "rating": 5,
  "comment": "excellent product!"
}

Get product reviews
GET /api/reviews/product/PRODUCT_ID

Update review
PUT /api/reviews/REVIEW_ID


Body:

{
  "rating": 4,
  "comment": "very good quality"
}

🏪 13. SELLER UPGRADE
Upgrade to seller
POST /api/owners/upgrade


Body:

{
  "shopName": "my tech store",
  "phoneForOrders": "+251911223344",
  "shopAddress": {
    "city": "addis ababa",
    "postalCode": "1000",
    "country": "ethiopia"
  }
}

Get seller profile
GET /api/owners/profile

Update seller profile
PUT /api/owners/profile


Body:

{
  "phoneForOrders": "+251922334455"
}

