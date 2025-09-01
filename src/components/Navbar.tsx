"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../public/Logo.svg";
import cocoon from "../../public/cocoon.png";

type NavLinkProps = {
  href: string;
  children: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
};

const NavLink = ({
  href,
  children,
  className = "",
  onClick,
  active = false,
}: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right">("left");

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => {
        setExitDirection("left");
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setExitDirection("right");
        setIsHovered(false);
      }}
      className={`nav-link ${className} ${isHovered || active ? "hovered" : ""} ${!isHovered && exitDirection === "right" && !active ? "exiting-right" : ""}`}
    >
      {children}
      <style jsx>{`
        .nav-link {
          position: relative;
          display: inline-block;
          padding-bottom: 3px;
          overflow: hidden;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          height: 2px;
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='2' viewBox='0 0 20 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 1 Q5 0 10 1 Q15 2 20 1' stroke='%235A2E17' strokeWidth='0.5'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-size: 20px 2px;
          width: 0;
          left: 0;
          transition:
            width 0.3s ease-in-out,
            left 0.3s ease-in-out;
        }
        .nav-link.hovered::after {
          width: 100%;
          left: 0;
        }
        .nav-link.exiting-right::after {
          width: 0;
          left: auto;
          right: 0;
          transition:
            width 0.3s ease-in-out,
            right 0.3s ease-in-out;
        }
      `}</style>
    </a>
  );
};

type NavbarProps = {
  activeSection: string;
};

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);

  return (
    <header className="sticky top-0 w-full z-50 bg-transparent">
      <div className="flex items-center justify-between px-4 md:px-10 pt-4 min-h-[64px]">
        {/* Logo */}
        <div
          className="relative backdrop-filter backdrop-blur-lg"
          style={{
            width: "10vw",
            minWidth: 80,
            aspectRatio: "3/1",
            borderRadius: "15px",
          }}
        >
          <Image
            src={logo}
            alt="Zen Vedik Logo"
            fill
            style={{ objectFit: "contain" }}
            sizes="15vw"
            priority
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex text-[#5A2E17] gap-10 text-lg font-medium absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-filter backdrop-blur-lg">
          <NavLink href="#home" active={activeSection === "home"}>
            Home
          </NavLink>
          <NavLink href="#relax" active={activeSection === "relax"}>
            Relax Corner
          </NavLink>
          <NavLink href="#shop" active={activeSection === "shop"}>
            Shop
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-[#5A2E17] focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Decorative Cocoon */}
        <div
          className="absolute right-0 top-0 hidden md:block"
          style={{ width: "10vw", minWidth: 80 }}
        >
          <Image src={cocoon} alt="Leaf with Cocoon" width={160} />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#fcf3dc] z-40 shadow-lg"
          >
            <nav className="flex flex-col text-[#5A2E17] gap-4 py-4 text-xl font-medium items-center">
              <NavLink
                href="#home"
                className="font-bold"
                active={activeSection === "home"}
                onClick={toggleMobileMenu}
              >
                Home
              </NavLink>
              <NavLink
                href="#relax"
                active={activeSection === "relax"}
                onClick={toggleMobileMenu}
              >
                Relax Corner
              </NavLink>
              <NavLink
                href="#shop"
                active={activeSection === "shop"}
                onClick={toggleMobileMenu}
              >
                Shop
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
