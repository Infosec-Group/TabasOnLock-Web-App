# TabasOnLock  
A full-stack barber shop scheduling and reservation system built with **React**, **Node.js**, **Express**, and **MongoDB**. Also know as **MERN** stack.

Originally developed as a school activity for CTINASSL – Information Assurance and Security, this project demonstrates secure appointment handling, basic user interactions, and clean UI design.

---

## Features

### **User Management**
- Secure user authentication (JWT-based)
- User registration and login
- Protected routes and authorization
- Email validation

### **Booking System**
- Appointment scheduling with date & time picker
- Barber/stylist selection
- Customer information management
- Booking confirmation
- Reschedule cancelled appointments
- Cancel bookings
- Delete cancelled bookings
- View booking history

### **UI/UX**
- Fully responsive design
- Modern and clean interface
- Dark mode support (via next-themes)
- Smooth animations and transitions
- Toast notifications for user feedback
- Form validation with error messages

### **Security**
- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration

---

## Tech Stack

### **Frontend** 
- **React 19** — Modern UI library
- **React Router DOM 7** — Client-side routing
- **TailwindCSS 4** — Utility-first CSS framework
- **Lucide React** — Beautiful icon library
- **Shadcn/ui** — Re-usable component library
- **React Hook Form** — Performant form management
- **Yup** — Schema validation
- **TanStack React Query** — Server state management & caching
- **Zustand** — Lightweight state management
- **date-fns** — Date utility library
- **Sonner** — Toast notifications
- **Vite (Rolldown)** — Fast build tool  

### **Backend**
- **Node.js** — JavaScript runtime
- **Express.js 5** — Web application framework
- **MongoDB** — NoSQL database
- **Mongoose 9** — MongoDB object modeling
- **JWT (jsonwebtoken)** — Authentication tokens
- **bcryptjs** — Password hashing
- **CORS** — Cross-origin resource sharing
- **dotenv** — Environment variable management

### **Dev Tools**
- **ESLint 9** — Code linting
- **Nodemon** — Auto-restart development server
- **PostCSS** — CSS processing
- **tw-animate-css** — Tailwind animation utilities

---

## Project Structure

```
TabasOnLock-Web-App/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature-based modules
│   │   │   ├── auth/         # Authentication components
│   │   │   └── bookings/     # Booking components & API
│   │   ├── lib/              # Utility libraries
│   │   ├── pages/            # Page components
│   │   ├── stores/           # Zustand state stores
│   │   ├── config/           # Configuration files
│   │   ├── mock/             # Mock data
│   │   └── utils/            # Helper functions
│   └── package.json
│
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Mongoose models
│   │   └── routes/           # API routes
│   ├── app.js                # Express app entry point
│   └── package.json
|
├── DOCS.md                   # For docker setup
|
└── README.md
```

---

## Installation

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### **1. Clone the repository**

```bash

git clone https://github.com/Infosec-Group/TabasOnLock-Web-App.git
cd TabasOnLock-Web-App
cd frontend
```

### **2. Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
MONGO_URI=mongodb://<MONGO_USER>:<MONGO_PASS>@localhost:27017/tabas-booking?authSource=admin
JWT_SECRET=your_super_secret_jwt_key_here
CORS_ORIGIN=http://localhost:5173
PORT=8080

# MongoDB Credentials
MONGO_USER=your_mongo_user
MONGO_PASS=your_mongo_password
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:8080`

### **3. Frontend Setup**

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8080/api
```

Start the frontend development server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

---

## API Endpoints

### **Authentication**
- `POST /api/auth/signup` — Register new user
- `POST /api/auth/login` — Login user
- `GET /api/auth/me` — Get current user (protected)

### **Bookings**
- `POST /api/bookings` — Create new booking (protected)
- `GET /api/bookings/customer/:customerId` — Get customer bookings (protected)
- `PATCH /api/bookings/:bookingId/cancel` — Cancel booking (protected)
- `PATCH /api/bookings/:bookingId/reschedule` — Reschedule booking (protected)
- `DELETE /api/bookings/:bookingId` — Delete booking (protected)

### **Customers**
- `GET /api/customers/id/:customerId` — Get customer by ID

---

## Environment Variables

### **Backend (.env)**
| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/tabas-booking` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |
| `PORT` | Backend server port | `8080` |
| `MONGO_USER` | MongoDB username | `admin` |
| `MONGO_PASS` | MongoDB password | `password123` |

### **Frontend (.env)**
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080/api` |

---

## Usage

1. **Register/Login** — Create an account or login with existing credentials
2. **Select Stylist** — Choose your preferred barber from the available options
3. **Enter Details** — Provide customer information (can book for someone else)
4. **Pick Date & Time** — Select available date and time slot
5. **Confirm Booking** — Review and confirm your appointment
6. **Manage Bookings** — View, cancel, reschedule, or delete your reservations

---

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT-based authentication
- Protected API routes with middleware
- Input validation (Yup schemas)
- CORS configuration
- Secure HTTP headers
- Phone number format validation (Philippine format)
- Email validation

---

## Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

### **Development Guidelines**
1. Follow the existing code structure
2. Write clean, commented code
3. Test your changes before submitting
4. Update documentation if needed

---

## License

This project is for educational purposes only.  
You may modify and reuse the code freely for personal or school use.

---

## Acknowledgments

Developed by the following members for Information Assurance and Security course:

### **Team Members**
- [Chris Lawrence De Vera](https://github.com/xRomory)
- [Carl Benson Billones](https://github.com/qwerty1017)
- [Luis Ryan Sanisit](https://github.com/Yisaaaa)
- [Emil John Llanes](https://github.com/0CottonBuds)
- [Danielle Joseph Octaviano](https://github.com/OkktaDan)

---