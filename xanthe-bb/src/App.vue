<script setup>
import { useFirestore, useCollection } from 'vuefire'
import { collection, query, orderBy } from 'firebase/firestore'
import { ref, watch } from 'vue'
import Table from './components/Table.vue'

const db = useFirestore()

let currentRaid = ref('')

const raids = useCollection(query(collection(db, 'raids'), orderBy('date', 'desc')))

watch(raids, (newRaids) => {
  if (newRaids.length > 0 && currentRaid.value == '') {
    currentRaid = newRaids[0].id
  }
})
</script>

<template>
  <div class="p-16">
    <h1 class="text-4xl">Xanthe BB Raid Weekends</h1>
    <div class="flex mt-8">
      <p>Viewing data from weekend ending:</p>
      <select class="ml-8" v-model="currentRaid">
        <option v-for="raid in raids" :key="raid.id" :value="raid.id">{{ raid.date.toDate().toLocaleDateString('en-GB') }}</option>
      </select>
    </div>
    <Table v-if="currentRaid" :id="currentRaid"></Table>
  </div>
</template>
