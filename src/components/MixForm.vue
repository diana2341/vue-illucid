<template>
  <div class="add">
    <form @submit="onSubmit" >
      <input type="text" v-model="mixName" placeholder="Mix name...">
      <input type="submit" value="Submit">
    </form>
    <div class="sound-container">
       <div v-for="sound in soundDictionary" :key='sound.id' >
      <MixControls :sound="sound" @updateVolume="updateVolume"/>
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
      light_rain_volume:0,
      heavy_rain_volume:0,
      large_fire_volume:0,
      campfire_volume:0,
      forest_volume:0,
      river_volume:0,
      strong_wind_volume:0,
      light_wind_volume:0,
      thunder_volume:0,
      wave_volume:0,
      coffee_shop_volume:0,
      bird_volume:0,
      cat_purring_volume:0,
      night_sound_volume:0,
      wind_chime_volume:0
    }
  },
  methods:{
updateVolume(event,name){
  event.currentTarget.previousElementSibling.volume=event.target.value
        if(name==='rain'){
          this.light_rain_volume=event.target.value

        }else if(name==='bird'){
          this.bird_volume=event.target.value

        }else if(name==='regularFire'){
          this.large_fire_volume=event.target.value

        }else if(name==='thunderCloud'){
          this.heavy_rain_volume=event.target.value
          // 
        }else if(name==='wave'){
          this.wave_volume=event.target.value

        }else if(name==='strongWind'){
          this.strong_wind_volume=event.target.value

        }else if(name==='forest'){
          this.forest_volume=event.target.value

        }else if(name==='thunder'){
          this.thunder_volume=event.target.value

        }else if(name==='fire'){
          this.campfire_volume=event.target.value

        }else if(name==='riverWave'){
          this.river_volume=event.target.value
        }else if(name==='simpleWind'){

          this.light_wind_volume=event.target.value
        }else if(name==='cafe'){

          this.coffee_shop_volume=event.target.value
        }else if(name==='cat'){
          this.cat_purring_volume=event.target.value
        }else if(name==='night'){
          this.night_sound_volume=event.target.value
        }else if(name==='chimes'){
          this.wind_chime_volume=event.target.value
        }
      },

    ...mapActions(['addMix']),
    onSubmit(e){
      e.preventDefault();
     let data={
          mix_name:this.mixName,
          user_id:1,
          light_rain_volume:parseFloat(this.light_rain_volume),
          heavy_rain_volume:parseFloat(this.heavy_rain_volume),
          large_fire_volume:parseFloat(this.large_fire_volume),
          campfire_volume:parseFloat(this.campfire_volume),
          forest_volume:parseFloat(this.forest_volume),
          river_volume:parseFloat(this.river_volume),
          strong_wind_volume:parseFloat(this.strong_wind_volume),
          light_wind_volume:parseFloat(this.light_wind_volume),
          thunder_volume:parseFloat(this.thunder_volume),
          wave_volume:parseFloat(this.wave_volume),
          coffee_shop_volume:parseFloat(this.coffee_shop_volume),
          bird_volume:parseFloat(this.coffee_shop_volume),
          cat_purring_volume:parseFloat(this.cat_purring_volume),
          night_sound_volume:parseFloat(this.night_sound_volume),
          wind_chime_volume:parseFloat(this.wind_chime_volume)

      }
      this.addMix(data)
      
    },
    
  },
  computed:mapGetters(['soundDictionary']),

}
</script>
<style scoped>
  .sound-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
  }
</style>