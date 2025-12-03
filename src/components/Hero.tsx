import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { Button } from './Button';
import { NavLinks, Navbar, NAV_LINKS } from './Navbar';
import '../styles/global.css';

type SectionContent = {
    id: string;
    label: string;
    eyebrow: string;
    title: string;
    headline?: string;
    description: string;
    highlights?: string[];
    ctas?: {
        label: string;
        href: string;
        className?: string;
    }[];
    showSocial?: boolean;
};

const SECTION_CONTENT: SectionContent[] = [
    {
        id: 'overview',
        label: 'Overview',
        eyebrow: 'Current focus',
        title: "Hi, I'm Pasan Perera",
        headline: 'Full-Stack Engineer & Data Science Undergraduate',
        description: 'Third-year Data Science undergraduate at SLIIT transforming data into decisions and ideas into clean, maintainable code.',
        highlights: [
            'Designing resilient, data-informed product experiences',
            'Pairing thoughtful UX with scalable engineering practices',
            'Championing documentation so teams can move faster',
        ],
        ctas: [
            { label: 'Download CV', href: 'Pasan_Perea_Resume.pdf', className: 'btn-secondary' },
        ],
        showSocial: true,
    },
    {
        id: 'about',
        label: 'About',
        eyebrow: 'About',
        title: 'Curious builder with a data-first mindset',
        headline: 'Turning ambiguous problems into purposeful products',
        description: 'From freelancing gigs to campus projects, I lead with empathy, validate with data, and deliver with TypeScript, Python, and a stack of modern cloud tooling.',
        highlights: [
            '3+ years crafting products across education, fintech, and analytics',
            'Comfortable owning both technical architecture and polished UI',
            'Shipping fast while keeping codebases approachable for teammates',
        ],
    },
    {
        id: 'projects',
        label: 'Projects',
        eyebrow: 'Projects',
        title: 'Shipping useful products',
        headline: 'Selected highlights that blend AI, product thinking, and web craftsmanship',
        description: 'Each build focuses on simplifying a workflow: faster predictions for manufacturing teams, intuitive dashboards for analysts, and bespoke interfaces for clients.',
        highlights: [
            'Predictive Quality Control suite combining Python microservices with a Vite + React dashboard',
            'Explainable AI assistant that translates model outputs into stakeholder-ready stories',
            'Minimalist design system powering multiple freelance marketing sites',
        ],
        ctas: [
            { label: 'View GitHub', href: 'https://github.com/praisedp' },
        ],
    },
    {
        id: 'education',
        label: 'Education',
        eyebrow: 'Education',
        title: 'Data Science @ SLIIT',
        headline: 'Bachelor of Science (Hons), Data Science - Year 3',
        description: 'Coursework centers on statistical learning, distributed systems, and product management. I mentor peers on React, TypeScript, and analytical storytelling.',
        highlights: [
            'Research lead for a sustainability-focused ML capstone',
            'Organized campus build nights to teach full-stack fundamentals',
            'Awarded top performer in Advanced Database Systems',
        ],
    },
    {
        id: 'contact',
        label: 'Contact',
        eyebrow: 'Contact',
        title: "Let's build the next thing",
        headline: 'Currently open for full-time internships and collaborative projects',
        description: "I thrive in teams that care about craft, feedback loops, and measurable impact. If that sounds like yours, let's talk.",
        highlights: [
            'Based in Sri Lanka with overlap across EU and US time zones',
            'Comfortable working async with thoughtful written updates',
            'Happy to hop on technical deep dives or product strategy chats',
        ],
        ctas: [
            { label: 'Connect on LinkedIn', href: 'http://linkedin.com/in/pasan-perera-269920345' },
        ],
        showSocial: true,
    },
];

const SECTION_CONTENT_MAP = SECTION_CONTENT.reduce<Record<string, SectionContent>>((acc, section) => {
    acc[section.id] = section;
    return acc;
}, {});

const HERO_SECTIONS = NAV_LINKS.map((link) => SECTION_CONTENT_MAP[link.id]).filter(Boolean) as SectionContent[];

export const Hero = () => {
    const [activeSectionId, setActiveSectionId] = useState(HERO_SECTIONS[0]?.id ?? 'overview');
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        if (!HERO_SECTIONS.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSectionId(entry.target.id);
                    }
                });
            },
            { threshold: 0.55 }
        );

        sectionRefs.current.forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    if (!HERO_SECTIONS.length) {
        return null;
    }

    const activeSection = HERO_SECTIONS.find((section) => section.id === activeSectionId) ?? HERO_SECTIONS[0];

    return (
        <>
            <section className="split-stage">
                <header className="hero hero--sticky" role="region" aria-live="polite">
                    <div className="hero-wrapper">
                        <div className="hero-left">
                            <div key={activeSection.id} className="hero-content hero-content--swap">
                                <p className="hero-eyebrow">{activeSection.eyebrow}</p>
                                <h1>{activeSection.title}</h1>
                                {activeSection.headline && (
                                    <h2 className="headline">{activeSection.headline}</h2>
                                )}
                                <p className="value-prop">{activeSection.description}</p>

                                {activeSection.highlights && (
                                    <ul className="hero-list">
                                        {activeSection.highlights.map((highlight) => (
                                            <li key={highlight}>{highlight}</li>
                                        ))}
                                    </ul>
                                )}

                                {activeSection.ctas && activeSection.ctas.length > 0 && (
                                    <div className="cta-row">
                                        {activeSection.ctas.map((cta) => (
                                            <Button key={cta.label} href={cta.href} className={cta.className}>
                                                {cta.label}
                                            </Button>
                                        ))}
                                    </div>
                                )}

                                {activeSection.showSocial && (
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
                                )}
                            </div>
                        </div>

                        <div className="hero-right">
                            <NavLinks activeId={activeSection.id} />
                        </div>
                    </div>
                </header>

                <div className="stage-track">
                    {HERO_SECTIONS.map((section, index) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="stage-track-panel"
                            aria-label={`${section.label} waypoint`}
                            tabIndex={-1}
                            ref={(el) => {
                                sectionRefs.current[index] = el;
                            }}
                        />
                    ))}
                </div>
            </section>
            <Navbar />
        </>
    );
};
