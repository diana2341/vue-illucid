<template>

  <div>
        <div class="bg" :class='{"night": theme.bgNight, "rain": theme.bgRain,"leaves":theme.bgFall}' ref="bg"></div>

    <div class="header">profile!!!</div>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  name:'ProfilePage',
  computed:{
    ...mapGetters(["theme"]),
    rainMode(){
      return this.$store.theme.bgRain
    },
    fallMode(){
      return this.$store.theme.bgFall
    },
    nightMode(){
      return this.$store.theme.bgNight
    }
  },
  methods:{
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
  },
  mounted(){
    this.backgroundUpdate()
  }

}
</script>
<style>
.header{
  font-size: 30px;
}
</style>