<script setup>
  defineProps({
    selected: {
      type: String,
      required: true
    }
  })
</script>

<template>
    <div class="bg-zinc-900 py-6 w-32 transition-all" :class="{'hidden': navbarOpen === false}" id="navbar">
        <div class="flex flex-row">
          <div class="basis-3/4">1</div>
          <div @click="closeNavbar" class="basis-1/4 hover:text-white">X</div>
        </div>
        <!-- X to close -->
        <ul v-for="item in listItems" :key="item.id">
            <li class="p-4 hover:text-white hover:border-r-4 hover:bg-zinc-800 transition-all font-sans" :class="{'text-white': item.name === this.selected}">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
  export default {
    data: function () {
      return {
        listItems: [
          {id: 0, name: 'Home'},
          {id: 1, name: 'Members'},
          {id: 2, name: 'Clan Wars'}
        ],
        navbarOpen: true
      }
    },
    methods: {
      closeNavbar: function () {
        this.navbarOpen = false;
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
