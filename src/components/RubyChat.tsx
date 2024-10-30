import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface RubyChatProps {
  accentColor: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const RubyChat: React.FC<RubyChatProps> = ({ accentColor }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedModel, setSelectedModel] = useState('mistral');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const synth = window.speechSynthesis;

  useEffect(() => {
    setupSpeechRecognition();
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const setupSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInput(transcript);
      };
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  const speakText = (text: string) => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
    setIsSpeaking(true);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          messages: [...messages, newMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="h-32 overflow-y-auto p-2 space-y-2 text-sm"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded p-2 ${
                message.role === 'user'
                  ? `bg-${accentColor}-600 text-white`
                  : 'bg-[#2A2A2A]'
              }`}
            >
              <div className="prose prose-invert max-w-none text-xs">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
              {message.role === 'assistant' && (
                <button
                  onClick={() => speakText(message.content)}
                  className="mt-1 p-1 hover:bg-[#3A3A3A] rounded"
                >
                  {isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} />}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-2 border-t border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleRecording}
            className={`p-1.5 rounded ${
              isRecording ? 'bg-red-500' : 'bg-[#2A2A2A]'
            } hover:bg-[#3A3A3A]`}
          >
            {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask Ruby..."
            className="flex-1 px-2 py-1 bg-[#2A2A2A] rounded text-sm border border-[#3A3A3A] focus:border-[#4A4A4A] outline-none"
          />
          <button
            onClick={sendMessage}
            className={`p-1.5 rounded bg-${accentColor}-600 hover:bg-${accentColor}-500`}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RubyChat;