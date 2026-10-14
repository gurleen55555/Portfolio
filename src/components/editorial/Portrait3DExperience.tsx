import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Portrait3DExperienceProps {
  photoDisplayUrl: string;
  isEntranceSettled: boolean;
  onPhotoSelected?: (file: File) => void;
  onResetPhoto?: () => void;
  isCustomPhoto?: boolean;
}

export const Portrait3DExperience: React.FC<Portrait3DExperienceProps> = ({
  photoDisplayUrl,
  isEntranceSettled,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Target and current interpolated values for organic spring motion
  const currentTilt = useRef<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const targetTilt = useRef<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  // 60fps spring-lerp loop for realistic physics without jitter
  useEffect(() => {
    let animId: number;

    const lerpPhysics = () => {
      const ease = 0.085;
      currentTilt.current.rx += (targetTilt.current.rx - currentTilt.current.rx) * ease;
      currentTilt.current.ry += (targetTilt.current.ry - currentTilt.current.ry) * ease;

      setTilt({
        rx: Number(currentTilt.current.rx.toFixed(2)),
        ry: Number(currentTilt.current.ry.toFixed(2)),
      });

      animId = requestAnimationFrame(lerpPhysics);
    };

    animId = requestAnimationFrame(lerpPhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Smooth cursor response across portrait section
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    // Natural, restrained 3D tilt bounds (+/- 5.5 deg)
    targetTilt.current = {
      rx: Math.max(-5.5, Math.min(5.5, -normY * 5.5)),
      ry: Math.max(-6.5, Math.min(6.5, normX * 6.5)),
    };
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    targetTilt.current = { rx: 0, ry: 0 };
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Realistic dynamic shadow projection cast by the body cutout
  const shadowOffsetX = -tilt.ry * 2.2;
  const shadowOffsetY = Math.max(12, 16 + tilt.rx * 1.6);
  const shadowBlur = isHovered ? 30 : 22;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full max-w-[460px] flex flex-col items-center justify-end transition-all duration-1000 ${
        isEntranceSettled ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-98'
      }`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Root Rig that tilts smoothly in perspective space */}
      <div
        className="relative w-full flex flex-col items-center justify-end"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ============================================================== */}
        {/* SINGLE SUBTLE POWDER-BLUE ABSTRACT SHAPE BEHIND PORTRAIT       */}
        {/* Organic, borderless backdrop shape in powder blue              */}
        {/* ============================================================== */}
        <div
          className="absolute inset-x-6 top-6 bottom-4 rounded-t-[160px] rounded-b-[50px] pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform: `translateZ(-26px) translateX(${-tilt.ry * 0.7}px) translateY(${tilt.rx * 0.5}px)`,
            background: 'linear-gradient(165deg, #EBF3FA 0%, #DCEBF7 60%, #D0E3F4 100%)',
            boxShadow: '0 25px 45px -18px rgba(185, 210, 235, 0.5)',
          }}
          aria-hidden="true"
        />

        {/* ============================================================== */}
        {/* GROUND BASE CONTACT SHADOW: Anchors the cutout to the floor    */}
        {/* ============================================================== */}
        <div
          className="absolute -bottom-2 w-[74%] h-6 rounded-[100%] pointer-events-none z-10 transition-all duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.24) 0%, rgba(120, 61, 76, 0.12) 40%, transparent 72%)',
            filter: `blur(${isHovered ? 5 : 4}px)`,
            transform: `translateZ(2px) rotateX(72deg) translateX(${shadowOffsetX * 0.4}px) scaleX(${isHovered ? 1.04 : 1})`,
          }}
          aria-hidden="true"
        />

        {/* ============================================================== */}
        {/* GURLEEN'S BODY CUTOUT PASTED DIRECTLY ONTO INTRO PAGE          */}
        {/* Borderless transparent cutout with realistic 3D drop-shadow    */}
        {/* ============================================================== */}
        <div
          className="relative z-20 w-auto flex items-end justify-center select-none"
          style={{
            transform: `translateZ(${isHovered ? '28px' : '22px'})`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            className="relative w-auto max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] h-[480px] sm:h-[530px] lg:h-[570px] flex items-end justify-center"
            style={{
              // Multi-layered drop-shadow wrapping the exact silhouette contour of the body
              filter: `drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px rgba(35, 47, 62, 0.20)) drop-shadow(0 6px 14px rgba(35, 47, 62, 0.12)) drop-shadow(0 24px 38px rgba(120, 61, 76, 0.09))`,
            }}
          >
            {/* The Authentic Body Cutout Silhouette */}
            <img
              src={photoDisplayUrl}
              alt="Gurleen Kaur Bhatia"
              className="h-full w-auto max-w-full object-contain object-bottom select-none pointer-events-none relative z-10"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.endsWith('profile-transparent.svg')) {
                  target.src = '/images/profile-transparent.svg';
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
