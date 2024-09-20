import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
type chartData = {
  advertisers: number;
  earners: number;
  month: string;
};

const LineChart = ({
  signupReport,
  range,
}: {
  signupReport: any;
  range: string;
}) => {
  const checkRange = () => {
    if (range === "12 months") {
      return signupReport?.map((item: any) => item.month);
    } else if (range === "30 days") {
      return signupReport?.map((item: any) => item.date);
    } else if (range === "7 days") {
      return signupReport?.map((item: any) => item.date);
    } else if (range === "24 hours") {
      return signupReport?.map((item: any) => item.hour);
    }
  };
  const data = {
    labels: checkRange(),
    datasets: [
      {
        label: "Earners",
        data: signupReport?.map((item: any) => item.earners),
        fill: true,
        backgroundColor: "rgba(203, 41, 190, 0.5)",
        borderColor: "#CB29BE",
        tension: 0.4,
      },
      {
        label: "Advertisers",
        data: signupReport?.map((item: chartData) => item.advertisers),
        fill: false,
        borderColor: "#4da6ff",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#475467",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#475467",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#475467",
          display: false,
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
