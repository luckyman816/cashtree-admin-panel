// material-ui
import { useTheme } from '@mui/material/styles';
import { CardMedia, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import { dispatch } from 'store';
import { openDrawer } from 'store/reducers/menu';

// assets
import defaultLayout from 'assets/images/customization/default.svg';
import containerLayout from 'assets/images/customization/container.svg';

// types
import { MenuOrientation, ThemeDirection } from 'types/config';

// ==============================|| CUSTOMIZATION - CONTAINER ||============================== //

const ThemeMenuLayout = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation, onChangeMenuOrientation, onChangeMiniDrawer, onChangeDirection } = useConfig();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const handleContainerChange = (e: any) => {
    if (e.target.value === MenuOrientation.HORIZONTAL) {
      onChangeMiniDrawer(true);
      onChangeDirection(ThemeDirection.LTR);
      onChangeMenuOrientation(e.target.value);
      dispatch(openDrawer(false));
    } else {
      onChangeMiniDrawer(true);
      onChangeDirection(ThemeDirection.LTR);
      onChangeMenuOrientation(e.target.value);
      dispatch(openDrawer(true));
    }
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={menuOrientation} onChange={handleContainerChange}>
      <Grid container spacing={1.75} sx={{ ml: 0 }}>
        <Grid item>
          <FormControlLabel
            control={<Radio value={MenuOrientation.VERTICAL} sx={{ display: 'none' }} />}
            sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <MainCard
                content={false}
                sx={{ bgcolor: !isHorizontal ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                border={false}
                {...(!isHorizontal && { boxShadow: true, shadow: theme.customShadows.primary })}
              >
                <Stack spacing={1.25} alignItems="center">
                  <CardMedia component="img" src={defaultLayout} alt="Vertical" sx={{ borderRadius: 1, width: 64, height: 64 }} />
                  <Typography variant="caption">Vertical</Typography>
                </Stack>
              </MainCard>
            }
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Radio value={MenuOrientation.HORIZONTAL} sx={{ display: 'none' }} />}
            sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <MainCard
                content={false}
                sx={{ bgcolor: isHorizontal ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                border={false}
                {...(isHorizontal && { boxShadow: true, shadow: theme.customShadows.primary })}
              >
                <Stack spacing={1.25} alignItems="center">
                  <CardMedia component="img" src={containerLayout} alt="horizontal" sx={{ borderRadius: 1, width: 64, height: 64 }} />
                  <Typography variant="caption">Horizontal</Typography>
                </Stack>
              </MainCard>
            }
          />
        </Grid>
      </Grid>
    </RadioGroup>
  );
};

export default ThemeMenuLayout;
