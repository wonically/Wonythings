import * as React from "react";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import clsx from "clsx";
import { Reorder } from "framer-motion";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GitHubIcon,
  FacebookIcon,
  GmailIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons";
import { TypographyLogo } from "@/components/icons";

interface NavItem {
  label: string;
  href: string;
}

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [navItems, setNavItems] = React.useState<NavItem[]>(() => {
    // Try to get saved order from sessionStorage, fallback to default
    if (typeof window !== "undefined") {
      const savedOrder = sessionStorage.getItem("navItemsOrder");

      if (savedOrder) {
        try {
          return JSON.parse(savedOrder);
        } catch {
          return siteConfig.navItems;
        }
      }
    }

    return siteConfig.navItems;
  });
  const [currentPath, setCurrentPath] = React.useState(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    if (typeof window !== "undefined") {
      // Update path on route changes
      window.addEventListener("popstate", updatePath);
      // Also check for hash changes and manual navigation
      const observer = new MutationObserver(() => {
        const newPath = window.location.pathname;

        if (newPath !== currentPath) {
          setCurrentPath(newPath);
        }
      });

      observer.observe(document, { childList: true, subtree: true });

      return () => {
        window.removeEventListener("popstate", updatePath);
        observer.disconnect();
      };
    }
  }, [currentPath]);

  // Save nav items order to sessionStorage whenever it changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("navItemsOrder", JSON.stringify(navItems));
    }
  }, [navItems]);

  React.useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Hide navbar when scrolling down
          setIsVisible(false);
        } else {
          // Show navbar when scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <Navbar
      className={clsx(
        "w-full max-w-none bg-[#F2E3E6] dark:bg-[#22171A] transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-h-full flex items-center">
          <div className="h-12 w-24 flex items-center">
            <TypographyLogo size={32} />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex basis-3/5 sm:basis-full items-center"
        justify="center"
      >
        <Reorder.Group
          axis="x"
          className="flex gap-2 items-center"
          values={navItems}
          onReorder={setNavItems}
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <Reorder.Item
                key={item.href}
                animate={{
                  scale: 1,
                  rotate: 0,
                  zIndex: isActive ? 10 : 1,
                }}
                className="relative"
                style={{ cursor: "grab" }}
                transition={{
                  layout: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                  default: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                value={item}
                whileDrag={{
                  scale: 1.02,
                  zIndex: 100,
                  cursor: "grabbing",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
                  // Gravity swing effect - oscillating rotation
                  rotate: [0, -3, 3, -2, 2, -1, 1, 0],
                  transition: {
                    rotate: {
                      duration: 2,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    },
                    scale: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                    boxShadow: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  },
                }}
                onDragEnd={() => {
                  // Small delay to prevent click event from firing after drag
                  setTimeout(() => setIsDragging(false), 100);
                }}
                onDragStart={() => setIsDragging(true)}
              >
                <Link
                  className={clsx(
                    // Base beveled rectangle styles
                    "relative px-6 py-3 rounded-lg block",
                    "shadow-sm",
                    "transition-shadow transition-transform duration-200",
                    "text-sm font-medium text-center",
                    "select-none",
                    "transition-colors duration-200",
                    // Inactive tab styling
                    !isActive && [
                      "bg-content3",
                      "hover:shadow-md hover:scale-[1.02]",
                      "hover:text-primary",
                      "text-[#130d0e] dark:text-[#faf4f6]",
                    ],
                    // Active tab styling
                    isActive && [
                      "bg-[#22171a] dark:bg-[#f2e3e6]",
                      "shadow-md scale-[1.02]",
                      "font-bold text-[#faf4f6] dark:text-[#130d0e]",
                    ],
                  )}
                  draggable={false}
                  href={item.href}
                  onClick={(e) => {
                    if (isDragging) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                  {item.label}
                </Link>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-2">
          <Link isExternal href={siteConfig.links.linkedin} title="LinkedIn">
            <LinkedInIcon className="text-[#0077B5] hover:text-[#005885] transition-colors colorful-icon" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GitHubIcon className="text-[#333] dark:text-[#fff] hover:text-[#000] dark:hover:text-[#ccc] transition-colors colorful-icon" />
          </Link>
          <Link isExternal href={siteConfig.links.gmail} title="Gmail">
            <GmailIcon className="text-[#EA4335] hover:text-[#d33b2c] transition-colors colorful-icon" />
          </Link>
          <Link isExternal href={siteConfig.links.instagram} title="Instagram">
            <InstagramIcon className="text-[#E4405F] hover:text-[#d6336c] transition-colors colorful-icon" />
          </Link>
          <Link isExternal href={siteConfig.links.facebook} title="Facebook">
            <FacebookIcon className="text-[#1877F2] hover:text-[#166fe5] transition-colors colorful-icon" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-[#130d0e] dark:text-[#faf4f6]"
        />
      </NavbarContent>

      <NavbarMenu className="bg-[#F2E3E6] dark:bg-[#22171A] pt-6">
        <div className="mx-4 mt-2 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                className={clsx(
                  "w-full text-lg font-medium",
                  "text-[#130d0e] dark:text-[#faf4f6]",
                  "hover:text-primary transition-colors",
                )}
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {/* Social links in mobile menu */}
          <NavbarMenuItem>
            <Divider className="my-4 bg-[#130d0e] dark:bg-[#faf4f6]" />
            <div className="flex gap-4 justify-center">
              <Link
                isExternal
                href={siteConfig.links.linkedin}
                title="LinkedIn"
              >
                <LinkedInIcon className="text-[#0077B5] hover:text-[#005885] transition-colors colorful-icon w-6 h-6" />
              </Link>
              <Link isExternal href={siteConfig.links.github} title="GitHub">
                <GitHubIcon className="text-[#333] dark:text-[#fff] hover:text-[#000] dark:hover:text-[#ccc] transition-colors colorful-icon w-6 h-6" />
              </Link>
              <Link isExternal href={siteConfig.links.gmail} title="Gmail">
                <GmailIcon className="text-[#EA4335] hover:text-[#d33b2c] transition-colors colorful-icon w-6 h-6" />
              </Link>
              <Link
                isExternal
                href={siteConfig.links.instagram}
                title="Instagram"
              >
                <InstagramIcon className="text-[#E4405F] hover:text-[#d6336c] transition-colors colorful-icon w-6 h-6" />
              </Link>
              <Link
                isExternal
                href={siteConfig.links.facebook}
                title="Facebook"
              >
                <FacebookIcon className="text-[#1877F2] hover:text-[#166fe5] transition-colors colorful-icon w-6 h-6" />
              </Link>
            </div>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
