const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// ── Apply auth middleware to all message routes ──
router.use(auth);

// ── POST /api/messages  →  Send a new message ──
router.post("/", async (req, res) => {
    try {
        const { sender, receiver, content } = req.body;

        console.log("SEND MESSAGE ATTEMPT:");
        console.log("- Sender from body:", sender);
        console.log("- Receiver from body:", receiver);
        console.log("- Authenticated user (req.user):", req.user);

        // Security: Ensure sender matches authenticated user
        if (sender.toString() !== req.user.toString()) {
            console.log("❌ SENDER MISMATCH: Forbidden");
            return res.status(403).json({ message: "You can only send messages as yourself." });
        }

        if (!sender || !receiver || !content) {
            return res.status(400).json({ message: "Missing required fields: sender, receiver, content" });
        }

        const newMessage = new Message({
            sender,
            receiver,
            content
        });

        await newMessage.save();
        console.log("✅ Message saved successfully.");
        res.status(201).json({ message: "Message sent", data: newMessage });
    } catch (err) {
        console.error("Error sending message:", err);
        res.status(500).json({ message: "Server error while sending message." });
    }
});

// ── GET /api/messages/:user1/:user2  →  Get conversation between two users ──
router.get("/:user1/:user2", async (req, res) => {
    try {
        const { user1, user2 } = req.params;
        const currentUserId = req.user.toString();

        // Security: One of the IDs must match the current authenticated user
        if (user1 !== currentUserId && user2 !== currentUserId) {
            return res.status(403).json({ message: "Access denied. You can only view your own conversations." });
        }

        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ createdAt: 1 }); // Oldest to newest

        res.json(messages);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ message: "Server error while fetching messages." });
    }
});

// ── GET /api/messages/unread/:userId  →  Get all unread messages for a user (from all senders) ──
router.get("/unread/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Security: userId must match current user
        if (userId.toString() !== req.user.toString()) {
            return res.status(403).json({ message: "Access denied." });
        }

        const unread = await Message.find({ receiver: userId, read: false })
            .populate("sender", "fullName")
            .sort({ createdAt: -1 });
        res.json(unread);
    } catch (err) {
        console.error("Error fetching unread messages:", err);
        res.status(500).json({ message: "Server error." });
    }
});

// ── PUT /api/messages/read/:receiverId/:senderId  →  Mark all messages from sender as READ by receiver ──
router.put("/read/:receiverId/:senderId", async (req, res) => {
    try {
        const { receiverId, senderId } = req.params;

        // Security: receiverId must match current user
        if (receiverId.toString() !== req.user.toString()) {
            return res.status(403).json({ message: "Access denied." });
        }

        await Message.updateMany(
            { receiver: receiverId, sender: senderId, read: false },
            { $set: { read: true } }
        );
        res.json({ success: true, message: "Messages marked as read." });
    } catch (err) {
        console.error("Error marking messages as read:", err);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
