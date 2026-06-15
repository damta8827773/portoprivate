import emailjs from '@emailjs/browser';

/**
 * EmailJS - sends a notification email to a commenter when the owner replies
 * (mirrors the original site). Keys are EmailJS *public* identifiers; override
 * via VITE_EMAILJS_* env vars to point at a different EmailJS account/template.
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_x3ywsyi';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'bm3li3y';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'mKDqgvRxiQmiif3aQ';

let initialized = false;
function ensureInit() {
  if (!initialized) {
    emailjs.init({ publicKey: PUBLIC_KEY });
    initialized = true;
  }
}

/** Notifies the commenter that the owner replied. Resolves silently if no email. */
export async function sendReplyEmail(params: {
  name: string;
  email: string;
  reply: string;
  fromName?: string;
  fromPhoto?: string;
}) {
  if (!params.email) return;
  ensureInit();
  const photo =
    params.fromPhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(params.fromName || 'Damta')}&background=D4AF37&color=fff`;
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    name: params.name || 'Teman',
    email: params.email,
    to_email: params.email,
    message: params.reply,
    from_name: params.fromName || 'Damta Noviyan Muhamad Faiz',
    // Profile photo of the replier (use in the template as <img src="{{photo}}">).
    photo,
    from_photo: photo,
    time: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    portfolio_url: 'https://damtaweb.com',
  });
}
