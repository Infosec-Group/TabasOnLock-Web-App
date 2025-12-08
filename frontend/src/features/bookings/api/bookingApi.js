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

export const useCancelBooking = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bookings"]);
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};

export const useDeleteBooking = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bookings"]);
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    }
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

const cancelBooking = (bookingId) => {
  return api.patch(`/bookings/${bookingId}/cancel`)
}

const deleteBooking = (bookingId) => {
  return api.delete(`/bookings/${bookingId}`);
}