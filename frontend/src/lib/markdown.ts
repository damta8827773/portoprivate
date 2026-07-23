/**
 * Minimal markdown -> HTML renderer.
 *
 * Deliberately dependency-free: the blog only needs headings, lists, quotes,
 * fenced code, links, bold/italic and inline code. Everything is escaped first,
 * so post bodies can never inject markup.
 */

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Bold, italic, inline code and links - applied to already-escaped text. */
function renderInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    );
}

export function renderMarkdown(source: string): string {
  const lines = escapeHtml(source).split('\n');
  const html: string[] = [];

  let inCodeBlock = false;
  let listType: 'ul' | 'ol' | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  };

  const openList = (type: 'ul' | 'ol') => {
    if (listType === type) return;
    closeList();
    html.push(`<${type}>`);
    listType = type;
  };

  for (const line of lines) {
    // Fenced code blocks swallow every line until the closing fence.
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      if (inCodeBlock) {
        html.push('</code></pre>');
        inCodeBlock = false;
      } else {
        flushParagraph();
        closeList();
        html.push(`<pre class="md-code" data-lang="${fence[1] || 'text'}"><code>`);
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      html.push(line);
      continue;
    }

    if (line.trim() === '') {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const quote = line.match(/^&gt;\s?(.*)$/);
    if (quote) {
      flushParagraph();
      closeList();
      html.push(`<blockquote>${renderInline(quote[1])}</blockquote>`);
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      openList('ul');
      html.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }

    const numbered = line.match(/^\d+\.\s+(.*)$/);
    if (numbered) {
      flushParagraph();
      openList('ol');
      html.push(`<li>${renderInline(numbered[1])}</li>`);
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushParagraph();
      closeList();
      html.push('<hr />');
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  closeList();
  if (inCodeBlock) html.push('</code></pre>');

  return html.join('\n');
}

/** Rough reading time used when a post does not carry its own estimate. */
export function estimateReadingMinutes(source: string): number {
  const words = source.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
