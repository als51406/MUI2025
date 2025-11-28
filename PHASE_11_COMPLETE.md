# Phase 11 완료: 다크 모드 구현

## 📅 완료 날짜
2025년 11월 28일

## 🎯 목표
Material-UI ThemeProvider를 사용하여 다크/라이트 모드를 구현하고, 사용자 선택을 localStorage에 저장하여 지속성 유지

## ✅ 구현 내용

### 1. 테마 시스템 구축

#### 📁 `src/theme/theme.ts` (생성)
- **라이트 모드 테마**
  - Primary: #5932EA (보라색)
  - Secondary: #16C098 (청록색)
  - Background: #FAFBFF (밝은 회색)
  - Paper: #FFFFFF (흰색)
  - Text: #292D32 (어두운 회색)

- **다크 모드 테마**
  - Primary: #7B5BF5 (밝은 보라색)
  - Secondary: #4CD3B3 (밝은 청록색)
  - Background: #1A1D1F (매우 어두운 회색)
  - Paper: #272B30 (어두운 회색)
  - Text: #FFFFFF (흰색)

- **공통 설정**
  - Font Family: Poppins, Noto Sans KR, Roboto, Arial
  - Border Radius: 12px
  - 커스텀 그림자 설정 (8단계)

#### 📁 `src/theme/ThemeContext.tsx` (생성)
```typescript
// 테마 모드 타입
type ThemeMode = 'light' | 'dark';

// Context API를 사용한 전역 테마 상태 관리
- ThemeModeProvider: 테마 상태 제공
- useThemeMode: 테마 상태 접근 훅
- toggleTheme: 테마 전환 함수
- localStorage 연동: 테마 선택 지속성
```

**주요 기능:**
- ✅ localStorage에서 저장된 테마 자동 로드
- ✅ 테마 변경 시 localStorage에 자동 저장
- ✅ Custom Event를 통한 동일 탭 내 테마 동기화
- ✅ Storage Event를 통한 탭 간 테마 동기화

### 2. 테마 토글 컴포넌트

#### 📁 `src/components/ThemeToggle/ThemeToggle.tsx` (생성)
```typescript
// Material-UI 아이콘 사용
- Brightness4: 다크 모드 아이콘 (달)
- Brightness7: 라이트 모드 아이콘 (태양)

// 기능
- Tooltip으로 안내 메시지 표시
- 클릭 시 테마 전환
- 호버 시 180도 회전 애니메이션
- ARIA 레이블로 접근성 지원
```

**스타일:**
- 부드러운 전환 효과 (transition: 0.3s)
- 마우스 호버 시 회전 애니메이션
- 툴팁으로 사용자 안내

### 3. 앱 전체 통합

#### 📁 `src/index.tsx` (수정)
```typescript
// 이중 Provider 구조
<ThemeModeProvider>          // 테마 상태 관리
  <AppWithTheme>             // 테마 적용
    <ThemeProvider theme={theme}>
      <CssBaseline />        // MUI 기본 스타일 초기화
      <App />
    </ThemeProvider>
  </AppWithTheme>
</ThemeModeProvider>
```

**구조 설명:**
1. **ThemeModeProvider**: 전역 테마 상태 관리 (Context API)
2. **AppWithTheme**: localStorage 및 이벤트 리스너 관리
3. **ThemeProvider**: Material-UI 테마 적용
4. **CssBaseline**: 브라우저 기본 스타일 초기화

#### 📁 `src/App.tsx` (수정)
```typescript
// data-theme 속성 추가
<div id='bodyWrap' data-theme={mode}>

// useThemeMode 훅으로 현재 테마 가져오기
const { mode } = useThemeMode();
```

#### 📁 `src/components/Layout/Header.tsx` (수정)
```typescript
// ThemeToggle 버튼 추가
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <nav>...</nav>
  <ThemeToggle />  // 우측 상단에 배치
</div>
```

### 4. CSS 다크 모드 스타일

#### 📁 `src/App.css` (수정)
모든 주요 영역에 다크 모드 스타일 추가:

**1) Body Wrap**
```css
#bodyWrap[data-theme="dark"] {
  background-color: #1A1D1F;
}
```

**2) Sidebar**
```css
#bodyWrap[data-theme="dark"] #asideWrap aside {
  background-color: #272B30;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
}
```

**3) Header**
```css
#bodyWrap[data-theme="dark"] header h1 {
  color: #FFFFFF;
}
#bodyWrap[data-theme="dark"] header ul li {
  background-color: #272B30;
}
```

