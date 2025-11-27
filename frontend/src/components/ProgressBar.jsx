import { Check } from "lucide-react";
import { useBookingStore } from "../stores/useBookingStore";

const steps = [
  {number: 1, title: "Customer Information"},
  {number: 2, title: "Book Reservation"},
  {number: 3, title: "Book Confirmed"},
];

export default function ProgressBar() {
  const currentStep = useBookingStore((state) => state.currentStep);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center max-w-md mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep > step.number
                    ? "bg-green-600 text-white"
                    : currentStep === step.number
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>

              <span 
                className={`mt-2 text-xs font-medium ${
                  currentStep >= step.number ? "text-primary-foreground" : "text-secondary-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div 
                className={`w-16 h-1 mx-4 ${
                  currentStep > step.number ? "bg-green-600" : "bg-gray-400"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}