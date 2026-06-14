import { Fragment, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { useI18n } from '../../i18n/useI18n';
import { useComments, useCreateComment } from '../../hooks/useComments';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import type { Comment } from '@damta/types';

/** Celebratory burst in the brand's gold/bronze/neon palette. */
function fireConfetti() {
  const colors = ['#D4AF37', '#C9922A', '#B87333', '#fde68a', '#60a5fa'];
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors });
  setTimeout(() => confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors }), 150);
  setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors }), 150);
}

const OWNER_EMAIL = 'damtafaiz@gmail.com';

const FLOATERS = [
  ['2%', '15%', '1.1rem', '0s', '0.07', '</>'],
  ['90%', '12%', '0.8rem', '1.4s', '0.06', '{ }'],
  ['5%', '70%', '0.9rem', '0.6s', '0.06', 'API'],
  ['87%', '62%', '1rem', '2s', '0.07', '[ ]'],
  ['48%', '90%', '0.75rem', '0.8s', '0.05', 'npm'],
  ['93%', '40%', '0.85rem', '1.7s', '0.06', '=>'],
] as const;

function ReplyForm({ parentId, onSent }: { parentId: number; onSent: () => void }) {
  const { user } = useFirebaseAuth();
  const create = useCreateComment();
  const [text, setText] = useState('');
  const submit = async () => {
    if (!text.trim() || !user) return;
    await create.mutateAsync({ comment: text, parentId });
    setText('');
    onSent();
  };
  return (
    <div className="reply-form-inline" style={{ display: 'flex' }}>
      <input className="reply-input" placeholder="Tulis balasan..." value={text} onChange={(e) => setText(e.target.value)} />
      <button className="reply-submit-btn" onClick={submit}>
        <i className="ri-send-plane-fill" /> Kirim
      </button>
    </div>
  );
}

function ChatItem({ c, isOwnerViewer }: { c: Comment; isOwnerViewer: boolean }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const isOwnerMsg = c.email === OWNER_EMAIL;
  const align = isOwnerMsg ? 'align-right' : 'align-left';
  const canReply = isOwnerViewer && !isOwnerMsg;

  return (
    <div className={`chat-item-wrapper ${align}`}>
      <div style={{ width: '100%' }}>
        <div className={`chat-item ${align}`}>
          <img
            src={c.photo || ''}
            className="chat-avatar"
            onError={(e) => ((e.currentTarget as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=U&background=random')}
          />
          <div className="chat-content">
            <div className="chat-header">
              <span className="chat-name">
                {c.name} {isOwnerMsg && <span className="owner-badge">Owner</span>}
              </span>
              <span className="chat-stars">{'⭐'.repeat(c.rating || 0)}</span>
            </div>
            <div className={`chat-bubble ${isOwnerMsg ? 'owner' : ''}`}>{c.comment}</div>
            {canReply && (
              <>
                <button className="chat-reply-btn" onClick={() => setReplyOpen((o) => !o)}>
                  <i className="ri-reply-line" /> Balas
                </button>
                {replyOpen && <ReplyForm parentId={c.id} onSent={() => setReplyOpen(false)} />}
              </>
            )}
          </div>
        </div>
        <div className="chat-replies-container" style={{ marginLeft: 60 }}>
          {c.replies?.map((r) => (
            <div className="chat-reply-item" key={r.id}>
              <img
                src={r.photo || ''}
                className="chat-reply-avatar"
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=D&background=60a5fa&color=fff')}
              />
              <div>
                <div className="chat-reply-name">
                  <i className="ri-shield-star-fill" style={{ fontSize: '0.65rem' }} />
                  {r.name || 'Owner'}
                </div>
                <div className="chat-reply-bubble">{r.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Comments() {
  const { t } = useI18n();
  const { data: comments, isLoading } = useComments();
  const { user, login, logout } = useFirebaseAuth();
  const create = useCreateComment();
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const isOwnerViewer = user?.email === OWNER_EMAIL;

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [comments]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || rating === 0) {
      alert('Isi pesan dan pilih bintang rating terlebih dahulu!');
      return;
    }
    if (!user) return;
    await create.mutateAsync({ comment: text, rating });
    fireConfetti();
    setText('');
    setRating(0);
  };

  return (
    <section id="comments" className="hidden" style={{ background: 'transparent' }}>
      <div className="comment-tech-floaters" aria-hidden="true">
        {FLOATERS.map(([x, y, s, d, o, txt], i) => (
          <span key={i} className="ctf" style={{ ['--x' as string]: x, ['--y' as string]: y, ['--s' as string]: s, ['--d' as string]: d, ['--o' as string]: o }}>
            {txt}
          </span>
        ))}
      </div>
      <h2 className="neon-title" style={{ marginBottom: 20 }}>{t('comment_title')}</h2>

      <div className="chat-wrapper">
        <span className="card-corner tl" aria-hidden="true" />
        <span className="card-corner tr" aria-hidden="true" />
        <span className="card-corner bl" aria-hidden="true" />
        <span className="card-corner br" aria-hidden="true" />
        <div className="card-scan" aria-hidden="true" />
        <div className="chat-terminal-bar">
          <span className="ctb-dot" style={{ ['--dc' as string]: '#f87171' }} />
          <span className="ctb-dot" style={{ ['--dc' as string]: '#fbbf24' }} />
          <span className="ctb-dot" style={{ ['--dc' as string]: '#4ade80' }} />
          <span className="ctb-title">// ruang-obrolan.ts ~ portfolio</span>
          <span className="ctb-blink" />
        </div>

        <div className="chat-messages" ref={listRef}>
          {isLoading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t('chat_loading')}</p>
          ) : !comments?.length ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t('chat_empty')}</p>
          ) : (
            comments.map((c) => <ChatItem key={c.id} c={c} isOwnerViewer={isOwnerViewer} />)
          )}
        </div>

        <div className="chat-input-container">
          {!user ? (
            <div className="auth-section">
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 10 }}>{t('chat_login_prompt')}</p>
              <button className="btn-auth" onClick={login}>
                <img src="/assets/img/google.png" alt="Google" />
                <span>{t('btn_login_google')}</span>
              </button>
            </div>
          ) : (
            <form className="comment-input-section" style={{ display: 'flex' }} onSubmit={submit}>
              <div className="user-active-info">
                <img src={user.photo} alt="User" />
                <span>{user.name}</span>
                <div className="star-rating">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <Fragment key={n}>
                      <input type="radio" name="stars" id={`star${n}`} value={n} checked={rating === n} onChange={() => setRating(n)} />
                      <label htmlFor={`star${n}`}>★</label>
                    </Fragment>
                  ))}
                </div>
                <button type="button" className="btn-logout" onClick={logout}>{t('btn_logout')}</button>
              </div>
              <div className="chat-input-row">
                <textarea placeholder={t('comment_placeholder')} value={text} onChange={(e) => setText(e.target.value)} required />
                <button type="submit" className="btn-send"><i className="ri-send-plane-fill" /></button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
