<template>
  <div class="stars">
    <div v-for="n in 200" :key="n" 
      class="star"
      :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 300}%`,
        animationDelay: `${Math.random() * 3}s`
      }"
    ></div>
  </div>
</template>

<style scoped>
.stars {
  position: absolute;
  width: 100%;
  height: 75%;
  overflow: hidden;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle 2s infinite;
}

@keyframes twinkle {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>