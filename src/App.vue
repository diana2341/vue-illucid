<template>
  <div id="app">
    {{time}}
    <MixForm ref='form'/>
    <MixCreations @playAudio="playAudio"/>
  </div>
</template>

<script>
import MixCreations from './components/MixCreations.vue'
import MixForm from './components/MixForm.vue'
export default {
  name: 'App',
  components:{
    MixCreations,
    MixForm
  },
  data(){
    return{
      time:''
    }
  },
  methods:{
     playAudio(event,mix){
      this.$refs.form.$children.map(child=>{
         if(child.$refs.rain){
         child.$refs.rain.value=mix.light_rain_volume
         child.$refs.rain.previousElementSibling.volume=mix.light_rain_volume
         child.$refs.rain.previousElementSibling.play()

        }else if(child.$refs.bird){
         child.$refs.bird.value=mix.bird_volume
         child.$refs.bird.previousElementSibling.volume=mix.bird_volume
         child.$refs.bird.previousElementSibling.play()

        }else if(child.$refs.regularFire){
         child.$refs.regularFire.value=mix.large_fire_volume
         child.$refs.regularFire.previousElementSibling.volume=mix.large_fire_volume
         child.$refs.regularFire.previousElementSibling.play()

        }else if(child.$refs.thunderCloud){
         child.$refs.thunderCloud.value=mix.heavy_rain_volume
         child.$refs.thunderCloud.previousElementSibling.volume=mix.heavy_rain_volume
         child.$refs.thunderCloud.previousElementSibling.play()
          // 
        }else if(child.$refs.wave){
         child.$refs.wave.value=mix.wave_volume
         child.$refs.wave.previousElementSibling.volume=mix.wave_volume
         child.$refs.wave.previousElementSibling.play()

        }else if(child.$refs.strongWind){
         child.$refs.strongWind.value=mix.strong_wind_volume
         child.$refs.strongWind.previousElementSibling.volume=mix.strong_wind_volume
         child.$refs.strongWind.previousElementSibling.play()

        }else if(child.$refs.forest){
         child.$refs.forest.value=mix.forest_volume
         child.$refs.forest.previousElementSibling.volume=mix.forest_volume
         child.$refs.forest.previousElementSibling.play()

        }else if(child.$refs.thunder){
         child.$refs.thunder.value=mix.thunder_volume
         child.$refs.thunder.previousElementSibling.volume=mix.thunder_volume
         child.$refs.thunder.previousElementSibling.play()

        }else if(child.$refs.fire){
         child.$refs.fire.value=mix.campfire_volume
         child.$refs.fire.previousElementSibling.volume=mix.campfire_volume
         child.$refs.fire.previousElementSibling.play()

        }else if(child.$refs.riverWave){
         child.$refs.riverWave.value=mix.river_volume
         child.$refs.riverWave.previousElementSibling.volume=mix.river_volume
         child.$refs.riverWave.previousElementSibling.play()
        }else if(child.$refs.simpleWind){

         child.$refs.simpleWind.value=mix.light_wind_volume
         child.$refs.simpleWind.previousElementSibling.volume=mix.light_wind_volume
         child.$refs.simpleWind.previousElementSibling.play()
        }else if(child.$refs.cafe){

         child.$refs.cafe.value=mix.coffee_shop_volume
         child.$refs.cafe.previousElementSibling.volume=mix.coffee_shop_volume
         child.$refs.cafe.previousElementSibling.play()
        }else if(child.$refs.cat){
         child.$refs.cat.value=mix.cat_purring_volume
         child.$refs.cat.previousElementSibling.volume=mix.cat_purring_volume
         child.$refs.cat.previousElementSibling.play()
        }else if(child.$refs.night){
         child.$refs.night.value=mix.night_sound_volume
         child.$refs.night.previousElementSibling.volume=mix.night_sound_volume
         child.$refs.night.previousElementSibling.play()
        }else if(child.$refs.chimes){
         child.$refs.chimes.value=mix.wind_chime_volume
         child.$refs.chimes.previousElementSibling.volume=mix.wind_chime_volume
         child.$refs.chimes.previousElementSibling.play()
        }
      })
      

    }
  },
  mounted(){
    this.time= new Date().toLocaleString();
  }

}
</script>

<style>
  
</style>
