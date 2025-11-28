import * as React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, TableSortLabel, Card, CardContent
} from "@mui/material";
import { recentOrders } from '../data/dashboardData';
import { Order } from '../types';
import { useThemeMode } from '../theme/ThemeContext';

export default function RecentOrdersTable() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const [orderDirection, setOrderDirection] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Order>("id");

  const handleSort = React.useCallback((property: keyof Order) => {
    setOrderBy(prevOrderBy => {
      const isAsc = prevOrderBy === property && orderDirection === "asc";
      setOrderDirection(isAsc ? "desc" : "asc");
      return property;
    });
  }, [orderDirection]);

  const sortedRows = React.useMemo(() => {
    return [...recentOrders].sort((a, b) => {
      if (orderBy === "price" || orderBy === "order" || orderBy === "amount") {
        return orderDirection === "asc"
          ? a[orderBy] - b[orderBy]
          : b[orderBy] - a[orderBy];
      } else {
        return orderDirection === "asc"
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy]);
      }
    });
  }, [orderBy, orderDirection]);

  return (
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
        <Typography 
          variant="h6" 
          component="h2"
          sx={{ 
            mb: 3,
            fontWeight: 600,
            fontSize: '1.125rem',
            color: isDark ? '#FFFFFF' : '#1F2937',
            letterSpacing: '-0.025em'
          }}
        >
          Recent Orders
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: isDark ? '#3A3F47' : '#E5E7EB',
            maxHeight: 400,
            backgroundColor: 'transparent'
          }}
        >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "id" ? orderDirection : false}>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? orderDirection : "asc"}
                  onClick={() => handleSort("id")}
                >
                  Tracking no
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "product" ? orderDirection : false}>
                <TableSortLabel
                  active={orderBy === "product"}
                  direction={orderBy === "product" ? orderDirection : "asc"}
                  onClick={() => handleSort("product")}
                >
                  Product Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "price" ? orderDirection : false}>
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={orderBy === "price" ? orderDirection : "asc"}
                  onClick={() => handleSort("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "order" ? orderDirection : false}>
                <TableSortLabel
                  active={orderBy === "order"}
                  direction={orderBy === "order" ? orderDirection : "asc"}
                  onClick={() => handleSort("order")}
                >
                  Total Order
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "amount" ? orderDirection : false}>
                <TableSortLabel
                  active={orderBy === "amount"}
                  direction={orderBy === "amount" ? orderDirection : "asc"}
                  onClick={() => handleSort("amount")}
                >
                  Total Amount
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>${row.price}</TableCell>
                <TableCell>{row.order}</TableCell>
                <TableCell>${row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </CardContent>
    </Card>
  );
}
