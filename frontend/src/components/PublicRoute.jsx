import { useUser } from "@/lib/auth"
import PageLoader from "./PageLoader";
import { Navigate } from "react-router";

export default function PublicRoute({ children }) {
  const { data: user, isLoading } = useUser();

  if(isLoading) return <PageLoader />;
  if(user) return <Navigate to="/tabas" replace />;

  return children;
}