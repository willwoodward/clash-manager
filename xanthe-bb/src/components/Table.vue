<script setup>
import { useFirestore, useCollection } from 'vuefire'
import { collection, query, orderBy } from 'firebase/firestore'

const props = defineProps(['id'])

const db = useFirestore()

const users = useCollection(query(collection(db, 'raids/' + props.id + '/users'), orderBy('attacks', 'desc'), orderBy('gold', 'desc')))
</script>

<template>
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
</template>
