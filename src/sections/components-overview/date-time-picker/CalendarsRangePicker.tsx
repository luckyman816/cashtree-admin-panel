import { useState } from 'react';

// material-ui
import { Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// project import
import MainCard from 'components/MainCard';

// ==============================|| DATE PICKER - NO. OF CALENDERS ||============================== //

export default function CalendarsRangePicker() {
  const [value, setValue] = useState<any>([null, null]);

  const calDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDateFns}>
  <div>
    <Typography sx={{ mt: 2, mb: 1 }}>1 calendar </Typography>
    <DateRangePicker
      calendars={1}
      value={value}
      onChange={(newValue: any) => {
        setValue(newValue);
      }}
    />
    <Typography sx={{ mt: 2, mb: 1 }}>2 calendars</Typography>
    <DateRangePicker
      calendars={2}
      value={value}
      onChange={(newValue: any) => {
        setValue(newValue);
      }}
    />
    <Typography sx={{ mt: 2, mb: 1 }}>3 calendars</Typography>
    <DateRangePicker
      calendars={3}
      value={value}
      onChange={(newValue: any) => {
        setValue(newValue);
      }}
    />
  </div>
</LocalizationProvider>`;

  return (
    <MainCard title="Calendars Range Picker" codeString={calDatepickerCodeString}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Typography sx={{ mt: 2, mb: 1 }}>1 calendar </Typography>
        <DateRangePicker
          calendars={1}
          value={value}
          onChange={(newValue: any) => {
            setValue(newValue);
          }}
        />
        <Typography sx={{ mt: 2, mb: 1 }}>2 calendars</Typography>
        <DateRangePicker
          calendars={2}
          value={value}
          onChange={(newValue: any) => {
            setValue(newValue);
          }}
        />
        <Typography sx={{ mt: 2, mb: 1 }}>3 calendars</Typography>
        <DateRangePicker
          calendars={3}
          value={value}
          onChange={(newValue: any) => {
            setValue(newValue);
          }}
        />
      </LocalizationProvider>
    </MainCard>
  );
}
