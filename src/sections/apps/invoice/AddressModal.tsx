// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// third-party
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

type AddressModalType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlerAddress: (a: any) => void;
};

// ==============================|| INVOICE - SELECT ADDRESS ||============================== //

const AddressModal = ({ open, setOpen, handlerAddress }: AddressModalType) => {
  function closeAddressModal() {
    setOpen(false);
  }

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={closeAddressModal}
      sx={{ '& .MuiDialog-paper': { p: 0 }, '& .MuiBackdrop-root': { opacity: '0.5 !important' } }}
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Select Address</Typography>
          <Button startIcon={<PlusOutlined />} onClick={closeAddressModal} color="primary">
            Add New
          </Button>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}>
        <FormControl sx={{ width: '100%', pb: 2 }}>
          <TextField
            autoFocus
            id="name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              )
            }}
            placeholder="Search"
            fullWidth
          />
        </FormControl>
        <Stack spacing={2}>
          <Address handlerAddress={handlerAddress} />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Button color="error" onClick={closeAddressModal}>
          Cancel
        </Button>
        <Button onClick={closeAddressModal} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type AddressProps = {
  handlerAddress: (e: any) => void;
};
const Address = ({ handlerAddress }: AddressProps) => {
  const theme = useTheme();

  const addressData = [
    {
      name: 'Ian Carpenter',
      address: '1754 Ureate, RhodSA5 5BO',
      phone: '+91 1234567890',
      email: 'iacrpt65@gmail.com'
    },
    { name: 'Belle J. Richter', address: '1300 Mine RoadQuemado, NM 87829', phone: '305-829-7809', email: 'belljrc23@gmail.com' },
    { name: 'Ritika Yohannan', address: '3488 Arbutus DriveMiami, FL', phone: '+91 1234567890', email: 'rtyhn65@gmail.com' },
    { name: 'Jesse G. Hassen', address: '3488 Arbutus DriveMiami, FL 33012', phone: '+91 1234567890', email: 'jessghs78@gmail.com' },
    {
      name: 'Christopher P. Iacovelli',
      address: '4388 House DriveWesrville, OH',
      phone: '+91 1234567890',
      email: 'crpthl643@gmail.com'
    },
    { name: 'Thomas D. Johnson', address: '4388 House DriveWestville, OH +91', phone: '1234567890', email: 'thomshj56@gmail.com' }
  ];

  return (
    <>
      {addressData.map((address: any) => (
        <Box
          onClick={() => handlerAddress(address)}
          key={address.email}
          sx={{
            width: '100%',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 1,
            p: 1.25,
            '&:hover': {
              bgcolor: theme.palette.primary.lighter,
              borderColor: theme.palette.primary.lighter
            }
          }}
        >
          <Typography textAlign="left" variant="subtitle1">
            {address.name}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Typography textAlign="left" variant="body2" color="secondary">
              {address.address}
            </Typography>
            <Typography textAlign="left" variant="body2" color="secondary">
              {address.phone}
            </Typography>
            <Typography textAlign="left" variant="body2" color="secondary">
              {address.email}
            </Typography>
          </Stack>
        </Box>
      ))}
    </>
  );
};

export default AddressModal;
