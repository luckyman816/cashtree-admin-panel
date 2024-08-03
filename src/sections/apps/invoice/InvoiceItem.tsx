import { useState } from 'react';

// material-ui
import { Box, Button, Stack, TableCell, Tooltip, Typography } from '@mui/material';

// third-party
import { getIn } from 'formik';

// project import
import InvoiceField from './InvoiceField';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { DeleteOutlined } from '@ant-design/icons';
import AlertProductDelete from './AlertProductDelete';

// ==============================|| INVOICE - ITEMS ||============================== //

const InvoiceItem = ({ id, name, description, qty, price, onDeleteItem, onEditItem, index, Blur, errors, touched }: any) => {
  const { country } = useSelector((state) => state.invoice);

  const [open, setOpen] = useState(false);
  const handleModalClose = (status: boolean) => {
    setOpen(false);
    if (status) {
      onDeleteItem(index);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Product Deleted successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  };

  const Name = `invoice_detail[${index}].name`;
  const touchedName = getIn(touched, Name);
  const errorName = getIn(errors, Name);

  const textFieldItem = [
    {
      placeholder: 'Item name',
      label: 'Item Name',
      name: `invoice_detail.${index}.name`,
      type: 'text',
      id: id,
      value: name,
      errors: errorName,
      touched: touchedName
    },
    {
      placeholder: 'Description',
      label: 'Description',
      name: `invoice_detail.${index}.description`,
      type: 'text',
      id: id,
      value: description
    },
    { placeholder: '', label: 'Qty', type: 'number', name: `invoice_detail.${index}.qty`, id: id, value: qty },
    { placeholder: '', label: 'price', type: 'number', name: `invoice_detail.${index}.price`, id: id, value: price }
  ];

  return (
    <>
      {textFieldItem.map((item: any) => {
        return (
          <InvoiceField
            onEditItem={(event: any) => onEditItem(event)}
            onBlur={(event: any) => Blur(event)}
            cellData={{
              placeholder: item.placeholder,
              name: item.name,
              type: item.type,
              id: item.id,
              value: item.value,
              errors: item.errors,
              touched: item.touched
            }}
            key={item.label}
          />
        );
      })}
      <TableCell>
        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
          <Box sx={{ pr: 2, pl: 2 }}>
            <Typography>{country?.prefix + '' + (price * qty).toFixed(2)}</Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Tooltip title="Remove Item">
          <Button color="error" onClick={() => setOpen(true)}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </TableCell>
      <AlertProductDelete title={name} open={open} handleClose={handleModalClose} />
    </>
  );
};

export default InvoiceItem;
