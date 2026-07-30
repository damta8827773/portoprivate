/**
 * Comment likes + reports - self-hosted, file-backed (no third-party key, works
 * without MySQL). Likes are public (anyone can like, Instagram-style); reports
 * are owner-only signals stored so the owner can moderate. Persisted to JSON.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_FILE = join(dirname(fileURLToPath(import.meta.url)), '../../data/likes.json');

interface LikesStore {
  /** commentId -> like count. */
  likes: Record<string, number>;
  /** commentId -> report count (owner-only visibility on the frontend). */
  reports: Record<string, number>;
}

const EMPTY: LikesStore = { likes: {}, reports: {} };
let store: LikesStore | null = null;

function load(): LikesStore {
  if (store) return store;
  try {
    const raw = JSON.parse(readFileSync(DATA_FILE, 'utf8')) as LikesStore;
    store = { likes: raw.likes ?? {}, reports: raw.reports ?? {} };
  } catch {
    store = { ...EMPTY };
  }
  return store;
}

function persist() {
  try {
    mkdirSync(dirname(DATA_FILE), { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(store), 'utf8');
  } catch {
    /* best-effort: a failed write just means this like isn't persisted */
  }
}

export function getLikes() {
  const s = load();
  return { likes: s.likes, reports: s.reports };
}

/** Increment (or decrement when unliking) a comment's like count. */
export function toggleLike(commentId: string, liked: boolean): number {
  const s = load();
  const current = s.likes[commentId] ?? 0;
  const next = Math.max(0, current + (liked ? 1 : -1));
  s.likes[commentId] = next;
  persist();
  return next;
}

/** Flag a comment for the owner. Returns the new report count. */
export function reportComment(commentId: string): number {
  const s = load();
  const next = (s.reports[commentId] ?? 0) + 1;
  s.reports[commentId] = next;
  persist();
  return next;
}
