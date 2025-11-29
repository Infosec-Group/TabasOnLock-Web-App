import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookingStore = create(
  persist(
    (set) => ({
      currentStep: 1,
      selectedStylist: null,
      selectedDate: new Date(),
      selectedTime: null,
      userInfo: null,
      bookings: [],

      setCurrentStep: (step) => set({ currentStep: step }),
      setSelectedStylist: (stylist) => set({ selectedStylist: stylist }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedTime: (time) => set({ selectedTime: time }),
      setUserInfo: (info) => set({ userInfo: info }),

      addBooking: (booking) =>
        set((state) => ({
          bookings: [
            ...state.bookings,
            { ...booking, id: Date.now(), status: "confirmed" },
          ],
        })),

      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, status: "cancelled" } : booking
          ),
        })),

      nextStep: () =>
        set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
      prevStep: () =>
        set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

      reset: () =>
        set({
          currentStep: 1,
          selectedStylist: null,
          selectedDate: undefined,
          selectedTime: null,
          userInfo: null,
        }),
    }),
    {
      name: "booking-storage",
      partialize: (state) => ({ bookings: state.bookings }),
    }
  )
);
