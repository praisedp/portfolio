import { HeroSectionFrame } from './HeroSectionFrame';

export const ProjectsSection = () => (
    <HeroSectionFrame
        eyebrow="Projects"
        title="Shipping useful products"
        headline="Selected highlights that blend AI, product thinking, and web craftsmanship"
        description="Each build focuses on simplifying a workflow: faster predictions for manufacturing teams, intuitive dashboards for analysts, and bespoke interfaces for clients."
        highlights={[
            'Predictive Quality Control suite combining Python microservices with a Vite + React dashboard',
            'Explainable AI assistant that translates model outputs into stakeholder-ready stories',
            'Minimalist design system powering multiple freelance marketing sites',
        ]}
        ctas={[
            { label: 'View GitHub', href: 'https://github.com/praisedp' },
        ]}
    />
);
