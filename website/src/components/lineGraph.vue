<!-- From https://vue-chartjs.org/guide/#introduction [Accessed 11/04/2004] -->
<template>
    <lineG
      id="lineGraph"
      :data="chartData"
      :options="chartOptions"
    />
  </template>
  
  <script>
  import { Line as lineG } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)
  
  export default {
    name: 'LineChart',
    components: {
        lineG
    },
    props: {
        chartData: {
            type: Object,
            required: true
        },
        chartOptions: {
            type: Object,
            default: () => {}
        }
    }
  }
</script>

<style scoped>
    #lineGraph {
        width: 80vw;
    }
</style>