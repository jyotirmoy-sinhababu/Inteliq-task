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
import { useChat } from '../context/DataContext';

const ChatArea = () => {
  const { addMessage } = useChat();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const ai = new GoogleGenAI({
    apiKey: KEY,
  });

  async function main(): Promise<void> {
    if (!input.trim()) return;
    addMessage('user', input);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: input,
      });
      const reply = response?.text;
      if (reply) {
        addMessage('assistant', reply);
      } else {
        addMessage('assistant', '⚠️ No response from AI.');
      }
    } catch (error) {
      console.error(error);
      addMessage('assistant', '⚠️ Something went wrong.');
    }
    setLoading(false);
    setInput('');
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
            setInput(e.target.value);
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
