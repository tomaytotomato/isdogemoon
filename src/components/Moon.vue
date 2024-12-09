<template>
  <div ref="moonBackground" class="moon-background"></div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const moonBackground = ref(null)

    onMounted(() => {
      if (moonBackground.value) {
        const randomPosition = Math.random() * 200
        moonBackground.value.style.backgroundPosition = `${randomPosition}% 0%`
      }
    })

    return {
      moonBackground
    }
  }
}
</script>

<style scoped>
.moon-background {
  top: 8%;
  right: 50%;
  display: block;
  width: 12rem;
  height: 10.5rem;
  position: fixed;
  border-radius: 50%;
  background-image: url('../assets/moon.jpg');
  background-repeat: repeat-x;
  background-size: 110% 100%;
  opacity: 1;
  box-shadow: inset -10px 8px 6px -5px #ffffff, 
    inset 20px -20px 40px 30px rgba(0, 0, 0, 0.9),
    7px -6px 14px rgba(255, 255, 255, 0.3215686275);
  transform: translateX(50%);
  z-index: 3;
}
</style>