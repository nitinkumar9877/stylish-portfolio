import type { Experience } from '@/models/portfolio';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Timeline from './Timeline';
import styles from './StorySection.module.scss';

interface StorySectionProps {
  experience: Experience[];
  education: {
    period: string;
    qualification: string;
    institution: string;
    description: string;
  };
}

export default function StorySection({ experience, education }: StorySectionProps) {
  return (
    <section className={styles.section} id="story">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-4">
            <ScrollReveal className={styles.intro}>
              <Eyebrow>A little about me</Eyebrow>
              <h2>Good work comes from staying curious.</h2>
              <p>
                I bring a designer&apos;s eye and a developer&apos;s curiosity to every project. Here&apos;s a little of the path that got me here.
              </p>
            </ScrollReveal>
          </div>
          <div className="col-lg-7 offset-lg-1">
            <Timeline experience={experience} education={education} />
          </div>
        </div>
      </div>
    </section>
  );
}
