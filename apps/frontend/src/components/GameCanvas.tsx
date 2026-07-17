import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { MainScene } from '../phaser/MainScene';

export function GameCanvas() {
  const ref = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!ref.current || gameRef.current) return;

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      parent: ref.current,
      width: 1024,
      height: 640,
      backgroundColor: '#09111c',
      physics: { default: 'arcade' },
      scene: [MainScene],
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div className="overflow-hidden rounded-xl border border-slate-800 shadow-2xl" ref={ref} />;
}
