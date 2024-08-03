import { useState } from 'react';

// material-ui
import de from 'date-fns/locale/de';
import enGB from 'date-fns/locale/en-GB';
import zhCN from 'date-fns/locale/zh-CN';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';

// project import
import MainCard from 'components/MainCard';

const locales = { 'en-us': undefined, 'en-gb': enGB, 'zh-cn': zhCN, de };

type LocaleKey = keyof typeof locales;

// ==============================|| DATE PICKER - LOCALIZED ||============================== //

export default function LocalizedPicker() {
  const [locale, setLocale] = useState<LocaleKey>('en-us');

  const localizeDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locales[locale]}>
  <Stack spacing={3} sx={{ width: 300 }}>
    <ToggleButtonGroup value={locale} exclusive fullWidth onChange={(event, newLocale) => setLocale(newLocale)}>
      {Object.keys(locales).map((localeItem) => (
        <ToggleButton key={localeItem} value={localeItem}>
          {localeItem}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
    <DateField label="Date" defaultValue={new Date('2022-04-17')} />
    <TimeField label="Time" defaultValue={new Date('2022-04-17T18:30')} />
  </Stack>
</LocalizationProvider>`;

  return (
    <MainCard title="Localization Picker" codeString={localizeDatepickerCodeString}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locales[locale]}>
        <Stack spacing={3} sx={{ width: 300 }}>
          <ToggleButtonGroup value={locale} exclusive fullWidth onChange={(event, newLocale) => setLocale(newLocale)}>
            {Object.keys(locales).map((localeItem) => (
              <ToggleButton key={localeItem} value={localeItem}>
                {localeItem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <DateField label="Date" defaultValue={new Date('2022-04-17')} />
          <TimeField label="Time" defaultValue={new Date('2022-04-17T18:30')} />
        </Stack>
      </LocalizationProvider>
    </MainCard>
  );
}
