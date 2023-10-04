const reportWebVitals = onPerfEntry => {
    // Verifica se a função onPerfEntry é fornecida e é uma função
    if (onPerfEntry && onPerfEntry instanceof Function) {
      // Importa as funções de métricas de desempenho do pacote web-vitals
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Inicia as métricas de desempenho e fornece a função onPerfEntry como callback
        getCLS(onPerfEntry); // Métrica Core Web Vitals Cumulative Layout Shift
        getFID(onPerfEntry); // Métrica Core Web Vitals First Input Delay
        getFCP(onPerfEntry); // Métrica Core Web Vitals First Contentful Paint
        getLCP(onPerfEntry); // Métrica Core Web Vitals Largest Contentful Paint
        getTTFB(onPerfEntry); // Métrica Time to First Byte
      });
    }
};
  
export default reportWebVitals;  