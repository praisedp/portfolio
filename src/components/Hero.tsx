import { Github, Linkedin } from 'lucide-react';
import { Button } from './Button';
import { NavLinks, Navbar } from './Navbar';
import '../styles/global.css';

export const Hero = () => {
    return (
        <>
            <header className="hero">
                <div className="hero-wrapper">
                    <div className="hero-left">
                        <div className="hero-content">
                            <h1>Hi, I'm Pasan Perera</h1>
                            <h2 className="headline">Full-Stack Engineer & Data Science Undergraduate</h2>
                            <p className="value-prop">
                                Third-year Data Science undergraduate at SLIIT transforming data into decisions and ideas into clean, maintainable code.
                            </p>

                            <div className="cta-row">
                                <Button href="Pasan_Perea_Resume.pdf" className="btn-secondary">Download CV</Button>
                            </div>

                            <div className="social-links">
                                <a href="https://github.com/praisedp" target="_blank" rel="noopener noreferrer">
                                    <Github size={20} />
                                    <span>GitHub</span>
                                </a>
                                <a href="http://linkedin.com/in/pasan-perera-269920345" target="_blank" rel="noopener noreferrer">
                                    <Linkedin size={20} />
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="hero-right">
                        <NavLinks />
                    </div>
                </div>
            </header>
            <Navbar /> {/* This contains the mobile menu and hamburger */}
        </>
    );
};
