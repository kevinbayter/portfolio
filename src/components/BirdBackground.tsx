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
      console.log('BirdBackground: Container ref not available yet.');
      return;
    }

    if (pixiAppRef.current) {
        console.log('BirdBackground: pixiAppRef.current already set. Skipping init for this effect run (Strict Mode re-run or other).');
        return;
    }

    console.log('BirdBackground: Initializing PixiJS app for this effect run.');
    console.log('PixiJS Version for Background:', PIXI.VERSION);

    if (currentContainer.clientWidth === 0 || currentContainer.clientHeight === 0) {
      console.error('BirdBackground: Container has zero dimensions. PixiJS will not initialize correctly. Aborting.');
      return;
    }

    localAppInstance = new PIXI.Application();
    console.log('BirdBackground: New local PIXI.Application instance created:', localAppInstance);

    if (!localAppInstance.stage) {
        console.error('BirdBackground: localAppInstance.stage is NULL immediately after new PIXI.Application(). This is unexpected. Aborting.');
        if (typeof localAppInstance.destroy === 'function') {
            try { localAppInstance.destroy(true, { children: true, texture: true }); } catch (e) { console.error('Error destroying localAppInstance after immediate stage null:', e);}
        }
        localAppInstance = null; 
        return;
    }

    const appForThisTicker = localAppInstance;

    localAppInstance.init({
      width: currentContainer.clientWidth,
      height: currentContainer.clientHeight,
      backgroundAlpha: 0, 
      antialias: true,
      resolution: window.devicePixelRatio ?? 1,
      autoDensity: true,
    }).then(() => {
      if (!isMounted) {
        console.log('BirdBackground: appForThisTicker.init() resolved, but effect was cancelled (isMounted=false). Destroying appForThisTicker.');
        if (appForThisTicker && typeof appForThisTicker.destroy === 'function') {
            try { appForThisTicker.destroy(true, { children: true, texture: true }); } catch (e) { console.error('Error destroying appForThisTicker in init.then after unmount:', e);}
        }
        if (localAppInstance === appForThisTicker) localAppInstance = null;
        return;
      }

      if (!appForThisTicker || !appForThisTicker.stage) {
        console.error('BirdBackground: appForThisTicker.init() resolved, but appForThisTicker or appForThisTicker.stage is null/undefined. Aborting setup.');
        if (appForThisTicker && typeof appForThisTicker.destroy === 'function') {
            try { appForThisTicker.destroy(true, { children: true, texture: true }); } catch (e) { console.error('Error destroying appForThisTicker in init.then due to null stage:', e);}
        }
        if (localAppInstance === appForThisTicker) localAppInstance = null;
        return;
      }
      
      console.log('BirdBackground: appForThisTicker.init() promise resolved successfully. appForThisTicker.stage:', appForThisTicker.stage);
      pixiAppRef.current = appForThisTicker;
      console.log('BirdBackground: Assigned fully initialized appForThisTicker to pixiAppRef.current.');

      if (currentContainer.contains(appForThisTicker.canvas)) {
        console.log('PixiJS background canvas already in container.');
      } else {
        currentContainer.appendChild(appForThisTicker.canvas);
        console.log('PixiJS background canvas appended.');
      }
      
      appForThisTicker.stage.sortableChildren = true;

      const birds: Bird[] = [];
      const NUM_BIRDS = 35;
      const BIRD_COLOR = 0x222222;
      const Z_FAR_PLANE = 200, Z_NEAR_RESET_THRESHOLD = -75, Z_REAPPEAR_FAR = 180, Z_REAPPEAR_NEAR = -50;
      const PERSPECTIVE_FACTOR = 100, EXIT_DURATION_FRAMES = 90;

      for (let i = 0; i < NUM_BIRDS; i++) {
        const bird = new PIXI.Graphics() as Bird;
        bird.originalColor = BIRD_COLOR;
        bird.moveTo(0, 0); bird.lineTo(-15, 5); bird.lineTo(-15, -5); bird.closePath(); bird.fill(bird.originalColor);
        bird.x = Math.random() * (appForThisTicker as PIXI.Application).screen.width; bird.initialY = Math.random() * (appForThisTicker as PIXI.Application).screen.height; bird.y = bird.initialY;
        bird.vx = (Math.random() - 0.5) * 2.5 + (Math.random() < 0.5 ? -0.5 : 0.5); bird.vy_drift_speed = (Math.random() - 0.5) * 0.8;
        bird.rotation = bird.vx > 0 ? 0 : Math.PI; bird.amplitude = Math.random() * 15 + 10; bird.frequency = Math.random() * 0.04 + 0.03;
        bird.time = Math.random() * 100; bird.z = Math.random() * Z_FAR_PLANE; bird.vz = (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.3);
        bird.baseScale = 0.3 + Math.random() * 0.5; bird.isExitingNear = false; bird.exitProgress = 0;
        (appForThisTicker as PIXI.Application).stage.addChild(bird); birds.push(bird);
      }
      console.log(`${NUM_BIRDS} background birds created for app:`, appForThisTicker);
      const easeOutQuad = (t: number): number => t * (2 - t);

      (appForThisTicker as PIXI.Application).ticker.add((ticker) => {
        const delta = ticker.deltaTime;

        if (!pixiAppRef.current || pixiAppRef.current.stage === null) {
          console.warn('BirdBackground Ticker: pixiAppRef.current (main app) is invalid or destroyed. Stopping this ticker.');
          if (appForThisTicker && appForThisTicker.ticker && appForThisTicker.ticker.started) {
            appForThisTicker.ticker.stop();
            console.log('BirdBackground Ticker: Stopped ticker for its appForThisTicker instance (main app invalid).');
          }
          return;
        }
        if (!appForThisTicker || appForThisTicker.stage === null) {
            console.warn('BirdBackground Ticker: appForThisTicker (ticker specific app) is invalid or destroyed. Stopping this ticker.');
            if (appForThisTicker && appForThisTicker.ticker && appForThisTicker.ticker.started) {
                appForThisTicker.ticker.stop();
                console.log('BirdBackground Ticker: Stopped ticker for its appForThisTicker instance (ticker app invalid).');
            }
            return;
        }
        if (appForThisTicker !== pixiAppRef.current) {
            console.warn('BirdBackground Ticker: appForThisTicker does not match pixiAppRef.current. This is likely an old ticker. Stopping.');
            if (appForThisTicker && appForThisTicker.ticker && appForThisTicker.ticker.started) {
                appForThisTicker.ticker.stop();
                console.log('BirdBackground Ticker: Stopped ticker for its appForThisTicker instance (mismatch with main app).');
            }
            return;
        }

        birds.forEach(b => {
          if (!b || !b.transform || !b.parent) {
            console.warn('BirdBackground Ticker: Encountered an invalid bird object. Skipping its update. Bird:', b);
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
            let currentScale = b.scale.x; currentScale += ((7 - b.scale.x) * 0.03 * delta); b.scale.set(Math.min(currentScale, 7));
            if ((b.exitProgress ?? 0) >= 1 || b.alpha <= 0) {
              b.isExitingNear = false; b.exitProgress = 0; b.z = Z_REAPPEAR_FAR; b.vz = -(0.1 + Math.random() * 0.2);
              b.x = Math.random() * (appForThisTicker as PIXI.Application).screen.width; b.initialY = Math.random() * (appForThisTicker as PIXI.Application).screen.height; b.y = b.initialY;
              b.time = Math.random() * 100; b.vx = (Math.random() - 0.5) * 2.5 + (Math.random() < 0.5 ? -0.5 : 0.5);
              b.rotation = b.vx > 0 ? 0 : Math.PI; b.vy_drift_speed = (Math.random() - 0.5) * 0.8;
            }
          } else {
            b.z += b.vz * delta;
            let scale = b.baseScale * (PERSPECTIVE_FACTOR / (Math.max(1, PERSPECTIVE_FACTOR + b.z))); scale = Math.max(0.05, Math.min(scale, 4));
            b.scale.set(scale); b.alpha = Math.max(0.15, Math.min(1, (PERSPECTIVE_FACTOR * 1.2) / (Math.max(1, PERSPECTIVE_FACTOR + b.z))));
            b.zIndex = Math.floor(Z_FAR_PLANE - b.z);
            const effectiveSpeedFactor = scale / b.baseScale; b.x += b.vx * effectiveSpeedFactor * delta; b.initialY += b.vy_drift_speed * effectiveSpeedFactor * delta;
            b.y = b.initialY + Math.sin(b.time * b.frequency) * b.amplitude; b.rotation = b.vx > 0 ? 0 : Math.PI;
            const scaledWidth = b.width; const scaledHeight = b.height;
            const screenWidth = (appForThisTicker as PIXI.Application).screen.width;
            const screenHeight = (appForThisTicker as PIXI.Application).screen.height;
            if (b.x > screenWidth + scaledWidth) { b.x = -scaledWidth; b.initialY = Math.random() * screenHeight; }
            else if (b.x < -scaledWidth) { b.x = screenWidth + scaledWidth; b.initialY = Math.random() * screenHeight; }
            if (b.y > screenHeight + scaledHeight) { b.y = -scaledHeight; b.initialY = -scaledHeight - (Math.sin(b.time * b.frequency) * b.amplitude); b.x = Math.random() * screenWidth; }
            else if (b.y < -scaledHeight) { b.y = screenHeight + scaledHeight; b.initialY = (screenHeight + scaledHeight) - (Math.sin(b.time * b.frequency) * b.amplitude); b.x = Math.random() * screenWidth; }
            if (b.vz < 0 && b.z < Z_NEAR_RESET_THRESHOLD) { b.isExitingNear = true; b.exitProgress = 0; b.exitSpeedY = (screenHeight / 250) + Math.random() * (screenHeight / 300); b.exitSpeedX = b.vx * 0.3; b.vz = -0.01; }
            else if (b.vz > 0 && b.z > Z_FAR_PLANE) { b.z = Z_REAPPEAR_NEAR; b.vz = (0.1 + Math.random() * 0.2); b.x = Math.random() * screenWidth; b.initialY = Math.random() * screenHeight; b.y = b.initialY; }
          }
        });
      });
    }).catch(err => {
        console.error('BirdBackground: appForThisTicker.init() promise REJECTED:', err);
        if (appForThisTicker && typeof appForThisTicker.destroy === 'function') {
            try { appForThisTicker.destroy(true, { children: true, texture: true }); } catch (destroyError) { console.error('Error destroying appForThisTicker after init promise rejection:', destroyError); }
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
      console.log('BirdBackground: useEffect cleanup running.');
      window.removeEventListener('resize', handleResize);
      
      const appInRefToDestroy = pixiAppRef.current;
      if (appInRefToDestroy) {
        console.log('BirdBackground: Attempting to stop ticker and destroy PixiJS app instance from ref:', appInRefToDestroy);
        try {
          if (appInRefToDestroy.ticker && appInRefToDestroy.ticker.started) { 
            appInRefToDestroy.ticker.stop();
            console.log('BirdBackground: PixiJS ticker stopped for app in ref.');
          }
          appInRefToDestroy.destroy(true, { children: true, texture: true });
          console.log('BirdBackground: PixiJS app instance from ref destroyed successfully.');
        } catch (e) {
          console.error('BirdBackground: Error during PixiJS app (from ref) stop/destruction:', e);
        }
        pixiAppRef.current = null; 
      }

      if (localAppInstance && localAppInstance !== appInRefToDestroy && typeof localAppInstance.destroy === 'function') {
          console.warn('BirdBackground Cleanup: localAppInstance was not the one in ref (or ref was null), attempting to destroy it as an orphaned instance.');
          try { 
            if (localAppInstance.ticker && localAppInstance.ticker.started) { 
                localAppInstance.ticker.stop();
                console.log('BirdBackground: Stopped ticker for orphaned localAppInstance.');
            }
            localAppInstance.destroy(true, { children: true, texture: true}); 
            console.log('BirdBackground: Orphaned localAppInstance destroyed.');
          } catch (e) { console.error('Error destroying orphaned localAppInstance in cleanup:', e); }
      }
      localAppInstance = null;
      
      if (currentContainer && appInRefToDestroy?.canvas && currentContainer.contains(appInRefToDestroy.canvas)) {
        currentContainer.removeChild(appInRefToDestroy.canvas);
        console.log('BirdBackground: PixiJS canvas (from destroyed appInRefToDestroy) removed from container.');
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
