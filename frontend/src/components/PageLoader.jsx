import { LoaderPinwheel } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <LoaderPinwheel className="animate-spin w-12 h-12" />
    </div>
  );
}