import { HeroSectionFrame } from './HeroSectionFrame';

export const EducationSection = () => (
    <HeroSectionFrame
        eyebrow="Education"
        title="Data Science @ SLIIT"
        headline="Bachelor of Science (Hons), Data Science - Year 3"
        description="Coursework centers on statistical learning, distributed systems, and product management. I mentor peers on React, TypeScript, and analytical storytelling."
        highlights={[
            'Research lead for a sustainability-focused ML capstone',
            'Organized campus build nights to teach full-stack fundamentals',
            'Awarded top performer in Advanced Database Systems',
        ]}
    />
);
