# Employee Leave & Attendance Management System (ELAMS)

## Project Overview

The Employee Leave & Attendance Management System (ELAMS) is a streamlined, full-stack HR application designed to simplify workforce management. It provides a secure, role-based platform where employees can seamlessly log daily attendance, apply for various types of leave, and track their remaining balances. For HR administrators, it serves as a centralized dashboard to monitor daily workforce presence, review employee directories, and efficiently approve or reject pending leave requests.

## Tech Stack & Justification

**Frontend:** React.js was chosen for its component-driven architecture, which makes building dynamic dashboards fast and maintainable. Tailwind CSS was utilized to rapidly implement a highly responsive, modern "glassmorphism" aesthetic without the overhead of custom CSS files.

**Backend:** Node.js with Express.js provides a lightweight, highly scalable environment for building our RESTful API. Its asynchronous nature is perfectly suited for handling multiple I/O operations like database queries.

**Database:** MongoDB (via Mongoose) was selected for its flexible schema design, allowing us to easily link User, Leave, and Attendance documents using references.

**Authentication & Security:** JSON Web Tokens (JWT) combined with Bcrypt.js ensure secure, stateless user authentication and safe password hashing.

## Installation Steps

Follow these steps to run the application locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/karthik-j-nair/employee-leave-and-attendance-manager.git
    cd employee-leave-and-attendance-manager
    ```

2. Install Backend Dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Install Frontend Dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

4. Set up Environment Variables:
    Create a `.env` file in the `backend` directory (refer to the Environment Variables section below).

5. Start the Application:
    Open two terminal windows.
    - Terminal 1 (Backend): 
      ```bash
      cd backend && npm run dev
      ```
    - Terminal 2 (Frontend): 
      ```bash
      cd frontend && npm run dev
      ```

## Environment Variables

To run this project, you will need to add the following environment variables to your `backend/.env` file:
- `MONGO_URI` - The connection string for your MongoDB database.
- `JWT_SECRET` - A secure, random string used to sign and verify JSON Web Tokens.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new employee account.
- `POST /api/auth/login` - Authenticate a user and return a JWT.

### Users (Role-Based Access)
- `GET /api/users/me` - Fetch the currently logged-in user's profile and leave balance (Employee/Admin).
- `GET /api/users` - Fetch the directory of all employees (Admin only).

### Leave Management
- `POST /api/leaves` - Submit a new leave request (Employee).
- `GET /api/leaves/my-leaves` - View personal leave history (Employee).
- `PATCH /api/leaves/:id` - Edit or cancel a pending leave request (Employee).
- `GET /api/leaves` - View all leave requests across the company (Admin only).
- `PATCH /api/leaves/:id/status` - Approve or reject a leave request (Admin only).

### Attendance
- `POST /api/attendance` - Mark daily attendance (Employee).
- `GET /api/attendance/my-attendance` - View personal attendance logs (Employee).
- `GET /api/attendance` - View all employee attendance records (Admin only).

## Database Models

- **User Model:** Stores employee details including `fullName`, `email`, hashed `password`, `role` (Enum: Employee, Admin), `dateOfJoining`, and an auto-tracked `leaveBalance` (defaults to 20).
- **Leave Model:** Contains a reference to the User (`employeeId`), along with `leaveType`, `startDate`, `endDate`, an auto-calculated `totalDays`, `reason`, and `status` (Pending, Approved, Rejected).
- **Attendance Model:** Links to the User (`employeeId`) and records the `date` and `status` (Present, Absent). The system enforces a unique compound index on `employeeId` and `date` to prevent duplicate daily entries.

## Admin Credentials

For evaluation purposes, the Admin account must be seeded into the database manually prior to launch. You can log in to the Admin Dashboard using the following credentials:
- Email: admin@admin.com
- Password: 123456

## AI Tools Declaration

In the spirit of transparency, the following AI tools were responsibly utilized during the development of this project:
- **GitHub Copilot:** Used as an intelligent autocomplete assistant to speed up the writing of repetitive boilerplate code, standard CRUD routes, and basic component structures.
- **Stitch AI:** Utilized to conceptualize and generate the initial frontend UI/UX design, specifically helping to establish the modern glassmorphism aesthetic and responsive Tailwind CSS layouts.
- **ChatGPT:** Acted as an interactive debugging partner. It was used to troubleshoot specific backend routing errors.

## Known Limitations

- **Time Zone Handling:** Currently, attendance dates are logged based on the server's local time, which may cause discrepancies if employees are distributed across multiple global time zones.
- **No Geolocation:** Employees can mark their attendance from any network; there is no IP or geofencing restriction to ensure they are physically at the office.
- **Automated Balance Resets:** The system does not currently feature a cron job to automatically reset the 20-day `leaveBalance` at the start of a new calendar year.

## Time Spent

Approximate Time Spent: 18 - 22 Hours (Spanning database design, API development, UI/UX implementation, and testing).