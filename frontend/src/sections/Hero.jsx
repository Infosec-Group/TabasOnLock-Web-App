import { Badge } from "@/components/ui/badge";

export default function Hero() {
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
    </div>
  )
}
