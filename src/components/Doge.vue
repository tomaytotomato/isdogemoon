<template>
  <div
      class="doge"
      :style="{ bottom: position + '%' }"
      :class="{ rotating: isRotating }"
      @click="onDogeClick">
    <img src="../assets/doge.png" alt="Doge" />
    <div v-if="showPhrase" class="doge-phrase">
      {{ currentPhrase }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isRotating: false,
      showPhrase: false,
      currentPhrase: '',
      clickTimeout: null,
      dogePhrases: [
        'wow such fun',
        'much click',
        'very spin',
        'so dizzy',
        'wow amaze',
        'such interaction',
        'very click',
        'wow spinning',
        'much wow',
        'doge approve',
        'such rocket',
        'much space',
        'very fast',
        'so speed',
        'wow donation',
        'much generous',
        'very dogecoin',
        'such support',
        'so boost',
        'wow tipping',
        'much thanks',
        'so light speed',
        'such orbit',
        'doge explore',
        'very universe',
        'much journey',
        'wow stars',
        'such cosmos',
        'so infinite',
        'doge to moon',
        'much galaxy'
      ]
    }
  },
  methods: {
    onDogeClick() {
      // Prevent multiple simultaneous clicks
      if (this.isRotating || this.showPhrase) {
        return
      }

      // Trigger rotation
      this.isRotating = true

      // Show random Doge phrase
      this.currentPhrase = this.dogePhrases[
          Math.floor(Math.random() * this.dogePhrases.length)
          ]
      this.showPhrase = true

      // Reset rotation and hide phrase after animations
      this.clickTimeout = setTimeout(() => {
        this.isRotating = false
        this.showPhrase = false
        this.clickTimeout = null
      }, 2000)
    },
    // Cleanup timeout if component is destroyed
    beforeDestroy() {
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout)
      }
    }
  }
}
</script>

<style scoped>
.doge {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 1s ease-in-out;
  z-index: 10;
  cursor: pointer;
}

.doge img {
  width: 100px;
  height: 100px;
}

.doge-phrase {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 10px 15px;
  border-radius: 20px;
  font-family: Comic Sans MS, cursive;
  font-weight: bold;
  font-size: 2rem;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: fadeIn 0.5s, fadeOut 0.5s 1.5s;
  min-width: 120px;
  text-align: center;
}

.rotating {
  animation: rotate 1s linear;
}

@keyframes rotate {
  from {
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) rotate(360deg);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateX(-50%) translateY(0); }
  to { opacity: 0; transform: translateX(-50%) translateY(-10px); }
}
</style>