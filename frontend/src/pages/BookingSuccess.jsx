import ProgressBar from "@/components/ProgressBar";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function BookingSuccess() {
  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar />

      <Card className="mt-8 bg-background">
        <CardContent className="text-center py-12">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold font-rubik mb-4 text-primary-foreground">Booking Successful!</h1>
            <p className="text-xl text-secondary-foreground mb-8">
              Your appointment has been confirmed. See Reservation Section to view your appointment details.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
