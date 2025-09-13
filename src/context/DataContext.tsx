import { createContext, useContext, useState } from 'react';

// Define the type
type CurrentConversation = {
  id: string;
  user: string;
  ai: string;
};

// Context type (optional, but recommended for clarity)
type DataContextType = {
  chatHistory: CurrentConversation[];
  currentConversation: CurrentConversation;
  setChatHistory: React.Dispatch<React.SetStateAction<CurrentConversation[]>>;
  setCurrentConversation: React.Dispatch<
    React.SetStateAction<CurrentConversation>
  >;
  saveConversation: () => void;
};

// Create the context
const ChatContext = createContext<DataContextType | undefined>(undefined);

export const DataContext = ({ children }: { children: React.ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<CurrentConversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<CurrentConversation>({
      id: crypto.randomUUID(), // ✅ call it
      user: '',
      ai: '',
    });

  const saveConversation = () => {
    if (!currentConversation.user && !currentConversation.ai) return; // ignore empty
    setChatHistory((prev) => [...prev, currentConversation]);
    setCurrentConversation({
      id: crypto.randomUUID(),
      user: '',
      ai: '',
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chatHistory,
        setChatHistory,
        currentConversation,
        setCurrentConversation,
        saveConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook
export const useDataContext = () => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error('useDataContext must be used inside DataProvider');
  return context;
};
