import { UserInformationForm } from "../components/UserInformationForm";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "../components/ui/card";
import ProgressBar from "../components/ProgressBar";
import StylistInfoPanel from "../components/StylistInfoPanel";
import { useBookingStore } from "@/stores/useBookingStore";
import { useEffect } from "react";

export default function UserInformation() {
  const setCurrentStep = useBookingStore((state) => state.setCurrentStep);

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  return (
    <div className="max-w-6xl mx-auto">
      <ProgressBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Left Side - Customer Information Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-rubik">Your Information</CardTitle>
              <p className="text-dark-secondary-fg">Please provide your contact details to proceed with booking</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <UserInformationForm />
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Stylist Information */}
        <StylistInfoPanel />
      </div>
    </div>
  )
}
