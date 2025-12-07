# API Documentation

Base URL: `http://localhost:5001/api`

---

## Authentication

### 1. Signup

**Endpoint:** `POST /auth/signup`  
**Auth:** ❌ Not required

**Request Body:**

```json
{
  "firstName": "Seeder",
  "lastName": "Customer",
  "email": "seeder@gmail.com",
  "phoneNumber": "1234567890",
  "password": "superhardpass",
  "confirmPassword": "superhardpass"
}
```

**Response (201 Created):**

```json
{
  "user": {
    "id": "6934fec8e441116c173df86f",
    "firstName": "Seeder",
    "lastName": "Customer",
    "email": "seeder@gmail.com",
    "phoneNumber": "1234567890"
  },
  "token": "JWT_TOKEN_HERE"
}
```

**Errors:**

- 400: Missing fields or passwords don’t match
- 400: Email already registered

---

### 2. Login

**Endpoint:** `POST /auth/login`  
**Auth:** ❌ Not required

**Request Body:**

```json
{
  "email": "seeder@gmail.com",
  "password": "superhardpass"
}
```

**Response (200 OK):**

```json
{
  "user": {
    "id": "6934fec8e441116c173df86f",
    "firstName": "Seeder",
    "lastName": "Customer",
    "email": "seeder@gmail.com",
    "phoneNumber": "1234567890"
  },
  "token": "JWT_TOKEN_HERE"
}
```

**Errors:**

- 400: Missing fields
- 401: Invalid email or password

---

## Customers

### 3. Get Customer by ID

**Endpoint:** `GET /customers/id/:customerId`  
**Auth:** ❌ Not required

**Response (200 OK):**

```json
{
  "id": "6934fec8e441116c173df86f",
  "firstName": "Seeder",
  "lastName": "Customer",
  "email": "seeder@gmail.com",
  "phoneNumber": "1234567890"
}
```

**Errors:**

- 404: Customer not found
- 500: Server error

---

## Bookings

> **All booking routes require authentication** (JWT token in `Authorization: Bearer <token>` header)

### 4. Create Booking

**Endpoint:** `POST /bookings/`  
**Auth:** ✅ Required

**Request Body:**

```json
{
  "date": "2025-12-06T16:00:00.000Z",
  "time": "12:49",
  "stylistId": "1"
}
```

**Response (201 Created):**

```json
{
  "id": "6935078dd698fdb147805daa",
  "date": "2025-12-06T16:00:00.000Z",
  "time": "12:49",
  "customer": {
    "id": "6934fec8e441116c173df86f",
    "firstName": "Seeder",
    "lastName": "Customer",
    "email": "seeder@gmail.com"
  },
  "stylistId": "1",
  "createdAt": "2025-12-07T04:50:21.428Z",
  "updatedAt": "2025-12-07T04:50:21.428Z"
}
```

**Errors:**

- 409: Booking conflict (stylist already booked at that time)

---

### 5. Get Customer Bookings

**Endpoint:** `GET /bookings/customer/:customerId`  
**Auth:** ✅ Required

**Response (200 OK):**

```json
[
  {
    "id": "6935078dd698fdb147805daa",
    "date": "2025-12-06T16:00:00.000Z",
    "time": "12:49",
    "customer": {
      "id": "6934fec8e441116c173df86f",
      "firstName": "Seeder",
      "lastName": "Customer",
      "email": "seeder@gmail.com"
    },
    "stylistId": "1"
  }
]
```

---

### 6. Update Booking

**Endpoint:** `PUT /bookings/:bookingId`  
**Auth:** ✅ Required

**Request Body:** (any fields to update, e.g., `date`, `time`, `stylistId`)

```json
{
  "time": "13:00"
}
```

**Response (200 OK):**

```json
{
  "id": "6935078dd698fdb147805daa",
  "date": "2025-12-06T16:00:00.000Z",
  "time": "13:00",
  "customerId": "6934fec8e441116c173df86f",
  "stylistId": "1"
}
```

**Errors:**

- 404: Booking not found
- 403: Not authorized to update booking

---

### 7. Delete Booking

**Endpoint:** `DELETE /bookings/:bookingId`  
**Auth:** ✅ Required

**Response (200 OK):**

```json
{
  "message": "Booking deleted successfully"
}
```

**Errors:**

- 404: Booking not found
- 403: Not authorized to delete booking

## Env

```env
# Change the credentials in the docker-compose.yml and put them here also
MONGO_URI=mongodb://<username>:<password>@localhost:27017/<database>

JWT_SECRET=

CORS_ORIGIN=http://localhost:3000

PORT=5000
```

## Running

Start MongoDB:
`docker compose up -d`

Seed test user (optional):
`node seeder.js`

```
email: seeder@gmail.com
password: superhardpass
```
