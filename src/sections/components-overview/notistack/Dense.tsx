import { useState, ChangeEvent } from 'react';

// material-ul
import { Button, Checkbox } from '@mui/material';

// third-party
import { enqueueSnackbar } from 'notistack';

// project import
import MainCard from 'components/MainCard';
import { handlerDense } from 'store/reducers/snackbar';
import { dispatch } from 'store';

// ==============================|| NOTISTACK - DENSE ||============================== //

export default function Dense() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(handlerDense({ dense: event.target.checked }));
  };

  const NotistackDenseCodeString = `<Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
Dense margins
<Button variant="outlined" fullWidth sx={{ marginBlockStart: 2 }} onClick={() => enqueueSnackbar('Your notification here')}>
  Show snackbar
</Button>`;

  return (
    <MainCard title="Dense" codeString={NotistackDenseCodeString}>
      <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
      Dense margins
      <Button variant="outlined" fullWidth sx={{ marginBlockStart: 2 }} onClick={() => enqueueSnackbar('Your notification here')}>
        Show snackbar
      </Button>
    </MainCard>
  );
}
