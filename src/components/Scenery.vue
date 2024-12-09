<template>
  <div
      class="scenery-container"
      :style="positionStyles"
  >
    <svg
        v-if="svgContent"
        :width="dynamicWidth"
        :height="dynamicHeight"
        :viewBox="`0 0 ${originalWidth} ${originalHeight}`"
        preserveAspectRatio="xMidYMax"
        v-html="svgContent"
    ></svg>
  </div>
</template>

<script>
export default {
  name: 'Scenery',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    position: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 100
    }
  },
  data() {
    return {
      svgContent: null,
      originalWidth: 100,
      originalHeight: 100,
      dynamicWidth: 0,
      dynamicHeight: 0,
    }
  },
  computed: {
    positionStyles() {
      return {
        position: 'absolute',
        left: `${this.position}%`,
        bottom: '0',
        transform: 'translateX(-50%) translateY(0%)'
      }
    }
  },
  async created() {
    await this.loadSVG();
  },
  methods: {
    async loadSVG() {
      try {
        const svgModule = await import(`../assets/${this.name}.svg?raw`);
        this.svgContent = svgModule.default;

        const svgElement = new DOMParser().parseFromString(this.svgContent, 'image/svg+xml').querySelector('svg');
        if (svgElement) {
          this.originalWidth = parseFloat(svgElement.getAttribute('width')) || 100;
          this.originalHeight = parseFloat(svgElement.getAttribute('height')) || 100;
          this.calculateSize();
        }
      } catch (error) {
        console.error("Error loading SVG", error);
      }
    },
    calculateSize() {
      const sizeMap = {
        small: { min: 90, max: 120 },
        medium: { min: 220, max: 250 },
        large: { min: 400, max: 400 }
      }

      const { min, max } = sizeMap[this.size];
      const scaleFactor = Math.random() * (max - min) + min;

      const aspectRatio = this.originalHeight / this.originalWidth;
      this.dynamicWidth = scaleFactor;
      this.dynamicHeight = scaleFactor * aspectRatio;
    }
  }
}
</script>

<style scoped>
.scenery-container {
  position: absolute;
  z-index: 10;
}

.scenery-container svg {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
