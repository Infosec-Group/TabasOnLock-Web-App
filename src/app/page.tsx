import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Scissors } from "lucide-react";

export default function MainPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6 gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Scissors className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold">TabasOnLock</h1>
          </div>
          <p className="text-xl text-secondary-foreground mb-8">
            Premium grooming services with expert stylists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg shadow-secondary/60 transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-2xl font-semibold mb-3">Book Appointment</h3>
              <p className="text-gray-600 mb-6">Schedule your next haircut with our professional stylists</p>
              <Button className="w-full">
                Book Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg shadow-secondary/60 transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-2xl font-semibold mb-3">My Reservations</h3>
              <p className="text-gray-600 mb-6">View and manage your upcoming appointments</p>
              <Button className="w-full">
                View Reservations
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-secondary-foreground mb-2">Expert Stylists</h4>
              <p className="text-muted-foreground">Professional barbers with years of experience</p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary-foreground mb-2">Premium Service</h4>
              <p className="text-muted-foreground">High-quality cuts and styling services</p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary-foreground mb-2">Easy Booking</h4>
              <p className="text-muted-foreground">Simple online reservation system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
