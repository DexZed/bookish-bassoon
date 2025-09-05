import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import ReceiverLayout from "./layouts/ReceiverLayout";
import SenderLayout from "./layouts/SenderLayout";
import App from "./App";
import Skeleton from "./components/Skeleton";
import Private from "./components/Private";
import UpdateStatus from "./pages/Admin/UpdateStatus";
import Status from "./pages/Sender/Status";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Features = lazy(() => import("./pages/Features"));
const FAQ = lazy(() => import("./pages/FAQ"));

const Register = lazy(() => import("./pages/Register"));
const SearchParcels = lazy(() => import("./pages/SearchParcels"));
const CreateParcel = lazy(() => import("./pages/Sender/CreateParcel"));
const Parcels = lazy(() => import("./pages/Sender/Parcels"));

const IncomingParcels = lazy(() => import("./pages/Receiver/Incoming"));
const DeliveryHistory = lazy(() => import("./pages/Receiver/History"));

const ManageUsers = lazy(() => import("./pages/Admin/Users"));
const ManageParcels = lazy(() => import("./pages/Admin/AllParcels"));

const NotFound = lazy(() => import("./pages/ErrorPage"));
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Skeleton />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Skeleton />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Skeleton />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Skeleton />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Skeleton />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<Skeleton />}>
            <SearchParcels />
          </Suspense>
        ),
      },
      {
        path: "features",
        element: (
          <Suspense fallback={<Skeleton />}>
            <Features />
          </Suspense>
        ),
      },
      {
        path: "faq",
        element: (
          <Suspense fallback={<Skeleton />}>
            <FAQ />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/sender",
    element: (
      <Private allowedRoles={["sender"]}>
        <SenderLayout />
      </Private>
    ),
    children: [
      {
        path: "create",
        element: (
          <Suspense fallback={<Skeleton />}>
            <CreateParcel />
          </Suspense>
        ),
      },
      {
        path: "parcels",
        element: (
          <Suspense fallback={<Skeleton />}>
            <Parcels />
          </Suspense>
        ),
      },
      {
        path: "status/:parcelId",
        element: (
          <Suspense fallback={<Skeleton />}>
            <Status />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/receiver",
    element: (
      <Private allowedRoles={["receiver"]}>
        <ReceiverLayout />
      </Private>
    ),
    children: [
      {
        path: "incoming",
        element: (
          <Suspense fallback={<Skeleton />}>
            <IncomingParcels />
          </Suspense>
        ),
      },
      {
        path: "history",
        element: (
          <Suspense fallback={<Skeleton />}>
            <DeliveryHistory />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Private featureFlag={false} allowedRoles={["admin"]}>
        <AdminLayout />
      </Private>
    ),
    children: [
      {
        path: "users",
        element: (
          <Suspense fallback={<Skeleton />}>
            <ManageUsers />
          </Suspense>
        ),
      },
      {
        path: "parcels",
        element: (
          <Suspense fallback={<Skeleton />}>
            <ManageParcels />
          </Suspense>
        ),
      },
      {
        path: "status/:parcelId",
        element: (
          <Suspense fallback={<Skeleton />}>
            <UpdateStatus />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Skeleton />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default AppRouter;