**4) Navigation (Stats Cards)**
```css
#bodyWrap[data-theme="dark"] nav ul li {
  background-color: #272B30;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}
```

**5) Main View (Charts)**
```css
#bodyWrap[data-theme="dark"] .mainView .reports,
#bodyWrap[data-theme="dark"] .mainView .analytics {
  background-color: #272B30;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
```

**6) 텍스트**
```css
#bodyWrap[data-theme="dark"] h1,
#bodyWrap[data-theme="dark"] h2,
#bodyWrap[data-theme="dark"] h3 {
  color: #FFFFFF;
}
#bodyWrap[data-theme="dark"] p,
#bodyWrap[data-theme="dark"] span {
  color: #B0B0B0;
}
```

**공통 속성:**
- `transition: 0.3s ease` - 부드러운 테마 전환
- 일관된 그림자 효과
- 명확한 색상 대비

## 📊 개선 효과

### 1. 사용자 경험 (UX)
- ✅ **선택권 제공**: 사용자가 선호하는 테마 선택 가능
- ✅ **눈의 피로 감소**: 어두운 환경에서 다크 모드 사용
- ✅ **지속성**: localStorage로 설정 저장 (새로고침 시에도 유지)
- ✅ **즉각적 반응**: 실시간 테마 전환 (0.3초 애니메이션)

### 2. 접근성 (Accessibility)
- ✅ **키보드 네비게이션**: Tab/Enter로 토글 버튼 접근
- ✅ **ARIA 레이블**: 스크린 리더 지원
- ✅ **Tooltip**: 기능 안내 메시지
- ✅ **명확한 시각적 피드백**: 아이콘 회전 애니메이션

### 3. 성능
- ✅ **useMemo 최적화**: 테마 객체 메모이제이션
- ✅ **이벤트 기반**: 필요할 때만 리렌더링
- ✅ **경량화**: Context API로 최소 리렌더링

### 4. 유지보수성
- ✅ **중앙화된 테마 관리**: theme.ts에서 모든 색상 관리
- ✅ **타입 안정성**: TypeScript로 테마 타입 정의
- ✅ **재사용 가능**: ThemeContext를 다른 프로젝트에도 사용 가능

## 🎨 색상 팔레트

### Light Mode
| 요소 | 색상 코드 | 설명 |
|------|----------|------|
| Primary | #5932EA | 메인 브랜드 색상 (보라색) |
| Secondary | #16C098 | 보조 색상 (청록색) |
| Background | #FAFBFF | 배경 (밝은 회색) |
| Paper | #FFFFFF | 카드/패널 배경 (흰색) |
| Text Primary | #292D32 | 기본 텍스트 (검은색) |
| Text Secondary | #757575 | 보조 텍스트 (회색) |

### Dark Mode
| 요소 | 색상 코드 | 설명 |
|------|----------|------|
| Primary | #7B5BF5 | 메인 브랜드 색상 (밝은 보라색) |
| Secondary | #4CD3B3 | 보조 색상 (밝은 청록색) |
| Background | #1A1D1F | 배경 (매우 어두운 회색) |
| Paper | #272B30 | 카드/패널 배경 (어두운 회색) |
| Text Primary | #FFFFFF | 기본 텍스트 (흰색) |
| Text Secondary | #B0B0B0 | 보조 텍스트 (밝은 회색) |

## 🔧 기술 스택

- **React Context API**: 전역 상태 관리
- **Material-UI v7**: 테마 시스템, 아이콘, 컴포넌트
- **TypeScript**: 타입 안정성
- **localStorage API**: 설정 저장
- **Custom Events**: 탭 간 동기화
- **CSS Data Attributes**: 조건부 스타일링

## 📈 번들 크기 변화

### Before (Phase 10)
- Main JS: 184.84 kB (gzip)

### After (Phase 11)
- Main JS: 205.51 kB (gzip)
- **증가량**: +20.67 kB (+11.2%)

**증가 이유:**
- Material-UI ThemeProvider 추가
- @mui/icons-material (Brightness4, Brightness7)
- Context API 보일러플레이트
- 테마 정의 객체 (lightTheme, darkTheme)

**최적화 여지:**
- Tree shaking으로 사용하지 않는 MUI 컴포넌트 제거 가능
- 아이콘을 SVG로 직접 임포트하여 약 5KB 절약 가능

## 🧪 테스트 항목

### 기능 테스트
- [x] 토글 버튼 클릭 시 테마 전환
- [x] 새로고침 시 테마 유지
- [x] 모든 컴포넌트에 테마 적용
- [x] localStorage에 테마 저장
- [x] 탭 간 테마 동기화

