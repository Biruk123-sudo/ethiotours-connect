const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">
              <span className="text-primary">ETHIO</span>TOURS
            </h3>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Connecting travelers with authentic Ethiopian experiences through passionate local guides.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 font-sans">Explore</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">All Experiences</li>
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Destinations</li>
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Local Guides</li>
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Gift Cards</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 font-sans">Host</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Become a Guide</li>
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Resources</li>
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Community</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 font-sans">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Safety</li>
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-primary-foreground cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/40">
          © 2026 ETHIOTOURS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
