<template>
  <div id="app">

    <div class="bg" :class='{"night": theme.bgNight, "rain": theme.bgRain,"leaves":theme.bgFall}' ref="bg"></div>
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
     <router-link class="nav-link" to="/profile">
     Profile~~!!!
    </router-link>
    <div class="container">
      <MixForm
        ref="form"
        @playAudio="playAudio"
        :userId="id"
        :showUser="userId"
        @backgroundUpdate="backgroundUpdate"
      />
    </div>
    <span v-bind:class="{ show: show }" id="toast">{{ message }}</span>

  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import MixForm from "./MixForm.vue";
import PopupSignup from "./PopupSignup.vue";
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  name: "HomePage",
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
         window.clearTimeout(this.showTime);
        if (type === "fall") {
          this.theme.bgFall=true
          this.theme.bgRain=false
          this.theme.bgNight=false
          this.show = false;
        } else if (type === "rain") {
          this.theme.bgFall=false
          this.theme.bgRain=true
          this.theme.bgNight=false
          this.show = false;
        } else if (type === "night") {
          this.theme.bgFall=false
          this.theme.bgRain=false
          this.theme.bgNight=true
          this.show=false
        }
      }else if(!type){
        this.mounted=true
        setTimeout(() => {
              this.mounted=false
        }, 1000); 
        if (bg === "fall") {
          this.theme.bgFall=true
        } else if (bg === "rain") {
          this.theme.bgRain=true
        } else if (bg === "night") {
          this.theme.bgNight=true
        }
      }

    },
    hide(){
    this.showTime = setTimeout(() => {
          this.message = "";
          this.show = false;
      }, 3200); 
    }
  },
  data() {
    return {
      userId: false,
      userName: "",
      name: "",
      id: "",
      dayTime: "",
      show:false,
      message:'',
      mounted:false,
      showTime:null,
     
    };
  },
  mounted() {
    this.$store.commit("setDate");
    AOS.init({
      once: true,
      delay: 100,
    });
    this.backgroundUpdate()
    this.mounted=true
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
  computed:{
    ...mapGetters(["theme"]),
    rainMode(){
      return this.$store.state.theme.bgRain
    },
    fallMode(){
      return this.$store.state.theme.bgFall
    },
    nightMode(){
      return this.$store.state.theme.bgNight
    }
  },
  watch: {
    name(name) {
      this.name = name;
    },
    id(id) {
      this.id = id;
    },
   
    // mode change message
    theme:{
      deep: true,
      handler(){
      if(!this.mounted)
      setTimeout(() => {
      this.show=true
      this.message='Your mode has been updated!'
      }, 200); 
     this.hide()
    }
  },
  // Specific message for each mode changed
  // rainMode(){
  //   this.show=true
  //   this.message='You are now in rain mode!!'
  //   setTimeout(() => {
  //       this.message = "";
  //       this.show = false;
  //     }, 3200);
  // },
  //  fallMode(){
  //   this.show=true
  //   this.message='You are now in fall mode!!'
  //   setTimeout(() => {
  //       this.message = "";
  //       this.show = false;
  //     }, 3200);
  // },
  //  nightMode(){
  //   this.show=true
  //   this.message='You are now in night mode!!'
  //   setTimeout(() => {
  //       this.message = "";
  //       this.show = false;
  //     }, 3200);
  // }
  
}
}
</script>

<style>
.nav-link{
  font-size: 30px;
}
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
  z-index: -1;
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
