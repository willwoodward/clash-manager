<script setup>
defineProps({
  heading: {
    type: String,
    required: true
  }
})
</script>

<template>
    <div class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl" id="capital-raids">
        <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">{{ heading }}</h3>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">This table shows the clan's capital attacks.</p>
        <div id="app">
            <table class="table-auto dark:text-slate-200">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Tag</th>
                    <th>Attacks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in capitalRaids" :key="data.Tag">
                    <td>{{ data.Username }}</td>
                    <td>{{ data.Tag }}</td>
                    <td>{{ data.Attacks }}</td>
                  </tr>
                </tbody>
              </table>
        </div>
    </div>
  </template>

<style scoped>
    #capital-raids {
        width: min-content;
    }
</style>