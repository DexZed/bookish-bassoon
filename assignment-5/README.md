# 📌 ParcelXpress

Modular, Secure Parcel Delivery Backend

## 🔧 TECH STACK

- **Node.js + Express.js (TypeScript)**

- **MongoDB + Mongoose**

- **JWT Authentication**

- **Bcrypt for password hashing**

- **Role-based Access Middleware**

- **dotenv / Helmet / CORS (Security best practices)**

## 🎭 USER ROLES & PERMISSIONS

| Role       | Permissions                                                          |
| ---------- | -------------------------------------------------------------------- |
| `sender`   | Create/cancel/view parcels, view status log                          |
| `receiver` | View incoming parcels, confirm delivery, view delivery history       |
| `admin`    | Manage users/parcels, update status, block/unblock, assign personnel |

## 📦 DATA MODELS (Mongoose Schemas)

### 1. User

```typescript
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "sender" | "receiver";
  isBlocked: boolean;
  createdAt: Date;
}
```

### 2. Parcel

```typescript
interface IStatusLog {
  status:
    | "Requested"
    | "Approved"
    | "Dispatched"
    | "In Transit"
    | "Delivered"
    | "Cancelled"
    | "Returned";
  location?: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IParcel {
  trackingId: string;
  sender: ObjectId;
  receiver: ObjectId;
  type: "Document" | "Box" | "Fragile" | "Other";
  weight: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  statusLogs: IStatusLog[];
  fee: number;
  deliveryDate: Date;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔐 AUTHENTICATION & AUTHORIZATION

- JWT Token-based authentication

- Token expiration: 1h

- Passwords hashed using bcrypt

## 📦 PARCEL LOGIC

- Creation: Only senders can create parcels

- Cancellation: Allowed only if status is `Requested` or `Approved`

- Delivery Confirmation: Only receiver can mark as `Delivered` if `In Transit`

- Tracking ID: Auto-generated on creation, format: TRK-YYYYMMDD-xxxxxx

## 🔁 STATUS LOG STRUCTURE

```typescript
statusLogs: [
  {
    status: 'Requested',
    location: 'Dhaka',
    note: 'Parcel created',
    createdAt: ISODate
    updatedAt: ISODate
  }
]

```

- New status entries are pushed via admin actions or system events

- Viewable by sender, receiver, and admin

- Only admins can manually edit/update status

## 🧱 VALIDATIONS & RULES

- 🚫 Blocked users can’t log in or perform actions

- 🚫 Senders can’t cancel parcels after dispatch

- 🚫 Receivers can’t confirm delivery unless status is `In Transit`

- ✅ Role-based visibility:

- Sender: only own parcels

- Receiver: only incoming parcels

- Admin: all

- 🚫 No deletions, only status updates (logical soft deletions)

- ✋ Each parcel must have unique `trackingId`

## 🔗 API ENDPOINTS

### 🔐 Auth - Applies to all user type

- `POST /auth/register`

- `POST /auth/login`

- `POST /auth/logout`

- `GET /auth/:email`

### 👤 Users (Admin-only)

- `GET /users` – list all users

- `PATCH /users/block/:id` – block user

- `PATCH /users/unblock/:id` – unblock user

### 📦 Parcels

### Sender-only - `/parcel/sender`

- `POST /` – create parcel

- `GET /:id` – view own parcels

- `PATCH /cancel/:id` – cancel own parcel

- `GET /status/:id` – view parcel status

### Receiver-only `/parcel/receiver`


- `GET /:id` – parcels addressed to receiver

- `PATCH /confirm/:id` – mark as delivered

- `GET /history` – past received parcels

### Admin-only `/parcel/admin`

- `GET /` – all parcels, filter by status/date

- `PATCH /status-log/:id` – update status

- `PATCH /block/:id` – block parcel

- `PATCH /unblock/:id` – unblock parcel

### Public

- `GET /track/:trackingId` – public tracking

## 🔁 TRACKING & SEARCH

### Search parcels by: 
ex - `GET /parcel/search?trackingId=<value>&startdate=<value>&endDate=<value>&sender=<value>&receiver=<value>`

- Tracking ID

- Status

- Sender/Receiver ID

- Public tracking endpoint for anonymous users

## 🧨 ERROR HANDLING

All errors standardized via a custom Error middleware

Error format:

```json
{
 "statusCode": 404,
 "timestamp": "2025-08-02T14:17:11.026Z",
 "path":"/asd"
 "message":"Route /asd not found"
}

```
