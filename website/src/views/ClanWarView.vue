<script setup>
    import sideNavbar from '@/components/sideNavbar.vue';
    import infoCard from '@/components/infoCard.vue';
    import lineGraph from '@/components/lineGraph.vue';
</script>

<template>
    <sideNavbar selected="Clan Wars" />
    <div class="ml-32 pt-8" id="main">
        <infoCard heading="Clan War Attacks" caption="This shows the clan war attack percentage over time">
            <lineGraph :data="chartData" :options="chartOptions"/>
        </infoCard>
  </div>
</template>

<script>
    import clanWars from '../../../data/clanWars.json';

    const wars = clanWars.items.filter((e) => { return e.opponent.clanLevel !== 0 });
    const xAxisBackwards = wars.map((e) => {
        const day = e.endTime.slice(6, 8);
        const month = e.endTime.slice(4, 6);
        const year = e.endTime.slice(0, 4);
        const warDate = `${day}/${month}/${year}`;
        return warDate;
    });
    const yAxisBackwards = wars.map((e) => {
        const totalAttacks = e.teamSize*2;
        const usedAttacks = e.clan.attacks;
        const attackPercentage = (usedAttacks / totalAttacks) * 100;
        return attackPercentage;
    })
    const xAxis = xAxisBackwards.reverse();
    const yAxis = yAxisBackwards.reverse();

    // From ChartJS
    const totalDuration = 1000;
    const delayBetweenPoints = totalDuration / xAxis.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
            }
        }
    };

    export default {
        name: 'ClanWarView',
        components: {
            sideNavbar,
            infoCard,
            lineGraph
        },
        data: function () {
            return {
                chartData: {
                    type: 'line',
                    labels: xAxis,
                    datasets: [
                        {
                            label: 'Attack Percentage',
                            backgroundColor: '#f87979',
                            data: yAxis
                        }
                    ]
                },
                chartOptions: {
                    borderColor: 'rgba(250, 250, 250, 0.9)',
                    pointStyle: false,
                    tension: 0.3,
                    animation,
                    interaction: {
                        intersect: false
                    },
                    plugins: {
                        legend: false
                    },
                    responsive: true,
                }
            }
        }
    }
</script>
