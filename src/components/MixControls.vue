<template>
  <div class="sound-control">
    <img
      :src="require('../assets/images/' + sound.image)"
      @click="playAudio()"
    />
    <audio loop ref="audio">
      <source :src="require('../assets/audio/second-audio/' + sound.audio)" />
    </audio>
    <input
      class="range"
      ref="control"
      type="range"
      min="0"
      max="1"
      step="0.01"
      :name="sound.name"
      :value="volume"
      @change="$emit('updateVolume', $event, sound.name)"
    />
  </div>
</template>
<script>
export default {
  name: "MixControls",
  props: {
    sound: {
      type: Object,
    },
    // message:{
    //   type:String
    // }
  },
  data() {
    return {
      volume: 0,
    };
  },
  methods: {
    getImgUrl(pic) {
      return require(pic);
    },
    playAudio() {
      const audio = event.currentTarget.nextElementSibling;
      if (!audio.paused) {
        audio.pause();
        // this.volume = 0;
        // audio.nextElementSibling.value = 0;
        this.$emit("updateVolume", null, audio.nextElementSibling.name, 0);
      } else {
        audio.loop = true;
        this.volume = 1;
        audio.nextElementSibling.value = 1;

        this.$emit("updateVolume", event, audio.nextElementSibling.name, 1);
        audio.play();
      }
    },
  },
};
</script>
<style >
.sound-control img {
  width: 90px;
  height: auto;
  cursor: pointer;

}
.sound-control {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  margin-bottom: 2em;
}
.range {
  /* width: 400px;
  height: 15px; */
  -webkit-appearance: none;
  background: #bbd6db;
  outline: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 0 5px #8fddf0;
  z-index: 1;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #196aad;
  cursor: pointer;
  border: 4px solid #54bfdb;
  box-shadow: -407px 0 0 400px #8fddf0;
}
img {
  filter: invert(100%);
}
</style>
