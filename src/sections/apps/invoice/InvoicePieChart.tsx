import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { IconButton, Grid, Typography, useMediaQuery } from '@mui/material';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';

// asset
import { MoreOutlined } from '@ant-design/icons';

// types
import { ThemeMode } from 'types/config';

// chart options
const areaChartOptions = {
  chart: {
    width: 350,
    type: 'donut',
    stacked: false,
    zoom: {
      enabled: false
    }
  },
  plotOptions: {
    donut: {
      size: '15%'
    }
  },
  stroke: {
    width: 0
  },
  dataLabels: {
    enabled: false
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        }
      }
    }
  ],
  legend: {
    show: false
  }
};

// ==============================|| INVOICE - PIE CHART ||============================== //

const InvoicePieChart = () => {
  const theme = useTheme();
  const { mode } = useConfig();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      labels: ['Pending', 'Paid', 'Overdue', 'Draft'],
      colors: [theme.palette.warning.main, theme.palette.success.main, theme.palette.error.main, theme.palette.primary.lighter],
      tooltip: {
        custom: function ({ series, seriesIndex, w }: any) {
          return `<div class="pie_box">
          <span class="PieDot" style='background-color:${w.globals.colors[seriesIndex]}'></span>
          <span class="fontsize">${w.globals.labels[seriesIndex]}${' '}
          <span class="fontsizeValue">${series[seriesIndex]}%</span></span></div>`;
        }
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  const [series, setSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries | undefined>([44, 55, 41, 17]);

  useEffect(() => {
    setSeries([30, 28, 22, 20]);
  }, []);

  //sx style
  const DotSize = { display: 'flex', alignItems: 'center', gap: 1 };
  const ExpenseSize = { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 500 };

  return (
    <MainCard
      title="Total Expenses"
      secondary={
        <IconButton edge="end" aria-label="comments" color="secondary">
          <MoreOutlined style={{ fontSize: '1.15rem' }} />
        </IconButton>
      }
      sx={{
        '.pie_box': { padding: 2, display: 'flex', gap: 1, alignItems: 'center', width: '100%' },
        '.PieDot': { width: 12, height: 12, borderRadius: '50%' },
        '.fontsize': { fontWeight: 500, fontSize: '0.875rem', lineHeight: '1.375rem', color: theme.palette.secondary.main },
        '.fontsizeValue': { color: theme.palette.secondary.dark }
      }}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12} sx={{ '& .apexcharts-canvas': { margin: '0 auto' } }}>
          <ReactApexChart options={options} series={series} type="donut" height={downMD ? '100%' : 265} />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item></Grid>
            <Grid item xs sx={DotSize}>
              <Dot color="warning" size={12} />
              <Typography align="left" variant="subtitle1" color="textSecondary">
                Pending
              </Typography>
            </Grid>
            <Grid item sx={ExpenseSize}>
              $3,202
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item></Grid>
            <Grid item xs sx={DotSize}>
              <Dot color="success" size={12} />
              <Typography align="left" variant="subtitle1" color="textSecondary">
                Paid
              </Typography>
            </Grid>
            <Grid item sx={ExpenseSize}>
              $45,050
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item></Grid>
            <Grid item xs sx={DotSize}>
              <Dot color="error" size={12} />
              <Typography align="left" variant="subtitle1" color="textSecondary">
                Overdue
              </Typography>
            </Grid>
            <Grid item sx={ExpenseSize}>
              $25,000
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item></Grid>
            <Grid item xs sx={DotSize}>
              <Dot sx={{ bgcolor: theme.palette.primary.lighter }} size={12} />
              <Typography align="left" variant="subtitle1" color="textSecondary">
                Draft
              </Typography>
            </Grid>
            <Grid item sx={ExpenseSize}>
              $7,694
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default InvoicePieChart;
