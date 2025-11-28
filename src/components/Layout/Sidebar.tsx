import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { sidebarIcons } from '../../data/dashboardData';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

// iconLabels를 컴포넌트 외부로 이동 (불변 데이터)
const iconLabels = ['대시보드', '분석', '리포트', '설정', '알림', '메시지', '도움말', '검색'];

const Sidebar: React.FC = () => {
  // useMemo로 아이콘 리스트 메모이제이션
  const iconList = React.useMemo(() => 
    sidebarIcons.map((icon, index) => (
      <li key={index}>
        <button
          type="button"
          aria-label={iconLabels[index] || `메뉴 ${index + 1}`}
          tabIndex={0}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img 
            src={`${process.env.PUBLIC_URL}/images/${icon}`} 
            alt=""
          />
        </button>
      </li>
    )), []);

  return (
    <div id='asideWrap'>
      <aside role="navigation" aria-label="메인 네비게이션">
        <h2>
          <img src={`${process.env.PUBLIC_URL}/images/Subtract.png`} alt="Base 로고" /> Base
        </h2>
        <div className='ulbox'>
          <nav aria-label="메뉴">
            <ul>
              {iconList}
            </ul>
          </nav>
          <div aria-label="사용자 프로필">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              aria-label="온라인 상태"
            >
              <Avatar 
                alt="사용자 프로필 이미지" 
                src="/static/images/avatar/1.jpg"
              />
            </StyledBadge>
          </div>
        </div>
      </aside>
    </div>
  );
};

// React.memo로 불필요한 리렌더링 방지
export default React.memo(Sidebar);
