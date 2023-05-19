<script setup>
defineProps({
  heading: {
    type: String,
    required: false
  },
  caption: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 rounded px-6 py-4 m-6 shadow-xl ring-2 ring-white" id="card">
      <h3 class="text-zinc-900 dark:text-white mt-1 text-base font-medium tracking-tight">{{ heading }}</h3>
      <p class="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">{{ caption }}</p>
      <div class="mt-4">
        <slot />
      </div>
  </div>
</template>

<style scoped>
    #card {
        width: max-content;
    }
</style>