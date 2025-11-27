import ProgressBar from "@/components/ProgressBar";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookingStore } from "@/stores/useBookingStore";
import { CalendarIcon, Clock } from "lucide-react";
import { useEffect } from "react";

export default function BookReservation() {
  const setCurrentStep = useBookingStore((state) => state.setCurrentStep);

  useEffect(() => {
    setCurrentStep(2)
  }, [setCurrentStep]);

  return (
    <div className="max-w-7xl mx-auto">
      <ProgressBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side - Date and Time Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center font-rubik">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar 
                mode="single"
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center font-rubik">
                <Clock className="w-5 h-5 mr-2" />
                Available Time Slots
              </CardTitle>
            </CardHeader>
            <CardContent>
              
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
