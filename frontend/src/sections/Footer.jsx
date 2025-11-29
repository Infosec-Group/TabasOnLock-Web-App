import { Scissors } from "lucide-react";

export default function Footer() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold font-playfair-display">TabasOnLock</h3>
          </div>
          <p className="text-dark-secondary-fg">
            Premium grooming services with expert stylists in a modern, comfortable environment.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-dark-secondary-fg">
            <li>Classic Cuts</li>
            <li>Modern Styles</li>
            <li>Beard Styling</li>
            <li>Hair Treatments</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-dark-secondary-fg">
            <li>123 Main Street</li>
            <li>Manila, Philippines</li>
            <li>+63 912-345-6789</li>
            <li>email@example.com</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Hours</h4>
          <ul className="space-y-2 text-dark-secondary-fg">
            <li>Mon-Sun: 9AM-9PM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary mt-8 pt-8 text-center font-playfair-display">
        © {new Date().getFullYear()} TabasOnLock. All rights reserved.
      </div>
    </div>
  );
}
