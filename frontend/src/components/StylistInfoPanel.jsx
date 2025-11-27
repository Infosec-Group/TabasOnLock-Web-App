import { Clock, PhilippinePeso, Star } from "lucide-react";
import { useBookingStore } from "../stores/useBookingStore";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export default function StylistInfoPanel() {
  const selectedStylist = useBookingStore((state) => state.selectedStylist);

  if(!selectedStylist) {
    return (
      <Card className="h-fit">
        <CardContent className="p-6 text-center text-dark-fg">
          No stylist selected
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            {selectedStylist.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
          </div>
          <h3 className="text-2xl font-rubik font-semibold text-dark-fg mb-2">{selectedStylist.name}</h3>
          <p className="text-dark-secondary-fg">{selectedStylist.specialty}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-200 rounded-lg">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="font-medium">Rating</span>
            </div>
            <Badge variant="secondary" className="text-base bg-yellow-100 text-yellow-800">
              {selectedStylist.rating}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-200 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">Experience</span>
            </div>
            <span className="text-dark-secondary-fg font-semibold">{selectedStylist.experience}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-200 rounded-lg">
            <div className="flex items-center">
              <PhilippinePeso className="w-5 h-5 mr-2" />
              <span className="font-medium">Price</span>
            </div>
            <span className="text-dark-secondary-fg font-semibold">₱{selectedStylist.price}</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-accent rounded-lg border border-primary">
          <h4 className="font-semibold text-rose-700 mb-2">About {selectedStylist.name.split(' ')[0]}</h4>
          <p className="text-sm text-rose-900">
            Specializing in {selectedStylist.specialty.toLowerCase()}, with {selectedStylist.experience} of professional experience.
            Known for attention to detail and creating that perfectly match each client's personality.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
