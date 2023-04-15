<script setup>
import Latest from './components/Latest.vue'
</script>

<template>
  <Suspense>
    <!-- component with nested async dependencies -->
    <Latest />

    <!-- loading state via #fallback slot -->
    <template #fallback>
      <div class="flex justify-center p-16 text-2xl">
        Loading...
      </div>
    </template>
  </Suspense>
</template>
