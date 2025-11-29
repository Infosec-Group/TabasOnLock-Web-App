import { paths } from "@/config/paths";
import StylistCard from "../components/StylistCard";
import { stylists } from "../mock/mockData";
import { useBookingStore } from "../stores/useBookingStore";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function StylistSelection() {
  const { setSelectedStylist } = useBookingStore();
  const navigate = useNavigate();

  const handleSelectedStylist = (stylist) => {
    setSelectedStylist(stylist);
    navigate(paths.app.bookings.getHref());
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Button variant="ghost" onClick={() => navigate(paths.app.root.getHref())} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Stylists</h1>
        <p className="text-xl text-secondary-foreground">Select from our talented team of professional stylists</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {stylists.map((stylist) => (
          <StylistCard 
            key={stylist.id}
            stylist={stylist}
            onSelect={handleSelectedStylist}
          />
        ))}
      </div>
    </div>
  )
}
