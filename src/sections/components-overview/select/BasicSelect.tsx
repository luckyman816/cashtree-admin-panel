import { useState } from 'react';

// material-ui
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| COMPONENTS - BASIC ||============================== //

export default function BasicSelect() {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const basicSelectCodeString = `<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Select Age</InputLabel>
  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} placeholder="Age" onChange={handleChange}>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
<FormControl sx={{ m: 1, minWidth: 120 }}>
  <FormHelperText>Without label</FormHelperText>
  <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
    <MenuItem value="" sx={{ color: 'text.secondary' }}>
      Select Age
    </MenuItem>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>`;

  return (
    <MainCard title="Basic" codeHighlight codeString={basicSelectCodeString}>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel>Age</InputLabel>
            <FormControl fullWidth>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} placeholder="Age" onChange={handleChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="" sx={{ color: 'text.secondary' }}>
                Without label
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </MainCard>
  );
}
