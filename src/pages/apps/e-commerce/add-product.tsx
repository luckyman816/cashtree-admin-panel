import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Grid, InputLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { UploadOutlined } from '@ant-design/icons';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddNewProduct() {
  const history = useNavigate();
  const prices = [
    {
      value: '1',
      label: '$ 100'
    },
    {
      value: '2',
      label: '$ 200'
    },
    {
      value: '3',
      label: '$ 300'
    },
    {
      value: '4',
      label: '$ 400'
    }
  ];

  const quantities = [
    {
      value: 'one',
      label: '1'
    },
    {
      value: 'two',
      label: '2'
    },
    {
      value: 'three',
      label: '3'
    }
  ];

  const statuss = [
    {
      value: 'in stock',
      label: 'In Stock'
    },
    {
      value: 'out of stock',
      label: 'Out of Stock'
    }
  ];

  const [quantity, setQuantity] = useState('one');
  const [price, setPrice] = useState('1');
  const [status, setStatus] = useState('in stock');

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleCancel = () => {
    history(`/apps/e-commerce/product-list`);
  };

  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1 }}>Product Name</InputLabel>
                  <TextField placeholder="Enter product name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1 }}>Product Description</InputLabel>
                  <TextField placeholder="Enter product description" fullWidth multiline rows={3} />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1 }}>Category</InputLabel>
                  <TextField placeholder="Enter your category" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1 }}>Price</InputLabel>
                  <TextField placeholder="Select Price" fullWidth select value={price} onChange={handlePrice}>
                    {prices.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1 }}>Qty</InputLabel>
                  <TextField placeholder="Select quantity" fullWidth select value={quantity} onChange={handleQuantity}>
                    {quantities.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1 }}>Status</InputLabel>
                  <TextField placeholder="Select status" fullWidth select value={status} onChange={handleStatus}>
                    {statuss.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="error.main">
                    *{' '}
                    <Typography component="span" color="textSecondary">
                      Recommended resolution is 640*640 with file size
                    </Typography>
                  </Typography>
                  <Button variant="outlined" color="secondary" startIcon={<UploadOutlined />} sx={{ mt: 1, textTransform: 'none' }}>
                    Click to Upload
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 8 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="contained" sx={{ textTransform: 'none' }}>
                      Add new Product
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default AddNewProduct;
