# ⭐ Store Rating Management System

A full-stack **Store Rating Management System** that allows users to discover registered stores, submit ratings from **1 to 5**, and manage their ratings.

The application uses a **single authentication system with Role-Based Access Control (RBAC)** to provide different functionalities to:

- 👨‍💼 System Administrator
- 👤 Normal User
- 🏪 Store Owner

The project is developed using **React.js, Node.js, Express.js, PostgreSQL, and Tailwind CSS**, with **JWT-based authentication** and **bcrypt password hashing**.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
  - [System Administrator](#-system-administrator)
  - [Normal User](#-normal-user)
  - [Store Owner](#-store-owner)
- [Rating System](#-rating-system)
- [Authentication & Security](#-authentication--security)
- [Form Validation](#-form-validation)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Database Design](#-database-design)
- [Screenshots](#-screenshots)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [Application Flow](#-application-flow)
- [Role-Based Access Control](#-role-based-access-control)
- [API Overview](#-api-overview)
- [Dashboard Statistics](#-dashboard-statistics)
- [Search & Sorting](#-search--sorting)
- [Security Measures](#-security-measures)
- [Responsive Design](#-responsive-design)
- [Testing Checklist](#-testing-checklist)
- [Project Requirements Status](#-project-requirements-status)
- [Future Enhancements](#-future-enhancements)
- [Key Highlights](#-key-highlights)
- [Author](#-author)
- [License](#-license)

---

# 📌 Project Overview

The **Store Rating Management System** is a secure web application designed to manage stores, users, and store ratings through a role-based system.

The application supports three different user roles:

1. **System Administrator**
2. **Normal User**
3. **Store Owner**

Each role has different permissions and access to different functionalities.

The system provides:

- Secure authentication and authorization
- Role-Based Access Control
- Store management
- User management
- Store search
- User search
- Rating submission
- Rating modification
- Average rating calculation
- Form validation
- Sorting functionality
- Responsive user interface
- PostgreSQL database integration

The project fulfills the requirements specified in the **FullStack Intern Coding Challenge**.

---

# 🚀 Features

## 👨‍💼 System Administrator

The System Administrator has full access to manage users, stores, and platform activities.

### Administrator Features

- Secure login
- Add new stores
- Add new normal users
- Add new administrator users
- View all registered users
- View all registered stores
- View store ratings
- View user details
- View store details
- Search and filter users
- Search and filter stores
- Monitor platform activity
- Sort listings in ascending/descending order
- Logout

### Administrator Dashboard

The dashboard displays:

- 👥 Total Number of Users
- 🏪 Total Number of Stores
- ⭐ Total Number of Submitted Ratings

### User Management

Administrators can view users with the following information:

| Field | Description |
|---|---|
| Name | User's name |
| Email | User's email |
| Address | User's address |
| Role | User's assigned role |

### User Filters

Users can be filtered based on:

- Name
- Email
- Address
- Role

---

# 👤 Normal User

Normal users can register on the platform and interact with registered stores.

### Normal User Features

- Create an account
- Login securely
- Logout
- Update password
- View all registered stores
- Search stores by name
- Search stores by address
- View overall store rating
- View their submitted rating
- Submit a rating
- Modify their submitted rating
- View previously submitted ratings

### Store Listing

Each store displays:

| Information | Description |
|---|---|
| Store Name | Name of the store |
| Address | Store address |
| Overall Rating | Average rating from all users |
| Your Rating | Rating submitted by the logged-in user |
| Submit Rating | Option to submit a rating |
| Modify Rating | Option to modify an existing rating |

---

# 🏪 Store Owner

Store Owners can view and monitor information related to their stores.

### Store Owner Features

- Secure login
- Update password
- View store details
- View users who submitted ratings
- View submitted ratings
- View average store rating
- Logout

### Store Owner Dashboard

The Store Owner dashboard provides:

- Store information
- List of users who rated the store
- Submitted ratings
- Average store rating

---

# ⭐ Rating System

The system allows Normal Users to provide ratings for registered stores.

Ratings are submitted on a scale from **1 to 5**.

## Rating Rules

- Minimum rating: **1**
- Maximum rating: **5**
- A user can submit only one rating per store
- Existing ratings can be updated
- Average ratings are calculated using all submitted ratings

### Example

```text
Ratings Submitted:

5
4
4
4

Average Rating:

4.25

# 🛠️ Tech Stack

The Store Rating Management System is built using a modern full-stack technology stack.

## 🎨 Frontend

### ⚛️ React.js
Used to build the interactive and component-based user interface.

### 🎨 Tailwind CSS
Used for styling the application and creating a responsive user interface.

### JavaScript
Used for implementing frontend functionality, API communication, state management, and user interactions.

---

## ⚙️ Backend

### 🟢 Node.js
Used as the JavaScript runtime environment for the backend.

### 🚂 Express.js
Used to build the backend server and RESTful APIs.

Express.js handles:

- API routing
- Authentication
- Authorization
- User management
- Store management
- Rating management
- Request and response handling

---

## 🗄️ Database

### 🐘 PostgreSQL
PostgreSQL is used as the relational database for storing and managing application data.

The database stores information related to:

- Users
- Stores
- Store Owners
- Ratings
- User-Store relationships

---

## 🔐 Authentication & Security

### 🔑 JWT (JSON Web Token)
JWT is used for authentication and maintaining secure user sessions.

It is also used to identify the logged-in user's role and provide access to protected resources.

### 🔒 bcrypt
bcrypt is used to securely hash user passwords before storing them in the database.

---

## 📦 Technology Summary

| Category | Technology | Purpose |
|---|---|---|
| Frontend | React.js | Building the user interface |
| Styling | Tailwind CSS | UI styling and responsive design |
| Programming Language | JavaScript | Application logic |
| Runtime | Node.js | Backend runtime environment |
| Backend | Express.js | REST API and server |
| Database | PostgreSQL | Data storage and management |
| Authentication | JWT | User authentication and authorization |
| Security | bcrypt | Password hashing |

---

## 🏗️ Technology Architecture

```text
┌─────────────────────────────────────┐
│             FRONTEND                │
│                                     │
│        React.js + JavaScript        │
│            Tailwind CSS             │
└──────────────────┬──────────────────┘
                   │
                   │ REST API
                   ▼
┌─────────────────────────────────────┐
│              BACKEND                │
│                                     │
│          Node.js + Express.js       │
│                                     │
│      ┌────────────────────────┐     │
│      │ JWT Authentication      │     │
│      └────────────────────────┘     │
│                                     │
│      ┌────────────────────────┐     │
│      │ Role-Based Access       │     │
│      │ Control                 │     │
│      └────────────────────────┘     │
│                                     │
│      ┌────────────────────────┐     │
│      │ bcrypt Password Hashing│     │
│      └────────────────────────┘     │
└──────────────────┬──────────────────┘
                   │
                   │ SQL Queries
                   ▼
┌─────────────────────────────────────┐
│             DATABASE                │
│                                     │
│             PostgreSQL              │
│                                     │
│     Users | Stores | Ratings        │
└─────────────────────────────────────┘

# 🔑 Role-Based Access Control

The application implements **Role-Based Access Control (RBAC)** to ensure that users can access only the features permitted for their assigned role.

The system supports three roles:

- 👨‍💼 **System Administrator**
- 👤 **Normal User**
- 🏪 **Store Owner**

| Feature | Administrator | Normal User | Store Owner |
|---|:---:|:---:|:---:|
| Login | ✅ | ✅ | ✅ |
| Registration | ❌ | ✅ | ❌ |
| Add Store | ✅ | ❌ | ❌ |
| Add Normal User | ✅ | ❌ | ❌ |
| Add Admin User | ✅ | ❌ | ❌ |
| View All Users | ✅ | ❌ | ❌ |
| View All Stores | ✅ | ✅ | ❌ |
| Search Users | ✅ | ❌ | ❌ |
| Search Stores | ✅ | ✅ | ❌ |
| Filter Users | ✅ | ❌ | ❌ |
| Sort Users | ✅ | ❌ | ❌ |
| Sort Stores | ✅ | ✅ | ❌ |
| Submit Rating | ❌ | ✅ | ❌ |
| Modify Rating | ❌ | ✅ | ❌ |
| View Submitted Ratings | ✅ | ✅ | ✅ |
| View Average Rating | ✅ | ✅ | ✅ |
| View Rated Users | ❌ | ❌ | ✅ |
| Update Password | ✅ | ✅ | ✅ |
| Logout | ✅ | ✅ | ✅ |

### 🔐 RBAC Flow

```text
                         ┌───────────────┐
                         │     Login     │
                         └───────┬───────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │ Authenticate  │
                         │   with JWT    │
                         └───────┬───────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │ Get User Role │
                         └───────┬───────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │    ADMIN     │ │ NORMAL USER  │ │ STORE OWNER  │
        └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
               │                │                │
               ▼                ▼                ▼
        Manage Users       View Stores      View Store
        Manage Stores      Submit Rating    Ratings
        View Dashboard     Modify Rating   Average Rating
