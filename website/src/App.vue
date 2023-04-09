<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <div class="flex flex-row justify-end">
        <div class="text-slate-900 dark:text-white">{{ icon }}</div>
        <div class="text-slate-900 dark:text-white">{{ hamburger }}</div>
        <div class="text-slate-900 dark:text-white">{{ settings }}</div>
      </div>

<infoCard heading="Capital Raids" caption="This shows the capital raids">
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
</infoCard>
</template>

<script>
  import infoCard from '@/components/infoCard.vue'

  import json from '../../data/raidAttacks.json'
  export default {
    name: 'HomeView',
    data: function () {
      return {
        capitalRaids: json
      }
    },
    components: {
      infoCard
    }
  }
</script>

<style scoped>
</style>
