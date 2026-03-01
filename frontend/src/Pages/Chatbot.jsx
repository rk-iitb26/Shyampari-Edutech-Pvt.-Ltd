import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane, FaComments, FaRobot, FaTrash, FaLightbulb } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const defaultQuestions = [
  { text: "What courses do you offer?", category: "general" },
  { text: "How to register as a student?", category: "account" },
  { text: "How can I become a tutor?", category: "faculty" },
  { text: "What is Shampari Edutech?", category: "general" },
  { text: "How to chat with my teacher?", category: "feature" },
  { text: "Contact details", category: "support" },
  { text: "Is there a trial class?", category: "general" },
  { text: "Offline vs Online mode", category: "feature" },
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with a welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([{
          text: "Hello! 👋 I'm your Shampari Assistant. How can I help you today?",
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMsg = {
      text,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const botMsg = {
        text: getBotResponse(text),
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000 + Math.random() * 500);
  };

  const clearChat = () => {
    setMessages([]);
    setIsOpen(false);
  };

  const getBotResponse = (userMsg) => {
    const msg = userMsg.toLowerCase();

    // Core Platform
    if (msg.includes("shampari") || msg.includes("what is this"))
      return "Shampari Edutech is a premium learning platform connecting students with expert tutors for personalized education.";

    // Courses
    if (msg.includes("course") || msg.includes("subject") || msg.includes("teach"))
      return "We offer a wide range of subjects including Mathematics, Science (Physics, Chemistry, Biology), English, Computer Science, and Social Studies for all boards (CBSE, ICSE, State Boards).";

    // Registration/Account
    if (msg.includes("register") || msg.includes("sign up") || msg.includes("join")) {
      if (msg.includes("tutor") || msg.includes("faculty") || msg.includes("teacher"))
        return "To join as a tutor, click 'Sign Up' and select the 'Faculty' role. You can then complete your professional profile.";
      return "Students can register by selecting the 'Student' role during 'Sign Up'. Once registered, you can browse tutors and send requests!";
    }

    // Features: Chat
    if (msg.includes("chat") || msg.includes("message") || msg.includes("text"))
      return "Once a faculty accepts your request, a 'Chat' button will appear in your 'My Tutors' tab. We offer real-time secure messaging!";

    // Support/Contact
    if (msg.includes("contact") || msg.includes("support") || msg.includes("help") || msg.includes("email") || msg.includes("phone"))
      return "You can reach us at info@shampari.com or call us at +91 7040272830. We are available 24/7!";

    // Pricing
    if (msg.includes("price") || msg.includes("cost") || msg.includes("fee") || msg.includes("pay"))
      return "Our pricing is flexible based on the tutor's expertise and the chosen subjects. Feel free to discuss rates directly with tutors once connected!";

    // Mode
    if (msg.includes("online") || msg.includes("offline") || msg.includes("mode") || msg.includes("home"))
      return "We support both Online classes via our integrated platform and Offline classes depending on tutor availability in your location.";

    // Trial
    if (msg.includes("trial") || msg.includes("free") || msg.includes("demo"))
      return "Yes! Many of our tutors offer a free 30-minute demo session to ensure a good fit before you start regular classes.";

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
      return "Hello there! How can I assist you with Shampari Edutech today?";

    if (msg.includes("thank"))
      return "You're very welcome! Let me know if you need anything else.";

    return "That's an interesting question! I don't have a specific answer for that yet, but our support team at info@shampari.com certainly will. Would you like to know about our courses or how to register?";
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                boxShadow: '0 10px 30px -5px rgba(99,102,241,0.5)',
              }}
            >
              <div className="relative">
                <FaComments className="w-6 h-6" />
                <span className="absolute -top-4 -right-4 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#0f172a] animate-pulse" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 100, scale: 0.8, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[380px] z-[60] rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(15,23,42,0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
              height: '550px',
              maxHeight: 'calc(100vh - 100px)',
            }}
          >
            {/* Header */}
            <div className="px-6 py-5 flex justify-between items-center"
              style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <FaRobot className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm tracking-tight">Shampari Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] text-white/50 font-medium">Online & ready to help</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearChat} className="p-2 text-white/20 hover:text-red-400 transition-colors tooltip" title="Clear Chat">
                  <FaTrash className="text-sm" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-white/20 hover:text-white transition-colors">
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-sm shadow-sm ${msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-none"
                        : "bg-white/5 text-white/90 border border-white/10 rounded-tl-none pr-6"
                        }`}
                      style={{ maxWidth: '85%', lineHeight: '1.5' }}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-white/20 mt-1 px-1 font-medium">{msg.time}</span>
                  </motion.div>
                ))}

                {typing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="self-start px-4 py-3 rounded-2xl bg-white/5 border border-white/10 flex gap-1.5 items-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Suggestions */}
            <div className="px-5 py-3 flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-2 text-[10px] text-white/30 font-bold uppercase tracking-widest pl-1">
                <FaLightbulb className="text-amber-400/50" /> Suggested
              </div>
              <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                {defaultQuestions.map((q, i) => (
                  <button key={i} onClick={() => handleSend(q.text)}
                    className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-full text-indigo-300 hover:text-white transition-all"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    {q.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <div className="p-5" style={{ background: 'rgba(15,23,42,0.95)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:border-indigo-500/50 transition-all shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me about Shampari..."
                  className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white focus:outline-none placeholder:text-white/20"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:hover:scale-100 transition-all active:scale-90 shadow-lg shadow-indigo-600/20"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </div>
              <p className="text-[9px] text-center text-white/20 mt-3 font-medium">Shampari AI Assistant v2.0 • Secured Engineering</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

