import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import StylistSelection from "./pages/StylistSelection";
import AppLayout from "./components/AppLayout";
import BookingPage from "./pages/BookingPage";

export default function App() {
  const router = createBrowserRouter([
    { index: true, element: <MainPage /> },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "stylists", element: <StylistSelection /> },
        { path: "booking", element: <BookingPage /> },
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
