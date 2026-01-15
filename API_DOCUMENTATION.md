# Expense Splitter API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. User Signup
**POST** `/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Code:** 201

---

### 2. User Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Code:** 200

---

### 3. Get User Profile
**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-13T10:00:00Z"
  }
}
```

**Status Code:** 200

---

### 4. Update User Profile
**PUT** `/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "message": "Profile updated",
  "user": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "created_at": "2024-01-13T10:00:00Z"
  }
}
```

**Status Code:** 200

---

## Expense Endpoints

### 5. Create Expense
**POST** `/expenses`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "description": "Lunch at restaurant",
  "amount": 25.50,
  "category": "Food",
  "date": "2024-01-13"
}
```

**Response:**
```json
{
  "message": "Expense created successfully",
  "expense": {
    "id": 1,
    "description": "Lunch at restaurant",
    "amount": 25.50,
    "category": "Food",
    "date": "2024-01-13"
  }
}
```

**Status Code:** 201

---

### 6. Get All Expenses
**GET** `/expenses?limit=50&offset=0`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (optional): Number of expenses to fetch (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "message": "Expenses fetched successfully",
  "count": 2,
  "expenses": [
    {
      "id": 1,
      "user_id": 1,
      "description": "Lunch at restaurant",
      "amount": "25.50",
      "category": "Food",
      "date": "2024-01-13",
      "created_at": "2024-01-13T10:00:00Z"
    }
  ]
}
```

**Status Code:** 200

---

### 7. Get Expense by ID
**GET** `/expenses/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "expense": {
    "id": 1,
    "user_id": 1,
    "description": "Lunch at restaurant",
    "amount": "25.50",
    "category": "Food",
    "date": "2024-01-13"
  }
}
```

**Status Code:** 200

---

### 8. Update Expense
**PUT** `/expenses/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "description": "Dinner at restaurant",
  "amount": 35.75,
  "category": "Food",
  "date": "2024-01-13"
}
```

**Response:**
```json
{
  "message": "Expense updated successfully",
  "expense": {
    "id": 1,
    "description": "Dinner at restaurant",
    "amount": 35.75,
    "category": "Food",
    "date": "2024-01-13"
  }
}
```

**Status Code:** 200

---

### 9. Delete Expense
**DELETE** `/expenses/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Expense deleted successfully"
}
```

**Status Code:** 200

---

### 10. Search Expenses
**GET** `/expenses/search?query=restaurant`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `query` (required): Search term

**Response:**
```json
{
  "message": "Search results fetched successfully",
  "count": 1,
  "expenses": [...]
}
```

**Status Code:** 200

---

### 11. Get Expenses by Category
**GET** `/expenses/filter/category?category=Food`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `category` (required): Category name

**Response:**
```json
{
  "message": "Expenses fetched successfully",
  "count": 2,
  "expenses": [...]
}
```

**Status Code:** 200

---

### 12. Get Expenses by Date Range
**GET** `/expenses/filter/daterange?startDate=2024-01-01&endDate=2024-01-31`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate` (required): Start date (YYYY-MM-DD)
- `endDate` (required): End date (YYYY-MM-DD)

**Response:**
```json
{
  "message": "Expenses fetched successfully",
  "count": 3,
  "expenses": [...]
}
```

**Status Code:** 200

---

### 13. Get Total Expenses
**GET** `/expenses/stats/total`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Total expense fetched successfully",
  "total": 61.25
}
```

**Status Code:** 200

---

### 14. Get Total Expenses by Category
**GET** `/expenses/stats/category`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Category totals fetched successfully",
  "totals": [
    {
      "category": "Food",
      "total": "61.25"
    }
  ]
}
```

**Status Code:** 200

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error"
}
```

---

## Categories Available
- Food
- Transport
- Entertainment
- Shopping
- Utilities
- Health
- Other
