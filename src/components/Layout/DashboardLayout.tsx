import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  rightAside?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, rightAside }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Box display="flex" minHeight="100vh" bgcolor="background.default" role="application" aria-labelledby="dashboard-heading">
      <h1 id="dashboard-heading" style={{ position: 'absolute', left: -9999, top: -9999 }}>데이터 관리 대시보드</h1>
      <Box component="nav" aria-label="주요 탐색" sx={{ transition: 'width .25s', width: collapsed ? 72 : { xs: 72, md: 220 }, flexShrink: 0 }}>
        <Sidebar />
      </Box>
      <Box flex={1} display="flex" flexDirection="column">
  <Box component="header" aria-label="대시보드 헤더" sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'background.paper', borderBottom: theme => `1px solid ${theme.palette.divider}`, boxShadow: theme => `${theme.palette.mode==='dark'?'0 2px 4px rgba(0,0,0,0.4)':'0 2px 4px rgba(0,0,0,0.08)'}` }}>
          <Header />
          <Box px={2} py={1} display="flex" justifyContent="flex-end">
            <button type="button" aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'} onClick={() => setCollapsed(c => !c)} style={{ cursor: 'pointer' }}>
              {collapsed ? '▶' : '◀'}
            </button>
          </Box>
        </Box>
        <Box component="main" role="main" px={{ xs: 2, md: 4 }} py={4}
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', lg: rightAside ? '2fr 1fr' : '1fr' },
            alignItems: 'start'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>{children}</Box>
          {rightAside && <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>{rightAside}</Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
