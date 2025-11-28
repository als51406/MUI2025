import * as React from "react";
import {
  Table, T        <Table stickyHeader aria-label="최근 주문 정보">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "id" ? orderDirection : false}>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? orderDirection : "asc"}
                  onClick={() => handleSort("id")}
                  aria-label="추적 번호로 정렬"
                >
                  Tracking no
                </TableSortLabel>
              </TableCell>bleCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, TableSortLabel
} from "@mui/material";
import { recentOrders } from '../data/dashboardData';
import { Order } from '../types';

export default function RecentOrdersTable() {
  const [orderDirection, setOrderDirection] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Order>("id");

  // useCallback으로 정렬 핸들러 메모이제이션
  const handleSort = React.useCallback((property: keyof Order) => {
    setOrderBy(prevOrderBy => {
      const isAsc = prevOrderBy === property && orderDirection === "asc";
      setOrderDirection(isAsc ? "desc" : "asc");
      return property;
    });
  }, [orderDirection]);

  // useMemo로 정렬된 데이터 캐싱 (orderBy, orderDirection 변경 시만 재계산)
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
    <Box p={3} component="section" aria-labelledby="recent-orders-title">
      <Typography variant="h6" sx={{ mb: 2 }} id="recent-orders-title">
        Recent Orders
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          maxHeight: 400,
        }}
        role="region"
        aria-label="최근 주문 테이블"
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
                  Tracking
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
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img style={{ paddingRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/${row.productImage}`} alt={row.product} />
                  {row.product}
                </TableCell>
                <TableCell>${row.price}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      bgcolor: "cyan.50",
                      color: "cyan.600",
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      display: "inline-block",
                      fontWeight: 600,
                    }}
                  >
                    {row.order}
                  </Box>
                </TableCell>
                <TableCell>${row.amount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}