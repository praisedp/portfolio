import { OverviewSection } from './OverviewSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { EducationSection } from './EducationSection';
import { ContactSection } from './ContactSection';

export type HeroSectionComponent = () => JSX.Element;

export const HERO_SECTION_COMPONENTS: Record<string, HeroSectionComponent> = {
    overview: OverviewSection,
    skills: SkillsSection,
    projects: ProjectsSection,
    education: EducationSection,
    contact: ContactSection,
};
