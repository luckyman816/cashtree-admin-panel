// material-ui
import { TableCell, TextField } from '@mui/material';

// ==============================|| INVOICE - TEXT FIELD ||============================== //

const InvoiceField = ({ onEditItem, cellData }: any) => {
  return (
    <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 } }}>
      <TextField
        type={cellData.type}
        placeholder={cellData.placeholder}
        name={cellData.name}
        id={cellData.id}
        value={cellData.type === 'number' ? (cellData.value > 0 ? cellData.value : '') : cellData.value}
        onChange={onEditItem}
        label={cellData.label}
        error={Boolean(cellData.errors && cellData.touched)}
        inputProps={{
          ...(cellData.type === 'number' && { min: 0 })
        }}
      />
    </TableCell>
  );
};

export default InvoiceField;
