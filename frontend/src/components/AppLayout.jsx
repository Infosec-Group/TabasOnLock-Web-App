import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="min-h-screen px-4 py-2">
      <main className="">
        <Outlet />
      </main>
    </div>
  )
}