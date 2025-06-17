<template>
  <div class="p-4 border border-color-2 rounded-2xl">
    <div class="flex justify-between items-end mb-5">
      <div class="text-base text-color-1 font-semibold">Doanh thu theo tháng <span class="text-color-3 ml-2">(2025)</span></div>
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
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import {getTotalPriceMonth} from "@/service/orderService.js";
Chart.register(...registerables);

export default {
  data() {
    return {
      chartInstance: null,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Doanh thu (VND)",
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            data: []
          }
        ]
      }
    };
  },
  async mounted() {
    await this.fetchRevenueData();
  },
  methods: {
    async fetchRevenueData() {
      try {
        const result = await getTotalPriceMonth();
        // Tạo mảng doanh thu mặc định với giá trị 0 cho 12 tháng
        const revenueData = new Array(12).fill(0);

        // Điền dữ liệu vào đúng tháng
        result.orders.forEach(item => {
          const monthIndex = new Date(item.month + "-01").getMonth();
          revenueData[monthIndex] = item.revenue;
        });

        // Cập nhật dữ liệu cho biểu đồ
        this.chartData.labels = [
          "th1", "th2", "th3", "th4", "th5", "th6",
          "th7", "th8", "th9", "th10", "th11", "th12"
        ];
        this.chartData.datasets[0].data = revenueData;

        // Hiển thị biểu đồ
        this.$nextTick(() => {
          this.renderChart();
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
      }
    },
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy(); // Hủy biểu đồ cũ trước khi vẽ mới
      }
      const ctx = this.$refs.chartCanvas.getContext("2d");
      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: this.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          },
          scales: {
            x: { title: { display: true, text: "Tháng" } },
            y: { title: { display: true, text: "Doanh thu (VND)" }, beginAtZero: true }
          }
        }
      });
    }
  }
};
</script>
