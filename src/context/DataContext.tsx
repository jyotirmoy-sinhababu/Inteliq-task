import { createContext, useState, useContext } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

type ChatContextType = {
  inputMessage: Message[];
  addMessage: (role: 'user' | 'assistant', content: string) => void;
};

const chatContext = createContext<ChatContextType | undefined>(undefined);

export const DataContext = ({ children }: { children: React.ReactNode }) => {
  const [inputMessage, setInputMessage] = useState<Message[]>([]);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    setInputMessage((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role,
        content,
        timestamp: Date.now(),
      },
    ]);
  };
  return (
    <chatContext.Provider value={{ inputMessage, addMessage }}>
      {children}
    </chatContext.Provider>
  );
};

export function useChat() {
  const context = useContext(chatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export default DataContext;
