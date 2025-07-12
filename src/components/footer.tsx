import { Leaf, Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
    const socialLinks = [
        { name: 'Facebook', href: '#', icon: <Facebook className="w-6 h-6" /> },
        { name: 'Instagram', href: '#', icon: <Instagram className="w-6 h-6" /> },
        { name: 'Twitter', href: '#', icon: <Twitter className="w-6 h-6" /> },
        { name: 'YouTube', href: '#', icon: <Youtube className="w-6 h-6" /> },
    ];
    
    return (
        <footer className="bg-primary/10 text-foreground border-t border-primary/20">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="flex items-center gap-2 mb-4">
                            <Leaf className="h-8 w-8 text-primary" />
                            <span className="font-headline text-2xl font-bold">
                                Grameen Bharat
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Celebrating the heart, soul, and soil of rural India.
                        </p>
                        <div className="flex justify-center sm:justify-start gap-4 mt-6">
                            {socialLinks.map(link => (
                                <a key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                    <span className="sr-only">{link.name}</span>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-headline font-semibold text-lg mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li><a href="/food" className="text-sm text-muted-foreground hover:text-primary transition-colors">Food & Recipes</a></li>
                            <li><a href="/festivals" className="text-sm text-muted-foreground hover:text-primary transition-colors">Festivals</a></li>
                            <li><a href="/occupations" className="text-sm text-muted-foreground hover:text-primary transition-colors">Occupations</a></li>
                            <li><a href="/clothing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Clothing</a></li>
                            <li><a href="/architecture" className="text-sm text-muted-foreground hover:text-primary transition-colors">Architecture</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-headline font-semibold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                             <li><a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-headline font-semibold text-lg mb-4">Stay Connected</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get the latest stories and updates from the villages directly in your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <Input type="email" placeholder="Your email address" className="bg-background/80" />
                            <Button type="submit" variant="secondary" className="shrink-0">
                                <Send className="w-4 h-4 mr-2" />
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-primary/20 mt-12 pt-6 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Grameen Bharat. All Rights Reserved. A tribute to the hands that feed the nation.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
