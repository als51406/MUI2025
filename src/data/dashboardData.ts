import { DashboardStat, ChartDataPoint, Product, Order, Invoice, DoughnutChartData } from '../types';

// 대시보드 통계 데이터
export const dashboardStats: DashboardStat[] = [
  {
    icon: 'Icon1.png',
    value: 178,
    label: 'Save Products'
  },
  {
    icon: 'Icon2.png',
    value: 20,
    label: 'Stock Products'
  },
  {
    icon: 'Incon3.png',
    value: 190,
    label: 'Sales Products'
  },
  {
    icon: 'Icon4.png',
    value: 12,
    label: 'Job Application'
  }
];

// 리포트 차트 데이터
export const reportChartData: ChartDataPoint[] = [
  { label: '10am', value: 55 },
  { label: '11am', value: 35 },
  { label: '12am', value: 60 },
  { label: '01am', value: 35 },
  { label: '02am', value: 25 },
  { label: '03am', value: 50 },
  { label: '04am', value: 15 },
  { label: '05am', value: 35 },
  { label: '06am', value: 65 },
  { label: '07am', value: 70 }
];

// 도넛 차트 데이터
export const doughnutChartData: DoughnutChartData = {
  labels: ['Red', 'Blue', 'Yellow'],
  data: [300, 50, 100],
  backgroundColor: [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)'
  ]
};

// 인기 상품 데이터
export const topSellingProducts: Product[] = [
  {
    name: 'NIKE Shoes Black Pattern',
    price: 87,
    rating: 4,
    image: 'Nike.png'
  },
  {
    name: 'iPhone 12',
    price: 987,
    rating: 5,
    image: 'iPhone12.png'
  }
];

// 최근 주문 데이터
export const recentOrders: Order[] = [
  {
    id: '#876364',
    productImage: 'ro1.png',
    product: 'Camera Lens',
    price: 178,
    order: 325,
    amount: 146660
  },
  {
    id: '#876368',
    productImage: 'ro2.png',
    product: 'Black Sleep Dress',
    price: 14,
    order: 53,
    amount: 46660
  },
  {
    id: '#876412',
    productImage: 'ro3.png',
    product: 'Argan Oil',
    price: 21,
    order: 78,
    amount: 346676
  },
  {
    id: '#876621',
    productImage: 'ro4.png',
    product: 'EAU DE Parfum',
    price: 32,
    order: 98,
    amount: 346981
  },
  {
    id: '#876700',
    productImage: 'ro1.png',
    product: 'Smart Watch',
    price: 210,
    order: 150,
    amount: 315000
  },
  {
    id: '#876701',
    productImage: 'ro2.png',
    product: 'Headphones',
    price: 95,
    order: 275,
    amount: 261250
  },
  {
    id: '#876702',
    productImage: 'ro3.png',
    product: 'Gaming Mouse',
    price: 45,
    order: 430,
    amount: 193500
  },
  {
    id: '#876703',
    productImage: 'ro4.png',
    product: 'Mechanical Keyboard',
    price: 120,
    order: 190,
    amount: 228000
  },
  {
    id: '#876704',
    productImage: 'ro1.png',
    product: 'Desk Lamp',
    price: 60,
    order: 250,
    amount: 150000
  },
  {
    id: '#876705',
    productImage: 'ro2.png',
    product: 'Portable Speaker',
    price: 85,
    order: 310,
    amount: 263500
  }
];

// 인보이스 데이터
export const invoiceList: Invoice[] = [
  {
    id: '#876364',
    name: 'Arrora gaur',
    email: 'arroragaur@gmail.com',
    date: '12 Dec, 2020',
    status: 'Complete',
    avatar: '/images/avatar1.jpg',
    checked: true,
    starred: false
  },
  {
    id: '#876123',
    name: 'James Mullican',
    email: 'jamesmullican@gmail.com',
    date: '10 Dec, 2020',
    status: 'Pending',
    avatar: '/images/avatar2.jpg',
    checked: false,
    starred: true
  }
];

// 사이드바 아이콘 데이터
export const sidebarIcons: string[] = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png'
];

// 날짜 범위 데이터
export const dateRanges: string[] = [
  '10-06-2021',
  '10-10-2021'
];
