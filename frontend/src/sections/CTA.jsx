import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4 font-playfair-display">
        Ready for Your Best Look?
      </h2>
      <p className="text-xl text-accent mb-8">
        Join our satisfied customers who trust us with their style.
      </p>
      <Button
        size="lg"
        onClick={() => navigate(paths.auth.getHref())}
        className="bg-white text-dark-fg text-lg px-8 py-4"
      >
        Book Your Appointment Now
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
}
