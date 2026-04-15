"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Gifts for Them", href: "/#them" },
    { name: "Occasions", href: "/#occasions" },
    { name: "Bestsellers", href: "/#bestsellers" },
    { name: "Our Story", href: "/#story" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-maroon rounded-xl flex items-center justify-center text-white font-serif text-xl group-hover:rotate-6 transition-transform">
            TP
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-brand-maroon">
            Two Puppies
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-brand-black hover:text-brand-maroon transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex p-2">
            <User size={20} />
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:flex p-2">
            <Heart size={20} />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="p-2 relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-maroon text-white text-[10px] flex items-center justify-center rounded-full leading-none">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <div className="h-6 w-[1px] bg-foreground/10 mx-2 hidden md:block" />
          <Button variant="primary" size="sm" className="hidden md:flex">
            Custom Order
          </Button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-foreground/5 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-brand-maroon"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-foreground/5 my-2" />
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full">Sign In</Button>
              <Button variant="primary" className="w-full">Custom Order</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
