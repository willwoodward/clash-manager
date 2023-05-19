<script setup>
  defineProps({
    selected: {
      type: String,
      required: true
    }
  })
</script>

<template>
    <div class="bg-zinc-900 py-6 transition-all" :class="navbarOpen ? 'w-32': 'w-12'" id="navbar">
        <div class="flex flex-row">
          <div v-show="navbarOpen" class="basis-3/4"></div>
          <div @click="closeNavbar" class="basis-1/4 hover:text-white" :class="{'mx-4': !navbarOpen }">
            <font-awesome-icon :icon="navbarOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-arrow-right'" style="color: #ffffff; width: 100%;"/>
          </div>
        </div>
        <!-- X to close -->
        <div v-for="item in listItems" :key="item.id">
          <RouterLink :to="item.link">
            <div class="p-4 hover:text-white hover:border-r-4 hover:bg-zinc-800 transition-all font-sans" :class="{'text-white': item.name === this.selected}">
              <font-awesome-icon :icon="item.icon" style="color: #ffffff;" />
              {{ navbarOpen ? item.name : null }}
            </div>
          </RouterLink>        
        </div>
    </div>
</template>

<script>
  export default {
    data: function () {
      return {
        listItems: [
          {id: 0, name: 'Home', link: "/", icon: 'fa-solid fa-house'},
          {id: 1, name: 'Members', link: "/members", icon: 'fa-solid fa-users'},
          {id: 2, name: 'Clan Wars', link: "/clanwars", icon: 'fa-solid fa-fire'}
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
