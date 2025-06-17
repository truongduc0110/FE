<template>
  <div class="p-4 border border-color-2 rounded-2xl">
    <div class="flex justify-between items-end mb-5">
      <div class="text-base text-color-1 font-semibold">Đơn hàng theo tháng <span class="text-color-3 ml-2">(2025)</span></div>
      <div class="flex gap-2">
        <div class="w-8 h-8 bg-white border border-color-2 rounded-lg flex justify-center items-center">
          <svg class="rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.50023 5L11.911 9.41075C12.1888 9.6885 12.3276 9.82742 12.3276 10C12.3276 10.1726 12.1888 10.3115 11.911 10.5892L7.50023 15" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="w-8 h-8 bg-white border border-color-2 rounded-lg flex justify-center items-center">
          <svg  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.50023 5L11.911 9.41075C12.1888 9.6885 12.3276 9.82742 12.3276 10C12.3276 10.1726 12.1888 10.3115 11.911 10.5892L7.50023 15" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import {getCountOrderMonth} from "@/service/orderService.js";

Chart.register(...registerables);

export default {
  name: "OrderChart",
  data() {
    return {
      chart: null,
      chartData: {
        labels: [
          "th1", "th2", "th3", "th4", "th5", "th6",
          "th7", "th8", "th9", "th10", "th11", "th12"
        ],
        datasets: [
          {
            label: "Số lượng đơn hàng",
            data: [],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
    };
  },
  methods: {
    renderChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = this.$refs.chartRef.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: this.chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    async fetchOrderData() {
      try {
        const result = await getCountOrderMonth();
        if (result && result.orders) {
          const dataMap = new Array(12).fill(0);
          result.orders.forEach(order => {
            const monthIndex = new Date(order.month + "-01").getMonth(); // Lấy chỉ số tháng (0-11)
            dataMap[monthIndex] = order.total_orders;
          });
          this.chartData.datasets[0].data = dataMap;
          this.renderChart();
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
  },
  mounted() {
    this.renderChart();
    this.fetchOrderData();
  },
};
</script>