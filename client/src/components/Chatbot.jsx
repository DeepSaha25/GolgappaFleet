import { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';
import goluImg from '../assets/images/golu.png';

const GoluChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste! I'm Golu 🤖. Ask me about our delicious Golgappas, delivery, or menu!", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Simple Rule-Based Logic
    const getBotResponse = (input) => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('namaste')) {
            return "Namaste ji! Ready for some crunch? 🥙";
        }
        if (lowerInput.includes('menu') || lowerInput.includes('flavor') || lowerInput.includes('flavour')) {
            return "We serve 5 legendary flavors: \n1. Tikha Pani (Spicy) 🔥\n2. Meetha Chutney (Sweet) 🍯\n3. Garlic Blast 🧄\n4. Hing Kick ⚡\n5. Pudina Fresh 🌿";
        }
        if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate')) {
            return "Our Golgappa Box starts at just ₹99 for 20 pieces! Super affordable, super tasty. 🤑";
        }
        if (lowerInput.includes('delivery') || lowerInput.includes('deliver') || lowerInput.includes('time')) {
            return "We deliver in hyper-speed! 🚀 Usually takes 20-30 minutes within the city.";
        }
        if (lowerInput.includes('location') || lowerInput.includes('where')) {
            return "We are everywhere! Just kidding, we operate from the heart of the city but deliver to your doorstep. 🏠";
        }
        if (lowerInput.includes('spicy') || lowerInput.includes('hot')) {
            return "Our Tikha Pani is dangerously addictive! Can you handle the heat? 🌶️😤";
        }
        if (lowerInput.includes('thank')) {
            return "You're welcome! Happy crunching! 🥗";
        }

        return "I'm just a simple Golu 🤖. I can tell you about our **Menu**, **Delivery**, or **Prices**. Try asking one of those!";
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate network delay
        setTimeout(() => {
            const botResponse = getBotResponse(userMsg.text);
            const botMsg = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className={styles.chatbotWrapper}>
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <div className={styles.headerTitle}>
                            <img src={goluImg} alt="Golu" className={styles.logoImageSmall} />
                            Golu Assistant
                        </div>
                        <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>×</button>
                    </div>

                    <div className={styles.messagesContainer}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`${styles.message} ${msg.sender === 'bot' ? styles.botMessage : styles.userMessage}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && <div className={styles.typingIndicator}>Golu is typing... 💬</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask Golu..."
                            className={styles.input}
                            autoFocus
                        />
                        <button onClick={handleSend} className={styles.sendBtn} disabled={!inputValue.trim()}>
                            ➤
                        </button>
                    </div>
                </div>
            )}

            <button className={styles.fab} onClick={() => setIsOpen(!isOpen)} title="Chat with Golu">
                {isOpen ? (
                    <span className={styles.closeIcon}>👇</span>
                ) : (
                    <img src={goluImg} alt="Golu" className={styles.logoImage} />
                )}
            </button>
        </div>
    );
};

export default GoluChatbot;
