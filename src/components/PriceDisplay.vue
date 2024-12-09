<template>
  <div class="price-display-container">
    <div class="price-axis">
      <div class="axis-label moon"></div>
      <div class="axis-label happening"></div>
      <div class="axis-label launch"></div>
      <div class="axis-label earth"></div>
    </div>
    <div class="price-display" :style="{ bottom: `${pricePosition}%` }">
      <h2>${{ price.toFixed(4) }}</h2>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import Doge from "./Doge.vue";

export default {
  components: {Doge},
  props: {
    price: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    pricePosition() {
      if (this.price >= 100) return 90
      if (this.price >= 1) {
        return Math.min(80, 20 + (this.price * 0.6))
      }
      return Math.max(10, this.price * 20)
    }
  }
}
</script>

<style scoped>
.price-display-container {
  position: fixed;
  right: 30%;
  top: 0;
  bottom: 0;
  width: 200px;
  pointer-events: none;
  z-index: 20;
}

.price-axis {
  position: absolute;
  right: 0;
  top: 10%;
  bottom: 150px;
  width: 100%;
}

.axis-label {
  position: absolute;
  right: 10px;
  transform: translateY(-50%);
  color: transparent;
  font-size: 0.9rem;
  text-align: right;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.axis-label.moon {
  top: 10%;
}

.axis-label.launch {
  top: 50%;
}

.axis-label.earth {
  bottom: 0;
  transform: translateY(0);
}

.price-display {
  position: absolute;
  right: 10px;
  transform: translateY(50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: bottom 1s ease-in-out;
}

.price-display h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.price-display p {
  font-size: 1rem;
  color: #fff;
}
</style>