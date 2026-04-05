import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-primary">ETHIO</span>
          <span className="text-2xl font-display font-bold text-accent">TOURS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Experiences
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Destinations
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Guides
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              <Link to="/" className="py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Experiences</Link>
              <Link to="/" className="py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Destinations</Link>
              <Link to="/" className="py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Guides</Link>
              <button className="mt-2 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
