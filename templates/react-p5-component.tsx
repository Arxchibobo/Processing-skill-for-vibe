/**
 * React + p5.js Component Template
 *
 * Installation:
 *   npm install react-p5
 *   # or
 *   npm install @p5-wrapper/react
 *
 * Usage:
 *   <ParticleBackground />
 */

import React from 'react';
import Sketch from 'react-p5';
import type p5Types from 'p5';

interface Particle {
  pos: p5Types.Vector;
  vel: p5Types.Vector;
  size: number;
  alpha: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  backgroundColor?: string;
  particleColor?: [number, number, number];
  connectionDistance?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 100,
  backgroundColor = '#1a1a2e',
  particleColor = [100, 200, 255],
  connectionDistance = 100
}) => {
  let particles: Particle[] = [];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        pos: p5.createVector(p5.random(p5.width), p5.random(p5.height)),
        vel: p5.createVector(p5.random(-0.5, 0.5), p5.random(-0.5, 0.5)),
        size: p5.random(2, 4),
        alpha: p5.random(100, 200)
      });
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(backgroundColor);

    // Update and display particles
    for (const particle of particles) {
      // Update position
      particle.pos.add(particle.vel);

      // Wrap around edges
      if (particle.pos.x < 0) particle.pos.x = p5.width;
      if (particle.pos.x > p5.width) particle.pos.x = 0;
      if (particle.pos.y < 0) particle.pos.y = p5.height;
      if (particle.pos.y > p5.height) particle.pos.y = 0;

      // Display particle
      p5.noStroke();
      p5.fill(particleColor[0], particleColor[1], particleColor[2], particle.alpha);
      p5.ellipse(particle.pos.x, particle.pos.y, particle.size);

      // Connect to nearby particles
      for (const other of particles) {
        const d = p5.dist(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
        if (d < connectionDistance && d > 0) {
          const alpha = p5.map(d, 0, connectionDistance, 100, 0);
          p5.stroke(particleColor[0], particleColor[1], particleColor[2], alpha);
          p5.strokeWeight(0.5);
          p5.line(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
        }
      }
    }
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
    </div>
  );
};

export default ParticleBackground;

// ============================================
// Alternative: Using @p5-wrapper/react (newer)
// ============================================

/*
import { ReactP5Wrapper } from '@p5-wrapper/react';
import type { P5CanvasInstance, SketchProps } from '@p5-wrapper/react';

interface MySketchProps extends SketchProps {
  particleCount: number;
}

function sketch(p5: P5CanvasInstance<MySketchProps>) {
  let particles: Particle[] = [];
  let particleCount = 100;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    initParticles();
  };

  p5.updateWithProps = (props: MySketchProps) => {
    if (props.particleCount !== particleCount) {
      particleCount = props.particleCount;
      initParticles();
    }
  };

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        pos: p5.createVector(p5.random(p5.width), p5.random(p5.height)),
        vel: p5.createVector(p5.random(-0.5, 0.5), p5.random(-0.5, 0.5)),
        size: p5.random(2, 4),
        alpha: p5.random(100, 200)
      });
    }
  }

  p5.draw = () => {
    // ... drawing logic
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
}

export const P5Background: React.FC<{ particleCount?: number }> = ({
  particleCount = 100
}) => {
  return <ReactP5Wrapper sketch={sketch} particleCount={particleCount} />;
};
*/
