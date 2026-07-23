import { assetUrl } from '../../lib/assetUrl';

/** Deterministic hue per slug so a project keeps the same colour everywhere. */
function hueFor(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  return hash;
}

function initials(title: string): string {
  return title
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

interface ProjectThumbProps {
  image: string;
  title: string;
  slug: string;
}

/**
 * Screenshot when one exists, otherwise a generated initials tile. Avoids the
 * broken-image gap for projects catalogued straight from local folders.
 */
export function ProjectThumb({ image, title, slug }: ProjectThumbProps) {
  if (image) {
    return (
      <img
        src={assetUrl(image)}
        alt={title}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = 'none';
          el.parentElement?.classList.add('thumb-failed');
        }}
      />
    );
  }

  const hue = hueFor(slug);
  return (
    <div
      className="project-thumb-fallback"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 62% 32%), hsl(${(hue + 48) % 360} 58% 20%))`,
      }}
      aria-label={title}
      role="img"
    >
      <span>{initials(title)}</span>
    </div>
  );
}
