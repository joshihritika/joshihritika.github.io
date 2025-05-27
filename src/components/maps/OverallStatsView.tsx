import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

// Assuming HouseholdData structure is available or passed appropriately
interface HouseholdData {
  id: number;
  name: string;
  caste: string;
  sourceOfIncome: string;
  displaced: 'Yes' | 'No';
  agree: 'Yes' | 'No';
  gender: 'Male' | 'Female';
  educationLevel: string;
  // Add other fields if needed for aggregation, like interviews, though not directly charted here
}

interface OverallStatsViewProps {
  data: HouseholdData[];
}

const chartBaseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 16,
        font: { size: 12 },
        padding: 8,
      }
    },
    title: {
      display: true,
      font: { size: 14, weight: 'bold' as const },
      padding: { top: 8, bottom: 8 }
    },
    tooltip: {
      titleFont: { size: 12 },
      bodyFont: { size: 11 },
    }
  },
};

const barChartSpecificOptions = {
  ...chartBaseOptions,
  indexAxis: 'y' as const,
  plugins: {
    ...chartBaseOptions.plugins,
    legend: { display: false },
    title: { ...chartBaseOptions.plugins.title, text: 'Source of Income' }
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: { stepSize: 1, font: { size: 12 } },
    },
    y: {
      ticks: {
        font: { size: 12 },
        maxRotation: 0,
        minRotation: 0
      }
    }
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    }
  }
};

export const OverallStatsView: React.FC<OverallStatsViewProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="p-3 text-sm text-stone-600">No overall data available.</div>;
  }

  const totalHouseholds = data.length;

  // Caste Distribution
  const casteCounts = data.reduce((acc, curr) => {
    acc[curr.caste] = (acc[curr.caste] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const casteChartData = {
    labels: Object.keys(casteCounts),
    datasets: [{
      data: Object.values(casteCounts),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56'],
    }],
  };
  const casteChartOptions = { ...chartBaseOptions, plugins: { ...chartBaseOptions.plugins, title: { ...chartBaseOptions.plugins.title, text: 'Caste Distribution' } } };

  // Source of Income Distribution
  const incomeSources: Record<string, number> = {};
  data.forEach(hh => {
    const sources = hh.sourceOfIncome.split(',').map(s => s.trim());
    sources.forEach(source => {
      if (source) incomeSources[source] = (incomeSources[source] || 0) + 1;
    });
  });
  const incomeChartData = {
    labels: Object.keys(incomeSources),
    datasets: [{
      label: 'Households',
      data: Object.values(incomeSources),
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      barThickness: 15,
    }],
  };

  // Gender Distribution
  const genderCounts = {
    Male: data.filter(h => h.gender === 'Male').length,
    Female: data.filter(h => h.gender === 'Female').length,
  };
  const genderChartData = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [genderCounts.Male, genderCounts.Female],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }],
  };
  const genderChartOptions = { ...chartBaseOptions, plugins: { ...chartBaseOptions.plugins, title: { ...chartBaseOptions.plugins.title, text: 'Gender Distribution' } } };

  // Education Level Distribution
  const educationCounts = data.reduce((acc, curr) => {
    acc[curr.educationLevel] = (acc[curr.educationLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const educationChartData = {
    labels: Object.keys(educationCounts),
    datasets: [{
      data: Object.values(educationCounts),
      backgroundColor: ['#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB'],
    }],
  };
  const educationChartOptions = { ...chartBaseOptions, plugins: { ...chartBaseOptions.plugins, title: { ...chartBaseOptions.plugins.title, text: 'Education Level' } } };

  // Displaced by Project
  const displacedCounts = {
    Yes: data.filter(h => h.displaced === 'Yes').length,
    No: data.filter(h => h.displaced === 'No').length,
  };
  const displacedChartData = {
    labels: ['Yes', 'No'],
    datasets: [{
      data: [displacedCounts.Yes, displacedCounts.No],
      backgroundColor: ['#FF6384', '#36A2EB'],
    }],
  };
  const displacedChartOptions = { ...chartBaseOptions, plugins: { ...chartBaseOptions.plugins, title: { ...chartBaseOptions.plugins.title, text: 'Displaced by Project' } } };

  // Satisfied with Project
  const satisfiedCounts = {
    Yes: data.filter(h => h.agree === 'Yes').length,
    No: data.filter(h => h.agree === 'No').length,
  };
  const satisfiedChartData = {
    labels: ['Yes', 'No'],
    datasets: [{
      data: [satisfiedCounts.Yes, satisfiedCounts.No],
      backgroundColor: ['#4BC0C0', '#FFCE56'],
    }],
  };
  const satisfiedChartOptions = { ...chartBaseOptions, plugins: { ...chartBaseOptions.plugins, title: { ...chartBaseOptions.plugins.title, text: 'Project Satisfaction' } } };

  const chartContainerHeight = "240px";

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="text-xl font-semibold text-stone-800 mb-2 text-center">Lamjung Statistics</h3>
      <p className="text-sm text-stone-500 text-center mb-3">Total Surveyed: {totalHouseholds}</p>

      <div className="flex-grow grid grid-cols-2 gap-3">
        <div className="chart-container p-2 bg-stone-50/60 rounded shadow-sm" style={{ height: chartContainerHeight }}><Pie data={casteChartData} options={casteChartOptions} /></div>
        <div className="chart-container p-2 bg-stone-50/60 rounded shadow-sm" style={{ height: chartContainerHeight }}><Bar data={incomeChartData} options={barChartSpecificOptions} /></div>
        <div className="chart-container p-2 bg-stone-50/60 rounded shadow-sm" style={{ height: chartContainerHeight }}><Pie data={displacedChartData} options={displacedChartOptions} /></div>
        <div className="chart-container p-2 bg-stone-50/60 rounded shadow-sm" style={{ height: chartContainerHeight }}><Pie data={satisfiedChartData} options={satisfiedChartOptions} /></div>
        <div className="chart-container p-2 bg-stone-50/60 rounded shadow-sm" style={{ height: chartContainerHeight }}><Pie data={genderChartData} options={genderChartOptions} /></div>
        <div className="chart-container p-2 bg-stone-50/60 rounded shadow-sm" style={{ height: chartContainerHeight }}><Pie data={educationChartData} options={educationChartOptions} /></div>
      </div>
    </div>
  );
}; 