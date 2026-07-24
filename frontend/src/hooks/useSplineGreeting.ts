import { useEffect, type RefObject } from 'react';
import { useAppStore } from '../store/useAppStore';

const SHOW_MS = 3800;

/** Spline robot greeting: typed speech bubble + Web Speech API + logo hiding. */
export function useSplineGreeting(wrapRef: RefObject<HTMLElement>) {
  const lang = useAppStore.getState().lang;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const viewer = wrap.querySelector<HTMLElement>('#splineViewer');
    const loading = wrap.querySelector<HTMLElement>('#splineLoading');
    let greeted = false;
    const timers: number[] = [];

    const isEN = () => useAppStore.getState().lang === 'en';

    const showBubble = () => {
      wrap.querySelector('.robot-speech')?.remove();
      const lines = isEN()
        ? ['Hi there! 👋', "Welcome to Damta's", 'Portfolio!']
        : ['Hai! 👋', 'Selamat datang di', 'Portofolio Damta!'];
      const bubble = document.createElement('div');
      bubble.className = 'robot-speech';
      wrap.appendChild(bubble);
      let li = 0;
      const typeLine = () => {
        if (li >= lines.length) {
          const id = window.setTimeout(() => {
            bubble.classList.add('fade-out');
            window.setTimeout(() => bubble.parentNode && bubble.remove(), 400);
          }, SHOW_MS);
          timers.push(id);
          return;
        }
        if (li > 0) bubble.appendChild(document.createElement('br'));
        const span = document.createElement('span');
        bubble.appendChild(span);
        const txt = lines[li];
        let ci = 0;
        const iv = window.setInterval(() => {
          span.textContent += txt[ci++];
          if (ci >= txt.length) {
            clearInterval(iv);
            li++;
            window.setTimeout(typeLine, 130);
          }
        }, 36);
        timers.push(iv);
      };
      typeLine();
    };

    const speak = () => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      // Mute the background video while the robot talks so the two audios don't
      // collide ("nabrak"); restore the previous state when it finishes.
      const video = document.querySelector<HTMLVideoElement>('.bg-video');
      const wasMuted = video?.muted ?? true;
      if (video) video.muted = true;
      const restore = () => {
        if (video) video.muted = wasMuted;
      };
      window.setTimeout(() => {
        const utter = new SpeechSynthesisUtterance(
          isEN()
            ? 'Hi! Welcome to Damta Noviyan portfolio!'
            : 'Hai! Selamat datang di portofolio Damta Noviyan!',
        );
        utter.lang = isEN() ? 'en-US' : 'id-ID';
        utter.rate = 1.0;
        utter.pitch = 1.1;
        utter.volume = 0.85;
        utter.onend = restore;
        utter.onerror = restore;
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utter);
      }, 150);
    };

    const greet = (byUser: boolean) => {
      showBubble();
      if (byUser) speak();
    };

    const hideSplineLogo = () => {
      const vr = (viewer as unknown as { shadowRoot?: ShadowRoot })?.shadowRoot;
      if (!vr || vr.querySelector('#_hsl')) return;
      const s = document.createElement('style');
      s.id = '_hsl';
      s.textContent =
        'a[href*="spline"],#logo,[class*="logo"]{display:none!important;opacity:0!important;pointer-events:none!important}';
      vr.appendChild(s);
    };
    [0, 800, 2000, 4000].forEach((ms) => timers.push(window.setTimeout(hideSplineLogo, ms)));

    const hideLoading = () => {
      if (!loading) return;
      loading.style.opacity = '0';
      window.setTimeout(() => loading && (loading.style.display = 'none'), 500);
      hideSplineLogo();
    };
    viewer?.addEventListener('load', hideLoading);
    viewer?.addEventListener('load', hideSplineLogo);
    timers.push(window.setTimeout(hideLoading, 10000));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          wrap.style.opacity = '1';
          if (!greeted) {
            greeted = true;
            timers.push(window.setTimeout(() => greet(false), 2400));
          }
        });
      },
      { threshold: 0.1 },
    );
    obs.observe(document.getElementById('home') || wrap);

    // Clicking the robot itself (or the label) makes it talk. Guard against a
    // rapid re-trigger so overlapping clicks don't stack speech.
    const label = wrap.querySelector<HTMLElement>('.robot-label');
    const card = wrap.querySelector<HTMLElement>('.spline-card');
    let busy = false;
    const onClick = () => {
      if (busy) return;
      busy = true;
      window.setTimeout(() => (busy = false), 1200);
      greet(true);
    };
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      onClick();
    };
    label?.addEventListener('click', onClick);
    label?.addEventListener('touchend', onTouch, { passive: false });
    card?.addEventListener('click', onClick);
    card?.addEventListener('touchend', onTouch, { passive: false });

    return () => {
      timers.forEach((t) => clearTimeout(t));
      obs.disconnect();
      viewer?.removeEventListener('load', hideLoading);
      viewer?.removeEventListener('load', hideSplineLogo);
      label?.removeEventListener('click', onClick);
      label?.removeEventListener('touchend', onTouch);
      card?.removeEventListener('click', onClick);
      card?.removeEventListener('touchend', onTouch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapRef, lang]);
}
