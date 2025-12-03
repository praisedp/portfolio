import { HeroSectionFrame } from './HeroSectionFrame';

export const OverviewSection = () => (
    <HeroSectionFrame
        eyebrow="Current focus"
        title="Hi, I'm Pasan Perera"
        headline="Full-Stack Engineer & Data Science Undergraduate"
        description="Third-year Data Science undergraduate at SLIIT transforming data into decisions and ideas into clean, maintainable code."
        highlights={[
            'Designing resilient, data-informed product experiences',
            'Pairing thoughtful UX with scalable engineering practices',
            'Championing documentation so teams can move faster',
        ]}
        ctas={[
            { label: 'Download CV', href: 'Pasan_Perea_Resume.pdf', className: 'btn-secondary' },
        ]}
        showSocial
    />
);
