import { Button } from "../components/ui/button";
import { paths } from "../config/paths";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-3">
          <h1 className="text-8xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold text-secondary-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">The page you're looking for doesn't exist or may have been moved.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <a href={paths.home.getHref()}>Go To Home</a>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
