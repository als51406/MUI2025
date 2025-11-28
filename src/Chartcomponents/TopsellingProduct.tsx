import * as React from "react";
import {
  Card, CardContent, Typography, Box, List, ListItem, Divider
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { topSellingProducts } from '../data/dashboardData';
import { useThemeMode } from '../theme/ThemeContext';

export default function TopSellingProducts() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  // useMemo로 제품 리스트 메모이제이션
  const productList = React.useMemo(() => 
    topSellingProducts.map((product, index) => (
      <React.Fragment key={product.name}>
        <ListItem
          alignItems="flex-start"
          sx={{ 
            display: "flex", 
            gap: 2, 
            py: 2,
            px: 0,
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
              borderRadius: 2,
            }
          }}
        >
          {/* 상품 이미지 */}
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/images/${product.image}`}
            alt={product.name}
            sx={{
              width: 72,
              height: 72,
              borderRadius: 2,
              bgcolor: isDark ? "#3A3F47" : "grey.100",
              objectFit: "cover"
            }}
          />

          {/* 상품 정보 */}
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 500,
                color: isDark ? '#FFFFFF' : '#1F2937',
                fontSize: '0.95rem'
              }}
            >
              {product.name}
            </Typography>
            <Rating
              name="read-only"
              value={product.rating}
              readOnly
              size="small"
              sx={{ my: 0.5 }}
            />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600,
                color: isDark ? '#A78BFA' : '#5932EA',
                fontSize: '1rem'
              }}
            >
              ${product.price}
            </Typography>
          </Box>
        </ListItem>

        {/* 구분선 */}
        {index < topSellingProducts.length - 1 && (
          <Divider sx={{ borderColor: isDark ? '#3A3F47' : '#E5E7EB' }} />
        )}
      </React.Fragment>
    ))
  , [isDark]);

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
            Top selling Products
          </Typography>
          <Box sx={{ color: isDark ? '#6B7280' : '#9CA3AF' }}>
            <span>•••</span>
          </Box>
        </Box>

        <List disablePadding>
          {productList}
        </List>
      </CardContent>
    </Card>
  );
}
