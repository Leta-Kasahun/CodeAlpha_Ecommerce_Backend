🛍️ CodeAlpha E-Commerce Backend
Complete backend API for modern e-commerce platform. Built for CodeAlpha Full Stack Development Internship.

🚀 Live API
Base URL: https://ca-ecommerce-api.onrender.com

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB Atlas

Auth: JWT, Bcrypt

Email: Nodemailer

Deployment: Render

✅ Completed Systems
🔐 AUTHENTICATION SYSTEM
Purpose: Secure user registration and login with email verification

Test Endpoints:

http
POST https://ca-ecommerce-api.onrender.com/api/auth/register
POST https://ca-ecommerce-api.onrender.com/api/auth/verify-otp  
POST https://ca-ecommerce-api.onrender.com/api/auth/login
POST https://ca-ecommerce-api.onrender.com/api/auth/logout
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
GET    https://ca-ecommerce-api.onrender.com/api/products
GET    https://ca-ecommerce-api.onrender.com/api/products/:id
POST   https://ca-ecommerce-api.onrender.com/api/products
PUT    https://ca-ecommerce-api.onrender.com/api/products/:id
DELETE https://ca-ecommerce-api.onrender.com/api/products/:id
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
GET    https://ca-ecommerce-api.onrender.com/api/cart
POST   https://ca-ecommerce-api.onrender.com/api/cart/add
PUT    https://ca-ecommerce-api.onrender.com/api/cart/update/:productId
DELETE https://ca-ecommerce-api.onrender.com/api/cart/remove/:productId
DELETE https://ca-ecommerce-api.onrender.com/api/cart/clear
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
POST https://ca-ecommerce-api.onrender.com/api/orders
GET  https://ca-ecommerce-api.onrender.com/api/orders
GET  https://ca-ecommerce-api.onrender.com/api/orders/:id
PUT  https://ca-ecommerce-api.onrender.com/api/orders/:id/status
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

Update Status

json
{
  "status": "shipped"
}
⭐ REVIEWS SYSTEM
Purpose: Add product reviews and ratings

Test Endpoints:

http
GET    https://ca-ecommerce-api.onrender.com/api/reviews/product/:productId
GET    https://ca-ecommerce-api.onrender.com/api/reviews/:id
POST   https://ca-ecommerce-api.onrender.com/api/reviews
PUT    https://ca-ecommerce-api.onrender.com/api/reviews/:id
DELETE https://ca-ecommerce-api.onrender.com/api/reviews/:id
Testing Steps:

Create Review

json
{
  "product": "product_id_here",
  "rating": 5,
  "comment": "Excellent product quality!"
}
Get Product Reviews - View all reviews for a product

Update Review - Modify rating or comment

Delete Review - Remove review

👑 OWNER UPGRADE SYSTEM
Purpose: Upgrade user to seller role with shop profile

Test Endpoints:

http
POST https://ca-ecommerce-api.onrender.com/api/owners/upgrade
GET  https://ca-ecommerce-api.onrender.com/api/owners/profile
PUT  https://ca-ecommerce-api.onrender.com/api/owners/profile
Testing Steps:

Upgrade to Owner

json
{
  "shopName": "My Tech Store",
  "phoneForOrders": "+251911223344",
  "shopAddress": {
    "city": "Addis Ababa",
    "postalCode": "1000",
    "country": "Ethiopia"
  }
}
Get Owner Profile - View shop details

Update Owner Profile - Modify shop information

🧪 Complete Testing Flow
Step 1: User Registration & Login
Register new user → Get OTP from console

Verify email with OTP → Get JWT token

Login with credentials → Confirm token works

Step 2: Product Management
Create product using JWT token

List all products → Verify creation

Update product details → Confirm changes

Step 3: Shopping Cart
Add product to cart → Check cart contents

Update item quantity → Verify calculation

Remove items → Confirm cart updates

Step 4: Order Processing
Add items to cart first

Create order → Auto-clear cart

View order history → Confirm order details

Step 5: Reviews & Ratings
Create review for purchased product

View product reviews → See your review

Update/delete review → Manage feedback

Step 6: Owner Upgrade
Upgrade account to seller role

Create shop profile → Become store owner

Manage shop details → Update information

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
Review Creation:

json
{
  "product": "product_id_here",
  "rating": 5,
  "comment": "Excellent product quality and fast delivery!"
}
Owner Upgrade:

json
{
  "shopName": "Tech Gadgets Hub",
  "phoneForOrders": "+251911223344",
  "shopAddress": {
    "city": "Addis Ababa",
    "postalCode": "1000",
    "country": "Ethiopia"
  }
}
✅ Verification Checklist
User can register and verify email

User can login and receive JWT token

Products can be created, read, updated, deleted

Items can be added/removed from cart

Orders can be created from cart

Order status can be updated

Reviews can be created, read, updated, deleted

User can upgrade to owner role

Owner profile can be managed

All endpoints return proper responses

Built for CodeAlpha Full Stack Development Internship 🚀

Live API: https://ca-ecommerce-api.onrender.com