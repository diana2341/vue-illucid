<template>
  <div class="sound-control">
    <img  :src="require('../assets/images/' + sound.image)" @click="playAudio()"/>
     <audio loop><source :src="require('../assets/audio/second-audio/' + sound.audio)"></audio> 
    <input type="range"   min="0" max="1" step="0.01" :value="volume" @change="$emit('updateVolume',$event,sound.name)" >
    </div>
</template>
<script>
export default {
  name:'MixControls',
       props:{
        sound:{
          type:Object
        },
       
        
       },
       data (){
        return{
           volume:0
        }
       },
  methods:{
    getImgUrl(pic) {
    return require(pic)
    },
    playAudio(){
      const audio = event.currentTarget.nextElementSibling 

      if(!audio.paused){
        audio.pause();
      }else{
        audio.loop=true
        this.volume = 1

        audio.play();

      }
      
        console.log(event.currentTarget.nextElementSibling.volume)


    }
  }
}
</script>
<style scoped>
  .sound-control img{
    width: 90px;
    height: auto;
  }
  .sound-control{    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>