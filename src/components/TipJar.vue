<template>
  <div class="tip-jar" @click="copyToClipboard">
    <img :src="tipjarIcon" alt="Dogecoin Tip Jar" title="Much tips please" class="svg-icon" />
    <p v-if="copiedMessage" class="copied-message">Doge Wallet Address Copied! Much thx 🚀</p>
  </div>
</template>

<script>
import tipjarIcon from '@/assets/tipjar.svg';

export default {
  name: 'TipJar',
  props: {
    dogecoinAddress: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      copiedMessage: false,
      tipjarIcon,
    };
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard
      .writeText(this.dogecoinAddress) // Dynamically use the prop value
      .then(() => {
        this.copiedMessage = true;
        setTimeout(() => {
          this.copiedMessage = false;
        }, 2000);
      })
      .catch((err) => console.error('Failed to copy:', err));
    },
  },
};
</script>

<style scoped>
.tip-jar {
  position: absolute;
  top: 60%;
  left: 10%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  animation: floatAndTilt 6s ease-in-out infinite;
}

.svg-icon {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
}

.copied-message {
  position: absolute;
  top: 100%;
  left: -100%;
  font-size: 1rem;
  color: #00ffff;
  white-space: nowrap;
  transform: translateY(5px);
  animation: fadeInOut 5s ease-in-out forwards;
}
</style>
