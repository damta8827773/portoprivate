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
      <Marquee skills={row1} direction="left" />
      <br />
      <Marquee skills={row2} direction="right" />
    </section>
  );
}
