import React, { useRef, useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";

const LazyLottie = React.lazy(() => import("lottie-react"));

// Helper to generate random positions within a bounding box
function getRandomPosition(bounds: DOMRect) {
  const x = Math.random() * (bounds.width - 60); // 60 = bird width
  const y = Math.random() * (bounds.height - 60); // 60 = bird height
  return { x, y };
}

// Helper to get element center
function getElementCenter(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

interface BirdsAnimationProps {
  sitRefs: React.RefObject<HTMLElement>[];
  numBirds?: number;
  className?: string;
}

const BIRD_SIZE = 60;
const SIT_DURATION = 1800; // ms
const FLY_DURATION = 1300; // ms
// We'll load these dynamically
// const BIRD_ANIMATIONS = [bird1, bird2];

export const BirdsAnimation: React.FC<BirdsAnimationProps> = ({ sitRefs, numBirds = 3, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [birdAnimations, setBirdAnimations] = useState<any[]>([]);
  const [birdStates, setBirdStates] = useState<any[]>([]);

  // Dynamically load bird animations on mount
  useEffect(() => {
    let isMounted = true;
    Promise.all([
      import("@/public/lottie/bird1.json"),
      import("@/public/lottie/bird2.json")
    ]).then(([b1, b2]) => {
      if (isMounted) {
        setBirdAnimations([b1.default, b2.default]);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Initialize birds at random sit elements when animations are loaded
  useEffect(() => {
    if (!containerRef.current || sitRefs.length === 0 || birdAnimations.length === 0) return;
    setBirdStates(
      Array.from({ length: numBirds }, () => {
        const idx = Math.floor(Math.random() * sitRefs.length);
        const el = sitRefs[idx].current;
        if (!el) return { pos: { x: 0, y: 0 }, sitIndex: idx, flying: false, animation: birdAnimations[Math.floor(Math.random() * birdAnimations.length)] };
        const rect = el.getBoundingClientRect();
        return {
          pos: { x: rect.left, y: rect.top },
          sitIndex: idx,
          flying: false,
          animation: birdAnimations[Math.floor(Math.random() * birdAnimations.length)],
        };
      })
    );
    // eslint-disable-next-line
  }, [containerRef, sitRefs.length, birdAnimations, numBirds]);
  useEffect(() => {
    if (!containerRef.current || sitRefs.length === 0) return;
    setBirdStates(states =>
      states.map(() => {
        const idx = Math.floor(Math.random() * sitRefs.length);
        const el = sitRefs[idx].current;
        if (!el) return { pos: { x: 0, y: 0 }, sitIndex: idx, flying: false, animation: birdAnimations[Math.floor(Math.random() * birdAnimations.length)] };
        const rect = el.getBoundingClientRect();
        return {
          pos: { x: rect.left, y: rect.top },
          sitIndex: idx,
          flying: false,
          animation: birdAnimations[Math.floor(Math.random() * birdAnimations.length)],
        };
      })
    );
    // eslint-disable-next-line
  }, [containerRef, sitRefs.length]);

  // Bird flight logic
  useEffect(() => {
    if (!containerRef.current || sitRefs.length === 0 || birdAnimations.length === 0 || birdStates.length === 0) return;
    let timeouts: NodeJS.Timeout[] = [];
    function moveBird(birdIdx: number) {
      setBirdStates(states => {
        const newStates = [...states];
        newStates[birdIdx].flying = true;
        return newStates;
      });
      // Pick next sit index (not same as current)
      const nextIdx = (() => {
        let idx;
        do {
          idx = Math.floor(Math.random() * sitRefs.length);
        } while (idx === birdStates[birdIdx].sitIndex);
        return idx;
      })();
      const el = sitRefs[nextIdx].current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTimeout(() => {
        setBirdStates(states => {
          const newStates = [...states];
          newStates[birdIdx] = {
            pos: { x: rect.left, y: rect.top },
            sitIndex: nextIdx,
            flying: false,
            // Optionally randomize animation for extra variety
            animation: birdAnimations[Math.floor(Math.random() * birdAnimations.length)],
          };
          return newStates;
        });
        // Schedule next move
        timeouts[birdIdx] = setTimeout(() => moveBird(birdIdx), SIT_DURATION + Math.random() * 1200);
      }, FLY_DURATION);
    }
    // Start all birds
    birdStates.forEach((_, i) => {
      timeouts[i] = setTimeout(() => moveBird(i), SIT_DURATION + Math.random() * 2000);
    });
    return () => timeouts.forEach(t => clearTimeout(t));
    // eslint-disable-next-line
  }, [sitRefs.length, birdAnimations, birdStates]);

  if (birdAnimations.length === 0) return null; // Don't render until loaded
  return (
    <div ref={containerRef} className={cn("pointer-events-none absolute inset-0 z-40", className)}>
      <Suspense fallback={null}>
        {birdStates.map((bird, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: bird.pos.x,
              top: bird.pos.y,
              width: BIRD_SIZE,
              height: BIRD_SIZE,
              transition: bird.flying ? `left ${FLY_DURATION}ms linear, top ${FLY_DURATION}ms linear` : undefined,
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <LazyLottie
              animationData={bird.animation}
              loop={!bird.flying}
              style={{ width: BIRD_SIZE, height: BIRD_SIZE }}
            />
          </div>
        ))}
      </Suspense>
    </div>
  );
};

export default BirdsAnimation;
