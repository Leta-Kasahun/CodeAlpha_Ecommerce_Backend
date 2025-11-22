# 🛍️ CodeAlpha E-Commerce Backend

Complete backend API for modern e-commerce platform. Built for **CodeAlpha Full Stack Development Internship**.

## 🚀 Live API
**Base URL:** `https://ca-ecommerce-api.onrender.com`

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Auth:** JWT, Bcrypt
- **Email:** Nodemailer
- **Deployment:** Render

## ✅ Completed Systems

### 🔐 AUTHENTICATION SYSTEM
**Purpose:** Secure user registration and login with email verification

**Test Endpoints:**
```http
POST /api/auth/register
POST /api/auth/verify-otp  
POST /api/auth/login
POST /api/auth/logout
Testing Steps:

Register User

json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456",
  "confirmPassword": "123456"
}
Check server console for OTP code

Verify Email with OTP

json
{
  "email": "test@example.com",
  "otp": "123456"
}
Login to get JWT Token

json
{
  "email": "test@example.com",
  "password": "123456"
}
📦 PRODUCT MANAGEMENT
Purpose: Create, view, update, and delete products

Test Endpoints:

http
GET    /api/products           # List all products
GET    /api/products/:id       # Get single product
POST   /api/products           # Create product (Auth required)
PUT    /api/products/:id       # Update product (Auth required)
DELETE /api/products/:id       # Delete product (Auth required)
Testing Steps:

Create Product (Use JWT token from login)

http
Headers: Authorization: Bearer your_jwt_token
json
{
  "name": "Wireless Headphones",
  "price": 59.99,
  "quantity": 15,
  "category": "Electronics",
  "description": "High-quality headphones",
  "images": ["image1.jpg"]
}
List Products - Verify product appears

Update Product - Change price/quantity

Delete Product - Remove product

🛒 SHOPPING CART
Purpose: Add products to cart and manage quantities

Test Endpoints:

http
GET    /api/cart                 # Get user cart
POST   /api/cart/add             # Add item to cart
PUT    /api/cart/update/:id      # Update quantity
DELETE /api/cart/remove/:id      # Remove item
DELETE /api/cart/clear           # Clear cart
Testing Steps:

Add to Cart

json
{
  "productId": "product_id_here",
  "quantity": 2
}
View Cart - Verify items and quantities

Update Quantity - Change item quantity

Remove Item - Delete from cart

Clear Cart - Empty all items

📋 ORDER SYSTEM
Purpose: Create orders from cart and track status

Test Endpoints:

http
POST /api/orders           # Create order from cart
GET  /api/orders           # Get user orders
GET  /api/orders/:id       # Get single order
PUT  /api/orders/:id/status # Update order status
Testing Steps:

Ensure cart has items (from cart testing)

Create Order

json
{
  "shippingAddress": {
    "city": "Addis Ababa",
    "postalCode": "1000",
    "country": "Ethiopia"
  },
  "paymentMethod": "card"
}
View Orders - Check order appears in history

Update Status (Admin feature)

json
{
  "status": "shipped"
}
🧪 Complete Testing Flow
Step 1: User Registration & Login
Register new user → Get OTP from console

Verify email with OTP → Get JWT token

Login with credentials → Confirm token works

Step 2: Product Management
Create product using JWT token

List all products → Verify creation

Update product details → Confirm changes

Delete product → Verify removal

Step 3: Shopping Cart
Add product to cart → Check cart contents

Update item quantity → Verify calculation

Remove items → Confirm cart updates

Clear cart → Ensure empty state

Step 4: Order Processing
Add items to cart first

Create order → Auto-clear cart

View order history → Confirm order details

Update order status → Track progression

📋 Test Data Examples
User Registration:

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "confirmPassword": "123456"
}
Product Creation:

json
{
  "name": "Smartphone",
  "price": 299.99,
  "quantity": 10,
  "category": "Electronics",
  "description": "Latest smartphone model",
  "images": ["phone.jpg"]
}
Order Creation:

json
{
  "shippingAddress": {
    "city": "Your City",
    "postalCode": "12345",
    "country": "Your Country"
  },
  "paymentMethod": "card"
}
✅ Verification Checklist
User can register and verify email

User can login and receive JWT token

Products can be created, read, updated, deleted

Items can be added/removed from cart

Orders can be created from cart

Order status can be updated

All endpoints return proper responses

Built for CodeAlpha Full Stack Development Internship 🚀