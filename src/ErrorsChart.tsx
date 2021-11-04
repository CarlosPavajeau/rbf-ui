import { ReactElement, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface ErrorsChartProps {
  errors: number[];
}

const ErrorsChart = (props: ErrorsChartProps): ReactElement => {
  const { errors } = props;
  const [series, setSeries] = useState([
    {
      name: 'errors',
      data: [1, ...errors],
    },
  ]);
  const [options] = useState({
    chart: {
      id: 'basic-bar',
    },
  });

  useEffect(() => {
    setSeries([
      {
        name: 'errors',
        data: [1, ...errors],
      },
    ]);
  }, [errors]);

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height="300"
    />
  );
};

export default ErrorsChart;
