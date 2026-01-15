# Quick Start Guide - Expense Splitter App

## 🚀 Get Started in 5 Minutes

### Option 1: Docker (Easiest - Recommended)

#### Prerequisites
- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))

#### Steps
1. Navigate to project directory:
```bash
cd d:\raed\essen\PrimeAi\1
```

2. Start all services:
```bash
docker-compose up
```

3. Wait for services to start (first run takes ~2 minutes)

4. Open in browser:
   - **Frontend:** http://localhost:3000
   - **Backend:** http://localhost:5000/api/health
   - **Database:** MySQL at localhost:3306

5. Create an account and start adding expenses!

---

### Option 2: Manual Setup

#### Prerequisites
- Node.js v16+ ([Download](https://nodejs.org))
- MySQL 8.0+ ([Download](https://dev.mysql.com/downloads/mysql))
- Git (optional)

#### Backend Setup

1. Open terminal/PowerShell in project directory:
```bash
cd d:\raed\essen\PrimeAi\1\backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
copy .env.example .env
```

4. Update `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=expense_splitter
JWT_SECRET=change_this_to_random_secret_key
PORT=5000
```

5. Start backend:
```bash
npm run dev
```

✅ Backend running at http://localhost:5000

#### Frontend Setup

1. Open new terminal in project directory:
```bash
cd d:\raed\essen\PrimeAi\1\frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (copy from `.env.example`):
```bash
copy .env.example .env.local
```

4. Start frontend development server:
```bash
npm start
```

✅ Frontend running at http://localhost:3000

---

## 🎯 First Steps

### Create Account
1. Go to http://localhost:3000
2. Click "Get Started" or navigate to `/signup`
3. Fill in:
   - Full Name: Your name
   - Email: your@email.com
   - Password: At least 6 characters
4. Click "Sign Up"
5. Automatically redirected to Dashboard

### Add Your First Expense
1. On Dashboard, click "Add New Expense"
2. Fill in:
   - Description: "Lunch at restaurant"
   - Amount: 15.50
   - Category: "Food"
   - Date: Today's date
3. Click "Add Expense"
4. Expense appears in list and statistics update

### Explore Features
- **Search:** Type in search box to find expenses
- **Filter:** Select a category to filter
- **Edit:** Click "Edit" on any expense to modify
- **Delete:** Click "Delete" to remove expense
- **Profile:** Click on your name to view profile
- **Statistics:** View totals and breakdowns

### Test More Features
- Create expenses in different categories
- Search for specific expenses
- Filter by category
- View category breakdown
- Logout and login again
- Update your profile

---

## 📝 Test Credentials

If you want to test quickly without creating a new account:

**Email:** test@example.com
**Password:** password123

(Create this account by signing up first)

---

## 🔧 Troubleshooting

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Option 1: Kill the process on port 5000
- Option 2: Change PORT in .env to 5001

### MySQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:**
- Ensure MySQL is running
- Check credentials in .env
- For Docker: MySQL starts automatically

### Frontend Can't Connect to Backend
```
Error: Network request failed
```
**Solution:**
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in .env.local
- Clear browser cache (Ctrl+Shift+Delete)

### Database Table Issues
**Solution:**
- Backend auto-creates tables on startup
- If manual setup needed: Check backend console for any errors
- Database should be created: `expense_splitter`

---

## 📚 Documentation Files

After getting started, read these for more details:

1. **README.md** - Complete setup guide (1000+ lines)
2. **API_DOCUMENTATION.md** - API endpoints reference
3. **PRODUCTION_SCALING.md** - Production deployment guide
4. **FILE_STRUCTURE.md** - Project file organization
5. **COMPLETE_SUMMARY.md** - Full project overview

---

## 🧪 Testing the API

### Using Postman

1. Download Postman ([Download](https://www.postman.com/downloads/))

2. Import collection:
   - Open Postman
   - Click "Import"
   - Select `Postman_Collection.json`

3. Test endpoints:
   - Collection appears in sidebar
   - Start with "Signup" to create account
   - Copy token from response
   - Paste in "Set token" environment variable
   - Test other endpoints

### Using Command Line

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Copy token from response

# Get profile
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🐳 Docker Commands

### Start Services
```bash
docker-compose up
```

### Stop Services
```bash
docker-compose down
```

### Restart Services
```bash
docker-compose restart
```

### View Logs
```bash
docker-compose logs -f
```

### View Specific Service Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Fresh Start (Remove all data)
```bash
docker-compose down -v
docker-compose up
```

---

## 💾 Database Management

### Access MySQL via Command Line
```bash
# From Docker
docker exec -it expense-splitter-db mysql -u root -p

# Manual MySQL
mysql -u root -p expense_splitter
```

### Useful SQL Commands
```sql
-- View all users
SELECT * FROM users;

-- View all expenses
SELECT * FROM expenses;

-- View expenses for user
SELECT * FROM expenses WHERE user_id = 1;

-- View total by category
SELECT category, SUM(amount) as total FROM expenses GROUP BY category;

-- Delete all test data
DELETE FROM expenses;
DELETE FROM users;
```

---

## 🔒 Security Notes

### Development
- JWT_SECRET is visible in .env
- Database credentials in .env
- CORS allows localhost

### Before Production
- [ ] Change JWT_SECRET to random value
- [ ] Use strong database password
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS/SSL
- [ ] Restrict CORS to your domain
- [ ] Use environment variables from secure service
- [ ] Enable database backups
- [ ] Setup monitoring

---

## 📊 Application Flow

```
1. User visits http://localhost:3000
                  ↓
2. See Home page with "Get Started"
                  ↓
3. Click signup → Create account
                  ↓
4. Login with credentials
                  ↓
5. JWT token received and stored
                  ↓
6. Redirected to Dashboard
                  ↓
7. Add, edit, delete, search expenses
                  ↓
8. View statistics and analytics
                  ↓
9. Click logout → Redirected to home
```

---

## 🚀 Next Steps

### After Getting Started
1. ✅ Create an account
2. ✅ Add some expenses
3. ✅ Test search and filter
4. ✅ Read documentation
5. ✅ Test API with Postman
6. ✅ Deploy to cloud (optional)

### Learn More
- Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) to understand endpoints
- Check [PRODUCTION_SCALING.md](PRODUCTION_SCALING.md) for deployment
- Review code in `backend/` and `frontend/` folders

### Customize
- Update colors in `frontend/src/App.css`
- Add more categories in `frontend/components/ExpenseForm.js`
- Add new fields to expenses in `backend/models/Expense.js`

---

## 💡 Pro Tips

1. **Backup your data**
   ```bash
   docker-compose exec mysql mysqldump -u root -proot123 expense_splitter > backup.sql
   ```

2. **Reset database**
   ```bash
   docker-compose down -v
   docker-compose up
   ```

3. **Debug backend**
   - Check console output from `npm run dev`
   - Use `console.log()` statements
   - Check network tab in browser DevTools

4. **Debug frontend**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for API calls

5. **Performance**
   - Use Redux for large apps (not needed now)
   - Cache API responses (already optimized)
   - Optimize images for faster load

---

## 📞 Common Questions

**Q: How do I reset my password?**
A: Delete user from database and create new account

**Q: Can I export expenses?**
A: Currently not implemented, but can be added

**Q: Is my data safe?**
A: Yes, passwords are hashed and communication is JSON

**Q: Can multiple users use the app?**
A: Yes, each user has their own account and data is isolated

**Q: How do I deploy this?**
A: See PRODUCTION_SCALING.md for detailed guide

---

## ✅ Success Checklist

- [ ] Docker installed
- [ ] Project downloaded
- [ ] `docker-compose up` running
- [ ] Frontend accessible at localhost:3000
- [ ] Backend API accessible at localhost:5000
- [ ] Can create account
- [ ] Can add expenses
- [ ] Can search/filter
- [ ] Can view statistics
- [ ] All features working

---

## 🎉 You're All Set!

**Status:** Ready to use ✅

Your Expense Splitter App is running with:
- ✅ Full-stack application
- ✅ User authentication
- ✅ Expense management
- ✅ Analytics dashboard
- ✅ Responsive UI
- ✅ Production-ready code

Start adding expenses and enjoy! 💰

---

**Need more help?**
- Check README.md for detailed setup
- See API_DOCUMENTATION.md for API details  
- Review PRODUCTION_SCALING.md for deployment
- Check FILE_STRUCTURE.md for project layout

**Happy expense tracking!**
