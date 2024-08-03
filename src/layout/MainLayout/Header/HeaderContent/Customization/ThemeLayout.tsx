import { useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardMedia, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import { dispatch, useSelector } from 'store';
import { openDrawer } from 'store/reducers/menu';

// assets
import defaultLayout from 'assets/images/customization/default.svg';
import rtlLayout from 'assets/images/customization/rtl.svg';
import miniMenu from 'assets/images/customization/mini-menu.svg';

// types
import { MenuOrientation, ThemeDirection } from 'types/config';

// ==============================|| CUSTOMIZATION - LAYOUT ||============================== //

const ThemeLayout = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { miniDrawer, themeDirection, onChangeDirection, onChangeMiniDrawer, menuOrientation } = useConfig();
  const { drawerOpen } = useSelector((state) => state.menu);

  let initialTheme = 'default';
  if (miniDrawer === true) initialTheme = 'mini';
  if (themeDirection === ThemeDirection.RTL) initialTheme = 'rtl';

  const [value, setValue] = useState<string | null>(initialTheme);
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (newValue === 'default') {
      if (themeDirection === ThemeDirection.RTL) {
        onChangeDirection(ThemeDirection.LTR);
      }
      if (miniDrawer === true) {
        onChangeMiniDrawer(false);
      }
      if (!drawerOpen) {
        dispatch(openDrawer(true));
      }
    }
    if (newValue === 'mini') {
      onChangeMiniDrawer(true);
      if (drawerOpen) {
        dispatch(openDrawer(false));
      }
    }
    if (newValue === ThemeDirection.RTL) {
      onChangeDirection(ThemeDirection.RTL);
    }
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={value} onChange={handleRadioChange}>
      <Grid container spacing={1.75} sx={{ ml: 0 }}>
        <Grid item>
          <FormControlLabel
            value="default"
            control={<Radio value="default" sx={{ display: 'none' }} />}
            sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <MainCard
                content={false}
                sx={{ bgcolor: value === 'default' ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                border={false}
                {...(value === 'default' && { boxShadow: true, shadow: theme.customShadows.primary })}
              >
                <Stack spacing={1.25} alignItems="center">
                  <CardMedia component="img" src={defaultLayout} alt="Vertical" sx={{ borderRadius: 1, width: 64, height: 64 }} />
                  <Typography variant="caption">Default</Typography>
                </Stack>
              </MainCard>
            }
          />
        </Grid>

        {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
          <Grid item>
            <FormControlLabel
              value="mini"
              control={<Radio value="mini" sx={{ display: 'none' }} />}
              sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
              label={
                <MainCard
                  content={false}
                  sx={{ bgcolor: value === 'mini' ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                  border={false}
                  {...(value === 'mini' && { boxShadow: true, shadow: theme.customShadows.primary })}
                >
                  <Stack spacing={1.25} alignItems="center">
                    <CardMedia component="img" src={miniMenu} alt="Vertical" sx={{ borderRadius: 1, width: 64, height: 64 }} />
                    <Typography variant="caption">Mini Drawer</Typography>
                  </Stack>
                </MainCard>
              }
            />
          </Grid>
        ) : null}

        <Grid item>
          <FormControlLabel
            value="rtl"
            control={<Radio value="rtl" sx={{ display: 'none' }} />}
            sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <MainCard
                content={false}
                sx={{ bgcolor: value === ThemeDirection.RTL ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                border={false}
                {...(value === ThemeDirection.RTL && { boxShadow: true, shadow: theme.customShadows.primary })}
              >
                <Stack spacing={1.25} alignItems="center">
                  <CardMedia component="img" src={rtlLayout} alt="Vertical" sx={{ borderRadius: 1, width: 64, height: 64 }} />
                  <Typography variant="caption">RTL</Typography>
                </Stack>
              </MainCard>
            }
          />
        </Grid>
      </Grid>
    </RadioGroup>
  );
};

export default ThemeLayout;
