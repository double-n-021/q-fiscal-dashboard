"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'bot',
    text: 'Xin chào! Tôi là V-Budget AI Assistant 🤖\n\nTôi có thể giúp bạn:\n• Phân tích dữ liệu ngân sách\n• Giải thích kết quả dự báo SHAP\n• Tìm hiểu xu hướng Sentiment báo chí\n• Trả lời câu hỏi về mô hình AI\n\nBạn cần hỗ trợ gì?',
    time: 'Bây giờ',
  },
];

const PRESET_RESPONSES: Record<string, string> = {
  'dự báo': 'Dựa trên mô hình XGBoost + PhoBERT Sentiment, dự báo Thu NSNN Q3/2026 ước đạt **680 nghìn tỷ đồng** (tăng 8.2% so cùng kỳ).\n\n📊 **Các yếu tố chính (SHAP):**\n• GDP tăng trưởng 6.5% → đóng góp +45 nghìn tỷ\n• Giá dầu ổn định $78/thùng → đóng góp +12 nghìn tỷ\n• Sentiment báo chí tích cực (0.65) → đóng góp +8 nghìn tỷ',
  'sentiment': 'Chỉ số Sentiment báo chí kinh tế hiện tại:\n\n🟢 **Tổng hợp: +0.65/1.0 (Lạc quan)**\n\nPhân tích theo lĩnh vực:\n• Thuế TNDN: +0.72 — Doanh nghiệp kỳ vọng tăng trưởng\n• Thuế XNK: +0.45 — Lo ngại xung đột thương mại\n• Thuế TNCN: +0.78 — Thị trường lao động tích cực\n\n📰 Đã phân tích 124,500+ bài báo từ VnEconomy, CafeF, BaoChinhphu',
  'shap': '**SHAP Force Plot — Giải thích Dự báo Tháng 7/2026:**\n\n🔴 Đẩy dự báo GIẢM:\n• Tỷ giá USD/VND tăng 2.3% → -15 nghìn tỷ\n• CPI tăng 4.1% → -8 nghìn tỷ\n\n🟢 Đẩy dự báo TĂNG:\n• GDP Q2 đạt 6.8% → +52 nghìn tỷ\n• FDI tăng 12% → +18 nghìn tỷ\n• Sentiment NLP +0.65 → +8 nghìn tỷ\n\n📌 Kết luận: Dự báo thu tổng cộng **TĂNG** nhờ GDP và FDI bù đắp được rủi ro tỷ giá.',
  'quantum': '**Quantum Feature Selection** sử dụng PennyLane VQC:\n\n🔬 **Quy trình:**\n1. Mã hóa 30+ biến vĩ mô vào Quantum Circuit\n2. VQC tối ưu bộ trọng số qua gradient descent\n3. Đầu ra: Top 10 biến quan trọng nhất\n\n⚛️ **Kết quả:** Giảm từ 32 biến → 10 biến tối ưu\n• Accuracy tăng 3.2% so PCA cổ điển\n• Training time giảm 45%\n\n💡 Chạy trên Quantum Simulator (CPU), không cần hardware lượng tử.',
  'what-if': 'Tính năng **What-if Analysis** cho phép bạn:\n\n🎛️ Kéo thanh trượt 6 biến vĩ mô:\n• Tăng trưởng GDP (4.0% — 8.0%)\n• Giá dầu Brent ($60 — $120)\n• Lãi suất điều hành (3.0% — 7.0%)\n• CPI (2.0% — 6.0%)\n• Tỷ giá USD/VND (24,000 — 26,000)\n• FDI (tỷ USD)\n\n📈 Biểu đồ dự báo cập nhật **real-time** khi bạn thay đổi bất kỳ biến nào!',
  'mô hình': 'V-Budget sử dụng kiến trúc **3 lớp AI:**\n\n**Lớp 1 — NLP (PhoBERT):**\n• Crawl 100k+ bài báo kinh tế tiếng Việt\n• Fine-tune trên tập UIT-VSFC\n• Đầu ra: Sentiment Score (-1 đến +1)\n\n**Lớp 2 — Quantum (PennyLane VQC):**\n• Lọc đặc trưng tối ưu từ 30+ biến\n• Giảm nhiễu đa cộng tuyến\n\n**Lớp 3 — Core ML (XGBoost + SHAP):**\n• Dự báo Thu NSNN theo tháng/quý\n• SHAP giải thích biến nào tác động\n• Walk-forward validation, MAPE < 5%',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  
  for (const [key, response] of Object.entries(PRESET_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  
  if (lower.includes('xin chào') || lower.includes('hello') || lower.includes('hi')) {
    return 'Chào bạn! 👋 Tôi là AI Assistant của V-Budget. Bạn có thể hỏi tôi về:\n• **Dự báo** ngân sách\n• **Sentiment** báo chí\n• **SHAP** giải thích mô hình\n• **Quantum** feature selection\n• **What-if** analysis\n• **Mô hình** AI đang dùng';
  }
  
  if (lower.includes('cảm ơn') || lower.includes('thanks')) {
    return 'Không có gì! 😊 Nếu cần thêm thông tin gì về dự báo ngân sách hay mô hình AI, hãy hỏi tôi bất cứ lúc nào nhé!';
  }
  
  return 'Tôi hiểu câu hỏi của bạn. Trong phiên bản đầy đủ, tôi sẽ sử dụng mô hình AI (PhoBERT + XGBoost) để trả lời chi tiết hơn.\n\n💡 **Gợi ý câu hỏi:**\n• "Dự báo thu ngân sách Q3/2026?"\n• "Phân tích SHAP tháng này"\n• "Sentiment báo chí hiện tại?"\n• "Giải thích Quantum feature selection"';
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { id: Date.now(), role: 'user', text: input.trim(), time: now };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = getResponse(userMsg.text);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110",
          isOpen
            ? "bg-slate-700 dark:bg-slate-600 rotate-0"
            : "bg-gradient-to-br from-blue-600 to-violet-600 animate-bounce hover:animate-none"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[90] w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-white dark:bg-[#0c1225] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">V-Budget AI Assistant</h3>
              <p className="text-xs text-blue-100">Phân tích ngân sách thông minh</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs bg-white/20 px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-2", msg.role === 'user' ? "justify-end" : "justify-start")}>
                {msg.role === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                    msg.role === 'user'
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-md"
                  )}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith('**') && part.endsWith('**')
                          ? <strong key={j}>{part.slice(2, -2)}</strong>
                          : part
                      )}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                  <div className={cn(
                    "text-[10px] mt-1.5",
                    msg.role === 'user' ? "text-blue-200" : "text-slate-400"
                  )}>
                    {msg.time}
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0 border-t border-slate-100 dark:border-slate-800">
            {['Dự báo Q3', 'Sentiment', 'SHAP', 'Quantum'].map((label) => (
              <button
                key={label}
                onClick={() => {
                  setInput(label);
                  setTimeout(() => {
                    const fakeInput = label;
                    setInput('');
                    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: fakeInput, time: now }]);
                    setIsTyping(true);
                    setTimeout(() => {
                      const resp = getResponse(fakeInput);
                      setMessages(prev => [...prev, {
                        id: Date.now() + 1, role: 'bot', text: resp,
                        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                      }]);
                      setIsTyping(false);
                    }, 800 + Math.random() * 800);
                  }, 100);
                }}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition font-medium"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1225] shrink-0">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Hỏi về dự báo ngân sách..."
                className="flex-1 bg-transparent text-sm text-slate-800 dark:text-white placeholder-slate-400 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "p-2 rounded-lg transition",
                  input.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-slate-400 cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
