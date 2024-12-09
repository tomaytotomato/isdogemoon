<template>
  <div class="earth">
    <div class="ground">
      <Scenery name="mountain_1" size="large" position="10"></Scenery>
      <Scenery name="mountain_2" size="medium" position="23"></Scenery>
      <Scenery name="mountain_3" size="large" position="78"></Scenery>
      <Scenery name="mountain_2" size="medium" position="91"></Scenery>
      <Scenery name="mountain_1" size="small" position="84"></Scenery>
      <Scenery name="trees" size="small" position="88"></Scenery>
    </div>
  </div>
</template>

<style scoped>
.earth {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background: linear-gradient(to bottom, #4B7BE5 0%, #23B5D3 100%);
  z-index: 5;
}

.ground {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 180px;
  background: linear-gradient(to bottom, #2d5a27 0%, #1e3c1a 100%);
}

</style>
<script setup lang="ts">
import Scenery from "./Scenery.vue";
</script>