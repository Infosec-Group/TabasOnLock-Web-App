import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto text-center">
      <Badge className="mb-6 bg-rose-100 text-rose-900">
        Premium Grooming Services
      </Badge>
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Your Perfect
        <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent font-rubik font-semibold"> Haircut</span>
        <br />
        Awaits You
      </h1>
      <p className="text-xl text-secondary-foreground mb-8 max-w-3xl mx-auto">
        Experience premium grooming with our expert stylists. Book your appointment online
        and enjoy professional service in modern, comfortable environment.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          onClick={() => navigate(paths.auth.getHref())}
          className="font-semibold text-md"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}