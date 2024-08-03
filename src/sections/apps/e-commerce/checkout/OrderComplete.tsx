import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Dialog, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// third-party
import { Chance } from 'chance';

// project imports
import MainCard from 'components/MainCard';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import completed from 'assets/images/e-commerce/completed.png';

const chance = new Chance();

// ==============================|| CHECKOUT - ORDER COMPLETE ||============================== //

const OrderComplete = ({ open }: { open: boolean }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      fullScreen
      TransitionComponent={PopupTransition}
      sx={{ '& .MuiDialog-paper': { bgcolor: 'background.paper', backgroundImage: 'none' } }}
    >
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item>
          <MainCard border={false}>
            <Stack spacing={2} alignItems="center">
              <Box sx={{ position: 'relative', width: { xs: 320, sm: 500 } }}>
                <img src={completed} alt="Order Complete" style={{ width: 'inherit' }} />
              </Box>
              <Typography variant={matchDownMD ? 'h3' : 'h1'} align="center">
                Thank you for Purchase!
              </Typography>
              <Box sx={{ px: 2.5 }}>
                <Typography align="center" color="textSecondary">
                  We will send a process notification, before it delivered.
                </Typography>
                <Typography align="center" color="textSecondary">
                  Your order id:{' '}
                  <Typography variant="subtitle1" component="span" color="primary">
                    {chance.guid()}
                  </Typography>
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ py: { xs: 1, sm: 3 } }}>
                (219) 404-5468
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={3}>
                <Button
                  component={Link}
                  to="/apps/e-commerce/products"
                  variant="outlined"
                  color="secondary"
                  size={matchDownMD ? 'small' : 'medium'}
                >
                  Continue Shopping
                </Button>
                <Button
                  component={Link}
                  to="/apps/e-commerce/products"
                  variant="contained"
                  color="primary"
                  size={matchDownMD ? 'small' : 'medium'}
                >
                  Download Invoice
                </Button>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default OrderComplete;
