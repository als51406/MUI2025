# 📊 Dashboard Analytics Application

React와 Material-UI 기반의 데이터 관리 대시보드 애플리케이션입니다.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript)
![Material-UI](https://img.shields.io/badge/MUI-7.3.2-007FFF?logo=mui)
![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-FF6384?logo=chartdotjs)

---

## 📖 프로젝트 소개

**Dashboard Analytics**는 실시간 데이터 시각화 및 비즈니스 관리를 위한 대시보드 애플리케이션입니다. 직관적인 UI/UX와 다양한 차트를 통해 데이터를 효과적으로 분석하고 관리할 수 있습니다.

### 🎯 주요 목적
- 비즈니스 데이터의 실시간 시각화
- 사용자 친화적인 대시보드 인터페이스
- 다크/라이트 모드 지원으로 사용자 경험 향상

---

## ✨ 주요 기능

### 📈 데이터 시각화
- **라인 차트**: 월별 리포트 데이터를 그라데이션 라인 차트로 시각화
- **도넛 차트**: 카테고리별 분석 데이터 표시
- **통계 카드**: 주요 지표를 한눈에 확인 (수익, 총 주문, 재고, 오늘 방문자)

### 📋 데이터 관리
- **최근 주문 테이블**: 정렬 가능한 주문 내역 테이블
- **인보이스 목록**: 페이지네이션이 적용된 인보이스 관리 (5개씩 표시)
- **인기 상품**: 베스트셀러 상품 목록

### 🎨 UI/UX
- **다크/라이트 모드**: 사용자 선호에 따른 테마 전환 (localStorage 저장)
- **반응형 디자인**: Flexbox 기반 PC 반응형 레이아웃
- **일관된 디자인 시스템**: Material-UI 기반 통일된 스타일

---

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | React 19.1.1, TypeScript 4.9.5 |
| **UI Framework** | Material-UI (MUI) 7.3.2 |
| **차트** | Chart.js 4.5.0, react-chartjs-2 |
| **상태 관리** | React Context API |
| **스타일링** | CSS, MUI Theme System |
| **빌드 도구** | Create React App |

---

## 📁 프로젝트 구조

```
src/
├── App.tsx                    # 메인 애플리케이션 컴포넌트
├── App.css                    # 전역 스타일
├── index.tsx                  # 앱 진입점 (테마 프로바이더 설정)
│
├── components/                # 재사용 가능한 컴포넌트
│   ├── Layout/
│   │   ├── Sidebar.tsx       # 사이드바 네비게이션
│   │   ├── Header.tsx        # 헤더 (제목 + 날짜 선택)
│   │   └── DashboardLayout.tsx
│   ├── Dashboard/
│   │   ├── StatCard.tsx      # 개별 통계 카드
│   │   └── StatsGrid.tsx     # 통계 카드 그리드
│   ├── ErrorBoundary/        # 에러 처리 컴포넌트
│   ├── Loading/              # 로딩 인디케이터
│   ├── ErrorMessage/         # 에러 메시지 컴포넌트
│   ├── ThemeToggle/          # 다크/라이트 모드 토글
│   └── Filters/
│       ├── MonthRangeFilter.tsx
│       └── DateRangePicker.tsx
│
├── Chartcomponents/          # 차트 컴포넌트
│   ├── Chartgr.tsx           # 리포트 라인 차트
│   ├── Doughnutchart.tsx     # 분석 도넛 차트
│   ├── RecentOrderTable.tsx  # 최근 주문 테이블
│   ├── TopsellingProduct.tsx # 인기 상품 목록
│   └── InvoiceList.tsx       # 인보이스 목록 (페이지네이션)
│
├── theme/                    # 테마 설정
│   ├── theme.ts              # 라이트/다크 테마 정의
│   └── ThemeContext.tsx      # 테마 상태 관리 (Context API)
│
├── data/                     # 데이터 레이어
│   └── dashboardData.ts      # 대시보드 데이터 (중앙 관리)
│
└── types/                    # TypeScript 타입 정의
    ├── index.ts              # 공통 타입
    └── chart.ts              # 차트 관련 타입
```

---

## 🚀 시작하기

### 요구 사항
- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

---

## 📦 배포

### 빌드 결과
- **빌드 폴더**: `build/`
- **호스팅 경로**: `/mui/`

### Apache 서버
```bash
scp -r build/* user@your-server.com:/var/www/html/mui/
```

### Nginx 서버
```nginx
location /mui {
    alias /usr/share/nginx/html/mui;
    try_files $uri $uri/ /mui/index.html;
}
```

---

## 📝 개발 히스토리 & 개선 과정

### Phase 1: 초기 설정 및 기본 구조
- Create React App + TypeScript 프로젝트 생성
- Material-UI 및 Chart.js 라이브러리 설치
- 기본 대시보드 레이아웃 구현

### Phase 2: 중복 라이브러리 정리
- `@mui/x-charts` 제거, Chart.js로 통일
- 불필요한 import 24개 제거
- 번들 크기 20-30% 감소

### Phase 3: 데이터 레이어 분리
- `src/data/dashboardData.ts` 생성
- `src/types/index.ts` 타입 정의 (7개 인터페이스)
- 데이터 관리 중앙화로 유지보수성 향상

### Phase 4-5: 컴포넌트 구조 리팩토링
- **App.tsx**: 240줄 → 40줄 (83% 감소)
- 재사용 가능한 컴포넌트 분리:
  - `Layout/`: Sidebar, Header
  - `Dashboard/`: StatCard, StatsGrid
  - `ErrorBoundary/`, `Loading/`, `ErrorMessage/`

### Phase 6: PC 반응형 디자인
- 고정폭(1200px) → Flexbox 기반 유동 레이아웃
- `max-width: 1400px`, `width: 100%` 적용
- 사이드바 `position: sticky` 적용

### Phase 7: 성능 최적화
- **React.memo**: 6개 컴포넌트에 적용
  - StatCard, Header, Sidebar, StatsGrid, Doughnutchart 등
- **useMemo**: 4개 위치에 적용
  - 아이콘 리스트, 통계 카드 리스트, 정렬된 테이블, 차트 데이터

### Phase 8: TypeScript 타입 강화
- `any` 타입 9개 제거
- Chart.js 공식 타입 적용:
  - `ChartArea`, `ScriptableContext<'line'>`, `TooltipItem<'line'>`

### Phase 9: 에러 처리 및 로딩 상태
- **ErrorBoundary**: 전역 에러 경계 컴포넌트
- **Loading**: 커스터마이징 가능한 로딩 스피너
- **ErrorMessage**: 부분 에러 표시 컴포넌트

### Phase 10-11: 다크 모드 구현
- Material-UI ThemeProvider 기반 테마 시스템
- localStorage 연동으로 테마 선택 지속성
- 라이트/다크 테마 색상 정의:
  - **라이트**: Primary #5932EA, Background #FAFBFF
  - **다크**: Primary #7B5BF5, Background #1A1D1F

### Phase 12: UI/UX 개선
- 모든 섹션 Card 컴포넌트로 래핑
- DateRangePicker 드롭다운 컴포넌트 추가
- 사이드바 아이콘 다크모드 지원 (filter: brightness(0) invert(1))

### Phase 13: InvoiceList 기능 강화
- 32개 무작위 데이터 생성
- 페이지네이션 구현 (5개씩 표시)
- 화살표 버튼 기반 페이지 네비게이션

---

## 🎨 테마 색상

### 라이트 모드
| 용도 | 색상 |
|------|------|
| Primary | `#5932EA` |
| Secondary | `#16C098` |
| Background | `#FAFBFF` |
| Paper | `#FFFFFF` |
| Text | `#292D32` |

### 다크 모드
| 용도 | 색상 |
|------|------|
| Primary | `#7B5BF5` |
| Secondary | `#4CD3B3` |
| Background | `#1A1D1F` |
| Paper | `#272B30` |
| Text | `#FFFFFF` |

---

## 📄 컴포넌트 사용 가이드

### ErrorBoundary
```tsx
import ErrorBoundary from './components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Loading
```tsx
import Loading from './components/Loading';

<Loading message="로딩 중..." size={40} fullScreen={false} />
```

### ThemeToggle
```tsx
import ThemeToggle from './components/ThemeToggle';

<ThemeToggle />  // 헤더에 자동 포함됨
```

---

## 🔧 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm start` | 개발 서버 실행 |
| `npm test` | 테스트 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run eject` | CRA 설정 추출 (주의!) |

---

## 📜 라이선스

MIT License

---

## 👨‍💻 개발자

- **Repository**: [MUI20225](https://github.com/als51406/MUI20225)
- **Branch**: dev
