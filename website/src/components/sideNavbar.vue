<script setup>
  defineProps({
    selected: {
      type: String,
      required: true
    }
  })
</script>

<template>
    <div class="bg-slate-900 py-6 w-32" id="navbar">
        <!-- X to close -->
        <ul v-for="item in listItems" :key="item.id">
            <li class="m-4 hover:text-white transition-all" :class="{'text-white': item.name === this.selected}">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
  export default {
    data: function () {
      return {
        listItems: [
          {id: 0, name: 'Home'},
          {id: 1, name: 'Members'}
        ]
      }
    },
    components: {
    }
  }
</script>
