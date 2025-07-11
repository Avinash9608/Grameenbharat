"use client";

import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Culture', href: '#culture' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Stories', href: '#stories' },
    { name: 'Villages', href: '#villages' },
    { name: 'Arts', href: '#arts' },
    { name: 'Folklore', href: '#folklore' },
  ];

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className={cn(
            "font-headline text-2xl font-bold transition-colors",
            isScrolled ? "text-foreground" : "text-white"
          )}>
            Grameen Bharat
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isScrolled ? "text-foreground/80 hover:text-foreground" : "text-stone-100 hover:text-white"
            )}>
              {link.name}
            </a>
          ))}
        </nav>
        <Button variant="secondary" className="hidden md:inline-flex">
          Contact Us
        </Button>
      </div>
    </header>
  );
};

export default Header;
