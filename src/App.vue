<template>
  <div class="space-container">
    <div class="space-background">
      <div class="atmosphere"></div>
      <Stars />
      <Moon />
      <Earth />
      <Doge
          :position="dogePosition"
          :is-launching="isLaunching"
      />
      <TipJar :dogecoinAddress="dogecoinAddress" />
      <PriceDisplay
          :price="currentPrice"
          :message="statusMessage"/>
      <h1 class="main-title">Is Doge Moon Yet?</h1>
    </div>

    <!-- Credits Section -->
    <div class="credits">
      <a href="https://github.com/tomaytotomato/isdogemoon" target="_blank">Github</a> |
      <a href="https://tomaytotomato.com" target="_blank">tomaytotomato.com</a> |
      Dogecoin Address: <code v-text="dogecoinAddress"></code>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { fetchDogePrice } from './services/crypto'
import Moon from './components/Moon.vue'
import Doge from './components/Doge.vue'
import PriceDisplay from './components/PriceDisplay.vue'
import Stars from './components/Stars.vue'
import Earth from './components/Earth.vue'
import TipJar from "./components/TipJar.vue";

export default {
  name: 'App',
  components: {
    TipJar,
    Moon,
    Doge,
    PriceDisplay,
    Stars,
    Earth
  },
  setup() {
    const currentPrice = ref(0)
    const isLaunching = ref(false)
    const dogecoinAddress = ref('DMRpjaQHPFUNn9S6ZSQZbCqR4uXd4shqj8');

    const dogePosition = computed(() => {
      if (currentPrice.value >= 100) return 90;
      if (currentPrice.value >= 1) {
        return Math.min(80, 20 + (currentPrice.value * 0.6));
      }
      if (currentPrice.value < 0.5) return 0;
      return Math.max(10, currentPrice.value * 20);
    });

    const statusMessage = computed(() => {
      if (currentPrice.value >= 100) return "WOW! SUCH MOON! 🌕"
      if (currentPrice.value >= 1) return "TO THE MOON! 🚀"
      return "Still on Earth... Much waiting 🌍"
    });

    const updatePrice = async () => {
      try {
        const price = await fetchDogePrice()
        if (price > currentPrice.value) {
          isLaunching.value = true
          setTimeout(() => {
            isLaunching.value = false
          }, 1000)
        }
        currentPrice.value = price
      } catch (error) {
        console.error('Error updating price:', error)
      }
    }

    onMounted(() => {
      updatePrice()
      setInterval(updatePrice, 300000)
    });

    return {
      currentPrice,
      dogePosition,
      dogecoinAddress,
      statusMessage,
      isLaunching
    };
  }
}
</script>

<style>
/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui;
  color: white;
  text-align: center;
  overflow-x: hidden;
}

.main-title {
  padding-top: 50px;
  font-size: 4rem;
}

.space-container {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  perspective: 1000px;
}

.space-background {
  min-height: 300vh;
  width: 100%;
  background: linear-gradient(to bottom,
  #000000 0%,
  #000000 60%,
  #191970 85%,
  #4B7BE5 95%,
  #23B5D3 100%
  );
  position: relative;
  transform-style: preserve-3d;
}

.credits {
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 0.9rem;
  padding: 10px 0;
  text-align: center;
  z-index: 50;
}

.credits a {
  color: #00ffff;
  text-decoration: none;
}
</style>
