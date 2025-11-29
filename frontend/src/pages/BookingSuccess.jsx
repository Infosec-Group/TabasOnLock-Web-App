import { useNavigate } from "react-router";
import { paths } from "@/config/paths";
import { useBookingStore } from "@/stores/useBookingStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";
import { Calendar, CheckCircle, Home } from "lucide-react";
import { formatDate } from "@/utils/utils";

export default function BookingSuccess() {
  const navigate = useNavigate();

  const {
    selectedStylist,
    selectedDate,
    selectedTime,
    userInfo,
  } = useBookingStore();

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar />

      <Card className="mt-8 bg-card border-primary">
        <CardContent className="text-center py-12">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold font-rubik mb-4 text-dark-fg">Booking Successful!</h1>
            <p className="text-xl text-dark-secondary-fg mb-8">
              Your appointment has been confirmed. See Reservation Section to view your appointment details.
            </p>
          </div>

          {/* Booking Summary */}
          <div className="max-w-md mx-auto mb-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-dark-fg mb-4">Appointment Summary</h3>
              <div className="space-y-2 text-sm text-dark-secondary-fg">
                <div className="flex justify-between">
                  <span>Stylist:</span>
                  <span className="font-medium">{selectedStylist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{selectedStylist.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="font-medium">{userInfo?.first_name} {userInfo?.last_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-medium">₱{selectedStylist.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-4 bg-accent border border-primary rounded-lg max-w-md mx-auto">
            <p className="text-sm text-dark-secondary-fg">
              <strong>What's next?</strong> You'll receive a confirmation email shortly.
              Please arrive 10 minutes early for your appointment.
            </p>
          </div>

          {/* Action Buttons */}
          <div className=" mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              onClick={() => navigate(paths.app.reservationList.getHref())}
              className="flex items-center justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              View My Reservations
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(paths.home.getHref())}
              className="flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
