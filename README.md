# ⭐ Store Rating Management System

A full-stack **Store Rating Management System** that allows users to view registered stores, submit ratings from **1 to 5**, and manage their submitted ratings.

The application implements a **single login system with Role-Based Access Control (RBAC)** for three different roles:

- 👨‍💼 System Administrator
- 👤 Normal User
- 🏪 Store Owner

---

## 📌 Project Overview

The Store Rating Management System is a web-based application developed using **React.js, Node.js, Express.js, PostgreSQL, and Tailwind CSS**.

The system allows administrators to manage users and stores, normal users to register and rate stores, and store owners to monitor ratings and feedback for their stores.

The application includes secure authentication, authorization, form validation, store management, user management, rating management, search, sorting, and responsive UI.

---

# ✨ Features

## 👨‍💼 System Administrator

The Administrator has complete access to manage users, stores, and platform activities.

### Features

- Login securely
- Add new stores
- Add normal users
- Add admin users
- View all users
- View all stores
- View store ratings
- Search users
- Filter users
- Search stores
- View user details
- View store details
- View platform statistics
- Sort tables
- Logout

### Dashboard

The Administrator dashboard displays:

- Total number of users
- Total number of stores
- Total number of submitted ratings

---

## 👤 Normal User

Normal users can register on the platform and submit ratings for stores.

### Features

- Register an account
- Login
- Logout
- Update password
- View all registered stores
- Search stores by name
- Search stores by address
- View overall store rating
- View personal submitted rating
- Submit a rating
- Modify submitted rating

### Store Information

Each store displays:

- Store Name
- Address
- Overall Rating
- User's Submitted Rating
- Submit Rating option
- Modify Rating option

---

## 🏪 Store Owner

Store Owners can monitor ratings submitted for their stores.

### Features

- Login securely
- Update password
- View store information
- View users who submitted ratings
- View submitted ratings
- View average store rating
- Logout

---

# ⭐ Rating System

Users can submit ratings between **1 and 5**.

### Rating Rules

- Minimum rating: `1`
- Maximum rating: `5`
- One user can submit only one rating for a store
- Existing ratings can be modified
- Average rating is calculated from submitted ratings

### Example

```text
Ratings:

5
4
4
4

Average Rating = 4.25
