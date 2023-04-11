<script setup>
  defineProps({
    selected: {
      type: String,
      required: true
    }
  })
</script>

<template>
    <div class="bg-zinc-900 py-6 transition-all" :class="navbarOpen ? 'w-32': 'w-8'" id="navbar">
        <div class="flex flex-row">
          <div class="basis-3/4">1</div>
          <div @click="closeNavbar" class="basis-1/4 hover:text-white">X</div>
        </div>
        <!-- X to close -->
        <ul v-for="item in listItems" :key="item.id">
          <RouterLink :to="item.link">
            <li class="p-4 hover:text-white hover:border-r-4 hover:bg-zinc-800 transition-all font-sans" :class="{'text-white': item.name === this.selected}">{{ item.name }}</li>
          </RouterLink>        
        </ul>
    </div>
</template>

<script>
  export default {
    data: function () {
      return {
        listItems: [
          {id: 0, name: 'Home', link: "/"},
          {id: 1, name: 'Members', link: "/members"},
          {id: 2, name: 'Clan Wars', link: "/clanwars"}
        ],
        navbarOpen: true
      }
    },
    methods: {
      closeNavbar: function () {
        this.navbarOpen = !this.navbarOpen;
      }
    }
  }
</script>

<style scoped>
  #navbar {
    position: fixed;
    height: 100vh;
  }
</style>
