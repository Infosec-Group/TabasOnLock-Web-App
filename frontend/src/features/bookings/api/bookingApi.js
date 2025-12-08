import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";

export const useCreateBooking = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bookings"]);
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};

export const useCustomerBookings = (customerId) => {
  return useQuery({
    queryKey: ["bookings", customerId],
    queryFn: () => getCustomerBookingId(customerId),
    enabled: Boolean(customerId),
  });
};

const createBooking = (bookingData) => {
  return api.post("/bookings", bookingData);
}

const getCustomerBookingId = (customerId) => {
  return api.get(`/bookings/customer/${customerId}`);
}

const updateBooking = (bookingId, bookingData) => {
  return api.put(`/bookings/${bookingId}`, bookingData);
}

const deleteBooking = (bookingId) => {
  return api.delete(`/bookings/${bookingId}`);
}