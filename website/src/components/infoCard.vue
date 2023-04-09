<script setup>
defineProps({
  heading: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  }
})
</script>

<template>
    <div class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl" id="capital-raids">
        <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">{{ heading }}</h3>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">{{ caption }}</p>
        <div>
          <slot />
        </div>
    </div>
  </template>

<style scoped>
    #capital-raids {
        width: min-content;
    }
</style>