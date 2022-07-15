<template>
  <div id="app">
    <div class="bg" :class='{"night": bgNight, "rain": bgRain,"leaves":bgFall}' ref="bg"></div>
    <div v-if="userId === false">
      <PopupSignup @nameUpdate="nameUpdate" />
    </div>
    <div
      class="welcome_user"
      :class="{ show: userName.length > 1 || name.length > 1 }"
      v-if="userId"
    >
      <div data-aos="flip-up" data-aos-delay="600">
        {{ dayTime }}
        <span class="name">{{ userName.length > 1 ? userName : name }}</span
        >!
      </div>
    </div>
    <div class="welcome_user" style="opacity: 0" v-if="!userId">
      <div data-aos="flip-up" data-aos-delay="600">
        {{ dayTime }}
        <span class="name">{{ userName.length > 1 ? userName : name }}</span
        >!
      </div>
    </div>
    <div class="container">
      <MixForm
        ref="form"
        @playAudio="playAudio"
        :userId="id"
        :showUser="userId"
        @backgroundUpdate="backgroundUpdate"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import MixForm from "./components/MixForm.vue";
import PopupSignup from "./components/PopupSignup.vue";
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  name: "App",
  components: {
    MixForm,
    PopupSignup,
  },

  methods: {
    ...mapMutations(["setDate"]),
    matchKey(objectToSearch, keyToFind,audioControl) {
    for (let k in objectToSearch) {

        if ( k?.toLowerCase().indexOf(keyToFind?.toLowerCase()) !== -1) {

        if(audioControl?.name === keyToFind){
console.log( objectToSearch[k],keyToFind)
         audioControl.value = parseFloat(objectToSearch[k])
          audioControl.previousElementSibling.volume =
            parseFloat(objectToSearch[k])
          audioControl.previousElementSibling.play();
        }     
        }
    }
   return  null
},

    playAudio(event, mix) {
      delete mix["_id"];
      delete mix["user_id"];
      this.$refs.form.$children.map((child) => {
      this.matchKey(mix,child.$refs.control?.name,child.$refs.control)

      });
    },
    nameUpdate(e, name, id, show) {
      this.name = name;
      this.id = id;
      this.userId = show;
    },
    backgroundUpdate(event, type){
       let bg = localStorage.getItem("illucidBackground");
      if(type){
        if (type === "fall") {
          this.bgFall=true
          this.bgRain=false
          this.bgNight=false
        } else if (type === "rain") {
          this.bgFall=false
          this.bgRain=true
          this.bgNight=false
        } else if (type === "night") {
          this.bgFall=false
          this.bgRain=false
          this.bgNight=true
        }
      }else if(!type){
        if (bg === "fall") {
          this.bgFall=true
        } else if (bg === "rain") {
          this.bgRain=true
        } else if (bg === "night") {
          this.bgNight=true
        }
      }

    }
  },
  data() {
    return {
      userId: false,
      userName: "",
      name: "",
      id: "",
      dayTime: "",
      bgFall:false,
      bgRain:false,
      bgNight:false
    };
  },
  mounted() {
    this.$store.commit("setDate");
    AOS.init({
      once: true,
      delay: 100,
    });
    this.backgroundUpdate()
  },

  created() {
    let id = localStorage.getItem("illucidId");
    let name = localStorage.getItem("illucidName");
    if (id && name.length) {
      this.userId = true;
      this.userName = name;
      this.id = id;
    } else {
      this.userId = false;
    }
   
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      this.dayTime = "Good morning";
    } else if (curHr < 18) {
      this.dayTime = "Good afternoon";
    } else {
      this.dayTime = "Good evening";
    }
  },
  watch: {
    name(name) {
      this.name = name;
    },
    id(id) {
      this.id = id;
    },
  },
};
</script>

<style>
html, body {
    margin: 0;
    padding: 0;
    border: 0;
}
.bg{
  position: fixed; /*position: fixed;*/
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url("~@/assets/night.svg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.bg.night{
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("~@/assets/night.svg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

}
.bg.rain{
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("~@/assets/rain.svg");
  background-size: initial;
  background-position: initial;
  background-repeat: initial;

}
.bg.leaves{
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("~@/assets/darkLeaves.svg");
  background-size: initial;
  background-position: initial;
  background-repeat: initial;

}
.name {
  text-transform: capitalize;
}
.container {
  /* background: #00000047; */
  border-radius: 60px;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 0;
}
.welcome_user {
  font-family: "Coiny";
  color: #bbd6db;
  font-size: 45px;
  margin: 0 auto;
  width: max-content;
  opacity: 0;
  margin-top: 1.5em;
}
.welcome_user.show {
  opacity: 1;
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@media (max-width: 545px) {
  .sound-container {
    grid-template-columns: 1fr 1fr !important;
  }
  .welcome_user {
    width: 90%;
    text-align: center;
  }
}
@media (max-width: 437px) {
  input[type="text"] {
    min-width: 75% !important;
  }
  .random-options {
    flex-wrap: wrap;
  }
}
@media (max-width: 280px) {
  .sound-container {
    grid-template-columns: 1fr !important;
  }
}
</style>
