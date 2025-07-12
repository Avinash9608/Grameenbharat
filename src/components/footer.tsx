import { Leaf, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    const socialLinks = [
        { name: 'Facebook', href: '#', icon: <Facebook className="w-6 h-6" /> },
        { name: 'Instagram', href: '#', icon: <Instagram className="w-6 h-6" /> },
        { name: 'Twitter', href: '#', icon: <Twitter className="w-6 h-6" /> },
        { name: 'YouTube', href: '#', icon: <Youtube className="w-6 h-6" /> },
    ];
    
    return (
        <footer className="bg-primary/10 text-foreground">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-4">
                            <Leaf className="h-8 w-8 text-primary" />
                            <span className="font-headline text-2xl font-bold">
                                Grameen Bharat
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Celebrating the heart and soul of rural India.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-headline font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/#culture" className="text-sm text-muted-foreground hover:text-primary transition-colors">Culture</a></li>
                            <li><a href="/#gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</a></li>
                            <li><a href="/#stories" className="text-sm text-muted-foreground hover:text-primary transition-colors">Stories</a></li>
                            <li><a href="/#arts" className="text-sm text-muted-foreground hover:text-primary transition-colors">Arts &amp; Crafts</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-headline font-semibold text-lg mb-4">Connect With Us</h3>
                        <div className="flex justify-center md:justify-start gap-4">
                            {socialLinks.map(link => (
                                <a key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                    <span className="sr-only">{link.name}</span>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                            Sign up for our newsletter to get the latest stories.
                        </p>
                    </div>
                </div>
                <div className="border-t border-primary/20 mt-8 pt-6 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Grameen Bharat. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
