import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
// Import Font Awesome social icons from react-icons
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#fcf3dc] text-[#5A2E17] py-12 px-4 md:px-10 lg:px-20 mt-16 rounded-t-3xl shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        {/* Logo and About Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
          <div className="relative w-40 h-auto mb-4">
            <img
              src="Logo.svg"
              alt="Zen Vedik Logo"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </div>
          <p className="text-sm max-w-sm">
            Zen Vedik is dedicated to bringing balance and tranquility to your life through natural products and mindful practices.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/4">
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:underline transition-transform duration-300">Home</a>
            </li>
            <li>
              <a href="#relax" className="hover:underline transition-transform duration-300">Relax Corner</a>
            </li>
            <li>
              <a href="#reviews" className="hover:underline transition-transform duration-300">Reviews</a>
            </li>
            <li>
              <a href="#blogs" className="hover:underline transition-transform duration-300">Blogs</a>
            </li>
            <li>
              <a href="#contact-us" className="hover:underline transition-transform duration-300">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/4">
          <h4 className="font-bold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:kashish.agrawal@gcecglobal.com" className="hover:underline">kashish.agrawal@gcecglobal.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:+917007560229" className="hover:underline">+91 7007560229</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>K.R. Mangalam University, Sohna, Gurgaon </span>
            </li>
          </ul>
        </div>
        
        {/* Social Media Section with react-icons Fa set */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/4">
          <h4 className="font-bold text-lg mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/zenvedik.m?utm_source=ig_web_button_share_sheet&igsh=M2ZscTF0aWJsZ3hw" target="_blank" rel="noopener noreferrer"   aria-label="Instagram" className="hover:text-[#8D6B5C] transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://wa.me/7007560229" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-[#8D6B5C] transition-colors duration-300">
              <FaWhatsapp size={24} />
            </a>
            <a href="https://www.linkedin.com/company/zen-vedik/"
               target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#8D6B5C] transition-colors duration-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[#8D6B5C] mt-8 pt-6 text-center text-sm opacity-75">
        &copy; {new Date().getFullYear()} Zen Vedik. All Rights Reserved.
        <p className="mt-2 text-sm">
          Website designed and developed by{' '}
          <a
            href="https://www.linkedin.com/in/chirag-bhal-0a5854280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            Chirag Bhal
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
