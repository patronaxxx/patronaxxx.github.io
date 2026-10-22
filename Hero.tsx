import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ParticleConfig, ParticlePreset, ParticleTheme } from '../types';
import { soundEngine } from '../utils/audioSynth';

interface ParticleCanvasProps {
  config: ParticleConfig;
  onPresetChange?: (preset: ParticlePreset) => void;
  className?: string;
  isInteractive?: boolean;
}

// Module-scope reusable math vectors (Three.js Zero GC rule)
const _pointer3D = new THREE.Vector3();
const _tempVec = new THREE.Vector3();
const _targetPos = new THREE.Vector3();
const _currentPos = new THREE.Vector3();

// Color maps for themes
const THEME_COLORS: Record<ParticleTheme, { primary: THREE.Color; secondary: THREE.Color; highlight: THREE.Color; background: number }> = {
  amber: {
    primary: new THREE.Color('#F59E0B'),
    secondary: new THREE.Color('#EA580C'),
    highlight: new THREE.Color('#FDE68A'),
    background: 0x070605,
  },
  cyan: {
    primary: new THREE.Color('#06B6D4'),
    secondary: new THREE.Color('#3B82F6'),
    highlight: new THREE.Color('#E0F2FE'),
    background: 0x040608,
  },
  violet: {
    primary: new THREE.Color('#A855F7'),
    secondary: new THREE.Color('#EC4899'),
    highlight: new THREE.Color('#F5D0FE'),
    background: 0x060408,
  },
  emerald: {
    primary: new THREE.Color('#10B981'),
    secondary: new THREE.Color('#059669'),
    highlight: new THREE.Color('#A7F3D0'),
    background: 0x030705,
  },
};

