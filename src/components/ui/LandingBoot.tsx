import { useEffect, useState } from 'react';
import { BootSequence } from '@/components/thegridcn/boot-sequence';

const BOOT_KEY = 'encodere-booted';

const steps = [
  { label: 'INIT encodere.se kernel', duration: 400 },
  { label: 'LOAD tecnomancia modules', duration: 500 },
  { label: 'BIND cybermagia protocols', duration: 450 },
  { label: 'SYNC lunar cycle calendar', duration: 350 },
  { label: 'READY', duration: 300 },
];

export function LandingBoot() {
  const [booting, setBooting] = useState(() => {
    if (typeof sessionStorage === 'undefined') return true;
    return !sessionStorage.getItem(BOOT_KEY);
  });

  useEffect(() => {
    if (!booting) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      sessionStorage.setItem(BOOT_KEY, '1');
      setBooting(false);
    }
  }, [booting]);

  function finish() {
    sessionStorage.setItem(BOOT_KEY, '1');
    setBooting(false);
  }

  if (!booting) return null;

  return (
    <div className="encodere-landing-boot">
      <BootSequence steps={steps} title="ENCODERE.SE BOOT" onComplete={finish} />
    </div>
  );
}
