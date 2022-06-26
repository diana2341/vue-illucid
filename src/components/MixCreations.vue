<template>
 <div>
  <div v-for='mix in allMixes' class='mix' :key='mix.id' @click="$emit('playAudio',$event,mix)">{{mix.mix_name}}</div>
 </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default{
  name:'MixCreations',
  methods:{
    ...mapActions(['fetchMixes']),
   
  },
  computed:mapGetters(['allMixes']),
  created(){
    this.fetchMixes()
    
  }
}
    
</script>
