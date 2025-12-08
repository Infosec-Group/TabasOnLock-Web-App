import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate, getAvailableSlots } from "@/utils/utils";
import { paths } from "@/config/paths";
import { useUser } from "@/lib/auth";
import {
  useCreateBooking,
  useRescheduleBooking,
} from "@/features/bookings/api/bookingApi";
import { toast } from "sonner";
import { useBookingStore } from "@/stores/useBookingStore";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import StylistInfoPanel from "@/components/StylistInfoPanel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CalendarIcon, Clock } from "lucide-react";

export default function BookReservation() {
  const navigate = useNavigate();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const {
    setCurrentStep,
    selectedStylist,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    userInfo,
    reschedulingBookingId,
    setReschedulingBookingId,
  } = useBookingStore();

  useEffect(() => {
    if (!selectedStylist) {
      toast.error("Please select a stylist first");
      navigate(paths.app.stylists.getHref(), { replace: true });
      return;
    }
    if (!userInfo) {
      toast.error("Please enter your information first");
      navigate(paths.app.booking.getHref(), { replace: true });
      return;
    }
    setCurrentStep(2);
  }, [selectedStylist, userInfo, navigate, setCurrentStep]);

  // Don't render if missing stylist
  if (!selectedStylist || !userInfo) {
    return null;
  }

  const createBooking = useCreateBooking({
    onSuccess: () => {
      toast.success("Booking confirmed successfully!");
      setShowConfirmDialog(false);
      setCurrentStep(3);
      navigate(paths.app.success.getHref());
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create booking");
      setShowConfirmDialog(false);
    },
  });

  const rescheduleBooking = useRescheduleBooking({
    onSuccess: (data) => {
      toast.success("Booking rescheduled successfully!");
      setShowConfirmDialog(false);
      setReschedulingBookingId(null);
      navigate(paths.app.reservationList.getHref());
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reschedule booking");
      setShowConfirmDialog(false);
    },
  });

  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate && selectedStylist) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      const slots = getAvailableSlots(selectedStylist.id, dateStr);
      setAvailableSlots(slots);
      setSelectedTime(""); // reset time when date changes
    }
  }, [selectedDate, selectedStylist, setSelectedTime]);

  const handleDateSelect = (date) => {
    if (date && date >= new Date(new Date().setHours(0, 0, 0, 0))) {
      setSelectedDate(date);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookNow = () => {
    if (selectedDate && selectedTime) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime && selectedStylist && userInfo) {
      const dateStr = selectedDate.toISOString().split("T")[0];

      if (reschedulingBookingId) {
        rescheduleBooking.mutate({
          bookingId: reschedulingBookingId,
          date: dateStr,
          time: selectedTime,
        });
      } else {
        const bookingData = {
          date: dateStr,
          time: selectedTime,
          stylistId: selectedStylist.id,
          stylistName: selectedStylist.name,
          stylistSpecialty: selectedStylist.specialty,
          price: selectedStylist.price,
          customerFirstName: userInfo.firstName,
          customerLastName: userInfo.lastName,
          customerEmail: userInfo.email,
          customerPhone: userInfo.phoneNumber,
        };

        createBooking.mutate(bookingData);
      }
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <ProgressBar />

        {/* Show reschedule indicator */}
        {reschedulingBookingId && (
          <div className="mb-4 p-4 bg-linear-to-r from-rose-800 to-primary/20 border border-primary rounded-lg">
            <p className="text-sm font-medium">
              Rescheduling appointment with {selectedStylist?.name}
            </p>
          </div>
        )}

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
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
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
                {selectedDate && (
                  <p className="text-sm text-dark-muted-fg">
                    {formatDate(selectedDate)}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={
                          selectedTime === slot.time ? "default" : "outline"
                        }
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => handleTimeSelect(slot.time)}
                        className={`h-10 ${
                          selectedTime === slot.time ? "bg-primary" : ""
                        }`}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-dark-muted-fg text-center py-8">
                    Please select a date first
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={handleBookNow}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 h-12"
              >
                Book Now
              </Button>
            </div>
          </div>
          <div>
            <StylistInfoPanel />
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {reschedulingBookingId ? "Confirm Reschedule" : "Confirm Your Booking"}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Please confirm your appointment details:</p>
              <div className=" border p-4 rounded-lg space-y-2 text-sm">
                <p>
                  <strong>Stylist:</strong> {selectedStylist?.name}
                </p>
                <p>
                  <strong>Service:</strong> {selectedStylist?.specialty}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedDate && formatDate(selectedDate)}
                </p>
                <p>
                  <strong>Time:</strong> {selectedTime}
                </p>
                <p>
                  <strong>Customer:</strong> {userInfo?.firstName}{" "}
                  {userInfo?.lastName}
                </p>
                <p>
                  <strong>Phone:</strong> {userInfo?.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo?.email}
                </p>
                <p>
                  <strong>Price:</strong> ₱{selectedStylist?.price}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={createBooking.isPending || rescheduleBooking.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmBooking}
              disabled={
                !selectedDate || !selectedTime || createBooking.isPending
              }
            >
              {createBooking.isPending || rescheduleBooking.isPending 
                ? "Processing..." 
                : reschedulingBookingId 
                  ? "Confirm Reschedule" 
                  : "Confirm Booking"
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
