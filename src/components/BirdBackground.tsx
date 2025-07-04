import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

interface Bird extends PIXI.Graphics {
  vx: number;
  vy_drift_speed: number;
  initialY: number;
  amplitude: number;
  frequency: number;
  time: number;
  originalColor: number;
  z: number;
  vz: number;
  baseScale: number;
  isExitingNear?: boolean;
  exitSpeedY?: number;
  exitSpeedX?: number;
  exitProgress?: number;
}

const BirdBackground: React.FC = () => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const pixiAppRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    let isMounted = true;
    let localAppInstance: PIXI.Application | null = null; 
    const currentContainer = pixiContainerRef.current;

    if (!currentContainer) {
      return;
    }

    if (pixiAppRef.current) {
        return;
    }

    if (currentContainer.clientWidth === 0 || currentContainer.clientHeight === 0) {
      return;
    }

    localAppInstance = new PIXI.Application();

    if (!localAppInstance.stage) {
        if (typeof localAppInstance.destroy === 'function') {
            try { localAppInstance.destroy(true, { children: true, texture: true }); } catch (e) { /* ignore */ }
        }
        localAppInstance = null; 
        return;
    }

    const appForThisTicker = localAppInstance;

    localAppInstance.init({
      width: currentContainer.clientWidth,
      height: currentContainer.clientHeight,
      backgroundAlpha: 0, 
      antialias: false, // Improved performance
      resolution: Math.min(window.devicePixelRatio ?? 1, 2), // Cap resolution for performance
      autoDensity: true,
    }).then(() => {
      if (!isMounted) {
        if (appForThisTicker && typeof appForThisTicker.destroy === 'function') {
            try { appForThisTicker.destroy(true, { children: true, texture: true }); } catch (e) { /* ignore */ }
        }
        if (localAppInstance === appForThisTicker) localAppInstance = null;
        return;
      }

      if (!appForThisTicker || !appForThisTicker.stage) {
        if (appForThisTicker && typeof appForThisTicker.destroy === 'function') {
            try { appForThisTicker.destroy(true, { children: true, texture: true }); } catch (e) { /* ignore */ }
        }
        if (localAppInstance === appForThisTicker) localAppInstance = null;
        return;
      }
      
      pixiAppRef.current = appForThisTicker;

      if (currentContainer.contains(appForThisTicker.canvas)) {
        // Already added
      } else {
        currentContainer.appendChild(appForThisTicker.canvas);
      }
      
      appForThisTicker.stage.sortableChildren = true;

      const birds: Bird[] = [];
      const NUM_BIRDS = 20; // Reduced for performance
      const BIRD_COLOR = 0x222222;
      const Z_FAR_PLANE = 200, Z_NEAR_RESET_THRESHOLD = -75, Z_REAPPEAR_FAR = 180, Z_REAPPEAR_NEAR = -50;
      const PERSPECTIVE_FACTOR = 100, EXIT_DURATION_FRAMES = 90;

      // Pre-create geometries for better performance
      const birdGeometry = new PIXI.Graphics();
      birdGeometry.moveTo(0, 0);
      birdGeometry.lineTo(-15, 5);
      birdGeometry.lineTo(-15, -5);
      birdGeometry.closePath();
      birdGeometry.fill(BIRD_COLOR);

      for (let i = 0; i < NUM_BIRDS; i++) {
        const bird = new PIXI.Graphics() as Bird;
        bird.originalColor = BIRD_COLOR;
        
        // Copy geometry from pre-created one
        bird.moveTo(0, 0);
        bird.lineTo(-15, 5);
        bird.lineTo(-15, -5);
        bird.closePath();
        bird.fill(bird.originalColor);
        
        bird.x = Math.random() * appForThisTicker.screen.width;
        bird.initialY = Math.random() * appForThisTicker.screen.height;
        bird.y = bird.initialY;
        bird.vx = (Math.random() - 0.5) * 2.5 + (Math.random() < 0.5 ? -0.5 : 0.5);
        bird.vy_drift_speed = (Math.random() - 0.5) * 0.8;
        bird.rotation = bird.vx > 0 ? 0 : Math.PI;
        bird.amplitude = Math.random() * 15 + 10;
        bird.frequency = Math.random() * 0.04 + 0.03;
        bird.time = Math.random() * 100;
        bird.z = Math.random() * Z_FAR_PLANE;
        bird.vz = (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.3);
        bird.baseScale = 0.3 + Math.random() * 0.5;
        bird.isExitingNear = false;
        bird.exitProgress = 0;
        
        appForThisTicker.stage.addChild(bird);
        birds.push(bird);
      }

      const easeOutQuad = (t: number): number => t * (2 - t);

      // Optimized ticker with reduced frequency
      let frameCount = 0;
      appForThisTicker.ticker.add((ticker) => {
        frameCount++;
        
        // Skip some frames for performance
        if (frameCount % 2 !== 0) return;
        
        const delta = ticker.deltaTime;

        if (!pixiAppRef.current || pixiAppRef.current.stage === null) {
          if (appForThisTicker && appForThisTicker.ticker && appForThisTicker.ticker.started) {
            appForThisTicker.ticker.stop();
          }
          return;
        }
        if (!appForThisTicker || appForThisTicker.stage === null) {
            if (appForThisTicker && appForThisTicker.ticker && appForThisTicker.ticker.started) {
                appForThisTicker.ticker.stop();
            }
            return;
        }
        if (appForThisTicker !== pixiAppRef.current) {
            if (appForThisTicker && appForThisTicker.ticker && appForThisTicker.ticker.started) {
                appForThisTicker.ticker.stop();
            }
            return;
        }

        birds.forEach(b => {
          if (!b || !b.transform || !b.parent) {
            return; 
          }

          b.time += delta;
          if (b.isExitingNear) {
            b.exitProgress = Math.min(1, (b.exitProgress ?? 0) + delta / EXIT_DURATION_FRAMES);
            const easedProgress = easeOutQuad(b.exitProgress ?? 0); 
            b.y -= (b.exitSpeedY ?? 2) * easedProgress * delta; 
            b.x += (b.exitSpeedX ?? 0) * (1 - easedProgress) * delta;
            const targetRotation = b.vx > 0 ? -Math.PI / 8 : Math.PI + Math.PI / 8;
            b.rotation += (targetRotation - b.rotation) * 0.05 * delta;
            b.alpha = Math.max(0, 1 - easedProgress * 1.5);
            let currentScale = b.scale.x;
            currentScale += ((7 - b.scale.x) * 0.03 * delta);
            b.scale.set(Math.min(currentScale, 7));
            
            if ((b.exitProgress ?? 0) >= 1 || b.alpha <= 0) {
              b.isExitingNear = false;
              b.exitProgress = 0;
              b.z = Z_REAPPEAR_FAR;
              b.vz = -(0.1 + Math.random() * 0.2);
              b.x = Math.random() * appForThisTicker.screen.width;
              b.initialY = Math.random() * appForThisTicker.screen.height;
              b.y = b.initialY;
              b.time = Math.random() * 100;
              b.vx = (Math.random() - 0.5) * 2.5 + (Math.random() < 0.5 ? -0.5 : 0.5);
              b.rotation = b.vx > 0 ? 0 : Math.PI;
              b.vy_drift_speed = (Math.random() - 0.5) * 0.8;
            }
          } else {
            b.z += b.vz * delta;
            let scale = b.baseScale * (PERSPECTIVE_FACTOR / (Math.max(1, PERSPECTIVE_FACTOR + b.z)));
            scale = Math.max(0.05, Math.min(scale, 4));
            b.scale.set(scale);
            b.alpha = Math.max(0.15, Math.min(1, (PERSPECTIVE_FACTOR * 1.2) / (Math.max(1, PERSPECTIVE_FACTOR + b.z))));
            b.zIndex = Math.floor(Z_FAR_PLANE - b.z);
            
            const effectiveSpeedFactor = scale / b.baseScale;
            b.x += b.vx * effectiveSpeedFactor * delta;
            b.initialY += b.vy_drift_speed * effectiveSpeedFactor * delta;
            b.y = b.initialY + Math.sin(b.time * b.frequency) * b.amplitude;
            b.rotation = b.vx > 0 ? 0 : Math.PI;
            
            const scaledWidth = b.width;
            const scaledHeight = b.height;
            const screenWidth = appForThisTicker.screen.width;
            const screenHeight = appForThisTicker.screen.height;
            
            if (b.x > screenWidth + scaledWidth) {
              b.x = -scaledWidth;
              b.initialY = Math.random() * screenHeight;
            } else if (b.x < -scaledWidth) {
              b.x = screenWidth + scaledWidth;
              b.initialY = Math.random() * screenHeight;
            }
            
            if (b.y > screenHeight + scaledHeight) {
              b.y = -scaledHeight;
              b.initialY = -scaledHeight - (Math.sin(b.time * b.frequency) * b.amplitude);
              b.x = Math.random() * screenWidth;
            } else if (b.y < -scaledHeight) {
              b.y = screenHeight + scaledHeight;
              b.initialY = (screenHeight + scaledHeight) - (Math.sin(b.time * b.frequency) * b.amplitude);
              b.x = Math.random() * screenWidth;
            }
            
            if (b.vz < 0 && b.z < Z_NEAR_RESET_THRESHOLD) {
              b.isExitingNear = true;
              b.exitProgress = 0;
              b.exitSpeedY = (screenHeight / 250) + Math.random() * (screenHeight / 300);
              b.exitSpeedX = b.vx * 0.3;
              b.vz = -0.01;
            } else if (b.vz > 0 && b.z > Z_FAR_PLANE) {
              b.z = Z_REAPPEAR_NEAR;
              b.vz = (0.1 + Math.random() * 0.2);
              b.x = Math.random() * screenWidth;
              b.initialY = Math.random() * screenHeight;
              b.y = b.initialY;
            }
          }
        });
      });
    }).catch(err => {
        if (appForThisTicker && typeof appForThisTicker.destroy === 'function') {
            try { appForThisTicker.destroy(true, { children: true, texture: true }); } catch (destroyError) { /* ignore */ }
        }
        if (localAppInstance === appForThisTicker) localAppInstance = null;
    });

    const handleResize = () => {
      if (pixiAppRef.current?.renderer && currentContainer) { 
        const newWidth = currentContainer.clientWidth;
        const newHeight = currentContainer.clientHeight;
        if (newWidth > 0 && newHeight > 0) {
          pixiAppRef.current.renderer.resize(newWidth, newHeight);
        }
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      
      const appInRefToDestroy = pixiAppRef.current;
      if (appInRefToDestroy) {
        try {
          if (appInRefToDestroy.ticker && appInRefToDestroy.ticker.started) { 
            appInRefToDestroy.ticker.stop();
          }
          appInRefToDestroy.destroy(true, { children: true, texture: true });
        } catch (e) {
          /* ignore */
        }
        pixiAppRef.current = null; 
      }

      if (localAppInstance && localAppInstance !== appInRefToDestroy && typeof localAppInstance.destroy === 'function') {
          try { 
            if (localAppInstance.ticker && localAppInstance.ticker.started) { 
                localAppInstance.ticker.stop();
            }
            localAppInstance.destroy(true, { children: true, texture: true}); 
          } catch (e) { /* ignore */ }
      }
      localAppInstance = null;
      
      if (currentContainer && appInRefToDestroy?.canvas && currentContainer.contains(appInRefToDestroy.canvas)) {
        currentContainer.removeChild(appInRefToDestroy.canvas);
      }
    };
  }, []); 

  return (
    <div 
      ref={pixiContainerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1, 
        pointerEvents: 'none', 
      }}
    />
  );
};

export default BirdBackground;
