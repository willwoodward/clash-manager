<script setup>
    import sideNavbar from '@/components/sideNavbar.vue';
    import infoCard from '@/components/infoCard.vue';
    import jsonTable from '@/components/jsonTable.vue';
</script>

<template>
    <sideNavbar selected="Members" />
    <div class="ml-32" id="main">
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
          <tr v-for="data in capitalRaids" :key="data.Tag" v-bind:class="{'bg-gradient-to-r from-red-500': data.Attacks==0}">
            <td>{{ data.Username }}</td>
            <td>{{ data.Tag }}</td>
            <td>{{ data.Attacks }}</td>
          </tr>
        </tbody>
      </table>
    </infoCard>
    <infoCard>
      <jsonTable :json="capitalRaids" />
    </infoCard>
  </div>
</template>

<script>
    import json from '../../../data/raidAttacks.json'

    export default {
        name: 'MembersView',
        data: function () {
            return {
                capitalRaids: json
            }
        },
        components: {
            sideNavbar,
            infoCard
        }
    }
</script>
