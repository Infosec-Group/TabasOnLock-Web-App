import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Star } from "lucide-react";

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-secondary-foreground mb-4 font-rubik">
          Why Choose TabasOnLock?
        </h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          We combine traditional styling techniques with modern style
          to give you the perfect look.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 shadow-primary">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Expert Stylists</h3>
            <p className="text-dark-secondary-fg leading-relaxed">
              Our team of professional stylists brings years of experience and passion for their craft to every cut.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 shadow-primary">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Easy Booking</h3>
            <p className="text-dark-secondary-fg leading-relaxed">
              Book your appointment online in just a few clicks. Choose your stylist, date, and time that works for you.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 shadow-primary">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Premium Service</h3>
            <p className="text-dark-muted-fg leading-relaxed">
              Experience luxury grooming with premium products and personalized attention to detail.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}