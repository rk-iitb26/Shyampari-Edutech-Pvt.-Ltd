import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [totalUnread, setTotalUnread] = useState(0);
    const fetchUnread = useCallback(async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) return;
        try {
            const res = await api.get(`/api/messages/unread/${user._id}`);
            setUnreadMessages(res.data);
            setTotalUnread(res.data.length);
        } catch (err) {
            console.error("Error fetching unread notifications:", err);
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            fetchUnread();
            const interval = setInterval(fetchUnread, 10000); // Poll every 10 seconds
            return () => clearInterval(interval);
        }
    }, [fetchUnread]);

    return (
        <MessageContext.Provider value={{ unreadMessages, totalUnread, refreshUnread: fetchUnread }}>
            {children}
        </MessageContext.Provider>
    );
};
