import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'guide';
  text: string;
  timestamp: Date;
}

interface ChatBoxProps {
  guideName?: string;
  experienceName?: string;
  onClose?: () => void;
}

export default function ChatBox({ guideName = 'Guide', experienceName = 'Experience', onClose }: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'guide',
      text: `Hi! I'm ${guideName}. I'm excited to help you with ${experienceName}. Do you have any questions?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate guide response
    setTimeout(() => {
      const responses = [
        'That sounds great! I can definitely help with that.',
        'Absolutely! Let me know if you need any other information.',
        'Perfect! I\'m looking forward to meeting you.',
        'Great question! Here\'s what I recommend...',
        'I\'m happy to help! What else would you like to know?',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const guideMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'guide',
        text: randomResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, guideMessage]);
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-96 max-h-[600px] z-50"
          >
            <Card className="flex flex-col h-full shadow-2xl border-primary/20">
              {/* Header */}
              <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between rounded-t-lg">
                <div>
                  <h3 className="font-heading font-semibold">{guideName}</h3>
                  <p className="text-xs text-primary-foreground/80">{experienceName}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="hover:bg-primary/80 p-1 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary text-darktext rounded-bl-none'
                      }`}
                    >
                      <p className="font-paragraph text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-secondary p-4 bg-background rounded-b-lg">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="border-buttonborder focus:border-primary"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
