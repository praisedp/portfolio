import { HeroSectionFrame } from './HeroSectionFrame';

export const AboutSection = () => (
    <HeroSectionFrame
        eyebrow="About"
        title="Curious builder with a data-first mindset"
        headline="Turning ambiguous problems into purposeful products"
        description="From freelancing gigs to campus projects, I lead with empathy, validate with data, and deliver with TypeScript, Python, and a stack of modern cloud tooling."
        highlights={[
            '3+ years crafting products across education, fintech, and analytics',
            'Comfortable owning both technical architecture and polished UI',
            'Shipping fast while keeping codebases approachable for teammates',
        ]}
    />
);
