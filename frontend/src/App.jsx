import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import StylistSelection from "./pages/StylistSelection";
import AppLayout from "./components/AppLayout";
import BookReservation from "./pages/BookReservation";
import UserInformation from "./pages/UserInformation";
import BookingSuccess from "./pages/BookingSuccess";
import ReservationDashboard from "./pages/ReservationDashboard";

export default function App() {
  const router = createBrowserRouter([
    { index: true, element: <MainPage /> },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "stylists", element: <StylistSelection /> },
        { path: "booking", element: <UserInformation /> },
        { path: "reservation", element: <BookReservation /> },
        { path: "success", element: <BookingSuccess /> },
        { path: "my-reservation", element: <ReservationDashboard /> }
      ]
    },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
