<template>
  <sideNavbar selected="Home"/>
  <div class="bg-gradient-to-tr from-zinc-950 to-zinc-900 ml-32" id="bg">
    <img :src="bigBadge" class="mx-auto pt-12">
    <h2 class="font-medium tracking-tight text-center text-5xl text-zinc-200">Xanthe BB</h2>
    <!-- Stats -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import sideNavbar from '../components/sideNavbar.vue';
import currentWar from '../../../data/currentWar.json';

const bigBadge = currentWar.clan.badgeUrls.large;

export default {
  name: 'HomeView',
  data: function () {
    return {
      bigBadge: bigBadge
    }
  },
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