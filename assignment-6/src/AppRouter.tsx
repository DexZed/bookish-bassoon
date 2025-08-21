import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import ReceiverLayout from "./layouts/ReceiverLayout";
import SenderLayout from "./layouts/SenderLayout";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const CreateParcel = lazy(() => import("./pages/Sender/CreateParcel"));
const Parcels = lazy(() => import("./pages/Sender/Parcels"));

const IncomingParcels = lazy(() => import("./pages/Receiver/IncomingParcels"));
const DeliveryHistory = lazy(() => import("./pages/Receiver/DeliveryHistory"));

const ManageUsers = lazy(() => import("./pages/Admin/ManageUsers"));
const ManageParcels = lazy(() => import("./pages/Admin/ManageParcels"));

const Tracking = lazy(() => import("./pages/Tracking"));

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/about",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
      ),
    },
    {
      path: "/contact",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      ),
    },

    {
      path: "/login",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "/logout",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Logout />
        </Suspense>
      ),
    },

    {
      path: "/sender",
      element: <SenderLayout />,
      children: [
        {
          path: "create",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CreateParcel />
            </Suspense>
          ),
        },
        {
          path: "parcels",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Parcels />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/receiver",
      element: <ReceiverLayout />,
      children: [
        {
          path: "incoming",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <IncomingParcels />
            </Suspense>
          ),
        },
        {
          path: "history",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <DeliveryHistory />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "users",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ManageUsers />
            </Suspense>
          ),
        },
        {
          path: "parcels",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ManageParcels />
            </Suspense>
          ),
        },
      ],
    },

    {
      path: "/tracking/:trackingId",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Tracking />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
