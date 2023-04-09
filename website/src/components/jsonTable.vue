<script setup>
  defineProps({
    json: {
      type: Array,
      required: true
    }
  })
</script>

<template>
    <table class="table-auto dark:text-slate-200">
      <thead>
        <tr>
          <th v-for="heading in headings" :key="heading">{{ heading }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in this.json" :key="data.Tag" v-bind:class="{'bg-gradient-to-r from-red-500': data.Attacks==0}">
          <td v-for="heading in headings" :key="heading">{{ data[heading] }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
  export default {
    data: function () {
      return {
        headings: Object.keys(this.json[0])
      }
    },
    components: {
    }
  }
</script>

<style scoped>
    #navbar {
        width: max-content;
        display: block;
    }
</style>