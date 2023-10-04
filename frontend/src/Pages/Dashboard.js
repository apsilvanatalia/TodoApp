import React, { useState, useEffect, useCallback } from "react";
import ReactApexChart from 'react-apexcharts';
import api from "../Services/api";
import Menu from '../Components/Menu/menu';
import './dash.css';

const Dashboard = () => {
  // Estado para armazenar as tarefas do usuário
  const [tasks, setTasks] = useState([]);
  // Obtém o ID do usuário armazenado localmente
  const userId = localStorage.getItem("userId");

  // Estado para armazenar dados do gráfico de pizza
  const [chartData, setChartData] = useState([]);
  // Estado para armazenar dados do gráfico de barras
  const [barChartData, setBarChartData] = useState([]);
  // Estado para armazenar dados da progressão de tarefas
  const [progressionChartData, setProgressionChartData] = useState({
    series: [],
    options: {},
  });

  // Função para buscar as tarefas do usuário
  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get(`/tasks/user/${userId}`);
      setTasks(response.data);
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [userId]);


  // Função para buscar as tarefas mensais do usuário
  const fetchMonthlyTasks = useCallback(async () => {
    try {
      const response = await api.get(`/tasks/months/${userId}`);
      setBarChartData(response.data);

      // Extrai dados para o gráfico de progressão de tarefas
      const pendenteData = response.data.map(item => item.pendente);
      const concluidaData = response.data.map(item => item.concluida);
      const mesesLabels = response.data.map(item => item.mes);

      // Define os dados e opções para o gráfico de progressão de tarefas
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
              return val + '  ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
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

  // Efeito para buscar as tarefas e tarefas mensais quando o componente é montado
  useEffect(() => {
    fetchTasks();
    fetchMonthlyTasks();
  }, [fetchTasks, fetchMonthlyTasks]);

  // Configurações do gráfico de pizza
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

  // Configurações do gráfico de barras
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
    <div className="clearfix">
      <Menu/>
      <div className="table1">
        <div className="chart-title">Gráfico de Pizza</div>
        <div className="chart">
          <ReactApexChart options={chartOptions} series={chartSeries} type="pie" width={380} />
        </div>
      </div>

      <div className="table2">
        <div className="chart-title">Gráfico de Barras</div>
        <div className="chart">
          <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
        </div>
      </div>

      <div className="table3">
        <div className="chart-title">Progressão de Tarefas</div>
        <div className="progression-chart">
          <ReactApexChart options={progressionChartData.options} series={progressionChartData.series} type="line" height={350} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;