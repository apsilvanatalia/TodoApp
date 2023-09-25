import React, { useState, useEffect, useCallback } from "react";

import ReactApexChart from 'react-apexcharts';

import api from "../Services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");

  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [progressionChartData, setProgressionChartData] = useState({
    series: [],
    options: {},
  });

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get(`/tasks/user/${userId}`);
      setTasks(response.data);
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [userId]);

  const fetchMonthlyTasks = useCallback(async () => {
    try {
      const response = await api.get(`/tasks/months/${userId}`);
      setBarChartData(response.data);

      const pendenteData = response.data.map(item => item.pendente);
      const concluidaData = response.data.map(item => item.concluida);
      const mesesLabels = response.data.map(item => item.mes);

      setProgressionChartData({
        series: [
          {
            name: "Pendentes",
            data: pendenteData,
          },
          {
            name: "Concluídas",
            data: concluidaData,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 2,
            curve: 'smooth',
            dashArray: [5], // Define um padrão de linha tracejada para toda a série
          },
          title: {
            text: 'Progressão de Tarefas',
            align: 'left'
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
          },
          markers: {
            size: 0,
            hover: {
              sizeOffset: 6
            }
          },
          xaxis: {
            categories: mesesLabels,
          },
          tooltip: {
            y: [
              {
                title: {
                  formatter: function (val) {
                    return val + " Pendentes"
                  }
                }
              },
              {
                title: {
                  formatter: function (val) {
                    return val + " Concluídas"
                  }
                }
              },
            ]
          },
          grid: {
            borderColor: '#f1f1f1',
          }
        },
      });
    } catch (error) {
      console.error("Error fetching monthly tasks:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchTasks();
    fetchMonthlyTasks();
  }, [fetchTasks, fetchMonthlyTasks]);

  const chartOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: chartData.map(item => item.name),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    colors: ['#00e396', '#fca505']
  };

  const chartSeries = chartData.map(item => item.value);

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: barChartData.map(item => item.mes),
    },
    yaxis: {
      title: {
        text: 'Tarefas'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " tarefas"
        }
      }
    }
  };

  const barChartSeries = [
    {
      name: 'Pendente',
      data: barChartData.map(item => item.pendente)
    },
    {
      name: 'Concluída',
      data: barChartData.map(item => item.concluida)
    }
  ];

  return (
    <div>
      
      <div id="chart">
        <ReactApexChart options={chartOptions} series={chartSeries} type="pie" width={380} />
      </div>

      <div id="bar-chart">
        <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
      </div>

      <div id="progression-chart">
        <ReactApexChart options={progressionChartData.options} series={progressionChartData.series} type="line" height={350} />
      </div>
    </div>
  );
};

export default Dashboard;