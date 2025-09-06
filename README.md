# NestJS-Pagination

## Project Description
A web application demonstrating robust, scalable pagination across a client–server stack. The frontend (React + TypeScript + MUI) communicates with a backend (NestJS + TypeScript) that exposes paginated, sortable, and searchable data from a MySQL database using Sequelize. The app ensures predictable results and efficient data loading with clear UX states.

### Core Concept
Users browse a large dataset in a table with pagination controls. The backend enforces parameters (page, limit, sortBy, order, search) and returns both the data slice and metadata (total and totalPages). The codebase is organized with DTOs, validation, and environment-driven configuration.

### Pagination Features
- Page-based pagination with adjustable page size (limit)
- Sorting by selectable columns in ascending or descending order
- Search box as a core feature to filter results by keyword
- Stable sorting to avoid inconsistent ordering across pages
- Response metadata: total, page, limit, totalPages
- Type-safe DTOs and validation on both client and server

## Technologies Used
- Frontend: React, TypeScript, MUI, CSS
- Backend: NestJS, TypeScript
- Database: MySQL
- ORM: Sequelize
- Tooling: dotenv, ts-node

## How to Run the Project

### Prerequisites
- Node.js (v18.x or higher recommended)
- MySQL (local instance)
- A MySQL user with privileges for the app database
- Environment variables are already configured in the project

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/divanshu-thakur/NestJS-Pagination.git
   cd NestJS-Pagination
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```
   
3. **Initialize the database schema:**
- Ensure the database exists and credentials in the existing environment configuration match your MySQL setup.
- Run the app once to allow the ORM to sync the schema as configured.

4. **Run the server:**
   ```bash
   npm run start:dev
   ```
   The server runs at http://localhost:8000.

5. **Install client dependencies:**
   Open a new terminal window/tab and navigate to the client directory:
   ```bash
   cd NestJS-Pagination
   cd client
   npm install
   ```

7. **Run the client:**
    ```bash
    npm start
    ```
    The client runs at http://localhost:3000.

### Data Setup
- No manual seed step required. Initial data creation happens automatically on the first run.

## Usage
1. Open http://localhost:3000
2. Use the search box above the table to filter results by keyword, then click the Search button to apply it.
3. Navigate across pages with the pagination controls and modify the page size (limit).
4. Click table headers to toggle sorting (asc/desc) by supported columns.
5. View total results and current page information alongside the table.

## API Endpoints
- GET /users
 - Query params:
  - page: number (default 1)
  - limit: number (default 10)
  - sortBy: string (e.g., name, createdAt)
  - order: asc | desc (default asc)
  - search: string keyword (used by the search feature)
- Response:
 ```
 {
   "data": [ /* array of items */ ],
   "meta": {
     "total": 1234,
     "page": 1,
     "limit": 10,
     "totalPages": 124
   }
 }
 ```

- POST /users
- POST /users/bulk

## Example Requests
- Page 2, 25 per page, sorted by createdAt desc:
  ```
  GET /users?searchBy=&sortBy=createdAt&order=DESC&page=2&limit=25
  ```
- First page, search “john”, sorted by name asc:
  ```
  GET /users?searchBy=john&sortBy=name&order=ASC&page=1&limit=10
  ```

## Frontend Highlights
- React + TypeScript with MUI components for consistent UI/UX
- Table supports:
  - Server-driven pagination (page, limit)
  - Sorting by column with direction indicators
  - A dedicated search box that applies filters only when the Search button is clicked
- Clear states: loading, empty, and error notifications

## Backend Highlights
- NestJS modular structure with Controllers, Services, and DTOs
- Sequelize ORM with MySQL for relational data and performant queries
- Validation of query params (page, limit, sortBy, order, search)
