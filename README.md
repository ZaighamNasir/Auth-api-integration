# React Authentication App

React Authentication with API Integration – A complete authentication flow built in React with backend API integration. Features include user registration, login with JWT, protected dashboard, logout, and OTP-based password reset


---

## 🚀 Features
- User Registration
- User Login with JWT Authentication
- Protected Dashboard with Decoded User Data
- Logout functionality (clears JWT token)
- Forgot Password via Email OTP
- Password Reset with OTP Verification
- Styled with Tailwind CSS

---

## 📦 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ZaighamNasir/Auth-api-integration.git
cd react-auth-app
```

2️⃣ Install Dependencies

For the frontend:

```bash

cd client
npm install
```
For the backend:

```bash

cd server
npm install
```
3️⃣ Environment Variables

Create .env files in both client and server folders.

For server/.env:

```ini

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```
For client/.env:

```ini
REACT_APP_API_BASE=https://your-backend-url
```
4️⃣ Run the App

Backend:

```bash
cd server
npm run dev
```
Frontend:

```bash
cd client
npm start
```
🔄 Authentication Flow

1. Register

User signs up via /register page.

Backend saves the user in MongoDB with hashed password.

2. Login

User enters email/password on /login page.

Backend verifies credentials, returns a JWT token.

Token is stored in localStorage.

3. Dashboard

Protected route that checks if JWT exists.

Token is decoded to show username & email.

If token is missing or invalid → redirect to /login.

4. Logout

Clears token from localStorage and redirects to /login.

5. Forgot Password

User enters their email.

Backend sends OTP to the email.

User enters OTP + new password.

Backend verifies OTP and updates the password.

🧪 How to Test the App

1. Register a User

Go to /register, fill in details, submit.

Verify user appears in MongoDB.

2. Login

Go to /login, enter credentials.

Should redirect to /dashboard with decoded user info.

3. Protected Route

Try opening /dashboard without logging in.

Should redirect back to /login.

4. Forgot Password

Go to /forgot-password, enter registered email.

Check email for OTP (requires email config in .env).

Enter OTP + new password.

Try logging in with the new password.

5. Logout

Click "Logout" in the dashboard.

Should remove token and redirect to /login.

🛠 Tech Stack
Frontend: React, Tailwind CSS, Axios

Backend: Node.js, Express.js, MongoDB, JWT, Nodemailer

Authentication: JWT (JSON Web Tokens)
