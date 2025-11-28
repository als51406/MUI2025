# 컴포넌트 사용 가이드

## 📦 생성된 컴포넌트

### 1. ErrorBoundary
### 2. Loading
### 3. ErrorMessage

---

## 1️⃣ ErrorBoundary 사용법

### 기본 사용

```tsx
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### 특정 섹션에만 적용

```tsx
<div>
  <Header />
  
  <ErrorBoundary>
    <ComplexChart />
  </ErrorBoundary>
  
  <ErrorBoundary>
    <DataTable />
  </ErrorBoundary>
</div>
```

### 기능
- ✅ JavaScript 에러 자동 감지
- ✅ 사용자 친화적인 에러 UI
- ✅ 개발 모드에서 상세 에러 정보 표시
- ✅ 페이지 새로고침 / 다시 시도 버튼

---

## 2️⃣ Loading 컴포넌트 사용법

### 기본 로딩

```tsx
import Loading from './components/Loading';

function MyComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading />;
  }

  return <div>데이터가 로드되었습니다!</div>;
}
```

### 커스텀 메시지

```tsx
<Loading message="차트를 불러오는 중..." />
```

### 커스텀 크기

```tsx
<Loading size={60} />
```

### 전체 화면 로딩

```tsx
<Loading fullScreen message="앱을 초기화하는 중..." />
```

---

## 3️⃣ ErrorMessage 컴포넌트 사용법

### 기본 사용

```tsx
import ErrorMessage from './components/ErrorMessage';

function MyComponent() {
  const [error, setError] = useState(null);

  if (error) {
    return <ErrorMessage />;
  }

  return <div>정상 콘텐츠</div>;
}
```

### 커스텀 메시지

```tsx
<ErrorMessage
  title="데이터 로드 실패"
  message="서버에서 데이터를 가져오는데 실패했습니다."
/>
```

### 재시도 기능

```tsx
<ErrorMessage
  title="연결 실패"
  message="네트워크 연결을 확인해주세요."
  onRetry={handleRetry}
  retryButtonText="다시 연결"
/>
```

---

## 📝 실전 예제

### 예제 1: 데이터 페칭 with Loading & Error

```tsx
import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading message="데이터를 불러오는 중..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="데이터 로드 실패"
        message={error}
        onRetry={fetchData}
      />
    );
  }

  return <div>{/* 데이터 표시 */}</div>;
}
```

### 예제 2: 차트 컴포넌트 with ErrorBoundary

```tsx
import ErrorBoundary from './components/ErrorBoundary';
import ReportChart from './Chartcomponents/Chartgr';

function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>
      
      <ErrorBoundary>
        <ReportChart />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <DoughnutChart />
      </ErrorBoundary>
    </div>
  );
}
```

### 예제 3: 조건부 로딩

```tsx
function ChartSection() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={{ position: 'relative', minHeight: 400 }}>
      {isLoading && (
        <Loading 
          message="차트를 업데이트하는 중..." 
          size={50}
        />
      )}
      
      {!isLoading && <Chart data={data} />}
    </div>
  );
}
```

---

## 🎨 스타일 커스터마이징

### ErrorBoundary

ErrorBoundary는 MUI의 Paper, Box 컴포넌트를 사용하므로 테마를 통해 스타일 변경 가능:

```tsx
// theme.ts
const theme = createTheme({
  palette: {
    error: {
      main: '#d32f2f',
    },
  },
});
```

### Loading

Loading 컴포넌트는 MUI CircularProgress를 사용:

```tsx
<Loading size={80} /> // 큰 스피너
<Loading size={20} /> // 작은 스피너
```

### ErrorMessage

ErrorMessage의 색상은 MUI warning 팔레트 사용:

```tsx
// theme.ts
const theme = createTheme({
  palette: {
    warning: {
      main: '#ffa726',
    },
  },
});
```

---

## 🚀 성능 최적화

모든 컴포넌트는 `React.memo`로 감싸져 있어 불필요한 리렌더링을 방지합니다:

```tsx
// Loading.tsx
export default React.memo(Loading);

// ErrorMessage.tsx
export default React.memo(ErrorMessage);
```

---

## 🔍 테스트 방법

### ErrorBoundary 테스트

개발 모드에서 에러를 강제로 발생시켜 테스트:

```tsx
function BrokenComponent() {
  throw new Error('테스트 에러입니다!');
  return <div>이 부분은 실행 안됨</div>;
}

// App.tsx
<ErrorBoundary>
  <BrokenComponent />
</ErrorBoundary>
```

### Loading 테스트

```tsx
function TestLoading() {
  return (
    <>
      <Loading />
      <Loading message="커스텀 메시지" size={60} />
      <Loading fullScreen message="전체 화면 로딩" />
    </>
  );
}
```

---

## ✅ 체크리스트

- [x] ErrorBoundary 컴포넌트 생성
- [x] Loading 컴포넌트 생성
- [x] ErrorMessage 컴포넌트 생성
- [x] App.tsx에 ErrorBoundary 적용
- [x] React.memo 최적화 적용
- [x] TypeScript 타입 정의
- [x] index.ts 파일로 export 정리
