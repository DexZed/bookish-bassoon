
# 📦 Parcel Xpress

---

## 🚀 Project Overview

Parcel Xpress is a **secure, role-based, and user-friendly** frontend application for a **Parcel Delivery System** (inspired by Pathao Courier or Sundarban).  

It allows **Senders**, **Receivers**, and **Admins** to seamlessly manage deliveries, track parcels, and monitor the logistics process.  

Built with **React**, **Redux Toolkit**, and **RTK Query**, it ensures smooth state management, real-time API integration, and a responsive design.

---

## 🛠 Tech Stack

**Frontend**
- React (with React Router)
- Redux Toolkit & RTK Query
- TypeScript
- Tailwind CSS

**Backend (API consumed)**
- Node.js / Express
- MongoDB / Mongoose
- JWT + bcrypt (Authentication & Security)

---
## 📌 Features

### Public Section
- **Landing Page** with service details  
- **About Page** – mission & service info  
- **Contact Page** – inquiry form (simulated)  

### Authentication
- JWT-based **login & registration**  
- Role selection (**Sender** or **Receiver**)  
- Role-based redirects  
- Persisted auth state  
- Logout functionality  

### Sender Dashboard
- Create new parcel requests  
- Cancel parcels (if not dispatched)  
- Track all created parcels  

### Receiver Dashboard
- View incoming parcels  
- Confirm delivery  
- Access delivery history  

### Admin Dashboard
- Manage all users (block/unblock)  
- Manage all parcels (update, block/unblock)  
- Assign delivery personnel (optional)  

### Parcel Tracking
- Unique **tracking ID** per parcel  
- Search parcels publicly or with login  
- Status logs (status, timestamp, updatedBy, notes)  

### General Features
- Role-based navigation  
- Loading indicators & global error handling  
- Form validation + advanced filtering  
- Pagination for long lists  
- Toast notifications for feedback  
- **Data visualization dashboard**  
  - Overview cards (delivered, in transit, pending, cancelled)  
  - Charts (bar/pie for trends & status)  
  - Parcel timeline with status updates  
  - Searchable, paginated parcel tables  

### UI/UX Considerations
- Fully responsive design  
- Consistent spacing, typography, and color contrast  
- Lazy loading & skeleton loaders  
- Professional presentation with real-looking data  

---
## ⚡ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/DexZed/bookish-bassoon.git
cd assignment-6
```
### 2. Install Dependencies
```bash
npm install

```
### 3. Environment Variables
Create a .env file in the root directory and configure:
```bash
VITE_API_BASE_URL=VITE_BASE_URL=https://bookish-bassoon.onrender.com

```
### 4. Run the Project

```bash
npm run dev

```
### 5. Build for Production

```bash
npm run build

```
## Demo

🔗 https://parcel-express.web.app/


## 📒 Notes

- This project requires the Parcel Delivery API (backend) to function.

- Designed to be extendable with role-specific dashboards.

- Authentication uses JWT stored in localStorage with refresh handling.

- Optimized for scalability with modular Redux slices and API services.

