import { useState } from 'react';

// material-ui
import { AvatarGroup, Box, Button, Divider, Grid, LinearProgress, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

// assets
import { PlusOutlined } from '@ant-design/icons';
import Reader from 'assets/images/analytics/reader.svg';

// types
import { ThemeDirection } from 'types/config';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| READER CARD ||============================== //

function ReaderCard() {
  const theme = useTheme();
  const [show, setShow] = useState<boolean>(false);

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={7}
          sx={{
            bgcolor: `${theme.palette.primary.main}`,
            position: 'relative',
            p: 2.75,
            borderRadius: { xs: 2, sm: '8px 0px 0px 8px' },
            overflow: 'hidden'
          }}
        >
          <Stack>
            <Typography variant="h5" color="white">
              What would you want to learn today
            </Typography>
            <Typography color={theme.palette.grey[0]} variant="caption" sx={{ maxWidth: '55%', pt: 1 }}>
              Your learning capacity is 80% as daily analytics
            </Typography>
            <Typography variant="h4" color="white" sx={{ pt: 8, pb: 1, zIndex: 1 }}>
              35% Completed
            </Typography>
            <Box sx={{ maxWidth: '60%' }}>
              <LinearProgress variant="determinate" color="success" value={35} />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: -7,
                right: 0,
                ...(theme.direction === ThemeDirection.RTL && { transform: { xs: 'rotateY(180deg)', sm: 'inherit' } })
              }}
            >
              <img alt="reder" src={Reader} />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={5}>
          <MainCard sx={{ borderRadius: { xs: 2, sm: '0px 8px 8px 0px' }, height: '100%', mt: { xs: 2.5, sm: 0 } }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack>
                  <Typography>Get started with new basic skills</Typography>
                  <Typography color="textSecondary" sx={{ pt: 1 }}>
                    Last Date 5th Nov 2020
                  </Typography>
                  <Divider sx={{ pt: 3, width: '100%' }} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                  <Box sx={{ width: 186 }}>
                    <Tooltip
                      open={show}
                      placement="top-end"
                      title={
                        <AvatarGroup max={10}>
                          <Avatar alt="Agnes Walker" src={avatarImage(`./avatar-4.png`)} />
                          <Avatar alt="Trevor Henderson" src={avatarImage(`./avatar-5.png`)} />
                          <Avatar alt="Jone Doe" src={avatarImage(`./avatar-6.png`)} />
                        </AvatarGroup>
                      }
                    >
                      <AvatarGroup
                        sx={{
                          '& .MuiAvatarGroup-avatar': { bgcolor: theme.palette.primary.main, cursor: 'pointer' },
                          justifyContent: 'start',
                          '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem', bgcolor: 'secondary.400' }
                        }}
                        max={4}
                        componentsProps={{
                          additionalAvatar: {
                            onMouseEnter: () => {
                              setShow(true);
                            },
                            onMouseLeave: () => {
                              setShow(false);
                            }
                          }
                        }}
                      >
                        <Avatar alt="Remy Sharp" src={avatarImage(`./avatar-1.png`)} />
                        <Avatar alt="Travis Howard" src={avatarImage(`./avatar-2.png`)} />
                        <Avatar alt="Cindy Baker" src={avatarImage(`./avatar-3.png`)} />
                        <Avatar alt="Agnes Walker" src={avatarImage(`./avatar-4.png`)} />
                        <Avatar alt="Trevor Henderson" src={avatarImage(`./avatar-5.png`)} />
                      </AvatarGroup>
                    </Tooltip>
                  </Box>
                  <Button size="small" variant="contained" sx={{ minWidth: 'max-content', p: 1.5 }}>
                    <PlusOutlined />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="secondary">
                  Chrome fixed the bug several versions ago, thus rendering this...
                </Typography>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ReaderCard;
