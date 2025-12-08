import { useNavigate } from "react-router";
import { paths } from "@/config/paths";
import { formatDate } from "@/utils/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Mail,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import { useUser } from "@/lib/auth";
import {
  useCancelBooking,
  useCustomerBookings,
  useDeleteBooking,
} from "@/features/bookings/api/bookingApi";
import { toast } from "sonner";

export default function ReservationDashboard() {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUser();
  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    isError,
    error,
  } = useCustomerBookings(user?.id);

  const cancelBooking = useCancelBooking({
    onSuccess: () => {
      toast.success("Booking cancelled successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to cancel booking");
    },
  });

  const deleteBooking = useDeleteBooking({
    onSuccess: () => {
      toast.success("Booking deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete booking");
    },
  });

  const activeBookings = bookings.filter(
    (booking) =>
      booking.status === "confirmed" ||
      booking.status === "cancelled" ||
      booking.status === "pending"
  );

  const handleCancelReservation = (bookingId) => {
    cancelBooking.mutate(bookingId);
  };

  const handleDeleteReservation = (bookingId) => {
    deleteBooking.mutate(bookingId);
  };

  const getStatusBadge = (status) => {
    if (status === "confirmed") {
      return <Badge className="bg-green-600">Confirmed</Badge>;
    }
    if (status === "cancelled") {
      return <Badge className="bg-destructive">Cancelled</Badge>;
    }
    return (
      <Badge variant="secondary" className="bg-amber-400 text-amber-900">
        Pending
      </Badge>
    );
  };

  if (userLoading || bookingsLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Loading your reservations...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-destructive">
          Error loading reservations: {error.message}
        </div>
      </div>
    );
  }

  if (activeBookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate(paths.app.root.getHref())}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-dark-muted-fg mb-4" />
            <h3 className="text-xl font-semibold text-dark-secondary-fg mb-2">
              No Reservations Found
            </h3>
            <p className="text-dark-secondary-fg mb-6">
              You haven't made any reservations yet.
            </p>
            <Button onClick={() => navigate(paths.app.stylists.getHref())}>
              Book Your First Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button
        variant="ghost"
        onClick={() => navigate(paths.app.root.getHref())}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-foreground mb-2">
          My Reservations
        </h1>
        <p className="text-dark secondary-fg">
          Manage your upcoming appointments
        </p>
      </div>

      <div className="space-y-4">
        {activeBookings.map((reservation) => {
          const bookingDate = new Date(reservation.date);

          return (
            <Card
              key={reservation.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {reservation.stylist.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {reservation.stylist.name}
                      </CardTitle>
                      <p className="text-sm text-dark-muted-fg">
                        Appointment #{`${reservation.id}`.slice(-6)}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(reservation.status)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-dark-secondary-fg">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(bookingDate)}
                    </div>
                    <div className="flex items-center text-sm text-dark-secondary-fg">
                      <Clock className="w-4 h-4 mr-2" />
                      {reservation.time}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-dark-secondary-fg">
                      <User className="w-4 h-4 mr-2" />
                      <span>
                        {reservation.customer.firstName}{" "}
                        {reservation.customer.lastName}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-dark-secondary-fg">
                      <Phone className="w-4 h-4 mr-2" />
                      {reservation.customer.phoneNumber}
                    </div>
                    <div className="flex items-center text-sm text-dark-secondary-fg">
                      <Mail className="w-4 h-4 mr-2" />
                      {reservation.customer.email}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={reservation.status === "confirmed"}
                    className="flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {reservation.status === "confirmed"
                      ? "Cannot Edit"
                      : "Reschedule"}
                  </Button>

                  {reservation.status === "cancelled" ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Reservation
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete your appointment
                            with? Once deleted, you have to book an appointment again.
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleDeleteReservation(reservation.id)
                            }
                            className="bg-destructive hover:bg-destructive/80"
                          >
                            Delete Appointment
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          disabled={cancelBooking.isPending}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Cancel Reservation
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel your appointment
                            with {reservation.stylist.name} on{" "}
                            {formatDate(bookingDate)} at {reservation.time}?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Keep Reservation
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleCancelReservation(reservation.id)
                            }
                            className="bg-destructive hover:bg-destructive/80"
                          >
                            Cancel Appointment
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
