import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  Typography, 
  Divider,
  Chip
} from '@mui/material';
import { KeyboardArrowDown, CalendarMonth } from '@mui/icons-material';
import { useThemeMode } from '../../theme/ThemeContext';

interface DateRange {
  label: string;
  startDate: string;
  endDate: string;
}

const predefinedRanges: DateRange[] = [
  { label: 'Last 7 days', startDate: '2021-10-04', endDate: '2021-10-10' },
  { label: 'Last 30 days', startDate: '2021-09-11', endDate: '2021-10-10' },
  { label: 'Last 3 months', startDate: '2021-07-11', endDate: '2021-10-10' },
  { label: 'Last 6 months', startDate: '2021-04-11', endDate: '2021-10-10' },
  { label: 'This year', startDate: '2021-01-01', endDate: '2021-10-10' },
];

const DateRangePicker: React.FC = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange>(predefinedRanges[0]);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRangeSelect = (range: DateRange) => {
    setSelectedRange(range);
    handleClose();
  };

  return (
    <Box>
      <Button
        variant="outlined"
        size="small"
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        startIcon={<CalendarMonth />}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '6px 12px',
          minWidth: 'auto',
          backgroundColor: isDark ? '#2D3748' : '#F8F9FA',
          borderColor: isDark ? '#4A5568' : '#E2E8F0',
          color: isDark ? '#FFFFFF' : '#2D3748',
          '&:hover': {
            backgroundColor: isDark ? '#4A5568' : '#EDF2F7',
            borderColor: isDark ? '#718096' : '#CBD5E0',
          },
        }}
      >
        {selectedRange.label}
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: isDark 
              ? '0 10px 25px rgba(0, 0, 0, 0.6)'
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: isDark ? '#2D3748' : '#FFFFFF',
            border: isDark ? '1px solid #4A5568' : '1px solid #E2E8F0',
            minWidth: 220,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 600,
              color: isDark ? '#A0AEC0' : '#718096',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Select Date Range
          </Typography>
        </Box>
        
        <Divider />
        
        {predefinedRanges.map((range, index) => (
          <MenuItem
            key={index}
            onClick={() => handleRangeSelect(range)}
            selected={selectedRange.label === range.label}
            sx={{
              px: 2,
              py: 1.5,
              '&:hover': {
                backgroundColor: isDark ? '#4A5568' : '#F7FAFC',
              },
              '&.Mui-selected': {
                backgroundColor: isDark ? '#553C9A' : '#EBF8FF',
                '&:hover': {
                  backgroundColor: isDark ? '#6B46C1' : '#BEE3F8',
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: selectedRange.label === range.label ? 600 : 400,
                  color: isDark ? '#FFFFFF' : '#2D3748',
                  mb: 0.5
                }}
              >
                {range.label}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: isDark ? '#A0AEC0' : '#718096',
                  fontSize: '0.75rem'
                }}
              >
                {range.startDate} - {range.endDate}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ px: 2, py: 1 }}>
          <Chip
            label="Custom Range"
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.75rem',
              height: 24,
              borderColor: isDark ? '#A0AEC0' : '#CBD5E0',
              color: isDark ? '#A0AEC0' : '#718096',
              '&:hover': {
                backgroundColor: isDark ? '#4A5568' : '#F7FAFC',
              },
            }}
          />
        </Box>
      </Menu>
    </Box>
  );
};

export default DateRangePicker;
