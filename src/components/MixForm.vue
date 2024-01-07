<template>
  <div class="add">
    <div class="form-container">
      <form @submit="onSubmit">
        <input
          type="text"
          v-model="mixName"
          placeholder="Mix name..."
          maxlength="12"
        />
        <input type="submit" value="Add mix" />
      </form>
      <div class="play-controls">
        <div class="inner-controls">
          <button id="play" class="control-btn" @click="playAll">
            <img src="~@/assets/play.png" />
          </button>
          <button id="pause" class="control-btn" @click="pauseAll">
            <b><img src="~@/assets/stop.png" /></b>
          </button>
          <button id="reset" class="control-btn" @click="resetAll">
            <b><img src="~@/assets/reset.png" /></b>
          </button>
        </div>
      </div>
    </div>
    <MixPlay @playAudio="playAudio" @presets="presets" :userId="userId" @backgroundUpdate="backgroundUpdate"/>
    <span v-bind:class="{ show: show }" id="toast">{{ message }}</span>
    <div class="sound-container">
      <div v-for="sound in soundDictionary" :key="sound.id">
        <MixControls
          :sound="sound"
          @updateVolume="updateVolume"
          :message="message"
          ref="controls"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MixControls from "./MixControls.vue";
import MixPlay from "./MixPlay.vue";
export default {
  name: "MixForm",
  components: {
    MixControls,
    MixPlay,
  },
  data() {
    return {
      mixName: "",
      message: "",
      show: false,
    };
  },
  props: {
    userId: {},
  },

  methods: {
    playAudio(event, mix) {
      this.$emit("playAudio", event, mix);
    },
    backgroundUpdate(event, type) {
      this.$emit("backgroundUpdate", event, type);
    },
    checkVolume( name){
    let mapped = this.$refs.controls.map((control) => {
        if (control.$refs.control.name === name) {
          if(control.$refs.control.value){
            return control.$refs.control.value
          }
        }
      });
      return mapped.filter(el=>el!==undefined)[0]
    },

    updateVolume(event) {
      if (event) {
        if (event.type === "change") {
          event.currentTarget.previousElementSibling.volume =
          event.target.value;
        }
      }
    },

    ...mapActions(["addMix"]),
    onSubmit(e) {
      e.preventDefault();
      let id = localStorage.getItem("illucidId");
      let userId = id ? id : this.userId;
      let empty = this.$refs.controls.every((control) => parseFloat(control.$refs.audio.nextElementSibling.value) === 0)
      if (this.mixName === "" ||empty) {
        this.show = true;
        this.message =
          "Please make you have a sure mix name and at least one sound has volume!";
        setTimeout(() => {
          this.message = "";
          this.show = false;
        }, 3200);
      } else {
        let name = localStorage.getItem("illucidName");

        let data = {
          user_name: name,
          mix_name: this.mixName,
          user_id: userId,
          light_rain_volume: this.checkVolume('rain'),
          heavy_rain_volume: this.checkVolume('heavy'),
          large_fire_volume: this.checkVolume('regulatFire'),
          campfire_volume: this.checkVolume('fire'),
          forest_volume: this.checkVolume('forest'),
          river_volume: this.checkVolume('riverWave'),
          strong_wind_volume: this.checkVolume('strongWind'),
          light_wind_volume: this.checkVolume('lightWind'),
          thunder_volume: this.checkVolume('thunder'),
          wave_volume: this.checkVolume('wave'),
          coffee_shop_volume: this.checkVolume('cafe'),
          bird_volume: this.checkVolume('bird'),
          cat_purring_volume: this.checkVolume('cat'),
          night_sound_volume: this.checkVolume('night'),
          wind_chime_volume: this.checkVolume('chimes'),
        };
        this.addMix(data);
        this.mixName = "";
        this.show = true;
        this.message = "Mix added! check it out under 'My mixes' ";
        setTimeout(() => {
          this.message = "";
          this.show = false;
        }, 3200);
      }
    },
    pauseAll() {
      this.$refs.controls.map((control) => {
        control.$refs.audio.pause();
      });
    },
    playAll() {
      this.$refs.controls.map((control) => {
        if (parseFloat(control.$refs.audio.nextElementSibling.value) !== 0) {
          control.$refs.audio.play();
        }
      });
    },
    resetAll() {
      this.$refs.controls.map((control) => {
        control.$refs.audio.nextElementSibling.value = 0;
        this.updateVolume(null, control.$refs.audio.nextElementSibling.name, 0);
      });
      this.pauseAll();
    },
    updatePreset(name,volume){
      this.$refs.controls.map((control) => {
          if (control.$refs.control.name  === name) {
            control.$refs.control.value = volume;
            control.$refs.control.previousElementSibling.volume = volume;
          }
        });

    },
    presets(event, name) {
      this.resetAll();
      if (name === "rain") {
        this.updatePreset("thunder","0.36")
        this.updatePreset("chimes","0.06")
        this.updatePreset("heavy","0.12")
        this.playAll();
      } else if (name === "fall") {
        this.updatePreset("bird","0.16")
        this.updatePreset("riverWave","0.06")
        this.updatePreset("regularFire","0.2")
        this.playAll();
      } else if (name === "night") {
        this.updatePreset("night","0.15")
        this.updatePreset("chimes","0.24")
        this.updatePreset("lightWind","0.13")
        this.playAll();
      }
    },
  },
  computed: mapGetters(["soundDictionary"]),
  // beforeCreate(){
  //   alert('before create')
  // },
  // created(){
  //   alert('created')
  //   //For fetching any initial required data to be rendered(like JSON) from external API and assigning it to any reactive data properties

  // },
  // beforeMount(){
  //   alert('b4 mount')

  // },
  // mounted(){
  //   alert('mounted')
  //     // mounted(): called after the DOM has been mounted or rendered. Here you have access to the DOM elements and DOM manipulation can be performed for example get the innerHTML:

  // },

  // beforeUpdate(){
  //   alert('b4 update')
  // },
  //  updated(){
  //   alert('updates')

  // },
  watch: {
    // lightRainVolume(volume) {
    //   if (parseFloat(volume) === 1) {
    //     this.message = "Sound at max volume";
    //     this.show = "true";
    //     setTimeout(() => {
    //       this.show = false;
    //     }, 3000);
    //   } else if (parseFloat(volume) === 0) {
    //     this.message = "Sound muted";
    //     this.show = "true";
    //     setTimeout(() => {
    //       this.show = false;
    //     }, 3200);
    //   } else {
    //     this.show = false;
    //   }
    // },
  },
};
</script>
<style >
.sound-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
#toast {
  visibility: hidden;
  min-width: 250px;
  background-color: #bbd6db;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: #186aad;
  text-align: center;
  border-radius: 10px;
  padding: 12px;
  position: fixed;
  z-index: 100000;
  bottom: 30px;
  font-size: 24px;
  font-family: "Dongle";
  left: 50%;
  transform: translate(-50%, 0);
  line-height: 1;
}

#toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 3s;
  animation: fadein 0.5s, fadeout 0.5s 3s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
input[type=text] {
  background-color: #f7f8ff;
  -webkit-border-radius: 45px;
  -moz-border-radius: 45px;
  border-radius: 45px;
  font-size: 15px;
  height: 45px!important;
  border: none;
  padding-left: 15px;
  min-width: 50%;
  margin-bottom: 10px;
  border: solid 1px #186aad;
}
input[type=text][placeholder] {
  color: #656d79;
  font-size: 15px;
  font-weight: 500;
  outline: none;
}
form {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  right: -30px;
}
.play-controls {
  margin: 0 auto;
}
input[type=submit] {
  background: #bbd6db;
  color: #196aad;
  border: none;
  padding: 10px;
  border-radius: 45px;
  min-height: 47px;
  top: 0;
  min-width: 80px;
  font-weight: 800;
  right: 5em;
  top: -5px;
  position: relative;
  cursor: pointer;
}
.control-btn {
  background: transparent;
  border: none;
}
.control-btn img {
  width: 35px;
  cursor: pointer;
  filter: invert(85%) sepia(4%) saturate(958%) hue-rotate(141deg)
    brightness(101%) contrast(88%);
}
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-bottom: 22px;
  margin-top: 1em;
}
@media screen and (max-width: 560px) {
  input[type=text] {
    max-height: 40px!important;
  }
  input[type=submit]{
    max-height: 45px!important;
  }
}

</style>
