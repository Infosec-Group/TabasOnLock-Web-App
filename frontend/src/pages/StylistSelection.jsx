import StylistCard from "../components/StylistCard";
import { stylists } from "../mock/mockData";
import { useBookingStore } from "../stores/useBookingStore";
import { useNavigate } from "react-router";

export default function StylistSelection() {
  const { setSelectedStylist } = useBookingStore();
  const navigate = useNavigate();

  const handleSelectedStylist = (stylist) => {
    setSelectedStylist(stylist);
    navigate("/booking");
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
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
