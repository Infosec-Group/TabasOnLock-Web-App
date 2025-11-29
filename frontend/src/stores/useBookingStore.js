import { create } from "zustand";

export const useBookingStore = create((set) => ({
  currentStep: 1,
  selectedStylist: null,
  selectedDate: new Date(),
  selectedTime: null,
  userInfo: null,
  bookings: [],

  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedStylist: (stylist) => set({ selectedStylist: stylist }),
  setSelectedDate: date => set({ selectedDate: date }),
  setSelectedTime: time => set({ selectedTime: time }),
  setUserInfo: (info) => set({ userInfo: info }),

  addBooking: (booking) => set((state) => ({
    bookings: [...state.bookings, { ...booking, id: Date.now(), status: "confirmed" }]
  })),

  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  reset: () => set ({
    currentStep: 1,
    selectedStylist: null,
    selectedDate: undefined,
    selectedTime: null,
    userInfo: null,
  })
}));