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
import { useEffect, useState } from 'react';

const ChatArea = () => {
  // useEffect(() => {
  //   main();
  // }, []);
  const KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const ai = new GoogleGenAI({
    apiKey: KEY,
  });

  async function main() {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Explain how AI works in a few words',
    });

    console.log(response.text);
  }
  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <TextField
          fullWidth
          placeholder='Ask me a question...'
          multiline
          maxRows={4}
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
                <IconButton size='small' color='primary'>
                  <SendIcon />
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
