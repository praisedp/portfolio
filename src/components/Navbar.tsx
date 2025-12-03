import { useState, useEffect } from 'react';
import '../styles/global.css';

export const Navbar = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const closeMobileNav = () => {
        setIsMobileNavOpen(false);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const mobileNav = document.getElementById('mobile-nav');
            const hamburger = document.getElementById('hamburger');

            if (isMobileNavOpen && mobileNav && hamburger &&
                !mobileNav.contains(target) && !hamburger.contains(target)) {
                setIsMobileNavOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileNavOpen]);

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#skills', label: 'Skills' },
        { href: '#education', label: 'Education' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <>
            {/* Desktop Navigation (part of Hero Right in original design, but extracted here for reusability if needed, 
          though in the original design it was specific to the hero right side. 
          I will create a component that renders the links, which can be used in both places) */}

            {/* Mobile Hamburger */}
            <button
                className={`hamburger ${isMobileNavOpen ? 'active' : ''}`}
                id="hamburger"
                aria-label="Toggle navigation menu"
                onClick={toggleMobileNav}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`} id="mobile-nav">
                <nav className="hero-nav" role="navigation" aria-label="Mobile navigation">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="nav-btn"
                            onClick={closeMobileNav}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export const NavLinks = () => {
    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#skills', label: 'Skills' },
        { href: '#education', label: 'Education' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <nav className="hero-nav" role="navigation" aria-label="Section navigation">
            {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-btn">
                    {link.label}
                </a>
            ))}
        </nav>
    );
}
