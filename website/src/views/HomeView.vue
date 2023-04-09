<template>
  <sideNavbar selected="Home"/>
  <div class="bg-gradient-to-tr from-lime-400 to-sky-400" id="bg">
    <!-- Clan Badge -->
    <h2 class="font-medium tracking-tight text-center text-5xl py-4">Xanthe BB</h2>
    <!-- Stats -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import sideNavbar from '@/components/sideNavbar.vue';

export default {
  name: 'HomeView',
  components: {
    sideNavbar
}
}
</script>

<style scoped>
  #bg {
    height: 100vh;
  }
</style>