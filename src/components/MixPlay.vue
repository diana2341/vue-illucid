<template>
  <div class="random-options">
    <div class="options" @click="randomMixer($event, 'rain')">Rainy day</div>

    <div class="options" @click="randomMixer($event, 'fall')">Fall camping</div>
    <div class="options" @click="randomMixer($event, 'night')">Night Owl</div>
    <div class="creation_conatiner">
      <div class="options mix-cheveron" @click="openMixes">
        My mixes
        <img
          class="cheveron"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAA50lEQVRIie3UPUoDQRjG8Z8WwUKwEbTfA1hZauUVUtp6Ba/gHSztBQtLtYmQFJ4hjY2BlCEgkrVwkGXc7I5mGmH+8DbD+zzPfFMoFAqZeMQLqoyeVfB86GqqQ81xliH0FLOGb29wjQ9cbhB6gffIcy3jqLHGNQa/CBwETewz7hLt4rZF9IzDhNB9PLXo77HXJ97ytcWrSPyK4w7dEaaRZoUrbCdM+pshFpHREucb9ibRt4q/7k4SBxj5eW53oeLxUdBkYd1NjesGO7lCm7S9zRxvPokTvDVCc/1ySVSYhMr5rxcKhX/EJz8gazIttX7QAAAAAElFTkSuQmCC"
        />
      </div>
      <div v-if="open" class="creations">
        <MixCreations
          @playAudio="playAudio"
          :userId="userId"
          v-on-clickaway="away"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MixCreations from "./MixCreations.vue";
import { directive as onClickaway } from "vue-clickaway";

export default {
  name: "MixPlay",
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    MixCreations,
  },
  data() {
    return {
      open: false,
    };
  },
  props: {
    userId: {},
  },
  methods: {
    away() {
      this.open = false;
    },
    playAudio(event, mix) {
      this.$emit("playAudio", event, mix);
    },
    backgroundUpdate(event, mix) {
      this.$emit("backgroundUpdate", event, mix);
    },
    openMixes() {
      this.open = !this.open;
    },
    randomMixer(event, type) {
      if (type === "fall") {
       this.$emit("backgroundUpdate", event, "fall");
        localStorage.setItem("illucidBackground", "fall");

        this.$emit("presets", event, "fall");
      } else if (type === "rain") {
        this.$emit("backgroundUpdate", event, "rain");
        localStorage.setItem("illucidBackground", "rain");

        this.$emit("presets", event, "rain");
      } else if (type === "night") {
        localStorage.setItem("illucidBackground", "night");

       this.$emit("backgroundUpdate", event, "night");
        this.$emit("presets", event, "night");
      }
    },
  },
};
</script>
<style >
.random-options {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 3em;
}
.options {
  color: #196aad;
  background: #bbd6db;
  border: solid 1px #196aad;
  padding: 10px;
  border-radius: 60px;
  cursor: pointer;
  font-family: "Dongle";
  padding-top: 3px;
  font-size: 22px;
  padding-bottom: 3px;
  min-width: 80px;
  z-index: 1;
}
.creation_conatiner {
  position: relative;
}
.creations {
  position: absolute;
  background: #bbd6db;
  z-index: 1;
  font-size: 18px;
  font-family: "Dongle";
  max-height: 200px;
  overflow: auto;
  padding: 10px;
  color: #186aad;
  min-width: 80px;
  max-width: 90px;
  overflow-x: hidden;
  border-radius: 10px;
  top: 31px;
  /* z-index: -1; */
  right: 3px;
}
.cheveron {
  width: 15px;
  height: 15px;
  margin-bottom: 3px;

  filter: invert(28%) sepia(75%) saturate(1249%) hue-rotate(182deg)
    brightness(99%) contrast(87%);
}
.mix-cheveron {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
