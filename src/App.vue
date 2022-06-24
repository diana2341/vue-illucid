<template>
  <div id="app">
    <MixForm/>
  <MixCreations/>
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
  }

}
</script>

<style>
  
</style>
