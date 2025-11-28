import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryButtonText?: string;
}

/**
 * ErrorMessage 컴포넌트
 * 
 * 부분적인 에러 발생 시 표시되는 에러 메시지 컴포넌트
 * (ErrorBoundary보다 가벼운 에러 표시용)
 * 
 * Props:
 * - title: 에러 제목
 * - message: 에러 메시지
 * - onRetry: 재시도 버튼 클릭 핸들러
 * - retryButtonText: 재시도 버튼 텍스트
 * 
 * 사용법:
 * <ErrorMessage 
 *   title="데이터 로드 실패"
 *   message="데이터를 불러오는데 실패했습니다."
 *   onRetry={handleRetry}
 * />
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = '오류가 발생했습니다',
  message = '일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  onRetry,
  retryButtonText = '다시 시도',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        padding: 3,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: 3,
          maxWidth: 400,
          textAlign: 'center',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'warning.light',
        }}
      >
        <WarningAmberIcon
          sx={{
            fontSize: 60,
            color: 'warning.main',
            marginBottom: 2,
          }}
        />
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>
        
        {onRetry && (
          <Button
            variant="contained"
            color="primary"
            onClick={onRetry}
            size="small"
          >
            {retryButtonText}
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default React.memo(ErrorMessage);
