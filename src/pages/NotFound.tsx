import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-9xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl">Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  );
}
