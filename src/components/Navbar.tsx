"use client";

import Image from "next/image";
import React, { useState } from 'react';
import logo from "../../public/Logo.svg";
import cocoon from "../../public/cocoon.png"; // Import the cocoon image

// NavLink component (unchanged)
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('left');

  const handleMouseEnter = () => {
    setExitDirection('left');
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setExitDirection('right');
    setIsHovered(false);
  };

  return (
    <a
      href={href}
      className={`nav-link ${className || ""} ${isHovered ? 'hovered' : ''} ${!isHovered && exitDirection === 'right' ? 'exiting-right' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <style jsx>{`
        .nav-link {
          position: relative;
          display: inline-block;
          overflow: hidden;
          padding-bottom: 3px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0px;
          height: 2px;
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='2' viewBox='0 0 20 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 1 Q5 0 10 1 Q15 2 20 1' stroke='%235A2E17' stroke-width='0.5'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-size: 20px 2px;
          width: 0;
          left: 0;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .nav-link.hovered::after {
          width: 100%;
          left: 0;
        }
        .nav-link.exiting-right::after {
          width: 0;
          left: auto;
          right: 0;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </a>
  );
};

const Navbar: React.FC = () => {
  return (
    // Absolutely positioned Navbar; cocoon added as decorative at top-right
    <header className="absolute top-0 left-0 w-full z-50 flex items-center px-10 pt-4 min-h-[64px]">
      {/* Logo */}
      <div className="relative" style={{ width: '10vw', minWidth: 80, aspectRatio: '3/1' }}>
        <Image
          src={logo}
          alt="Zen Vedik Logo"
          fill
          style={{ objectFit: 'contain' }}
          sizes="15vw"
          priority
        />
      </div>
      {/* Centered Nav Links */}
      <nav className="md:flex text-[#5A2E17] gap-10 text-lg font-medium absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <NavLink href="#" className="font-bold">Home</NavLink>
        <NavLink href="#">Relax Corner</NavLink>
        <NavLink href="#">Shop</NavLink>
      </nav>
      {/* Decorative Cocoon at top right */}
      <div
        className="absolute right-0 top-0"
        style={{ width: '10vw', minWidth: 80 }}
      >
        <Image src={cocoon} alt="Leaf with Cocoon" width={160} />
      </div>
    </header>
  );
};

export default Navbar;
