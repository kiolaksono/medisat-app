"use client"

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { handleLogout } from '@/app/patients/actions';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
      >
        <Menu size={24} />
      </button>

      {/* Menu Items */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <Link
            href="/patients"
            onClick={toggleMenu}
            className="block px-4 py-2 text-black hover:bg-gray-100"
            >
            Home
          </Link>
          <Link
            href="/patients/schedule"
            onClick={toggleMenu}
            className="block px-4 py-2 text-black hover:bg-gray-100"
            >
            Buat Jadwal Baru
          </Link>
          <Link
            href={"/patients/geminiAI/"}
            onClick={toggleMenu}
            className="block px-4 py-2 text-black hover:bg-gray-100"
            >
            Tanya Medisat
          </Link>
          <form action={handleLogout}>
            <Button variant={"ghost"}>Logout</Button>
              

          </form>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;