// Generates procedural radial glow texture for particles (Zero 404 rule)
function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Target point generator for presets
function generatePresetTargets(preset: ParticlePreset, count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  if (preset === 'avatar') {
    // 3D Avatar Head & Torso Silhouette (Particle Self)
    for (let i = 0; i < count; i++) {
      const p = i / count;
      let x = 0, y = 0, z = 0;

      if (p < 0.45) {
        // Head / Cranium & Face
        const phi = Math.acos(-1 + (2 * (i % 2700)) / 2700);
        const theta = Math.sqrt(2700 * Math.PI) * phi;
        const r = 1.35 + Math.sin(phi * 4) * 0.08;
        x = r * Math.sin(phi) * Math.cos(theta) * 0.85;
        y = r * Math.cos(phi) * 1.1 + 0.35;
        z = r * Math.sin(phi) * Math.sin(theta) * 0.95;

        // Flatten back slightly and shape jaw
        if (y < 0.2) {
          x *= 0.85;
          z *= 0.9;
        }
      } else if (p < 0.65) {
        // Cyber Headphones & Visor/Glasses feature
        const subP = (p - 0.45) / 0.2;
        if (subP < 0.5) {
          // Headphone Arch
          const angle = Math.PI * (0.05 + 0.9 * (subP / 0.5));
          const archR = 1.55;
          x = Math.cos(angle) * archR;
          y = Math.sin(angle) * archR + 0.35;
          z = (Math.random() - 0.5) * 0.35;
        } else {
          // Visor / Glasses on face
          const vP = (subP - 0.5) / 0.5;
          const u = (vP - 0.5) * 2;
          x = u * 1.05;
          y = 0.45 + (Math.random() - 0.5) * 0.25;
          z = 1.15 + (1 - Math.abs(u)) * 0.25;
        }
      } else if (p < 0.85) {
        // Neck & Shoulders
        const sIdx = i - Math.floor(count * 0.65);
        const sTotal = Math.floor(count * 0.2);
        const u = (sIdx / sTotal - 0.5) * 2;
        const v = Math.random();
        x = u * 2.8;
        y = -0.9 - Math.pow(Math.abs(u), 1.6) * 0.7 - v * 0.8;
        z = (Math.random() - 0.5) * 1.3;
      } else {
        // Surrounding neural aura / halo particles
        const u = Math.random() * Math.PI * 2;
        const rad = 2.2 + Math.random() * 1.5;
        x = Math.cos(u) * rad;
        y = (Math.random() - 0.5) * 3.5;
        z = Math.sin(u) * rad;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
  } else if (preset === 'vortex') {
    // Sora 2 Galactic Accretion Disc & Jet
    for (let i = 0; i < count; i++) {
      const p = i / count;
      let x = 0, y = 0, z = 0;

      if (p < 0.82) {
        // Spiral galaxy disc
        const armCount = 3;
        const arm = i % armCount;
        const armOffset = (arm * 2 * Math.PI) / armCount;
        const r = Math.pow(Math.random(), 0.5) * 3.6 + 0.4;
        const theta = r * 2.2 + armOffset + (Math.random() - 0.5) * 0.4;
        x = Math.cos(theta) * r;
        z = Math.sin(theta) * r;
        y = (Math.random() - 0.5) * (0.15 + 0.3 * (1 - r / 4));
      } else {
        // Relativistic Polar Jets
        const sign = i % 2 === 0 ? 1 : -1;
        const height = Math.random() * 3.8 + 0.3;
        const spread = Math.pow(height / 4, 1.5) * 0.45;
        const ang = Math.random() * Math.PI * 2;
        x = Math.cos(ang) * spread;
        z = Math.sin(ang) * spread;
        y = height * sign;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
  } else if (preset === 'monogram') {
    // Stylized "P" (PATRONAXXX) + YouTube Play Triangle
    for (let i = 0; i < count; i++) {
      const p = i / count;
      let x = 0, y = 0, z = 0;

      if (p < 0.55) {
        // Letter "P"
        const subP = p / 0.55;
        if (subP < 0.4) {
          // Vertical stem of P
          const t = subP / 0.4;
          x = -1.2 + (Math.random() - 0.5) * 0.25;
          y = (t - 0.5) * 3.2;
          z = (Math.random() - 0.5) * 0.4;
        } else {
          // Loop of P
          const loopT = (subP - 0.4) / 0.6;
          const angle = -Math.PI / 2 + loopT * Math.PI;
          const loopR = 0.85;
          x = -1.2 + Math.cos(angle) * loopR + (Math.random() - 0.5) * 0.2;
          y = 0.75 + Math.sin(angle) * loopR * 0.85;
          z = (Math.random() - 0.5) * 0.4;
        }
      } else if (p < 0.88) {
        // YouTube Play Button Triangle on right side
        const subT = (p - 0.55) / 0.33;
        // Point in 2D triangle: (0.4, 1.0), (0.4, -1.0), (2.0, 0.0)
        let r1 = Math.random();
        let r2 = Math.random();
        if (r1 + r2 > 1) {
          r1 = 1 - r1;
          r2 = 1 - r2;
        }
        x = 0.5 * (1 - r1 - r2) + 0.5 * r1 + 2.1 * r2;
        y = 1.0 * (1 - r1 - r2) + -1.0 * r1 + 0.0 * r2;
        z = (Math.random() - 0.5) * 0.35;
      } else {
        // Floating halo dots
        const ang = Math.random() * Math.PI * 2;
        const rad = 2.8 + Math.random() * 0.8;
        x = Math.cos(ang) * rad;
        y = Math.sin(ang) * rad * 0.7;
        z = (Math.random() - 0.5) * 0.8;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
  } else {
    // Quantum Neural Mesh / Sphere
    for (let i = 0; i < count; i++) {
      const p = i / count;
      let x = 0, y = 0, z = 0;

      if (p < 0.7) {
        // Fibonacci sphere surface
        const phi = Math.acos(-1 + (2 * i) / (count * 0.7));
        const theta = Math.sqrt(count * 0.7 * Math.PI) * phi;
        const rad = 2.2 + Math.sin(phi * 6) * 0.15;
        x = rad * Math.sin(phi) * Math.cos(theta);
        y = rad * Math.cos(phi);
        z = rad * Math.sin(phi) * Math.sin(theta);
      } else {
        // Orbital energy rings tilted
        const ringP = (p - 0.7) / 0.3;
        const ringIdx = i % 2;
        const ang = ringP * Math.PI * 4;
        const rad = 2.8 + (Math.random() - 0.5) * 0.25;

        if (ringIdx === 0) {
          // Ring 1 (tilted 45 deg)
          x = Math.cos(ang) * rad;
          y = Math.sin(ang) * rad * 0.707;
          z = Math.sin(ang) * rad * 0.707;
        } else {
          // Ring 2 (tilted -45 deg)
          x = Math.cos(ang) * rad * 0.707;
          y = Math.sin(ang) * rad * 0.707;
          z = -Math.cos(ang) * rad;
        }
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
  }

  return positions;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  config,
  className = '',
  isInteractive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL detection according to Three.js directives
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Scene & Camera setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(THEME_COLORS[config.theme].background, 0.08);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 4. Geometry and Attribute Initialization
    const particleCount = config.particleCount || 4500;
    const geometry = new THREE.BufferGeometry();

    // Current positions
    const positions = new Float32Array(particleCount * 3);
    // Velocities for physics
    const velocities = new Float32Array(particleCount * 3);
    // Original target positions for current preset
    let targetPositions = generatePresetTargets(config.preset, particleCount);
    // Colors
    const colors = new Float32Array(particleCount * 3);
    // Sizes
    const sizes = new Float32Array(particleCount);

    const themeColors = THEME_COLORS[config.theme];
    for (let i = 0; i < particleCount; i++) {
      // Start in subtle dispersed cloud
      positions[i * 3] = targetPositions[i * 3] + (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 1] = targetPositions[i * 3 + 1] + (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 2] = targetPositions[i * 3 + 2] + (Math.random() - 0.5) * 0.8;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      // Color distribution: 60% primary, 30% secondary, 10% highlight
      const r = Math.random();
      const col = r < 0.6 ? themeColors.primary : r < 0.9 ? themeColors.secondary : themeColors.highlight;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = 0.04 + Math.random() * 0.05;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // 5. Material setup
    const particleTexture = createParticleTexture();
    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 6. Interaction State
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isDown: false,
      hasMoved: false,
      lastMoveTime: performance.now(),
    };

    let shockwaveTime = -100;
    const shockwaveOrigin = new THREE.Vector3();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.targetX = nx;
      mouse.targetY = ny;
      mouse.hasMoved = true;
      mouse.lastMoveTime = performance.now();

      // Trigger audio chime based on pointer movement velocity
      if (configRef.current.soundEnabled && Math.random() < 0.12) {
        soundEngine.playParticleChime(Math.hypot(nx, ny), nx);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      mouse.isDown = true;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Create shockwave explosion
      shockwaveTime = performance.now();
      _pointer3D.set(nx * 3.5, ny * 2.2, 0);
      shockwaveOrigin.copy(_pointer3D);

      if (configRef.current.soundEnabled) {
        soundEngine.playBlastPulse();
      }
    };

    const handlePointerUp = () => {
      mouse.isDown = false;
    };

    if (isInteractive) {
      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointerup', handlePointerUp);
    }

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let frameId = 0;
    let clock = new THREE.Clock();
    let currentPreset = config.preset;
    let currentTheme = config.theme;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const colAttr = geometry.getAttribute('color') as THREE.BufferAttribute;

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Check if preset updated
      if (configRef.current.preset !== currentPreset) {
        currentPreset = configRef.current.preset;
        targetPositions = generatePresetTargets(currentPreset, particleCount);
      }

      // Check if theme updated
      if (configRef.current.theme !== currentTheme) {
        currentTheme = configRef.current.theme;
        const th = THEME_COLORS[currentTheme];
        scene.fog = new THREE.FogExp2(th.background, 0.08);

        for (let i = 0; i < particleCount; i++) {
          const r = Math.random();
          const col = r < 0.6 ? th.primary : r < 0.9 ? th.secondary : th.highlight;
          colors[i * 3] = col.r;
          colors[i * 3 + 1] = col.g;
          colors[i * 3 + 2] = col.b;
        }
        colAttr.needsUpdate = true;
      }

      // Smooth pointer tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Project pointer into 3D plane
      _pointer3D.set(mouse.x * 3.5, mouse.y * 2.2, 0.2);

      // Camera tilt / subtle sway
      camera.position.x = THREE.MathUtils.damp(camera.position.x, mouse.x * 0.6, 2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, mouse.y * 0.4, 2, delta);
      camera.lookAt(0, 0, 0);

      // Subtle slow rotation of the particle system
      particles.rotation.y = elapsedTime * 0.15 * configRef.current.speed;

      const posArray = posAttr.array as Float32Array;
      const mode = configRef.current.mode;
      const dispersion = configRef.current.dispersion || 1.0;
      const now = performance.now();
      const shockwaveAge = (now - shockwaveTime) * 0.001;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const i3_1 = i3 + 1;
        const i3_2 = i3 + 2;

        _currentPos.set(posArray[i3], posArray[i3_1], posArray[i3_2]);
        _targetPos.set(targetPositions[i3], targetPositions[i3_1], targetPositions[i3_2]);

        // Subtle organic breathing animation
        const noise = Math.sin(elapsedTime * 2 + i * 0.1) * 0.04;
        _targetPos.x += noise;
        _targetPos.y += Math.cos(elapsedTime * 1.5 + i * 0.1) * 0.04;

        // Force towards preset target (spring recovery)
        _tempVec.subVectors(_targetPos, _currentPos);
        const distToTarget = _tempVec.length();
        const returnForce = Math.min(distToTarget * 3.8, 12);
        _tempVec.normalize().multiplyScalar(returnForce);

        velocities[i3] += _tempVec.x * delta;
        velocities[i3_1] += _tempVec.y * delta;
        velocities[i3_2] += _tempVec.z * delta;

        // Cursor Physics (Attract, Repel, Vortex)
        if (mouse.hasMoved) {
          _tempVec.subVectors(_currentPos, _pointer3D);
          const distToCursor = _tempVec.length();
          const influenceRadius = 1.6 * dispersion;

          if (distToCursor < influenceRadius && distToCursor > 0.001) {
            const forceMag = (1 - distToCursor / influenceRadius);

            if (mode === 'repel') {
              _tempVec.normalize().multiplyScalar(forceMag * 14);
              velocities[i3] += _tempVec.x * delta;
              velocities[i3_1] += _tempVec.y * delta;
              velocities[i3_2] += _tempVec.z * delta * 0.6;
            } else if (mode === 'attract') {
              _tempVec.normalize().multiplyScalar(-forceMag * 12);
              velocities[i3] += _tempVec.x * delta;
              velocities[i3_1] += _tempVec.y * delta;
              velocities[i3_2] += _tempVec.z * delta * 0.6;
            } else if (mode === 'vortex') {
              // Tangential rotational force around pointer
              const tangentX = -_tempVec.y;
              const tangentY = _tempVec.x;
              velocities[i3] += tangentX * forceMag * 10 * delta;
              velocities[i3_1] += tangentY * forceMag * 10 * delta;
            }
          }
        }

        // Shockwave Pulse blast effect
        if (shockwaveAge < 1.4 && shockwaveAge > 0) {
          _tempVec.subVectors(_currentPos, shockwaveOrigin);
          const shockDist = _tempVec.length();
          const waveRadius = shockwaveAge * 4.2;
          const distFromWave = Math.abs(shockDist - waveRadius);

          if (distFromWave < 0.6) {
            const blastFactor = (1 - distFromWave / 0.6) * (1 - shockwaveAge / 1.4);
            _tempVec.normalize().multiplyScalar(blastFactor * 22);
            velocities[i3] += _tempVec.x * delta;
            velocities[i3_1] += _tempVec.y * delta;
            velocities[i3_2] += _tempVec.z * delta;
          }
        }

        // Apply velocity with high physical damping
        const damping = 0.86;
        velocities[i3] *= damping;
        velocities[i3_1] *= damping;
        velocities[i3_2] *= damping;

        posArray[i3] += velocities[i3] * delta * 4;
        posArray[i3_1] += velocities[i3_1] * delta * 4;
        posArray[i3_2] += velocities[i3_2] * delta * 4;
      }

      posAttr.needsUpdate = true;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
      frameId = requestAnimationFrame(tick);
    } else {
      afterDraw(tick);
    }

    // Cleanup according to Three.js directives
    return () => {
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      if (isInteractive) {
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointerup', handlePointerUp);
      }
      window.removeEventListener('resize', handleResize);

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [config.particleCount, isInteractive]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-auto overflow-hidden ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};
