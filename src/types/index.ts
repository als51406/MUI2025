// 대시보드 통계 카드 타입
export interface DashboardStat {
  icon: string;
  value: number;
  label: string;
}

// 차트 데이터 포인트 타입
export interface ChartDataPoint {
  label: string;
  value: number;
}

// 상품 타입
export interface Product {
  name: string;
  price: number;
  rating: number;
  image: string;
}

// 주문 타입
export interface Order {
  id: string;
  productImage: string;
  product: string;
  price: number;
  order: number;
  amount: number;
}

// 인보이스 상태 타입
export type InvoiceStatus = 'Complete' | 'Pending' | 'Cancel';

// 인보이스 타입
export interface Invoice {
  id: string;
  name: string;
  email: string;
  date: string;
  status: InvoiceStatus;
  avatar: string;
  checked: boolean;
  starred: boolean;
}

// 도넛 차트 데이터 타입
export interface DoughnutChartData {
  labels: string[];
  data: number[];
  backgroundColor: string[];
}
