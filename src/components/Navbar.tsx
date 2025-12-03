import { useState, useEffect } from 'react';
import '../styles/global.css';

export type NavLinkItem = {
    id: string;
    label: string;
    href: string;
};

export const NAV_LINKS: NavLinkItem[] = [
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'education', label: 'Education', href: '#education' },
    { id: 'contact', label: 'Contact', href: '#contact' },
];

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

    return (
        <>
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
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.id}
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

interface NavLinksProps {
    activeId?: string;
}

export const NavLinks = ({ activeId }: NavLinksProps) => {
    return (
        <nav className="hero-nav" role="navigation" aria-label="Section navigation">
            {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id;
                return (
                    <a
                        key={link.id}
                        href={link.href}
                        className={`nav-btn ${isActive ? 'nav-btn--active' : ''}`}
                        aria-current={isActive ? 'true' : undefined}
                    >
                        {link.label}
                    </a>
                );
            })}
        </nav>
    );
};
