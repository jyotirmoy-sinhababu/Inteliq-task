import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';

import {
  AttachFile as AttachIcon,
  Send as SendIcon,
} from '@mui/icons-material';

import { GoogleGenAI } from '@google/genai';
import { useState } from 'react';
import { useDataContext } from '../context/DataContext';

const ChatArea = () => {
  const { currentConversation, setCurrentConversation, saveConversation } =
    useDataContext();
  const [loading, setLoading] = useState(false);
  const KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const ai = new GoogleGenAI({
    apiKey: KEY,
  });

  async function main(): Promise<void> {
    if (!currentConversation.user.trim()) return;
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: currentConversation.user,
      });
      const reply = response?.text;
      saveConversation();
      if (reply) {
        setCurrentConversation({ ...currentConversation, ai: reply });
        console.log(reply);
      } else {
        setCurrentConversation({
          ...currentConversation,
          ai: 'Something went wrong',
        });
      }
    } catch (error) {
      console.error(error);
      setCurrentConversation({
        ...currentConversation,
        ai: 'Something went wrong',
      });
    }
    setLoading(false);
  }

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <TextField
          fullWidth
          placeholder='Ask me a question...'
          multiline
          maxRows={4}
          onChange={(e) => {
            setCurrentConversation({
              ...currentConversation,
              user: e.target.value,
            });
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <IconButton size='small'>
                  <AttachIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <Typography
                  variant='caption'
                  sx={{ color: 'text.secondary', mr: 1 }}
                >
                  0/2000
                </Typography>
                <IconButton
                  disabled={loading}
                  onClick={main}
                  size='small'
                  color='primary'
                >
                  {loading ? '...' : <SendIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '24px',
              bgcolor: 'background.default',
              '& fieldset': {
                borderColor: 'divider',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatArea;
