import * as React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, Checkbox, Avatar, Chip, IconButton, Card, CardContent
} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useThemeMode } from '../theme/ThemeContext';

type InvoiceStatus = "Complete" | "Pending" | "Cancel";

type InvoiceRow = {
  id: string;
  name: string;
  email: string;
  date: string;
  status: InvoiceStatus;
  avatar: string;
  checked: boolean;
  starred: boolean;
};

// 32개의 무작위 데이터 생성
const rows: InvoiceRow[] = [
  { id: "#876364", name: "Arrora Gaur", email: "arroragaur@gmail.com", date: "12 Dec, 2020", status: "Complete", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876123", name: "James Mullican", email: "jamesmullican@gmail.com", date: "10 Dec, 2020", status: "Pending", avatar: "/images/avatar2.jpg", checked: false, starred: true },
  { id: "#876542", name: "Robert Johnson", email: "robert.j@outlook.com", date: "08 Dec, 2020", status: "Complete", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876891", name: "Emily Watson", email: "emily.watson@gmail.com", date: "05 Dec, 2020", status: "Cancel", avatar: "/images/avatar2.jpg", checked: false, starred: true },
  { id: "#876234", name: "Michael Brown", email: "michael.b@yahoo.com", date: "03 Dec, 2020", status: "Pending", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876567", name: "Sarah Miller", email: "sarah.miller@gmail.com", date: "01 Dec, 2020", status: "Complete", avatar: "/images/avatar2.jpg", checked: false, starred: false },
  { id: "#876789", name: "David Wilson", email: "david.wilson@hotmail.com", date: "28 Nov, 2020", status: "Complete", avatar: "/images/avatar1.jpg", checked: true, starred: true },
  { id: "#876012", name: "Jennifer Lee", email: "jennifer.lee@gmail.com", date: "25 Nov, 2020", status: "Pending", avatar: "/images/avatar2.jpg", checked: false, starred: false },
  { id: "#876345", name: "Christopher Davis", email: "chris.davis@outlook.com", date: "22 Nov, 2020", status: "Cancel", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876678", name: "Amanda Taylor", email: "amanda.t@gmail.com", date: "20 Nov, 2020", status: "Complete", avatar: "/images/avatar2.jpg", checked: false, starred: true },
  { id: "#876901", name: "Daniel Martinez", email: "daniel.m@yahoo.com", date: "18 Nov, 2020", status: "Pending", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876135", name: "Jessica Anderson", email: "jessica.a@gmail.com", date: "15 Nov, 2020", status: "Complete", avatar: "/images/avatar2.jpg", checked: false, starred: false },
  { id: "#876468", name: "Matthew Thomas", email: "matt.thomas@hotmail.com", date: "12 Nov, 2020", status: "Complete", avatar: "/images/avatar1.jpg", checked: true, starred: true },
  { id: "#876791", name: "Ashley Jackson", email: "ashley.j@outlook.com", date: "10 Nov, 2020", status: "Cancel", avatar: "/images/avatar2.jpg", checked: false, starred: false },
  { id: "#876024", name: "Joshua White", email: "joshua.white@gmail.com", date: "08 Nov, 2020", status: "Pending", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876357", name: "Stephanie Harris", email: "steph.harris@yahoo.com", date: "05 Nov, 2020", status: "Complete", avatar: "/images/avatar2.jpg", checked: false, starred: true },
  { id: "#876680", name: "Andrew Clark", email: "andrew.clark@gmail.com", date: "03 Nov, 2020", status: "Complete", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876913", name: "Nicole Lewis", email: "nicole.l@hotmail.com", date: "01 Nov, 2020", status: "Pending", avatar: "/images/avatar2.jpg", checked: false, starred: false },
  { id: "#876246", name: "Ryan Robinson", email: "ryan.r@outlook.com", date: "28 Oct, 2020", status: "Cancel", avatar: "/images/avatar1.jpg", checked: true, starred: true },
  { id: "#876579", name: "Lauren Walker", email: "lauren.walker@gmail.com", date: "25 Oct, 2020", status: "Complete", avatar: "/images/avatar2.jpg", checked: false, starred: false },
  { id: "#876802", name: "Kevin Young", email: "kevin.young@yahoo.com", date: "22 Oct, 2020", status: "Pending", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876136", name: "Rachel King", email: "rachel.king@gmail.com", date: "20 Oct, 2020", status: "Complete", avatar: "/images/avatar2.jpg", checked: false, starred: true },
  { id: "#876469", name: "Brian Scott", email: "brian.scott@hotmail.com", date: "18 Oct, 2020", status: "Complete", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876792", name: "Megan Green", email: "megan.g@outlook.com", date: "15 Oct, 2020", status: "Cancel", avatar: "/images/avatar2.jpg", checked: false, starred: false },
  { id: "#876025", name: "Justin Adams", email: "justin.adams@gmail.com", date: "12 Oct, 2020", status: "Pending", avatar: "/images/avatar1.jpg", checked: true, starred: true },
  { id: "#876358", name: "Samantha Baker", email: "samantha.b@yahoo.com", date: "10 Oct, 2020", status: "Complete", avatar: "/images/avatar2.jpg", checked: false, starred: false },
  { id: "#876681", name: "Brandon Nelson", email: "brandon.n@gmail.com", date: "08 Oct, 2020", status: "Complete", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876914", name: "Kayla Carter", email: "kayla.carter@hotmail.com", date: "05 Oct, 2020", status: "Pending", avatar: "/images/avatar2.jpg", checked: false, starred: true },
  { id: "#876247", name: "Tyler Mitchell", email: "tyler.m@outlook.com", date: "03 Oct, 2020", status: "Cancel", avatar: "/images/avatar1.jpg", checked: true, starred: false },
  { id: "#876570", name: "Brittany Perez", email: "brittany.p@gmail.com", date: "01 Oct, 2020", status: "Complete", avatar: "/images/avatar2.jpg", checked: false, starred: false },
  { id: "#876803", name: "Austin Roberts", email: "austin.r@yahoo.com", date: "28 Sep, 2020", status: "Pending", avatar: "/images/avatar1.jpg", checked: true, starred: true },
  { id: "#876137", name: "Victoria Turner", email: "victoria.t@gmail.com", date: "25 Sep, 2020", status: "Complete", avatar: "/images/avatar2.jpg", checked: false, starred: false },
];

const statusColor = {
  Complete: { color: "success", label: "Complete" },
  Pending: { color: "warning", label: "Pending" },
  Cancel: { color: "error", label: "Cancel" },
};

export default function InvoiceList() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  
  // 페이지네이션 상태
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  
  // 현재 페이지에 표시할 데이터
  const paginatedRows = React.useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return rows.slice(startIndex, endIndex);
  }, [page]);
  
  // 이전 페이지로 이동
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };
  
  // 다음 페이지로 이동
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Box sx={{ maxWidth: 1400, width: '100%', px: 5, boxSizing: 'border-box', pb: 4 }}>
      <Card 
        sx={{ 
          borderRadius: 3, 
          boxShadow: isDark ? 
            '0 4px 20px rgba(0, 0, 0, 0.4)' : 
            '0 2px 12px rgba(0, 0, 0, 0.08)',
          backgroundColor: isDark ? '#272B30' : '#FFFFFF',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: isDark ? 
              '0 8px 25px rgba(0, 0, 0, 0.5)' : 
              '0 4px 20px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography 
              variant="h6" 
              component="h2"
              sx={{ 
                fontWeight: 600,
                fontSize: '1.125rem',
                color: isDark ? '#FFFFFF' : '#1F2937',
                letterSpacing: '-0.025em'
              }}
            >
              Invoice List
            </Typography>
            <Box sx={{ color: isDark ? '#6B7280' : '#9CA3AF' }}>
              <span>•••</span>
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: 'none',
              border: '1px solid',
              borderColor: isDark ? '#3A3F47' : '#E5E7EB',
              backgroundColor: 'transparent'
            }}
          >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>Invoice Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Star</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Checkbox checked={row.checked} />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={row.avatar} sx={{ mr: 1, width: 32, height: 32 }} />
                  {row.name}
                </TableCell>
                <TableCell>
                  <EmailIcon fontSize="small" sx={{ mr: 1, color: "success.main" }} />
                  {row.email}
                </TableCell>
                <TableCell>
                  <CalendarMonthIcon fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
                  {row.date}
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusColor[row.status].label}
                    color={statusColor[row.status].color as any}
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      bgcolor: `${statusColor[row.status].color}.100`,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    {row.starred ? <StarIcon color="warning" /> : <StarBorderIcon />}
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
          
          {/* 페이지네이션 */}
          <Box 
            sx={{ 
              mt: 3, 
              pt: 2, 
              borderTop: '1px solid', 
              borderColor: isDark ? '#3A3F47' : '#E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
            >
              Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, rows.length)} of {rows.length} entries
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={handlePrevPage}
                disabled={page === 1}
                sx={{
                  width: 36,
                  height: 36,
                  border: '1px solid',
                  borderColor: isDark ? '#3A3F47' : '#E5E7EB',
                  borderRadius: 1.5,
                  color: page === 1 
                    ? (isDark ? '#4B5563' : '#D1D5DB') 
                    : (isDark ? '#FFFFFF' : '#1F2937'),
                  backgroundColor: isDark ? '#1F2328' : '#FFFFFF',
                  '&:hover': {
                    backgroundColor: isDark ? '#3A3F47' : '#F3F4F6',
                  },
                  '&.Mui-disabled': {
                    color: isDark ? '#4B5563' : '#D1D5DB',
                  }
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  minWidth: 80,
                  textAlign: 'center',
                  borderRadius: 1.5,
                  backgroundColor: isDark ? '#5932EA' : '#5932EA',
                }}
              >
                <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {page} / {totalPages}
                </Typography>
              </Box>
              
              <IconButton
                onClick={handleNextPage}
                disabled={page === totalPages}
                sx={{
                  width: 36,
                  height: 36,
                  border: '1px solid',
                  borderColor: isDark ? '#3A3F47' : '#E5E7EB',
                  borderRadius: 1.5,
                  color: page === totalPages 
                    ? (isDark ? '#4B5563' : '#D1D5DB') 
                    : (isDark ? '#FFFFFF' : '#1F2937'),
                  backgroundColor: isDark ? '#1F2328' : '#FFFFFF',
                  '&:hover': {
                    backgroundColor: isDark ? '#3A3F47' : '#F3F4F6',
                  },
                  '&.Mui-disabled': {
                    color: isDark ? '#4B5563' : '#D1D5DB',
                  }
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}