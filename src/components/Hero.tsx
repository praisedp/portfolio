import { useEffect, useRef, useState } from 'react';
import { NavLinks, Navbar, NAV_LINKS } from './Navbar';
import { HERO_SECTION_COMPONENTS, HeroSectionComponent } from './sections';
import '../styles/global.css';

type HeroSectionEntry = {
    id: string;
    label: string;
    Component: HeroSectionComponent;
};

const HERO_SECTIONS: HeroSectionEntry[] = NAV_LINKS
    .map((link) => {
        const Component = HERO_SECTION_COMPONENTS[link.id];
        if (!Component) {
            return null;
        }

        return {
            id: link.id,
            label: link.label,
            Component,
        };
    })
    .filter(Boolean) as HeroSectionEntry[];

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
            { threshold: 0.45 }
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
    const ActiveSectionComponent = activeSection?.Component;

    return (
        <>
            <section className="split-stage">
                <header className="hero hero--sticky" role="region" aria-live="polite">
                    <div className="hero-wrapper">
                        <div className="hero-left">
                            <div key={activeSection.id} className="hero-content hero-content--swap">
                                {ActiveSectionComponent && <ActiveSectionComponent />}
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
