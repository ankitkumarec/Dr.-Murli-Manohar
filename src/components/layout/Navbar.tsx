import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { siteConfig } from "../../config/site";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Appointment", path: "/appointment" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/90 shadow-sm backdrop-blur-md"
            : "bg-white"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="font-heading text-xl font-bold text-navy md:text-2xl">
              {siteConfig.doctor.name}
            </span>
            <span className="text-xs font-medium text-dental-blue md:text-sm">
              {siteConfig.doctor.specialization}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-dental-blue",
                    isActive ? "text-dental-blue" : "text-navy-light"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/appointment">
              <Button size="sm">Book Appointment</Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="flex items-center justify-center p-2 text-navy md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 md:hidden">
          <nav className="flex flex-col items-center gap-6 p-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-lg font-medium transition-colors hover:text-dental-blue",
                    isActive ? "text-dental-blue" : "text-navy-light"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/appointment" className="mt-4 w-full">
              <Button className="w-full" size="lg">
                Book Appointment
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
