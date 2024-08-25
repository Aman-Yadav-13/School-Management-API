# School Management API

This project is a full-stack School Management API that allows users to add schools with attributes such as name, address, longitude, and latitude. The data is stored in a MySQL database. Additionally, users can list schools based on their location, either by entering coordinates manually or by using their current location. The list of schools is sorted by distance in ascending order from the given coordinates.

## Features

- **Add Schools:** Allows users to add school details (name, address, longitude, latitude) which are stored in a MySQL database.
- **List Schools:** Users can search for schools by entering longitude and latitude or using their current location. The schools are listed in ascending order of distance from the user's location.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Hosted on freesqldatabase.com)
- **Frontend Deployment:** Vercel
- **Backend Deployment:** Render

## Project Structure

```
├── client                   # React frontend
│   ├── src
│   │   ├── components       # React components
│   │   ├── utils       
│   │   ├── script.js           # Main app component
│   │   └── index.html        # Entry point for React app
│   │   └── style.css
├── server                   # Express backendrequests
│   └── server.js               # Entry point for backend server
├── README.md
└── .gitignore
```

# API Endpoints

## 1. Add School

- **URL:** `/addSchool`
- **Method:** `POST`
- **Description:** Adds a new school to the database.

## 2. List Schools

- **URL:** `/listSchools`
- **Method:** `GET`
- **Description:** Lists schools sorted by distance from the provided coordinates.
- **Request Parameters:**
  - `latitude` (float) - User's latitude
  - `longitude` (float) - User's longitude
