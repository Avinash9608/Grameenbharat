
"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const pagesWithDarkHero = ['/', '/food', '/occupations', '/architecture', '/farming', '/contact'];
  const hasDarkHero = pagesWithDarkHero.includes(pathname);

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
    { name: 'Culture', href: '/#culture' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Stories', href: '/#stories' },
    { name: 'Villages', href: '/#villages' },
    { name: 'Arts', href: '/#arts' },
    { name: 'Folklore', href: '/#folklore' },
  ];

  const useLightTextColor = hasDarkHero && !isScrolled;
  const headerTextColor = useLightTextColor ? 'text-white' : 'text-foreground';
  const navLinkColor = useLightTextColor ? 'text-stone-200 hover:text-white' : 'text-foreground/80 hover:text-foreground';


  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className={cn("h-8 w-8 transition-colors", 'text-primary')} />
          <span className={cn(
            "font-headline text-2xl font-bold transition-colors",
             headerTextColor
          )}>
            Grameen Bharat
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                 navLinkColor
            )}>
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <Button asChild variant="secondary" className="hidden md:inline-flex">
                <Link href="/contact">Contact Us</Link>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className={cn("md:hidden", headerTextColor)}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                    <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                        <Leaf className="h-8 w-8 text-primary" />
                        <span className="font-headline text-2xl font-bold text-foreground">
                            Grameen Bharat
                        </span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-foreground/80 hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                        ))}
                    </nav>
                    <Button asChild variant="secondary" className="mt-4">
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
