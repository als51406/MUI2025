import React from 'react';
import { dateRanges } from '../../data/dashboardData';
import ThemeToggle from '../ThemeToggle';

const Header: React.FC = () => {
  return (
    <header role="banner" aria-label="대시보드 헤더">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <h1 id="dashboard-title">Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <nav aria-label="날짜 범위 선택">
            <ul role="list">
              {dateRanges.map((date, index) => (
                <li key={index} role="listitem">
                  <button 
                    type="button"
                    aria-label={`${date} 기간 선택`}
                    tabIndex={0}
                  >
                    {date} v
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

// React.memo로 불필요한 리렌더링 방지 (데이터가 변경되지 않으면 리렌더링 안됨)
export default React.memo(Header);
