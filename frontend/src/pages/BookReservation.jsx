import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useBookingStore } from "@/stores/useBookingStore";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";
import { CalendarIcon, Clock } from "lucide-react";
import { getAvailableSlots } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import StylistInfoPanel from "@/components/StylistInfoPanel";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function BookReservation() {
  const navigate = useNavigate();
  const {
    setCurrentStep,
    selectedStylist,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
  } = useBookingStore();

  const [availableSlots, setAvailableSlots] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

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
    if(selectedDate && selectedTime) {
      setShowConfirmDialog(true);
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
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
                onClick={() => navigate("/booking")}
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
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
            <AlertDialogTitle>Confirm Your Appointment</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
