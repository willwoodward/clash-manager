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
  <div class="bg-white dark:bg-slate-900 rounded-lg px-6 py-4 shadow-xl ring-2 ring-white" id="card">
      <h3 class="text-slate-900 dark:text-white mt-1 text-base font-medium tracking-tight">{{ heading }}</h3>
      <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">{{ caption }}</p>
      <div class="mt-4">
        <slot />
      </div>
  </div>
</template>

<style scoped>
    #card {
        width: min-content;
        margin: auto;
    }
</style>