import * as React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, Checkbox, Avatar, Chip, IconButton
} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';

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

const rows: InvoiceRow[] = [
  {
    id: "#876364",
    name: "Arrora gaur",
    email: "arroragaur@gmail.com",
    date: "12 Dec, 2020",
    status: "Complete",
    avatar: "/images/avatar1.jpg",
    checked: true,
    starred: false,
  },
  {
    id: "#876123",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "10 Dec, 2020",
    status: "Pending",
    avatar: "/images/avatar2.jpg",
    checked: false,
    starred: true,
  },
  // ... 나머지 데이터 추가
];

const statusColor = {
  Complete: { color: "success", label: "Complete" },
  Pending: { color: "warning", label: "Pending" },
  Cancel: { color: "error", label: "Cancel" },
};

export default function InvoiceList() {
  return (
    <Box p={3}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Invoice List
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 2,
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
            {rows.map((row) => (
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
    </Box>
  );
}