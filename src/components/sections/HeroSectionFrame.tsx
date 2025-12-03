import { Github, Linkedin } from 'lucide-react';
import { Button } from '../Button';
import '../../styles/global.css';

export type HeroSectionCta = {
    label: string;
    href: string;
    className?: string;
};

export interface HeroSectionFrameProps {
    eyebrow: string;
    title: string;
    headline?: string;
    description: string;
    highlights?: string[];
    ctas?: HeroSectionCta[];
    showSocial?: boolean;
}

export const HeroSectionFrame = ({
    eyebrow,
    title,
    headline,
    description,
    highlights,
    ctas,
    showSocial,
}: HeroSectionFrameProps) => (
    <>
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {headline && <h2 className="headline">{headline}</h2>}
        <p className="value-prop">{description}</p>

        {highlights && highlights.length > 0 && (
            <ul className="hero-list">
                {highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                ))}
            </ul>
        )}

        {ctas && ctas.length > 0 && (
            <div className="cta-row">
                {ctas.map((cta) => (
                    <Button key={cta.label} href={cta.href} className={cta.className}>
                        {cta.label}
                    </Button>
                ))}
            </div>
        )}

        {showSocial && <HeroSectionSocialLinks />}
    </>
);

const HeroSectionSocialLinks = () => (
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
);
