# Expense Splitter App - Complete Setup Guide

## Project Overview

A modern, full-stack expense splitter application built with:
- **Frontend:** React.js with TailwindCSS
- **Backend:** Node.js/Express
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs password hashing

## Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MySQL Server
- Git

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Update `.env` with your database credentials:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_splitter
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

5. **Create MySQL database:**
```sql
CREATE DATABASE IF NOT EXISTS expense_splitter;
```

6. **Start backend server:**
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env.local` file:**
```bash
cp .env.local.example .env.local
```

4. **Update `.env.local`:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. **Start frontend development server:**
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Features

### Authentication
- User Registration (Signup)
- User Login with JWT
- Protected Routes
- Profile Management
- Logout

### Expense Management
- Create Expenses
- Read/View Expenses
- Update Expenses
- Delete Expenses
- Search Expenses
- Filter by Category
- Filter by Date Range

### Analytics & Statistics
- Total Expense Amount
- Breakdown by Category
- Average Expense
- Expense Trends

### UI/UX
- Responsive Design (Mobile, Tablet, Desktop)
- Form Validation (Client & Server)
- Error Handling
- Loading States
- Success Messages

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Expenses
- `POST /api/expenses` - Create expense
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get expense by ID
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/search` - Search expenses
- `GET /api/expenses/filter/category` - Filter by category
- `GET /api/expenses/filter/daterange` - Filter by date range
- `GET /api/expenses/stats/total` - Get total expenses
- `GET /api/expenses/stats/category` - Get category breakdown

## Project Structure

```
expense-splitter/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── ExpenseForm.js
│   │   │   ├── ExpenseList.js
│   │   │   └── StatCard.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   └── Profile.js
│   │   ├── services/
│   │   │   ├── apiClient.js
│   │   │   └── apiService.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.local
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── API_DOCUMENTATION.md
├── PRODUCTION_SCALING.md
├── Postman_Collection.json
└── README.md
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Expenses Table
```sql
CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  date DATE NOT NULL,
  split_with JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Security Features

1. **Password Hashing:** bcryptjs (salt rounds: 10)
2. **JWT Tokens:** Secure token-based authentication
3. **Input Validation:** Server-side validation with express-validator
4. **CORS Protection:** Configured CORS middleware
5. **Protected Routes:** Client-side route protection
6. **Error Handling:** Secure error messages

## Environment Variables

### Backend (.env)
- `DB_HOST` - Database hostname
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time
- `PORT` - Server port
- `NODE_ENV` - Environment (development/production)

### Frontend (.env.local)
- `REACT_APP_API_URL` - Backend API URL

## Testing the Application

### Manual Testing Steps

1. **Signup:**
   - Visit `http://localhost:3000/signup`
   - Fill in form and submit
   - Should redirect to dashboard

2. **Login:**
   - Visit `http://localhost:3000/login`
   - Use credentials from signup
   - Should redirect to dashboard

3. **Add Expense:**
   - Click "Add New Expense"
   - Fill in details
   - Should appear in expense list

4. **View Dashboard:**
   - Should see statistics
   - Should see expense list
   - Should see category breakdown

5. **Search/Filter:**
   - Use search box to find expenses
   - Filter by category
   - Should update results

6. **Update Expense:**
   - Click Edit on an expense
   - Modify details
   - Should update in list

7. **Delete Expense:**
   - Click Delete on an expense
   - Confirm deletion
   - Should remove from list

## Using Postman

1. **Import Collection:**
   - Open Postman
   - Click Import
   - Upload `Postman_Collection.json`

2. **Set Variables:**
   - Create environment variable `token`
   - Copy token from login response
   - Use `{{token}}` in authenticated requests

3. **Test Endpoints:**
   - Test each endpoint in order
   - Check response status codes
   - Verify response data

## Troubleshooting

### Backend Issues

**Database Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
Solution: Ensure MySQL is running and credentials are correct.

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: Change PORT in .env or kill process on port 5000.

**JWT Secret Not Set:**
```
Error: JWT_SECRET is not defined
```
Solution: Add `JWT_SECRET` to .env file.

### Frontend Issues

**API Connection Error:**
```
Error: Network Error
```
Solution: Ensure backend is running and REACT_APP_API_URL is correct.

**Token Expired:**
```
Unauthorized
```
Solution: Login again to get a new token.

**CORS Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
Solution: Ensure backend CORS is enabled for frontend URL.

## Performance Tips

1. **Database:**
   - Add indexes on frequently queried columns
   - Use pagination for large result sets
   - Cache database queries

2. **Frontend:**
   - Use React.memo for expensive components
   - Implement lazy loading for routes
   - Optimize images and assets
   - Use CDN for static files

3. **Backend:**
   - Implement caching layer (Redis)
   - Use connection pooling
   - Add compression middleware
   - Monitor query performance

## Deployment

### Backend Deployment (Heroku)
```bash
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
npm install -g vercel
vercel
```

### AWS Deployment
See [PRODUCTION_SCALING.md](PRODUCTION_SCALING.md) for detailed AWS architecture.

## Further Documentation

- See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for detailed API endpoints
- See [PRODUCTION_SCALING.md](PRODUCTION_SCALING.md) for scaling strategies
- See [Postman_Collection.json](Postman_Collection.json) for API testing

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit pull request

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.

---

**Happy Expense Splitting! 💰**
