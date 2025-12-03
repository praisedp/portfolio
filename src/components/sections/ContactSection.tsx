import { HeroSectionFrame } from './HeroSectionFrame';

export const ContactSection = () => (
    <HeroSectionFrame
        eyebrow="Contact"
        title="Let's build the next thing"
        headline="Currently open for full-time internships and collaborative projects"
        description="I thrive in teams that care about craft, feedback loops, and measurable impact. If that sounds like yours, let's talk."
        highlights={[
            'Based in Sri Lanka with overlap across EU and US time zones',
            'Comfortable working async with thoughtful written updates',
            'Happy to hop on technical deep dives or product strategy chats',
        ]}
        ctas={[
            { label: 'Connect on LinkedIn', href: 'http://linkedin.com/in/pasan-perera-269920345' },
        ]}
        showSocial
    />
);
