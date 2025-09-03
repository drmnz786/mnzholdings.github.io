// js/main.js - Enhanced main functionality
class MainApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStats();
    }

    setupEventListeners() {
        // Quick question buttons in helpdesk
        const quickQuestions = document.querySelectorAll('.quick-question');
        quickQuestions.forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('user-input').value = btn.textContent.trim();
            });
        });

        // Send button in helpdesk
        const sendBtn = document.getElementById('send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', this.sendQuestion.bind(this));
        }
    }

    async sendQuestion() {
        const input = document.getElementById('user-input');
        const chatContainer = document.getElementById('chat-container');
        
        if (!input.value.trim()) return;

        // Add user message
        const userMessage = this.createMessage(input.value, 'user');
        chatContainer.appendChild(userMessage);
        
        const question = input.value;
        input.value = '';

        // Get AI response
        try {
            const response = await fetch('/api/ai/help', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: question })
            });

            const data = await response.json();
            
            // Add AI response
            const aiMessage = this.createMessage(data.answer, 'ai');
            chatContainer.appendChild(aiMessage);
            
            // Scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (error) {
            console.error('AI help error:', error);
        }
    }

    createMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex mb-4 ${type === 'user' ? 'justify-end' : ''}`;
        
        messageDiv.innerHTML = `
            <div class="w-8 h-8 ${type === 'ai' ? 'bg-blue-900' : 'bg-gray-700'} rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span class="text-sm">${type === 'ai' ? '🤖' : '👤'}</span>
            </div>
            <div class="${type === 'ai' ? 'bg-gray-800' : 'bg-blue-800'} rounded-lg p-3 max-w-xs">
                <p class="text-sm">${text}</p>
            </div>
        `;

        return messageDiv;
    }

    async loadStats() {
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();
            
            // Update stats on offerwall page
            if (document.getElementById('total-earnings')) {
                document.getElementById('total-earnings').textContent = `$${data.totalEarnings || '0.00'}`;
                document.getElementById('surveys-completed').textContent = data.surveysCompleted || '0';
                document.getElementById('active-offers').textContent = data.activeOffers || '0';
                document.getElementById('pending-cash').textContent = `$${data.pendingCash || '0.00'}`;
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    }
}

// Initialize main app
document.addEventListener('DOMContentLoaded', function() {
    new MainApp();
});