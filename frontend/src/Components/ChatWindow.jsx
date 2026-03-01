import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import { FaPaperPlane, FaTimes, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWindow = ({ isOpen, onClose, currentUser, targetUser, targetName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef();

    useEffect(() => {
        if (isOpen && currentUser && currentUser._id && targetUser) {
            fetchMessages();
            markAsRead(); // Mark as read when opened
            const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
            return () => clearInterval(interval);
        }
    }, [isOpen, currentUser, targetUser]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const getTargetId = () => {
        if (!targetUser) return null;
        return typeof targetUser === 'object' ? targetUser._id : targetUser;
    };

    const fetchMessages = async () => {
        const tId = getTargetId();
        if (!tId) return;
        try {
            const res = await api.get(`/api/messages/${currentUser._id}/${tId}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
    };

    const markAsRead = async () => {
        const tId = getTargetId();
        if (!tId) return;
        try {
            await api.put(`/api/messages/read/${currentUser._id}/${tId}`);
        } catch (err) {
            console.error("Error marking messages as read:", err);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const tId = getTargetId();
        if (!newMessage.trim() || !tId) {
            console.error("Cannot send message: Missing content or target ID", { tId, content: newMessage });
            return;
        }

        console.log("CHAT WINDOW: Sending message...");
        console.log("- Sender (CurrentUser):", currentUser?._id);
        console.log("- Receiver (Target):", tId);

        try {
            setLoading(true);
            const res = await api.post("/api/messages", {
                sender: currentUser._id,
                receiver: tId,
                content: newMessage
            });
            console.log("✅ Message sent successfully:", res.data);
            setMessages([...messages, res.data.data]);
            setNewMessage("");
        } catch (err) {
            console.error("❌ Error sending message:", err);
            if (err.response) {
                console.error("- Error response:", err.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                style={{ background: "rgba(15, 23, 42, 0.95)" }}
            >
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <FaUserCircle size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">{targetName}</h3>
                            <p className="text-[10px] text-emerald-400/70">Conversation</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-2">
                        <FaTimes />
                    </button>
                </div>

                {/* Messages Container */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-white/20">
                            <p className="text-xs italic">No messages yet. Say hi!</p>
                        </div>
                    ) : (
                        messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === currentUser._id ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-xs ${msg.sender === currentUser._id
                                        ? 'bg-emerald-600/20 text-emerald-100 border border-emerald-500/20 rounded-tr-none'
                                        : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none'
                                        }`}
                                >
                                    {msg.content}
                                    <div className={`text-[9px] mt-1 opacity-40 text-right`}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-white/5 flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={loading || !newMessage.trim()}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-600 text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
                    >
                        <FaPaperPlane size={14} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ChatWindow;
