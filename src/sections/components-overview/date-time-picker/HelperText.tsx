import { useState } from 'react';

// material-ui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// project import
import MainCard from 'components/MainCard';

// ==============================|| DATE PICKER - HELPER TEXT ||============================== //

export default function HelperText() {
  const [value, setValue] = useState<Date | null>(null);

  const helperDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker  
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
    renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} placeholder="Helper Text" />}
  />
</LocalizationProvider>`;

  return (
    <MainCard title="Helper Text" codeString={helperDatepickerCodeString}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          slotProps={{
            textField: {
              helperText: 'Helper Text'
            }
          }}
        />
      </LocalizationProvider>
    </MainCard>
  );
}
