import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface MonthRangeFilterProps {
  months: string[];
  onChange: (start: number, end: number) => void;
}

const MonthRangeFilter: React.FC<MonthRangeFilterProps> = ({ months, onChange }) => {
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(months.length - 1);

  const handleStartChange = (e: any) => {
    const value = e.target.value as number;
    setStart(value);
    if (value <= end) onChange(value, end);
  };
  const handleEndChange = (e: any) => {
    const value = e.target.value as number;
    setEnd(value);
    if (value >= start) onChange(start, value);
  };

  return (
    <Box display="flex" gap={2} mb={2}>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Start Month</InputLabel>
        <Select value={start} label="Start Month" onChange={handleStartChange}>
          {months.map((m, idx) => <MenuItem key={m} value={idx}>{m}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>End Month</InputLabel>
        <Select value={end} label="End Month" onChange={handleEndChange}>
          {months.map((m, idx) => <MenuItem key={m} value={idx}>{m}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MonthRangeFilter;
