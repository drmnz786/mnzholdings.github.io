// js/email.js - Complete email creation system
class EmailManager {
    constructor() {
        this.domains = [
            '@mnzholdings.com',
            '@mnzgov.com', 
            '@mnzdigital.com',
            '@digitalstate.com',
            '@quantum.tech'
        ];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateDomains();
    }

    populateDomains() {
        const domainSelect = document.getElementById('domain');
        if (domainSelect) {
            domainSelect.innerHTML = '';
            this.domains.forEach(domain => {
                const option = document.createElement('option');
                option.value = domain;
                option.textContent = domain;
                domainSelect.appendChild(option);
            });
        }
    }

    setupEventListeners() {
        const emailForm = document.getElementById('emailForm');
        if (emailForm) {
            emailForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.createEmail();
            });
        }
    }

    async createEmail() {
        const username = document.getElementById('username').value;
        const domain = document.getElementById('domain').value;
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms').checked;

        if (!username || !domain || !password) {
            alert('Please fill all fields');
            return;
        }

        if (!terms) {
            alert('Please accept the terms and conditions');
            return;
        }

        try {
            const response = await fetch('/api/email/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    domain: domain.replace('@', ''),
                    password,
                    quota: '500 MB'
                })
            });

            const result = await response.json();

            if (result.success) {
                alert(`Email created successfully: ${result.email.address}`);
                // Store email in user profile
                const userData = JSON.parse(localStorage.getItem('mnz_user') || '{}');
                userData.email = result.email.address;
                localStorage.setItem('mnz_user', JSON.stringify(userData));
            } else {
                alert('Email creation failed: ' + result.error);
            }
        } catch (error) {
            console.error('Email creation error:', error);
            alert('Network error. Please try again.');
        }
    }
}

// Initialize email manager
document.addEventListener('DOMContentLoaded', function() {
    new EmailManager();
});