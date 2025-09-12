import {
  Box,
  Typography,
  TextField,
  InputAdornment,
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
  AttachFile as AttachIcon,
  Send as SendIcon,
  Help as HelpIcon,
  AutoAwesome as SparkleIcon,
} from '@mui/icons-material';
import ChatArea from './ChatArea';

const suggestionCards = [
  {
    icon: '✨',
    title: 'Give me a concise summary of this meeting transcript',
  },
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
              minWidth: 120,
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
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
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          maxWidth: 800,
          mx: 'auto',
          width: '100%',
        }}
      >
        {/* Greeting */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant='h4'
            sx={{
              mb: 2,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <span>👋</span> Hi Laurence!
          </Typography>
          <Typography
            variant='h4'
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            What do you want to learn today?
          </Typography>
        </Box>

        {/* Suggestion Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 2,
            width: '100%',
            mb: 6,
          }}
        >
          {suggestionCards.map((card, index) => (
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
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Input Area */}
      <ChatArea />
    </Box>
  );
};

export default MainScreen;
