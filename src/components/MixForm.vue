<template>
  <div class="add">
    <form @submit="onSubmit" >
      <input type="text" v-model="mixName" placeholder="Mix name...">
      <input type="submit" value="Submit">
    </form>
    <div class="play-controls" >
        <div class="inner-controls">
            <button id='play' @click="playAll">▶</button>
            <button id='pause' @click="pauseAll"><b>||</b></button>
            <button id="reset" @click="resetAll"><b>↻</b> </button>
        </div>  
    </div>
  <span v-bind:class="{'show':show}" id='toast'>{{message}}</span>
    <div class="sound-container">
      
       <div v-for="sound in soundDictionary" :key='sound.id' >
      <MixControls :sound="sound" @updateVolume="updateVolume" :message='message' ref='controls'/>
      
    </div>
    </div>
   
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import MixControls from './MixControls.vue'
export default{
  name:'MixForm',
  components:{
    MixControls
  },
  data(){
    return{
      mixName:'',
      lightRainVolume:0,
      heavyRainVolume:0,
      largeFireVolume:0,
      campfireVolume:0,
      forestVolume:0,
      riverVolume:0,
      strongWindVolume:0,
      lightWindVolume:0,
      thunderVolume:0,
      waveVolume:0,
      coffeeShopVolume:0,
      birdVolume:0,
      catPurringVolume:0,
      nightSoundVolume:0,
      windChimeVolume:0,
      message:'',
      show:false
    }
  },
  methods:{
  updateVolume(event,name){
    event.currentTarget.previousElementSibling.volume=event.target.value
        if(name==='rain'){
          this.lightRainVolume=event.target.value

        }else if(name==='bird'){
          this.birdVolume=event.target.value

        }else if(name==='regularFire'){
          this.largeFireVolume=event.target.value

        }else if(name==='thunderCloud'){
          this.heavyRainVolume=event.target.value
          // 
        }else if(name==='wave'){
          this.waveVolume=event.target.value

        }else if(name==='strongWind'){
          this.strongWindVolume=event.target.value

        }else if(name==='forest'){
          this.forestVolume=event.target.value

        }else if(name==='thunder'){
          this.thunderVolume=event.target.value

        }else if(name==='fire'){
          this.campfireVolume=event.target.value

        }else if(name==='riverWave'){
          this.riverVolume=event.target.value
        }else if(name==='simpleWind'){

          this.lightWindVolume=event.target.value
        }else if(name==='cafe'){

          this.coffeeShopVolume=event.target.value
        }else if(name==='cat'){
          this.catPurringVolume=event.target.value
        }else if(name==='night'){
          this.nightSoundVolume=event.target.value
        }else if(name==='chimes'){
          this.windChimeVolume=event.target.value
        }
      },

    ...mapActions(['addMix']),
    onSubmit(e){
      e.preventDefault();
     let data={
          mix_name:this.mixName,
          user_id:1,
          light_rain_volume:parseFloat(this.lightRainVolume),
          heavy_rain_volume:parseFloat(this.heavyRainVolume),
          large_fire_volume:parseFloat(this.largeFireVolume),
          campfire_volume:parseFloat(this.campfireVolume),
          forest_volume:parseFloat(this.forestVolume),
          river_volume:parseFloat(this.riverVolume),
          strong_wind_volume:parseFloat(this.strongWindVolume),
          light_wind_volume:parseFloat(this.lightWindVolume),
          thunder_volume:parseFloat(this.thunderVolume),
          wave_volume:parseFloat(this.waveVolume),
          coffee_shop_volume:parseFloat(this.coffeeShopVolume),
          bird_volume:parseFloat(this.coffeeShopVolume),
          cat_purring_volume:parseFloat(this.catPurringVolume),
          night_sound_volume:parseFloat(this.nightSoundVolume),
          wind_chime_volume:parseFloat(this.windChimeVolume)

      }
      this.addMix(data)
      
    },
    pauseAll(){
      this.$refs.controls.map(control=>control.$refs.audio.pause())
    },
     playAll(){
      this.$refs.controls.map(control=>{
        console.log( control.$refs.audio.nextElementSibling.value)
        if(parseFloat(control.$refs.audio.nextElementSibling.value) !== 0){
          control.$refs.audio.play()
        }
      }
      
      )
    },
    resetAll(){
      this.$refs.controls.map(control=>{
        control.$refs.audio.nextElementSibling.value=0
      }) 
      this.pauseAll()

    }
    
  },
  computed:mapGetters(['soundDictionary']),
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
  watch:{
    lightRainVolume(volume){
      if(parseFloat(volume) === 1){
        this.message='Sound at max volume'
        this.show='true'
        setTimeout(()=>{
          this.show=false
        }, 3200);

      }else if(parseFloat(volume) === 0){
        this.message='Sound muted'
        this.show='true'
        setTimeout(()=>{
          this.show=false
        }, 3200);

      }else{
        this.show=false
      }


    }
  }

}
</script>
<style scoped>
  .sound-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
  }
  #toast {
  visibility: hidden;
  min-width: 250px;
  margin-left: -200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: black;
  text-align: center;
  border-radius: 10px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 16px;
}

#toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 3s;
  animation: fadein 0.5s, fadeout 0.5s 3s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

</style>