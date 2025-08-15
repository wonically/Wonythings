import { Link } from "@heroui/link";

import {
  GitHubIcon,
  FacebookIcon,
  GmailIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = () => {
    // Scroll to top when navigation link is clicked
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#F2E3E6] dark:bg-[#22171A] border-t border-[#130d0e]/10 dark:border-[#faf4f6]/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Responsive Footer Layout */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Quick Links - Top on mobile, Center on desktop */}
          <div className="flex gap-3 order-1 sm:order-2">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                className="text-[#130d0e]/70 dark:text-[#faf4f6]/70 hover:text-[#130d0e] dark:hover:text-[#faf4f6] transition-colors text-xs font-medium tracking-wide uppercase"
                href={item.href}
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social Icons - Middle on mobile, Right on desktop */}
          <div className="flex gap-2 order-2 sm:order-3">
            <Link isExternal href={siteConfig.links.linkedin} title="LinkedIn">
              <LinkedInIcon className="text-[#0077B5] hover:text-[#005885] transition-colors w-4 h-4" />
            </Link>
            <Link isExternal href={siteConfig.links.github} title="GitHub">
              <GitHubIcon className="text-[#333] dark:text-[#fff] hover:text-[#000] dark:hover:text-[#ccc] transition-colors w-4 h-4" />
            </Link>
            <Link isExternal href={siteConfig.links.gmail} title="Gmail">
              <GmailIcon className="text-[#EA4335] hover:text-[#d33b2c] transition-colors w-4 h-4" />
            </Link>
            <Link
              isExternal
              href={siteConfig.links.instagram}
              title="Instagram"
            >
              <InstagramIcon className="text-[#E4405F] hover:text-[#d6336c] transition-colors w-4 h-4" />
            </Link>
            <Link isExternal href={siteConfig.links.facebook} title="Facebook">
              <FacebookIcon className="text-[#1877F2] hover:text-[#166fe5] transition-colors w-4 h-4" />
            </Link>
          </div>

          {/* Copyright - Bottom on mobile, Left on desktop */}
          <p className="text-[#130d0e]/60 dark:text-[#faf4f6]/60 text-xs order-3 sm:order-1">
            Wonythings © {currentYear} WONY.
          </p>
        </div>
      </div>
    </footer>
  );
};