### 접근성 테스트
- [x] 키보드로 토글 버튼 접근
- [x] ARIA 레이블 적용
- [x] Tooltip 표시
- [x] 색상 대비 WCAG AA 준수

### 성능 테스트
- [x] 테마 전환 시 부드러운 애니메이션
- [x] 불필요한 리렌더링 없음
- [x] 빌드 성공

## 🐛 알려진 이슈

### 경고 (Warnings)
```
jsx-a11y/no-redundant-roles
- role="list", role="listitem" 중복 정의
- 해결: Phase 10에서 추가한 명시적 role 제거 가능
```

**영향:**
- 빌드 성공
- 기능 정상 동작
- 접근성 준수

**해결 방법:**
```typescript
// Before
<ul role="list">
  <li role="listitem">

// After (암묵적 role 사용)
<ul>
  <li>
```

## 📁 파일 구조

```
src/
├── theme/
│   ├── theme.ts              # 테마 정의 (Light/Dark)
│   └── ThemeContext.tsx      # 테마 상태 관리 Context
├── components/
│   ├── ThemeToggle/
│   │   ├── ThemeToggle.tsx   # 테마 전환 버튼
│   │   └── index.ts
│   └── Layout/
│       └── Header.tsx        # ThemeToggle 배치
├── App.tsx                    # data-theme 속성 추가
├── App.css                    # 다크 모드 CSS
└── index.tsx                  # ThemeProvider 적용
```

## 🎓 학습 내용

1. **Material-UI Theme System**
   - createTheme()으로 커스텀 테마 생성
   - ThemeProvider로 전역 테마 적용
   - CssBaseline으로 기본 스타일 초기화

2. **React Context API**
   - 전역 상태 관리 패턴
   - Custom Hook으로 Context 접근
   - Provider 중첩 구조

3. **LocalStorage API**
   - 클라이언트 사이드 데이터 저장
   - JSON이 아닌 문자열로 저장
   - 보안 고려사항 (XSS 공격)

4. **Custom Events**
   - window.dispatchEvent()로 이벤트 발생
   - addEventListener()로 이벤트 감지
   - 탭 간 통신 (Storage Event)

5. **CSS Data Attributes**
   - [data-theme="dark"] 선택자
   - 조건부 스타일링
   - transition으로 부드러운 전환

## 🚀 다음 단계 (Phase 12)

**데이터 필터링 구현:**
- [ ] 검색 기능
- [ ] 날짜 범위 필터
- [ ] 카테고리 필터
- [ ] 정렬 기능
- [ ] 필터 초기화

## 💡 개선 아이디어

1. **시스템 테마 감지**
```typescript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

2. **애니메이션 고급화**
- Framer Motion으로 부드러운 전환
- 컴포넌트별 순차 애니메이션

3. **테마 커스터마이징**
- 사용자가 직접 색상 선택
- 프리셋 테마 (Blue, Green, Red 등)

4. **성능 최적화**
- CSS Variables로 런타임 스타일 변경
- 아이콘 SVG 직접 임포트

## 📝 커밋 메시지
```
feat: Phase 11 완료 - 다크 모드 구현

- Material-UI ThemeProvider로 Light/Dark 테마 생성
- Context API로 전역 테마 상태 관리
- localStorage로 사용자 선택 저장
- Header에 ThemeToggle 버튼 추가
- 모든 컴포넌트에 다크 모드 CSS 적용
- 부드러운 테마 전환 애니메이션 (0.3s)
- 접근성 지원 (ARIA, Tooltip, 키보드 네비게이션)

Bundle size: 184.84 kB → 205.51 kB (+11.2%)
```

## ✅ 체크리스트

- [x] 테마 정의 파일 생성 (theme.ts)
- [x] Context API 구현 (ThemeContext.tsx)
- [x] 토글 버튼 컴포넌트 생성 (ThemeToggle.tsx)
- [x] App에 ThemeProvider 적용
- [x] Header에 토글 버튼 배치
- [x] CSS 다크 모드 스타일 추가
- [x] localStorage 연동
- [x] 빌드 성공 확인
- [x] 기능 테스트
- [x] 문서 작성

---

**Phase 11 완료!** 🎉

다크 모드가 성공적으로 구현되었습니다. 사용자는 이제 우측 상단의 토글 버튼을 클릭하여 라이트/다크 모드를 전환할 수 있으며, 선택한 테마는 localStorage에 저장되어 다음 방문 시에도 유지됩니다.

**진행률: 11/14 단계 완료 (78.6%)**
