import { useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  Fade,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';
import { PDFDownloadLink } from '@react-pdf/renderer';

// project import
import CustomerPreview from './CustomerPreview';
import AlertCustomerDelete from './AlertCustomerDelete';
import AddCustomer from 'sections/apps/customer/AddCustomer';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import ListSmallCard from './exportpdf/ListSmallCard';

// assets
import { EnvironmentOutlined, LinkOutlined, MailOutlined, MoreOutlined, PhoneOutlined } from '@ant-design/icons';

// types
import { UserCardProps } from 'types/user-profile';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| CUSTOMER - CARD ||============================== //

const CustomerCard = ({ customer }: { customer: UserCardProps }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [add, setAdd] = useState<boolean>(false);
  const handleAdd = () => {
    setAdd(!add);
  };

  return (
    <>
      <MainCard sx={{ height: 1, '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column' } }}>
        <Grid id="print" container spacing={2.25}>
          <Grid item xs={12}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" color="secondary" onClick={handleMenuClick}>
                    <MoreOutlined style={{ fontSize: '1.15rem' }} />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={customer.fatherName} src={avatarImage(`./avatar-${!customer.avatar ? 1 : customer.avatar}.png`)} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1">{customer.fatherName}</Typography>}
                  secondary={
                    <Typography variant="caption" color="secondary">
                      {customer.role}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button'
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem sx={{ a: { textDecoration: 'none', color: 'inherit' } }}>
                <PDFDownloadLink document={<ListSmallCard customer={customer} />} fileName={`Customer-${customer.fatherName}.pdf`}>
                  Export PDF
                </PDFDownloadLink>
              </MenuItem>
              <MenuItem onClick={handleAdd}>Edit</MenuItem>
              <MenuItem onClick={handleAlertClose}>Delete</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography>Hello, {customer.about}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem>
                    <ListItemIcon>
                      <MailOutlined />
                    </ListItemIcon>
                    <ListItemText primary={<Typography color="secondary">{customer.email}</Typography>} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography color="secondary">
                          <PatternFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={customer.contact} />
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem>
                    <ListItemIcon>
                      <EnvironmentOutlined />
                    </ListItemIcon>
                    <ListItemText primary={<Typography color="secondary">{customer.country}</Typography>} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LinkOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link href="https://google.com" target="_blank" sx={{ textTransform: 'lowercase' }}>
                          https://{customer.firstName}.en
                        </Link>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  p: 0.5,
                  m: 0
                }}
                component="ul"
              >
                {customer.skills.map((skill: string, index: number) => (
                  <ListItem disablePadding key={index} sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                    <Chip color="secondary" variant="outlined" size="small" label={skill} />
                  </ListItem>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          className="hideforPDf"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
          sx={{ mt: 'auto', mb: 0, pt: 2.25 }}
        >
          <Typography variant="caption" color="secondary">
            Updated in {customer.time}
          </Typography>
          <Button variant="outlined" size="small" onClick={handleClickOpen}>
            Preview
          </Button>
        </Stack>
      </MainCard>

      {/* edit customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddCustomer customer={customer} onCancel={handleAdd} />
      </Dialog>
      <CustomerPreview customer={customer} open={open} onClose={handleClose} />
      <AlertCustomerDelete title={customer.fatherName} open={openAlert} handleClose={handleAlertClose} />
    </>
  );
};

export default CustomerCard;
