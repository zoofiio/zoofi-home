import { useEffect, useState } from 'react';

export function ProcessAnimation({ step }: { step: string }) {
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [failed, setFailed] = useState(false);
  const asset = `${import.meta.env.BASE_URL}images/zoo-brand/process-${step}`;

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  if (reducedMotion || failed) {
    return <img className="zoo-step-image" src={`${asset}.webp`} width="96" height="96" alt="" loading="lazy" />;
  }

  return (
    <video
      className="zoo-step-image"
      src={`${asset}.mp4`}
      poster={`${asset}.webp`}
      width="96"
      height="96"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      onError={() => setFailed(true)}
    />
  );
}
