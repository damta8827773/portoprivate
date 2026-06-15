import { Fragment, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useI18n } from '../../i18n/useI18n';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { db } from '../../lib/firebase';
import { sendReplyEmail } from '../../lib/emailjs';

const OWNER_EMAIL = 'damtafaiz@gmail.com';

const FLOATERS = [
  ['2%', '15%', '1.1rem', '0s', '0.07', '</>'],
  ['90%', '12%', '0.8rem', '1.4s', '0.06', '{ }'],
  ['5%', '70%', '0.9rem', '0.6s', '0.06', 'API'],
  ['87%', '62%', '1rem', '2s', '0.07', '[ ]'],
  ['48%', '90%', '0.75rem', '0.8s', '0.05', 'npm'],
  ['93%', '40%', '0.85rem', '1.7s', '0.06', '=>'],
] as const;

/** Celebratory burst in the brand's gold/bronze/neon palette. */
function fireConfetti() {
  const colors = ['#D4AF37', '#C9922A', '#B87333', '#fde68a', '#60a5fa'];
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors });
  setTimeout(() => confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors }), 150);
  setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors }), 150);
}

interface FsComment {
  id: string;
  name?: string;
  photo?: string;
  email?: string;
  comment?: string;
  rating?: number;
}
interface FsReply {
  id: string;
  name?: string;
  photo?: string;
  reply?: string;
}

function ReplyForm({ commentId, onSend }: { commentId: string; onSend: (id: string, text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <div className="reply-form-inline" style={{ display: 'flex' }}>
      <input className="reply-input" placeholder="Tulis balasan..." value={text} onChange={(e) => setText(e.target.value)} />
      <button
        className="reply-submit-btn"
        onClick={() => {
          if (text.trim()) {
            onSend(commentId, text.trim());
            setText('');
          }
        }}
      >
        <i className="ri-send-plane-fill" /> Kirim
      </button>
    </div>
  );
}

function ChatItem({
  c,
  replies,
  isOwnerViewer,
  onReply,
}: {
  c: FsComment;
  replies: FsReply[];
  isOwnerViewer: boolean;
  onReply: (id: string, text: string) => void;
}) {
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
                {c.name || 'Anonim'} {isOwnerMsg && <span className="owner-badge">Owner</span>}
              </span>
              <span className="chat-stars">{'⭐'.repeat(c.rating || 0)}</span>
            </div>
            <div className={`chat-bubble ${isOwnerMsg ? 'owner' : ''}`}>{c.comment}</div>
            {canReply && (
              <>
                <button className="chat-reply-btn" onClick={() => setReplyOpen((o) => !o)}>
                  <i className="ri-reply-line" /> Balas
                </button>
                {replyOpen && <ReplyForm commentId={c.id} onSend={onReply} />}
              </>
            )}
          </div>
        </div>
        <div className="chat-replies-container" style={{ marginLeft: 60 }}>
          {replies.map((r) => (
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
                <div className="chat-reply-bubble">{r.reply}</div>
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
  const { user, login, logout } = useFirebaseAuth();
  const [comments, setComments] = useState<FsComment[]>([]);
  const [replies, setReplies] = useState<Record<string, FsReply[]>>({});
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const isOwnerViewer = user?.email === OWNER_EMAIL;

  // Live comments from Firestore (restores the original visitor data).
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'asc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setComments(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<FsComment, 'id'>) })));
        setLoading(false);
      },
      () => setLoading(false),
    );
    return unsub;
  }, []);

  // Live replies per comment.
  const idsKey = comments.map((c) => c.id).join(',');
  useEffect(() => {
    if (!db || comments.length === 0) return;
    const unsubs = comments.map((c) =>
      onSnapshot(query(collection(db!, 'comments', c.id, 'replies'), orderBy('timestamp', 'asc')), (snap) => {
        setReplies((prev) => ({ ...prev, [c.id]: snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<FsReply, 'id'>) })) }));
      }),
    );
    return () => unsubs.forEach((u) => u());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [comments, replies]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || rating === 0) {
      alert('Isi pesan dan pilih bintang rating terlebih dahulu!');
      return;
    }
    if (!user || !db) return;
    await addDoc(collection(db, 'comments'), {
      name: user.name,
      photo: user.photo,
      email: user.email,
      comment: text,
      rating,
      timestamp: serverTimestamp(),
    });
    fireConfetti();
    setText('');
    setRating(0);
  };

  const sendReply = async (commentId: string, replyText: string) => {
    if (!user || !db) return;
    await addDoc(collection(db, 'comments', commentId, 'replies'), {
      name: user.name,
      photo: user.photo,
      reply: replyText,
      timestamp: serverTimestamp(),
    });
    // Notify the commenter by email (original EmailJS behaviour).
    const target = comments.find((c) => c.id === commentId);
    if (target?.email) {
      try {
        await sendReplyEmail({
          name: target.name || 'Teman',
          email: target.email,
          reply: replyText,
          fromName: user.name,
          fromPhoto: user.photo,
        });
      } catch (err) {
        // Reply is saved regardless; only the email notification failed.
        console.error('EmailJS error:', err);
      }
    }
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
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t('chat_loading')}</p>
          ) : !comments.length ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t('chat_empty')}</p>
          ) : (
            comments.map((c) => (
              <ChatItem key={c.id} c={c} replies={replies[c.id] || []} isOwnerViewer={isOwnerViewer} onReply={sendReply} />
            ))
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
