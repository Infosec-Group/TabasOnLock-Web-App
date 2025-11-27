import { create } from "zustand";

export const useBookingStore = create((set) => ({
  currentStep: 1,
  selectedStylist: null,
  selectedDate: null,
  selectedTime: null,

  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedStylist: (stylist) => set({ selectedStylist: stylist }),
  setSelectedDate: date => set({ selectedDate: date }),
  setSelectedTime: time => set({ selectedTime: time }),

  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  reset: () => set ({
    currentStep: 1,
    selectedStylist: null,
    selectedDate: null,
    selectedTime: null
  })
}));