<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import HomeView from './views/HomeView.vue';
import MembersView from './views/MembersView.vue';
import ClanWarView from './views/ClanWarView.vue';
</script>

<template>
  <HomeView v-if="page === 'Home'"/>
  <MembersView v-if="page === 'Members'"/>
  <ClanWarView v-if="page === 'Clan War'"/>
</template>

<script>
  export default {
    name: 'HomeView',
    data: function () {
      return {
        page: 'Clan War'
      }
    },
    components: {
    }
  }
</script>

<style scoped>
</style>
