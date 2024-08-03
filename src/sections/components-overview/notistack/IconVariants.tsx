import { useState, ChangeEvent } from 'react';

// material-ul
import { Button, FormControl, Radio, FormControlLabel, RadioGroup } from '@mui/material';

// third-party
import { enqueueSnackbar } from 'notistack';

// project import
import MainCard from 'components/MainCard';

import { dispatch } from 'store';
import { handlerIconVariants } from 'store/reducers/snackbar';

// ==============================|| NOTISTACK - CUSTOM ICON ||============================== //

export default function IconVariants() {
  const [value, setValue] = useState('usedefault');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const NotiStackIconVariantsSnackbarCodeString = `<Button
variant="contained"
fullWidth
sx={{ marginBlockStart: 2 }}
onClick={() => {
  enqueueSnackbar('Your notification here', { variant: 'info' });
  dispatch(
    handlerIconVariants({
      iconVariant: value
    })
  );
}}
>
  Show Snackbar
</Button>`;

  return (
    <MainCard title="With Icons" codeString={NotiStackIconVariantsSnackbarCodeString}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          value={value}
          onChange={handleChange}
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="usedefault" control={<Radio />} label="Use Default" />
          <FormControlLabel value="useemojis" control={<Radio />} label="Use Emojis" />
          <FormControlLabel value="hide" control={<Radio />} label="Hide" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginBlockStart: 2 }}
        onClick={() => {
          enqueueSnackbar('Your notification here', { variant: 'info' });
          dispatch(
            handlerIconVariants({
              iconVariant: value
            })
          );
        }}
      >
        Show Snackbar
      </Button>
    </MainCard>
  );
}
