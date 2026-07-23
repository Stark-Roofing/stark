import { useState, useEffect } from 'react';
import { ScrollPrompt, ChatMessage } from './types';
import { useNavigate } from 'react-router-dom';

export const useVirtualAssistant = (scrollPrompts: ScrollPrompt[], faqResponses: Record<string, string>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [promptVisible, setPromptVisible] = useState<ScrollPrompt | null>(null);
  const [unansweredQuestions, setUnansweredQuestions] = useState(0);
  const [userQuestion, setUserQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{
    type: 'bot',
    content: "Hi there! I'm StarkBot, your virtual assistant. How can I help you today?"
  }]);
  
  const [interactionCount, setInteractionCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / documentHeight * 100;

      const matchingPrompt = scrollPrompts.find(prompt => {
        return Math.abs(scrollPercentage - prompt.threshold) < 5 && (!promptVisible || promptVisible.id !== prompt.id);
      });
      
      if (matchingPrompt && !isOpen && !chatOpen) {
        setPromptVisible(matchingPrompt);

        if (matchingPrompt.duration) {
          setTimeout(() => {
            setPromptVisible(null);
          }, matchingPrompt.duration);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [promptVisible, isOpen, chatOpen, scrollPrompts]);

  const handleChatOpen = () => {
    setChatOpen(true);
    setPromptVisible(null);
  };
  
  const handlePromptAction = (prompt: ScrollPrompt) => {
    if (prompt.link) {
      if (prompt.link.startsWith('#')) {
        const element = document.querySelector(prompt.link);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      } else {
        navigate(prompt.link);
      }
    } else {
      handleChatOpen();
    }
    setPromptVisible(null);
  };
  
  const suggestFreeEstimate = () => {
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'bot',
        content: "Would you like to get started with a free estimate now? <a href='/contact' class='text-stark-red font-semibold'>Click here</a> to fill out our quick form and we'll be in touch shortly!"
      }]);
    }, 1500);
  };
  
  const handleSendMessage = () => {
    if (!userQuestion.trim()) return;

    setChatMessages(prev => [...prev, {
      type: 'user',
      content: userQuestion
    }]);
    
    setInteractionCount(prev => prev + 1);

    const matchedFaq = Object.entries(faqResponses).find(([key]) => 
      userQuestion.toLowerCase().includes(key.toLowerCase())
    );
    
    setTimeout(() => {
      if (matchedFaq) {
        setChatMessages(prev => [...prev, {
          type: 'bot',
          content: matchedFaq[1]
        }]);
        setUnansweredQuestions(0);
        
        if (interactionCount >= 2) {
          suggestFreeEstimate();
        }
      } else {
        setUnansweredQuestions(prev => prev + 1);

        if (unansweredQuestions >= 1) {
          setChatMessages(prev => [...prev, {
            type: 'bot',
            content: "I'll connect you to our lead roofer, Mike. What's your phone number?"
          }]);
          
          suggestFreeEstimate();
        } else {
          setChatMessages(prev => [...prev, {
            type: 'bot',
            content: "I'm not sure I understand. Could you rephrase your question? Or you can ask about our timeline, financing, service areas, or free estimates."
          }]);
        }
      }
    }, 1000);
    
    setUserQuestion('');
  };

  return {
    isOpen,
    setIsOpen,
    chatOpen,
    setChatOpen,
    promptVisible,
    setPromptVisible,
    unansweredQuestions,
    userQuestion,
    setUserQuestion,
    chatMessages,
    setChatMessages,
    handleChatOpen,
    handlePromptAction,
    handleSendMessage
  };
};
