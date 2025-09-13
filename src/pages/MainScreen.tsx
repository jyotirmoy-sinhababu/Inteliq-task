// src/components/MainScreen.tsx
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

import {
  Share as ShareIcon,
  Add as AddIcon,
  Help as HelpIcon,
  AutoAwesome as SparkleIcon,
} from '@mui/icons-material';

import ChatArea from './ChatArea';
import { useDataContext } from '../context/DataContext';

const suggestionCards = [
  { icon: '✨', title: 'Give me a concise summary of this meeting transcript' },
  {
    icon: '✨',
    title: 'Write a product description for a minimalist smartwatch',
  },
  {
    icon: '✨',
    title: 'Provide a polite response to a customer asking for a refund',
  },
];

const MainScreen = () => {
  const { currentConversation, setCurrentConversation, chatHistory } =
    useDataContext();
  const createChat = () => {
    setCurrentConversation({
      id: crypto.randomUUID(),
      user: '',
      ai: '',
    });
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <FormControl size='small'>
          <Select
            value='ChatGPT 4'
            sx={{
              minWidth: 40,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}
          >
            <MenuItem value='ChatGPT 4'>ChatGPT 4</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size='small'>
            <ShareIcon />
          </IconButton>
          <IconButton size='small'>
            <HelpIcon />
          </IconButton>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            size='small'
            onClick={() => createChat()}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            New Chat
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      {chatHistory.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Typography sx={{ fontFamily: 'serif', fontWeight: 300, mt: '3%' }}>
            <strong style={{ color: '#1565C0' }}> user:</strong>
            {currentConversation.user}
          </Typography>
          <Typography sx={{ fontFamily: 'serif', fontWeight: 300, mt: '1%' }}>
            <strong style={{ color: '#1565C0' }}>Assistant:</strong>
            {currentConversation.ai}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 2,
            width: '100%',
            mb: '7%',
            mt: '1%',
          }}
        >
          {suggestionCards?.map((item: any, index) => {
            return (
              <Card
                key={index}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <SparkleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: 'background.default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SparkleIcon
                        sx={{ fontSize: 12, color: 'text.secondary' }}
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: 500,
                      lineHeight: 1.4,
                      color: 'text.primary',
                    }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {/* Input Area */}
      <Box sx={{ mt: '21%' }}>
        <ChatArea />
      </Box>
    </Box>
  );
};

export default MainScreen;
