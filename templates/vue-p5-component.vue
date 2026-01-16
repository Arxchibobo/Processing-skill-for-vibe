<template>
  <div ref="canvasContainer" class="p5-container" :style="containerStyle"></div>
</template>

<script>
/**
 * Vue 3 + p5.js Component Template
 *
 * Installation:
 *   npm install p5
 *
 * Usage:
 *   <P5Background
 *     :particleCount="100"
 *     :backgroundColor="'#1a1a2e'"
 *     :fullscreen="true"
 *   />
 */

import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

export default {
  name: 'P5Background',

  props: {
    particleCount: {
      type: Number,
      default: 100
    },
    backgroundColor: {
      type: String,
      default: '#1a1a2e'
    },
    particleColor: {
      type: Array,
      default: () => [100, 200, 255]
    },
    connectionDistance: {
      type: Number,
      default: 100
    },
    fullscreen: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 600
    }
  },

  setup(props) {
    const canvasContainer = ref(null);
    let p5Instance = null;
    let particles = [];

    const containerStyle = computed(() => {
      if (props.fullscreen) {
        return {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        };
      }
      return {
        width: `${props.width}px`,
        height: `${props.height}px`
      };
    });

    const sketch = (p5) => {
      class Particle {
        constructor() {
          this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
          this.vel = p5.createVector(p5.random(-0.5, 0.5), p5.random(-0.5, 0.5));
          this.size = p5.random(2, 4);
          this.alpha = p5.random(100, 200);
        }

        update() {
          this.pos.add(this.vel);

          // Wrap around edges
          if (this.pos.x < 0) this.pos.x = p5.width;
          if (this.pos.x > p5.width) this.pos.x = 0;
          if (this.pos.y < 0) this.pos.y = p5.height;
          if (this.pos.y > p5.height) this.pos.y = 0;
        }

        display() {
          p5.noStroke();
          p5.fill(
            props.particleColor[0],
            props.particleColor[1],
            props.particleColor[2],
            this.alpha
          );
          p5.ellipse(this.pos.x, this.pos.y, this.size);
        }

        connectNearby(others) {
          for (const other of others) {
            const d = p5.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (d < props.connectionDistance && d > 0) {
              const alpha = p5.map(d, 0, props.connectionDistance, 100, 0);
              p5.stroke(
                props.particleColor[0],
                props.particleColor[1],
                props.particleColor[2],
                alpha
              );
              p5.strokeWeight(0.5);
              p5.line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            }
          }
        }
      }

      p5.setup = () => {
        const canvas = p5.createCanvas(
          props.fullscreen ? p5.windowWidth : props.width,
          props.fullscreen ? p5.windowHeight : props.height
        );
        canvas.parent(canvasContainer.value);

        // Initialize particles
        particles = [];
        for (let i = 0; i < props.particleCount; i++) {
          particles.push(new Particle());
        }
      };

      p5.draw = () => {
        p5.background(props.backgroundColor);

        for (const particle of particles) {
          particle.update();
          particle.display();
          particle.connectNearby(particles);
        }
      };

      p5.windowResized = () => {
        if (props.fullscreen) {
          p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        }
      };
    };

    onMounted(async () => {
      // Dynamic import for SSR compatibility
      const p5Module = await import('p5');
      const P5 = p5Module.default;
      p5Instance = new P5(sketch);
    });

    onUnmounted(() => {
      if (p5Instance) {
        p5Instance.remove();
      }
    });

    // Watch for prop changes
    watch(() => props.particleCount, (newCount) => {
      if (p5Instance) {
        // Reinitialize particles
        const diff = newCount - particles.length;
        if (diff > 0) {
          for (let i = 0; i < diff; i++) {
            particles.push(new particles[0].constructor());
          }
        } else if (diff < 0) {
          particles.splice(newCount);
        }
      }
    });

    return {
      canvasContainer,
      containerStyle
    };
  }
};
</script>

<style scoped>
.p5-container {
  overflow: hidden;
}

.p5-container canvas {
  display: block;
}
</style>

<!--
USAGE EXAMPLE:

<template>
  <div>
    <P5Background
      :particleCount="150"
      backgroundColor="#0d1117"
      :particleColor="[100, 200, 255]"
      :connectionDistance="120"
      :fullscreen="true"
    />

    <main class="content">
      <h1>Your Content Here</h1>
    </main>
  </div>
</template>

<script>
import P5Background from './vue-p5-component.vue';

export default {
  components: { P5Background }
};
</script>

<style>
.content {
  position: relative;
  z-index: 1;
  color: white;
}
</style>
-->
