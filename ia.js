
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const chatContainer = document.getElementById('chatContainer');

const chatBots = [
    { 
        name: 'AI Assistant', 
        avatar: 'https://i.pravatar.cc/150?u=bot1',
        specialties: ['general assistance', 'technology'],
        personality: 'helpful and friendly'
    },
    { 
        name: 'Virtual Ally', 
        avatar: 'https://i.pravatar.cc/150?u=bot2',
        specialties: ['customer support', 'problem-solving'],
        personality: 'professional and supportive'
    }
];
class ChatManager {
    constructor() {
        this.conversationHistory = [];
        this.botContextMap = new Map();
    }

    addMessage(sender, message, isUser = false) {
        const messageObj = {
            sender: sender.name,
            message: message,
            timestamp: new Date(),
            isUser: isUser
        };
        this.conversationHistory.push(messageObj);
        return messageObj;
    }

    renderMessage(messageObj, sender, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('flex', 'items-start', 'space-x-3', 'animate__animated', 'animate__fadeIn', 'mb-4');
        
        messageDiv.innerHTML = `
            <img src="${sender.avatar}" class="w-10 h-10 rounded-full border-2 border-blue-500">
            <div class="max-w-[70%]">
                <p class="font-semibold text-white">${sender.name}</p>
                <p class="text-gray-300 text-sm ${isUser ? 'bg-blue-600 text-white p-2 rounded-lg self-end' : 'bg-gray-700 p-2 rounded-lg'}">${messageObj.message}</p>
                <small class="text-xs text-gray-400 mt-1">${this.formatTimestamp(messageObj.timestamp)}</small>
            </div>
        `;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    formatTimestamp(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}
class ResponseGenerator {
    constructor() {
        this.responseTemplates = {
            greeting: [
                '¡Hola! Estoy aquí para ayudarte.',
                'Hola, ¿cómo estás? Soy tu asistente virtual.',
                '¡Buen día! ¿En qué puedo asistirte?'
            ],
            farewell: [
                'Ha sido un placer ayudarte. ¡Hasta luego!',
                'Espero haber sido de ayuda. ¡Que tengas un excelente día!',
                'Si necesitas algo más, no dudes en preguntar.'
            ],
            defaultResponse: [
                'Entiendo. ¿Podrías elaborar tu mensaje un poco más?',
                'Interesante. ¿Hay algo específico en lo que pueda ayudarte?',
                'Estoy aquí para ayudarte. ¿Qué más necesitas saber?'
            ]
        };
    }

    detectIntentAndRespond(message) {
        const lowerMessage = message.toLowerCase();
        const intents = {
            greeting: ['hola', 'hey', 'buenas', 'saludos'],
            farewell: ['adiós', 'bye', 'nos vemos', 'chao'],
            help: ['ayuda', 'necesito', 'como', 'qué', 'donde']
        };

        for (const [intent, triggers] of Object.entries(intents)) {
            if (triggers.some(trigger => lowerMessage.includes(trigger))) {
                return this.getResponseByIntent(intent);
            }
        }

        return this.getResponseByIntent('defaultResponse');
    }

    getResponseByIntent(intent) {
        const responses = this.responseTemplates[intent];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}
class ChatApplication {
    constructor() {
        this.chatManager = new ChatManager();
        this.responseGenerator = new ResponseGenerator();
        this.setupEventListeners();
    }

    setupEventListeners() {
        sendMessageBtn.addEventListener('click', () => this.handleSendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });
    }

    handleSendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const userMessage = this.chatManager.addMessage(
                { name: 'Tú', avatar: 'https://i.pravatar.cc/150?u=user' }, 
                message, 
                true
            );
            this.chatManager.renderMessage(userMessage, { name: 'Tú', avatar: 'https://i.pravatar.cc/150?u=user' }, true);
            chatInput.value = '';
            this.generateBotResponse(message);
        }
    }

    generateBotResponse(userMessage) {
        setTimeout(() => {
            const botSender = chatBots[Math.floor(Math.random() * chatBots.length)];
            const botResponse = this.responseGenerator.detectIntentAndRespond(userMessage);
            
            const botMessage = this.chatManager.addMessage(botSender, botResponse);
            this.chatManager.renderMessage(botMessage, botSender);
        }, 1000);
    }
}

const chatApp = new ChatApplication();
