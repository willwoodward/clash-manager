<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import HomeView from './views/HomeView.vue';
import MembersView from './views/MembersView.vue';
</script>

<template>
  <HomeView v-if="page === 'Home'"/>
  <MembersView v-if="page === 'Members'"/>
</template>

<script>
  export default {
    name: 'HomeView',
    data: function () {
      return {
        page: 'Members'
      }
    },
    components: {
    }
  }
</script>

<style scoped>
</style>
