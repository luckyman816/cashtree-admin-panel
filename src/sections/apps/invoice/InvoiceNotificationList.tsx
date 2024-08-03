import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, IconButton, Button, Typography, Link } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import { LinkOutlined, MoreOutlined, DownloadOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';

const InvoiceNotificationList = () => {
  const theme = useTheme();
  const iconSX = {
    fontSize: '1rem',
    color: theme.palette.text.secondary
  };

  return (
    <MainCard
      title="Notification"
      secondary={
        <IconButton edge="end" aria-label="comments" color="secondary">
          <MoreOutlined style={{ fontSize: '1.15rem' }} />
        </IconButton>
      }
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 1" color="success">
                <DownloadOutlined />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" variant="subtitle1">
                Johnny sent you an invoice billed{' '}
                <Link component={RouterLink} to="#" underline="hover">
                  $1,000.
                </Link>
              </Typography>
              <Typography align="left" variant="caption" color="secondary">
                2 August
              </Typography>
            </Grid>
            <Grid item>
              <LinkOutlined style={iconSX} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 2">
                <FileTextOutlined />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" variant="subtitle1">
                Sent an invoice to Aida Bugg amount of{' '}
                <Link component={RouterLink} to="#" underline="hover">
                  $200.
                </Link>
              </Typography>
              <Typography align="left" variant="caption" color="secondary">
                7 hours ago
              </Typography>
            </Grid>
            <Grid item>
              <LinkOutlined style={iconSX} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 2" color="error">
                <SettingOutlined />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" variant="subtitle1">
                There was a failure to your setup
              </Typography>
              <Typography align="left" variant="caption" color="secondary">
                7 hours ago
              </Typography>
            </Grid>
            <Grid item>
              <LinkOutlined style={iconSX} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 2">C</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" variant="subtitle1">
                Cristina danny invited to you join Meeting
              </Typography>
              <Typography align="left" variant="caption" color="secondary">
                7 hours ago
              </Typography>
            </Grid>
            <Grid item>
              <LinkOutlined style={iconSX} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 2">C</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" variant="subtitle1">
                Cristina danny invited to you join Meeting
              </Typography>
              <Typography align="left" variant="caption" color="secondary">
                7 hours ago
              </Typography>
            </Grid>
            <Grid item>
              <LinkOutlined style={iconSX} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="outlined" color="secondary">
            View All
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default InvoiceNotificationList;
