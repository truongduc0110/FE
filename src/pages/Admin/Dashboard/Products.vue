<template>
  <div class="w-full max-w-xl mx-auto">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'TopProductsPieChart',
  components: {
    Pie
  },
  data() {
    return {
      chartData: {
        labels: ['Bánh kem socola', 'Bánh matcha', 'Bánh dâu tây', 'Bánh trứng muối', 'Khác'],
        datasets: [
          {
            label: 'Sản phẩm bán chạy',
            data: [45, 25, 15, 10, 5], // số lượng sản phẩm
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF'
            ],
            borderWidth: 1
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Top sản phẩm được mua nhiều nhất'
          }
        }
      }
    }
  }
}
</script>
