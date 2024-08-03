import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-import
import useConfig from 'hooks/useConfig';

// types
import { ThemeMode } from 'types/config';

// chart options
const redialBarChartOptions = {
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '75%'
      },
      track: {
        margin: 0
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: 5
        }
      }
    }
  },
  labels: ['Vimeo']
};

// ==============================|| TOP CARD - RADIAL BAR CHART ||============================== //

export interface ApexRedialBarChartProps extends ChartProps {}

const ProfileRadialChart = (props: ApexRedialBarChartProps) => {
  const theme = useTheme();
  const { mode } = useConfig();

  const textPrimary = theme.palette.text.primary;
  const primary = theme.palette.primary.main;
  const grey0 = theme.palette.grey[0];
  const grey500 = theme.palette.grey[500];
  const grey200 = theme.palette.grey[200];

  const [series] = useState<number[]>([30]);
  const [options, setOptions] = useState<ChartProps>(redialBarChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [primary],
      plotOptions: {
        radialBar: {
          track: {
            background: mode === ThemeMode.DARK ? grey200 : grey0
          },
          dataLabels: {
            value: {
              fontSize: '1rem',
              fontWeight: 600,
              offsetY: 5,
              color: textPrimary
            }
          }
        }
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, grey200, grey0, grey500, textPrimary, primary]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={series} type="radialBar" width={136} height={136} />
    </Box>
  );
};

export default ProfileRadialChart;
