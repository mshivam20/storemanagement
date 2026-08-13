# ⭐ Store Rating Management System

A full-stack **Store Rating Management System** that allows users to discover registered stores, submit ratings from **1 to 5**, and manage their ratings. The application uses a **single authentication system with role-based access control (RBAC)** to provide different functionalities to Administrators, Store Owners, and Normal Users.

The project is built using **React.js, Node.js, Express.js, PostgreSQL, and Tailwind CSS**, with JWT-based authentication and bcrypt password hashing.

---

## 📌 Project Overview

The **Store Rating Management System** is a secure web application designed to manage stores, users, and store ratings through a role-based system.

The application supports three types of users:

1. **System Administrator**
2. **Normal User**
3. **Store Owner**

Each role has different permissions and access to different features.

The system provides:

- Secure authentication and authorization
- Role-based access control
- Store management
- User management
- Store search
- Rating submission and modification
- Average rating calculation
- Form validation
- Responsive user interface
- PostgreSQL database integration

The implemented system fulfills the requirements specified in the FullStack Intern Coding Challenge.

---

# 🚀 Features

## 👨‍💼 System Administrator

The Administrator has complete access to manage users, stores, and platform activities.

### Features

- Secure administrator login
- Add new stores
- Add new users
- Add new administrators
- View all registered users
- View all registered stores
- View store ratings
- Search/filter users
- Search/filter stores
- View user details
- View store details
- Monitor platform statistics
- Sort listings in ascending/descending order
- Logout

### Administrator Dashboard

The dashboard displays:

- 👥 Total Users
- 🏪 Total Stores
- ⭐ Total Submitted Ratings

### User Management

Administrators can view:

| Field   | Description          |
| ------- | -------------------- |
| Name    | User's name          |
| Email   | User's email         |
| Address | User's address       |
| Role    | User's assigned role |

Administrators can filter users using:

- Name
- Email
- Address
- Role

---

# 👤 Normal User

Normal users can register on the platform and interact with stores.

### Features

- Create an account
- Login
- Logout
- Update password
- View all registered stores
- Search stores by name
- Search stores by address
- View overall store rating
- Submit ratings
- Modify submitted ratings
- View previously submitted ratings

### Store Listing

Each store displays:

| Information    | Description                            |
| -------------- | -------------------------------------- |
| Store Name     | Name of the store                      |
| Address        | Store location                         |
| Overall Rating | Average rating from all users          |
| Your Rating    | Rating submitted by the logged-in user |
| Submit Rating  | Option to submit a rating              |
| Modify Rating  | Option to update an existing rating    |

---

# 🏪 Store Owner

Store Owners can monitor ratings and feedback related to their store.

### Features

- Secure login
- Update password
- View store information
- View users who submitted ratings
- View submitted ratings
- View average store rating
- Logout

## The Store Owner dashboard provides information about customers who rated the store and the store's overall average rating.

# ⭐ Rating System

Users can rate registered stores using a scale from **1 to 5**.

### Rating Rules

- Minimum rating: **1**
- Maximum rating: **5**
- A user can submit only **one rating per store**
- Existing ratings can be modified
- Average rating is calculated using all submitted ratings

### Example

```text
Ratings:

5
4
4
4

Average Rating = 4.25
```

The rating functionality and average calculation are implemented according to the project requirements.

---

# 🔐 Authentication & Security

Security is an important part of the application.

The project implements:

- JWT-based authentication
- Role-based access control
- Protected routes
- Password hashing using bcrypt
- Frontend validation
- Backend validation
- Secure registration and login

### Authentication Flow

```text
                ┌──────────────────┐
                │      User        │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   Login/Register │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Express Backend  │
                └────────┬─────────┘
                         │
                 Validate Credentials
                         │
                         ▼
                ┌──────────────────┐
                │  PostgreSQL DB   │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   JWT Token      │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Role Verification│
                └────────┬─────────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          Admin       User      Store Owner
```

---

# ✅ Form Validation

The application validates input on both the **frontend and backend**.

| Field    | Validation                     |
| -------- | ------------------------------ |
| Name     | Minimum 20 characters          |
| Name     | Maximum 60 characters          |
| Email    | Valid email format             |
| Password | 8–16 characters                |
| Password | At least one uppercase letter  |
| Password | At least one special character |
| Address  | Maximum 400 characters         |
| Rating   | Value between 1 and 5          |

These validation rules are implemented according to the challenge requirements.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Tailwind CSS
- JavaScript
- HTML5
- CSS3

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

## Authentication & Security

- JSON Web Token (JWT)
- bcrypt

The project's documented technology stack includes React.js, Node.js, Express.js, PostgreSQL, Tailwind CSS, JWT authentication, and bcrypt.

