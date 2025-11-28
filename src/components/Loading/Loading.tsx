import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

/**
 * Loading 컴포넌트
 * 
 * 데이터 로딩 중일 때 표시되는 로딩 인디케이터
 * 
 * Props:
 * - message: 로딩 메시지 (선택)
 * - size: 스피너 크기 (기본: 40)
 * - fullScreen: 전체 화면 로딩 여부 (기본: false)
 * 
 * 사용법:
 * <Loading message="데이터를 불러오는 중..." />
 */
const Loading: React.FC<LoadingProps> = ({ 
  message = '로딩 중...', 
  size = 40,
  fullScreen = false 
}) => {
  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 9999,
        }}
      >
        <CircularProgress size={size} thickness={4} />
        {message && (
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        padding: 3,
      }}
    >
      <CircularProgress size={size} thickness={4} />
      {message && (
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: 'text.secondary',
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(Loading);
