import { useI18n } from '../../i18n/useI18n';
import { useSkills } from '../../hooks/useContent';
import type { Skill } from '@damta/types';

function TechItem({ skill }: { skill: Skill }) {
  const longText = skill.name.length > 12;
  return (
    <div className={`tech-item${longText ? ' long-text-box' : ''}`}>
      <img
        src={`/assets/img/${skill.image.replace('assets/img/', '')}`}
        alt={skill.name}
        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
      />
      <span>{skill.name}</span>
    </div>
  );
}

// #4 Bento grid - tech grouped into varied-size cards.
const BENTO = [
  { size: 'lg', icon: 'ri-reactjs-line', title: 'Frontend', tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Vite', 'HTML5', 'CSS3'] },
  { size: 'wide', icon: 'ri-server-line', title: 'Backend', tags: ['Node.js', 'Express', 'PHP', 'Hono'] },
  { size: '', icon: 'ri-database-2-line', title: 'Database', tags: ['MySQL', 'Prisma', 'Firebase'] },
  { size: '', icon: 'ri-cloud-line', title: 'DevOps', tags: ['Docker', 'GitHub', 'cPanel'] },
  { size: 'wide', icon: 'ri-robot-2-line', title: 'AI & Tools', tags: ['Gemini', 'Python', 'VS Code'] },
  { size: '', icon: 'ri-cpu-line', title: 'Systems', tags: ['Kotlin', 'Rust', 'C++', 'Go'] },
] as const;

function BentoGrid() {
  return (
    <div className="bento-grid">
      {BENTO.map((b) => (
        <div key={b.title} className={`bento-card border-beam ${b.size}`}>
          <i className={`bento-ico ${b.icon}`} />
          <div className="bento-title">{b.title}</div>
          <div className="bento-tags">
            {b.tags.map((tag) => (
              <span key={tag} className="bento-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Marquee({ skills, direction }: { skills: Skill[]; direction: 'left' | 'right' }) {
  // Duplicate the list for a seamless infinite loop (as in the original markup).
  const doubled = [...skills, ...skills];
  return (
    <div className="marquee-wrapper">
      <div className={`marquee-content scroll-${direction}`}>
        {doubled.map((s, i) => (
          <TechItem key={`${s.id}-${i}`} skill={s} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const { t } = useI18n();
  const { data } = useSkills();
  const row1 = (data ?? []).filter((s) => s.row === 1);
  const row2 = (data ?? []).filter((s) => s.row === 2);

  return (
    <section id="skill" className="skill-section hidden">
      <h2>{t('skill_title')}</h2>
      <BentoGrid />
      <Marquee skills={row1} direction="left" />
      <br />
      <Marquee skills={row2} direction="right" />
    </section>
  );
}
