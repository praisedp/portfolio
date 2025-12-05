import { forwardRef, useEffect, useRef, RefObject } from 'react';
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
}: HeroSectionFrameProps) => {
    const socialLinksRef = useRef<HTMLDivElement | null>(null);
    useMagneticButtons(socialLinksRef, Boolean(showSocial));

    return (
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

            {showSocial && <HeroSectionSocialLinks ref={socialLinksRef} />}
        </>
    );
};

const HeroSectionSocialLinks = forwardRef<HTMLDivElement>((_, ref) => (
    <div className="social-links" ref={ref}>
        <a
            href="https://github.com/praisedp"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn"
        >
            <Github size={20} />
            <span>GitHub</span>
        </a>
        <a
            href="http://linkedin.com/in/pasan-perera-269920345"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn"
        >
            <Linkedin size={20} />
            <span>LinkedIn</span>
        </a>
    </div>
));

HeroSectionSocialLinks.displayName = 'HeroSectionSocialLinks';

const useMagneticButtons = (
    containerRef: RefObject<HTMLDivElement | null>,
    enabled: boolean
) => {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        if (typeof window === 'undefined') {
            return;
        }

        if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) {
            return;
        }

        const container = containerRef.current;
        if (!container) {
            return;
        }

        const buttons = Array.from(container.querySelectorAll<HTMLElement>('.magnetic-btn'));
        if (!buttons.length) {
            return;
        }

        const STRENGTH = 0.22;
        const MAX_TRANSLATE = 28;
        const LEAVE_DURATION = 0.6;

        const cleanupFns: Array<() => void> = [];

        buttons.forEach((btn) => {
            const onMove = (event: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const relX = event.clientX - rect.left;
                const relY = event.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const nx = ((relX - cx) / cx) || 0;
                const ny = ((relY - cy) / cy) || 0;

                let tx = nx * rect.width * STRENGTH;
                let ty = ny * rect.height * STRENGTH;

                tx = Math.max(-MAX_TRANSLATE, Math.min(MAX_TRANSLATE, tx));
                ty = Math.max(-MAX_TRANSLATE, Math.min(MAX_TRANSLATE, ty));

                btn.style.transition = 'transform 0.18s cubic-bezier(0.19, 1, 0.22, 1)';
                btn.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
                btn.classList.add('is-magnetic-active');
            };

            const onLeave = () => {
                btn.style.transition = `transform ${LEAVE_DURATION}s cubic-bezier(0.19, 1, 0.22, 1)`;
                btn.style.transform = 'translate3d(0, 0, 0)';
                btn.classList.remove('is-magnetic-active');
            };

            const onFocus = () => {
                btn.style.transition = 'transform 0.25s ease';
                btn.style.transform = 'translate3d(0, -6px, 0)';
            };

            const onBlur = () => {
                btn.style.transition = 'transform 0.25s ease';
                btn.style.transform = 'translate3d(0, 0, 0)';
                btn.classList.remove('is-magnetic-active');
            };

            btn.addEventListener('mousemove', onMove);
            btn.addEventListener('mouseleave', onLeave);
            btn.addEventListener('focus', onFocus);
            btn.addEventListener('blur', onBlur);

            cleanupFns.push(() => {
                btn.removeEventListener('mousemove', onMove);
                btn.removeEventListener('mouseleave', onLeave);
                btn.removeEventListener('focus', onFocus);
                btn.removeEventListener('blur', onBlur);
                btn.style.transition = '';
                btn.style.transform = '';
                btn.classList.remove('is-magnetic-active');
            });
        });

        return () => {
            cleanupFns.forEach((fn) => fn());
        };
    }, [containerRef, enabled]);
};