---

# 🏗️ System Architecture

```text
┌───────────────────────────────────────────┐
│                  CLIENT                   │
│                                           │
│              React.js + UI                │
│              Tailwind CSS                 │
└─────────────────────┬─────────────────────┘
                      │
                      │ HTTP / REST API
                      ▼
┌───────────────────────────────────────────┐
│                  SERVER                   │
│                                           │
│             Node.js + Express.js          │
│                                           │
│  ┌────────────┐  ┌──────────────┐        │
│  │    Auth    │  │ Role Control │        │
│  └────────────┘  └──────────────┘        │
│                                           │
│  ┌────────────┐  ┌──────────────┐        │
│  │   Users    │  │    Stores    │        │
│  └────────────┘  └──────────────┘        │
│                                           │
│  ┌────────────────────────────────────┐   │
│  │          Rating Management         │   │
│  └────────────────────────────────────┘   │
└─────────────────────┬─────────────────────┘
                      │
                      │ SQL Queries
                      ▼
┌───────────────────────────────────────────┐
│                PostgreSQL                 │
│                                           │
│   Users │ Stores │ Ratings │ Relations   │
└───────────────────────────────────────────┘
```

---

# 📂 Project Structure

```text
store-rating-management-system/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── assets/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

> Update the folder names above if your actual project structure is different.

---

# 🗄️ Database Design

The application uses **PostgreSQL** as its relational database.

The main entities are:

```text
Users
  │
  │
  ├──────────────┐
  │              │
  ▼              ▼
Stores         Ratings
  │              │
  └──────┬───────┘
         │
         ▼
     Relationships
```

### Main Data Entities

### Users

Stores information about all registered users.

```text
id
name
email
password
address
role
created_at
```

### Stores

Stores information about registered stores.

```text
id
name
email
address
owner_id
created_at
```

### Ratings

Stores ratings submitted by users.

```text
id
user_id
store_id
rating
created_at
updated_at
```

---

# 🖼️ Screenshots

Add screenshots of the application below.

## Login Page



---

## Registration Page



---

## Administrator Dashboard



---

## Store Management



---

## User Management



---

## Store Listing



---

## Rating Submission



---

## Store Owner Dashboard



---

## Responsive Design



---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>

cd store-rating-management-system
```

---

## giv2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_jwt_secret

```

> Do not commit your `.env` file to GitHub.

Add it to `.gitignore`:

```text
.env
node_modules/
```

---

# 🗃️ Database Setup

1. Install PostgreSQL.
2. Create a new database.
3. Configure the database connection in `.env`.
4. Create the required tables.
5. Run the backend server.

Example:

```sql
CREATE DATABASE store_rating_system;
```

Then configure the connection:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/store_rating_system
```

---

# ▶️ Running the Application

## Start Backend

```bash
cd backend
npm run dev
```

Backend server:

```text
http://localhost:5000
```

## Start Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔄 Application Flow

```text
                    Application
                         │
                         ▼
                  Login / Signup
                         │
                         ▼
                 Authentication
                         │
                         ▼
                 Role Verification
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
      Admin User    Normal User    Store Owner
          │              │              │
          ▼              ▼              ▼
       Manage         Browse &        Monitor
    Users/Stores      Rate Stores      Ratings
```

---

# 🔑 Role-Based Access Control

| Feature                | Administrator | Normal User |   Store Owner  |
| ---------------------- | :-----------: | :---------: | :------------: |
| Login                  |       ✅       |      ✅      |        ✅       |
| Registration           |       ❌       |      ✅      |        ❌       |
| Add Store              |       ✅       |      ❌      |        ❌       |
| Add User               |       ✅       |      ❌      |        ❌       |
| View Users             |       ✅       |      ❌      |        ❌       |
| View Stores            |       ✅       |      ✅      | Assigned Store |
| Search Stores          |       ✅       |      ✅      |        ❌       |
| Submit Rating          |       ❌       |      ✅      |        ❌       |
| Modify Rating          |       ❌       |      ✅      |        ❌       |
| View Submitted Ratings |       ✅       |      ✅      |        ✅       |
| View Average Rating    |       ✅       |      ✅      |        ✅       |
| Update Password        |       ✅       |      ✅      |        ✅       |
| Logout                 |       ✅       |      ✅      |        ✅       |

---

# 🔌 API Overview

The backend follows a RESTful API architecture.

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
```

### Users

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
```

### Stores

```text
GET    /api/stores
GET    /api/stores/:id
POST   /api/stores
```

### Ratings

```text
POST   /api/ratings
PUT    /api/ratings/:id
GET    /api/ratings/:storeId
```

> Update these endpoint names according to the actual routes implemented in your project.

