
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const cultureItems = [
  { name: 'Local Festivals & Rituals', href: '/festivals', image: 'https://images.unsplash.com/photo-1597131267491-b28fc433ea3c?q=80&w=1100&auto=format&fit=crop' },
  { name: 'Village Occupations', href: '/occupations', image: 'https://images.unsplash.com/photo-1623211270166-bc232d744d6a?q=80&w=1170&auto=format&fit=crop' },
  { name: 'Clothing and Jewelry', href: '/clothing', image: 'https://images.unsplash.com/photo-1679004633953-2af98ed7eaf9?q=80&w=685&auto=format&fit=crop' },
  { name: 'Village Food & Recipes', href: '/food', image: 'https://images.unsplash.com/photo-1680359873864-43e89bf248ac?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Homes and Architecture', href: '/architecture', image: 'https://images.unsplash.com/photo-1736914319111-d54ada582633?q=80&w=1332&auto=format&fit=crop' },
  { name: 'Farming Lifestyle', href: '/farming', image: 'https://images.unsplash.com/photo-1662815094316-917f52876324?w=600&auto=format&fit=crop' },
];

const CultureCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    const updateCarousel = (newIndex: number) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const newSafeIndex = (newIndex + cultureItems.length) % cultureItems.length;
        setCurrentIndex(newSafeIndex);

        setTimeout(() => {
            setIsAnimating(false);
        }, 800);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                updateCarousel(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                updateCarousel(currentIndex + 1);
            }
        };

        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        };

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) { // Swiped left
                    updateCarousel(currentIndex + 1);
                } else { // Swiped right
                    updateCarousel(currentIndex - 1);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        const trackElement = trackRef.current;
        if(trackElement) {
            trackElement.addEventListener("touchstart", handleTouchStart, { passive: true });
            trackElement.addEventListener("touchend", handleTouchEnd, { passive: true });
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            if(trackElement) {
                trackElement.removeEventListener("touchstart", handleTouchStart);
                trackElement.removeEventListener("touchend", handleTouchEnd);
            }
        };
    }, [currentIndex, isAnimating]);
    
    return (
        <section id="culture" className="py-16 md:py-24 bg-background overflow-hidden">
             <div className="text-center mb-12">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Culture and Lifestyle</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Dive into the rich tapestry of traditions that shape the lives of the villagers.
                </p>
            </div>

            <div className="carousel-container">
                <button className="nav-arrow left" onClick={() => updateCarousel(currentIndex - 1)}>‹</button>
                <div className="carousel-track" ref={trackRef}>
                    {cultureItems.map((item, i) => {
                        const offset = (i - currentIndex + cultureItems.length) % cultureItems.length;
                        let cardClass = "card ";

                        if (offset === 0) cardClass += "center";
                        else if (offset === 1) cardClass += "right-1";
                        else if (offset === 2) cardClass += "right-2";
                        else if (offset === cultureItems.length - 1) cardClass += "left-1";
                        else if (offset === cultureItems.length - 2) cardClass += "left-2";
                        else cardClass += "hidden";

                        return (
                            <Link href={item.href} key={i} className={cardClass} onClick={(e) => { if(offset !== 0) { e.preventDefault(); updateCarousel(i); }}}>
                                <Image src={item.image} alt={item.name} fill quality={80} sizes="(max-width: 768px) 200px, 280px" />
                                <div className="card-overlay">
                                    <h3 className="card-title">{item.name}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <button className="nav-arrow right" onClick={() => updateCarousel(currentIndex + 1)}>›</button>
            </div>

            <div className="member-info">
                 <h2 className="member-name">{cultureItems[currentIndex].name}</h2>
            </div>
            
            <div className="dots">
                {cultureItems.map((_, i) => (
                    <div 
                        key={i} 
                        className={`dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => updateCarousel(i)}
                    />
                ))}
            </div>
        </section>
    );
};

export default CultureCarousel;
