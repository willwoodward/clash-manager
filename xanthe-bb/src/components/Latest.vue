<script setup>
import { useFirestore, useCollection, useDocument } from 'vuefire'
import { collection, query, orderBy, limit, getDocs, doc } from 'firebase/firestore'

const db = useFirestore()

const latestRef = query(collection(db, 'raids'), orderBy('date', 'desc'), limit(1))
const latestDoc = (await getDocs(latestRef)).docs[0]
const latest = useDocument(doc(db, 'raids/'+latestDoc.id))
const users = useCollection(query(collection(db, 'raids/'+latestDoc.id+'/users'), orderBy('attacks', 'desc'), orderBy('gold', 'desc')))
</script>

<template>
  <div class="p-16">
    <h1 class="text-4xl">Xanthe BB Latest Raid Weekend Summary</h1>
    <p class="text-xl pt-8" v-if="latest">Data from raid weekend ending on {{ latest.date.toDate().toLocaleDateString('en-GB') }}.</p>
    <table class="table-auto mt-8 w-full text-left">
      <thead>
        <tr>
          <th>Username</th>
          <th>Attacks</th>
          <th>Capital Gold</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.attacks }}</td>
          <td>{{ user.gold }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
