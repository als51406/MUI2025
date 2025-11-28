import * as React from "react";
import {
  Card, CardContent, Typography, Box, List, ListItem, Divider
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { topSellingProducts } from '../data/dashboardData';

export default function TopSellingProducts() {
  // useMemo로 제품 리스트 메모이제이션
  const productList = React.useMemo(() => 
    topSellingProducts.map((product, index) => (
      <React.Fragment key={product.name}>
        <ListItem
          alignItems="flex-start"
          sx={{ display: "flex", gap: 2, py: 2 }}
        >
          {/* 상품 이미지 */}
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/images/${product.image}`}
            alt={product.name}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              bgcolor: "grey.100",
              objectFit: "cover"
            }}
          />

          {/* 상품 정보 */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {product.name}
            </Typography>
            <Rating
              name="read-only"
              value={product.rating}
              readOnly
              size="small"
              sx={{ my: 0.5 }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              ${product.price}
            </Typography>
          </Box>
        </ListItem>

        {/* 구분선 */}
        {index < topSellingProducts.length - 1 && <Divider />}
      </React.Fragment>
    ))
  , []);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Top selling Products
        </Typography>

        <List disablePadding>
          {productList}
        </List>
      </CardContent>
    </Card>
  );
}