---

# 📊 Dashboard Statistics

The Administrator dashboard provides an overview of platform activity.

```text
┌──────────────────┐
│   Total Users    │
│       120        │
└──────────────────┘

┌──────────────────┐
│  Total Stores    │
│        35        │
└──────────────────┘

┌──────────────────┐
│ Total Ratings    │
│       480        │
└──────────────────┘
```

---

# 🔍 Search & Sorting

The application supports searching/filtering and sorting functionality.

### User Search

Users can be filtered by:

- Name
- Email
- Address
- Role

### Store Search

Stores can be searched by:

- Store Name
- Address

### Sorting

Tables support:

- Ascending order
- Descending order

for important fields such as:

- Name
- Email
- Address
- Role
- Rating

---

# 🔒 Security Measures

The application implements several security practices:

- Password hashing using **bcrypt**
- JWT-based authentication
- Protected API routes
- Role-based authorization
- Frontend validation
- Backend validation
- Restricted access based on user role
- Environment variables for sensitive configuration
- Secure password requirements

The project documentation specifically confirms bcrypt password hashing, JWT authentication, protected routes, RBAC, and validation on both frontend and backend.

---

# 📱 Responsive Design

The application is designed to work across different screen sizes.

Supported layouts include:

- Desktop
- Laptop
- Tablet
- Mobile

The completed project documentation also lists a responsive user interface among the fulfilled requirements.

---

# 🧪 Testing Checklist

```text
Authentication
✓ User registration
✓ User login
✓ Admin login
✓ Store Owner login
✓ JWT authentication
✓ Logout

Authorization
✓ Admin protected routes
✓ Normal User protected routes
✓ Store Owner protected routes

Stores
✓ Add store
✓ View stores
✓ Search stores
✓ Sort stores

Users
✓ Add users
✓ View users
✓ Search users
✓ Filter users
✓ Sort users

Ratings
✓ Submit rating
✓ Rating validation 1–5
✓ Modify rating
✓ Average rating calculation

Validation
✓ Name validation
✓ Email validation
✓ Password validation
✓ Address validation

Database
✓ PostgreSQL integration
✓ User data
✓ Store data
✓ Rating data
```

---

# 📋 Project Requirements Status

| Requirement               | Status |
| ------------------------- | :----: |
| Single Login System       |    ✅   |
| Role-Based Access Control |    ✅   |
| Administrator             |    ✅   |
| Normal User               |    ✅   |
| Store Owner               |    ✅   |
| User Registration         |    ✅   |
| User Management           |    ✅   |
| Store Management          |    ✅   |
| Store Search              |    ✅   |
| User Search               |    ✅   |
| Sorting                   |    ✅   |
| Rating Submission         |    ✅   |
| Rating Modification       |    ✅   |
| Average Rating            |    ✅   |
| Password Update           |    ✅   |
| Password Hashing          |    ✅   |
| JWT Authentication        |    ✅   |
| Frontend Validation       |    ✅   |
| Backend Validation        |    ✅   |
| PostgreSQL                |    ✅   |
| Responsive UI             |    ✅   |

The project's documentation confirms that the major challenge requirements have been implemented, including authentication, RBAC, registration/login, store and user management, search, ratings, average-rating calculation, password encryption, JWT authentication, validation, responsive UI, and PostgreSQL integration.

---

# 📈 Future Enhancements

Possible future improvements include:

- Email verification
- Forgot password functionality
- Password reset through email
- Pagination for large datasets
- Advanced analytics
- Rating distribution charts
- Store categories
- Store images
- Admin activity logs
- Notifications
- Docker deployment
- Cloud deployment
- Automated testing
- API documentation using Swagger

---

# 🎯 Key Highlights

- **Full-stack web application**
- **Three role-based user types**
- **Secure JWT authentication**
- **bcrypt password hashing**
- **PostgreSQL relational database**
- **RESTful backend using Express.js**
- **React.js frontend**
- **Tailwind CSS UI**
- **Rating system from 1–5**
- **Search and sorting**
- **Frontend + backend validation**
- **Responsive interface**

---

# 👨‍💻 Author

**Shivam Murkute**

B.Tech Computer Engineering

Bharati Vidyapeeth College of Engineering, Lavale, Pune

### Connect With Me

- GitHub: `<YOUR_GITHUB_PROFILE>`
- LinkedIn: `<YOUR_LINKEDIN_PROFILE>`
- Email: `<YOUR_EMAIL>`

---

# 📄 License

This project was developed as part of a **FullStack Intern Coding Challenge**.

You are free to use this project for learning and educational purposes.

---

## ⭐ If you found this project useful

If you like this project, consider giving the repository a ⭐ on GitHub.
