import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { VS_TECH } from './vsTechData';

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function Folder({ name, color, defaultOpen = false, children }: { name: string; color: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`vs-folder${open ? ' open' : ''}`}>
      <div className="vs-folder-head" onClick={() => setOpen((o) => !o)}>
        <i className="ri-arrow-right-s-line vs-arrow" />
        <i className="ri-folder-fill" style={{ color }} />
        <span>{name}</span>
      </div>
      <div className="vs-folder-body">{children}</div>
    </div>
  );
}

function File({ tech, label, icon, img, color, onSelect, selectedLabel }: { tech: string; label: string; icon?: string; img?: string; color?: string; onSelect: (tech: string, label: string) => void; selectedLabel: string | null }) {
  return (
    <div className={`vs-file${selectedLabel === label ? ' active' : ''}`} onClick={() => onSelect(tech, label)}>
      {img ? <img src={`/assets/img/${img}`} className="vs-icon-img" alt="" /> : <i className={icon} style={{ color, fontSize: 13 }} />}
      {' '}
      {label}
    </div>
  );
}

function DetailPanel({ tech }: { tech: string }) {
  const t = VS_TECH[tech];
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    requestAnimationFrame(() => {
      if (barRef.current) barRef.current.style.width = `${t.level}%`;
    });
  }, [t.level]);

  const iconHtml = t.img ? (
    <img src={`/assets/img/${t.img.replace('assets/img/', '')}`} className="vs-detail-img" alt="" />
  ) : (
    <i className={`${t.icon} vs-detail-icon-txt`} style={{ color: t.color }} />
  );

  return (
    <div className="vs-detail">
      <div className="vs-detail-header">
        {iconHtml}
        <div>
          <div className="vs-detail-name">{tech}</div>
          <div className="vs-detail-cat">{t.cat}</div>
        </div>
      </div>
      <pre className="vs-detail-code">{escapeHtml(t.code)}</pre>
      <div className="vs-bar-label">
        <span>Profisiensi</span>
        <span>{t.level}%</span>
      </div>
      <div className="vs-bar-bg">
        <div className="vs-bar-fill" ref={barRef} style={{ width: 0 }} />
      </div>
      <div className="vs-used-title">Digunakan di</div>
      <div>
        {t.projects.map((p) => (
          <span key={p} className="vs-tag">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  const { t } = useI18n();
  const [sel, setSel] = useState<string | null>(null);
  const [selLabel, setSelLabel] = useState<string | null>(null);
  const selectFile = (tech: string, label: string) => {
    setSel(tech);
    setSelLabel(label);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fileProps = (_tech: string) => ({ onSelect: selectFile, selectedLabel: selLabel });

  return (
    <section id="stack">
      <h2 className="hidden neon-title-blue">{t('stack_title')}</h2>
      <p className="stack-desc hidden">{t('stack_desc')}</p>

      <div className="vscode-window hidden">
        <div className="vscode-titlebar">
          <div className="vscode-dots">
            <span style={{ background: '#ff5f57' }} />
            <span style={{ background: '#ffbd2e' }} />
            <span style={{ background: '#28c840' }} />
          </div>
          <span className="vscode-wintitle">damta-portfolio — VS Code</span>
        </div>

        <div className="vscode-body">
          <div className="vscode-sidebar">
            <div className="vs-sidebar-title">
              <i className="ri-file-list-3-line" /> EXPLORER
            </div>
            <div className="vs-tree">
              <div className="vs-root-folder">
                <i className="ri-folder-open-fill" style={{ color: '#e3b341' }} /> DAMTA-PORTFOLIO
              </div>

              <Folder name="apps" color="#e3b341" defaultOpen>
                <Folder name="web" color="#60a5fa" defaultOpen>
                  <Folder name="app" color="#60a5fa">
                    <File tech="Next.js" label="page.tsx" img="nextjs.png" {...fileProps('Next.js')} />
                    <File tech="Next.js" label="layout.tsx" img="nextjs.png" {...fileProps('Next.js')} />
                    <File tech="TypeScript" label="error.tsx" img="typescript.png" {...fileProps('TypeScript')} />
                  </Folder>
                  <Folder name="components" color="#60a5fa">
                    <File tech="React.js" label="Button.tsx" img="react.png" {...fileProps('React.js')} />
                    <File tech="React.js" label="Card.tsx" img="react.png" {...fileProps('React.js')} />
                    <File tech="Framer Motion" label="Motion.tsx" icon="ri-pulse-line" color="#e74c3c" {...fileProps('Framer Motion')} />
                  </Folder>
                  <Folder name="styles" color="#60a5fa">
                    <File tech="Tailwind CSS" label="globals.css" img="tailwind.png" {...fileProps('Tailwind CSS')} />
                    <File tech="CSS3" label="components.css" icon="ri-css3-fill" color="#264de4" {...fileProps('CSS3')} />
                  </Folder>
                  <File tech="TypeScript" label="types.ts" img="typescript.png" {...fileProps('TypeScript')} />
                  <File tech="GSAP" label="animations.ts" icon="ri-magic-line" color="#88ce02" {...fileProps('GSAP')} />
                  <File tech="Vite" label="next.config.ts" icon="ri-flashlight-line" color="#a855f7" {...fileProps('Vite')} />
                </Folder>

                <Folder name="api" color="#34d399">
                  <Folder name="src" color="#34d399">
                    <File tech="Hono" label="index.ts" icon="ri-fire-line" color="#e36002" {...fileProps('Hono')} />
                    <File tech="Express.js" label="routes.ts" icon="ri-server-line" color="#888" {...fileProps('Express.js')} />
                    <File tech="NextAuth" label="middleware.ts" icon="ri-shield-keyhole-line" color="#9c5de9" {...fileProps('NextAuth')} />
                    <File tech="Node.js" label="server.ts" img="node.png" {...fileProps('Node.js')} />
                  </Folder>
                  <Folder name="prisma" color="#5a67d8">
                    <File tech="Prisma ORM" label="schema.prisma" icon="ri-database-2-line" color="#5a67d8" {...fileProps('Prisma ORM')} />
                    <File tech="MySQL" label="migrations/" img="mysql.png" {...fileProps('MySQL')} />
                  </Folder>
                </Folder>

                <Folder name="legacy" color="#a78bfa">
                  <File tech="PHP" label="absensi.php" img="php.png" {...fileProps('PHP')} />
                  <File tech="PHP" label="ecommerce.php" img="php.png" {...fileProps('PHP')} />
                  <File tech="Bootstrap" label="layout.php" img="bootstrap.png" {...fileProps('Bootstrap')} />
                  <File tech="MySQL" label="schema.sql" img="mysql.png" {...fileProps('MySQL')} />
                </Folder>
              </Folder>

              <Folder name="packages" color="#fbbf24">
                <Folder name="database" color="#a78bfa">
                  <File tech="Supabase" label="supabase.ts" icon="ri-database-fill" color="#3ecf8e" {...fileProps('Supabase')} />
                  <File tech="MongoDB" label="models.ts" icon="ri-leaf-line" color="#4db33d" {...fileProps('MongoDB')} />
                  <File tech="Redis" label="cache.ts" icon="ri-speed-line" color="#dc382d" {...fileProps('Redis')} />
                  <File tech="Firebase" label="firestore.ts" img="firebase.png" {...fileProps('Firebase')} />
                </Folder>
                <Folder name="services" color="#34d399">
                  <File tech="Midtrans" label="payment.ts" icon="ri-bank-card-line" color="#003d73" {...fileProps('Midtrans')} />
                  <File tech="Cloudinary" label="storage.ts" icon="ri-cloud-line" color="#3448c5" {...fileProps('Cloudinary')} />
                  <File tech="Gemini AI" label="ai.ts" img="gemini.png" {...fileProps('Gemini AI')} />
                  <File tech="NextAuth" label="auth.ts" icon="ri-shield-keyhole-line" color="#9c5de9" {...fileProps('NextAuth')} />
                </Folder>
                <Folder name="ui" color="#60a5fa">
                  <File tech="JavaScript" label="vanilla.js" icon="ri-javascript-fill" color="#f7df1e" {...fileProps('JavaScript')} />
                  <File tech="Three.js" label="scene.js" icon="ri-box-3-line" color="#049ef4" {...fileProps('Three.js')} />
                  <File tech="HTML5" label="template.html" icon="ri-html5-fill" color="#e34f26" {...fileProps('HTML5')} />
                </Folder>
              </Folder>

              <Folder name="infrastructure" color="#fb923c">
                <Folder name="docker" color="#2496ed">
                  <File tech="Docker" label="Dockerfile" icon="ri-ship-line" color="#2496ed" {...fileProps('Docker')} />
                  <File tech="Docker" label="docker-compose.yml" icon="ri-ship-line" color="#2496ed" {...fileProps('Docker')} />
                </Folder>
                <Folder name=".github" color="#f1f5f9">
                  <File tech="GitHub" label="ci.yml" img="github.png" {...fileProps('GitHub')} />
                  <File tech="GitHub" label="deploy.yml" img="github.png" {...fileProps('GitHub')} />
                </Folder>
                <File tech="cPanel" label="deploy.sh" img="cpanel.png" {...fileProps('cPanel')} />
                <File tech="Google Search Console" label="sitemap.xml" img="google search console.png" {...fileProps('Google Search Console')} />
                <File tech="VS Code" label=".vscode/" img="vscode.png" {...fileProps('VS Code')} />
              </Folder>

              <div className="vs-file vs-root-file" onClick={() => setSel('Project')}>
                <i className="ri-settings-3-line" style={{ color: '#fbbf24', fontSize: 13 }} /> turbo.json
              </div>
              <div className="vs-file vs-root-file" onClick={() => setSel('Project')}>
                <i className="ri-settings-3-line" style={{ color: '#94a3b8', fontSize: 13 }} /> package.json
              </div>
              <div className="vs-file vs-root-file" onClick={() => setSel('TypeScript')}>
                <img src="/assets/img/typescript.png" className="vs-icon-img" alt="" /> tsconfig.json
              </div>
              <div className="vs-file vs-root-file" onClick={() => setSel('Project')}>
                <i className="ri-file-text-line" style={{ color: '#94a3b8', fontSize: 13 }} /> README.md
              </div>
            </div>
          </div>

          <div className="vscode-main" id="vsMain">
            {sel && VS_TECH[sel] ? (
              <DetailPanel tech={sel} />
            ) : (
              <div className="vs-welcome">
                <div className="vs-welcome-icon">
                  <i className="ri-code-s-slash-line" />
                </div>
                <h3>{t('vs_select_file')}</h3>
                <p>{t('vs_explore_stack')}</p>
                <div className="vs-stats-row">
                  <div className="vs-stat"><span className="vs-stat-num">8+</span><span className="vs-stat-label">{t('vs_stat_projects')}</span></div>
                  <div className="vs-stat"><span className="vs-stat-num">25+</span><span className="vs-stat-label">{t('vs_stat_tech')}</span></div>
                  <div className="vs-stat"><span className="vs-stat-num">3+</span><span className="vs-stat-label">{t('vs_stat_years')}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="vscode-statusbar">
          <span><i className="ri-git-branch-line" /> main</span>
          <span><i className="ri-check-line" /> 0 errors</span>
          <span><i className="ri-checkbox-blank-circle-fill" style={{ color: '#28c840', fontSize: '0.6rem' }} /> Full Stack Developer</span>
          <span className="sb-right">UTF-8 &nbsp;|&nbsp; Poppins</span>
        </div>
      </div>
    </section>
  );
}
