<template>
  <div id="app" class="app">
    <div v-if="show" class="spinner">
        <fulfilling-bouncing-circle-spinner
          :animation-duration="4000"
          :size="60"
          color="#62E5B0" 
         />
    </div>
    <router-view/>
  </div>
</template>

<script>
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'

export default {
  name: 'app',
  components :{
   FulfillingBouncingCircleSpinner
  },
  computed: {
     show(){
         return this.$store.state.app.isLoading
     }
  }
}
</script>

<style lang="scss">
@import "../sass/main.scss";

body {
  height: 100%;

  #app {
    height: 100%;
  }

  .spinner{
    width:100vw;
    height: 100vh;
    position: absolute;
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8)
  }
}
</style>
