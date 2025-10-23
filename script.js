/* --- START: CSS Variables --- */
:root {
    --primary-color: #ca9e7a;
    --primary-light: #87644b;
    --primary-dark: #835533;
    --bg-dark: #110705;
    --bg-light: #1a0f0d;
    --text-muted: #837469;
    --border-color-light: rgba(202, 158, 122, 0.2);
    --border-color-medium: rgba(202, 158, 122, 0.3);
    --border-color-strong: #ca9e7a;
    --bg-accent-light: rgba(135, 100, 75, 0.05);
    --bg-accent-medium: rgba(135, 100, 75, 0.1);
    --bg-accent-strong: rgba(202, 158, 122, 0.2);
    --font-body: 'Georgia', serif;
    --font-heading: 'Arial', sans-serif;
    --success-bg: rgba(76, 175, 80, 0.2);
    --success-border: rgba(76, 175, 80, 0.5);
    --success-text: #4caf50;
    --error-bg: rgba(244, 67, 54, 0.2);
    --error-border: rgba(244, 67, 54, 0.5);
    --error-text: #f44336;
}
/* --- END: CSS Variables --- */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-body);
    color: var(--primary-color);
    overflow-x: hidden;
    background: var(--bg-dark);
}

/* Navigation */
.nav {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 40px 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 1.5s ease 0.5s forwards;
    background: rgba(17, 7, 5, 0.9); /* Keep rgba for transparency */
    backdrop-filter: blur(10px);
    height: 120px;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

.nav-links {
    display: flex;
    gap: 80px;
    list-style: none;
}

.nav-links a {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 13px;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-family: var(--font-heading);
    transition: all 0.5s ease;
    font-weight: 300;
    position: relative;
    padding: 10px 0;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    background: var(--primary-color);
    transition: width 0.5s ease;
}

.nav-links a:hover {
    color: var(--primary-light);
    transform: translateY(-2px);
}

.nav-links a:hover::after {
    width: 100%;
}

/* Hero Section */
.hero {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: 120px;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-dark);
    z-index: -2;
}

.hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-dark);
    z-index: -1;
}

.hero-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 100%;
    height: 100%;
    background-image: url('founderfinal.jpg');
    background-size: cover; /* Changed for better mobile */
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.6;
}

.hero-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.hero-content {
    text-align: center;
    z-index: 1;
    opacity: 0;
    transform: translateY(40px);
    animation: heroFade 1.8s ease 1s forwards;
    position: relative; /* Ensure z-index works */
}

@keyframes heroFade {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-title {
    margin-top: 50px;
    margin-left: 0; /* Centered */
    font-size: 120px;
    font-weight: 300;
    letter-spacing: 17px;
    text-transform: uppercase;
    margin-bottom: 20px; /* Adjusted margin */
    line-height: 1.1;
    color: var(--primary-dark);
    text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.8);
}

.hero-subtitle {
    font-size: 16px;
    letter-spacing: 5px;
    text-transform: uppercase;
    opacity: 0.9;
    font-family: var(--font-heading);
    font-weight: 300;
    color: var(--primary-light);
}

.scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    animation: fadeIn 1.5s ease 2s forwards;
}

.chevron {
    width: 30px;
    height: 30px;
    border-right: 2px solid var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
    transform: rotate(45deg);
    animation: bounce 2s infinite;
    opacity: 0.6;
}

@keyframes bounce {
    0%, 100% { transform: rotate(45deg) translateY(0); }
    50% { transform: rotate(45deg) translateY(10px); }
}

/* Content Sections */
.section {
    min-height: 100vh;
    padding: 120px 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-dark);
    opacity: 0;
    transform: translateY(60px);
    transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.section.visible {
    opacity: 1;
    transform: translateY(0);
}

.section-content {
    max-width: 1200px;
    width: 100%;
}

.section-label {
    font-size: 12px;
    letter-spacing: 5px;
    text-transform: uppercase;
    opacity: 0.5;
    margin-bottom: 60px;
    font-family: var(--font-heading);
    font-weight: 300;
    color: var(--text-muted);
}

.section-title {
    font-size: 64px;
    font-weight: 300;
    margin-bottom: 40px;
    letter-spacing: 2px;
    color: var(--primary-color);
}

.section-text {
    font-size: 22px;
    line-height: 1.8;
    opacity: 0.8;
    font-weight: 300;
    max-width: 900px;
    color: var(--primary-color);
}

.connect-text {
    font-size: 22px;
    line-height: 1.8;
    opacity: 0.8;
    font-weight: 300;
    max-width: 1200px;
    color: var(--primary-color);
}

/* About Section */
.about {
    background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-light) 100%);
}

/* Companies Section */
.companies {
    background: var(--bg-dark);
}

.companies-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 80px;
}

.company-card {
    padding: 50px 30px;
    border: 1px solid var(--border-color-light);
    background: var(--bg-accent-light);
    text-align: center;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(30px) scale(0.95);
}

.company-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.company-card:hover {
    border-color: var(--border-color-strong);
    background: var(--bg-accent-medium);
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 20px 40px rgba(202, 158, 122, 0.15); /* Keep rgba for box shadow */
}

.company-name {
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 2px;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.company-role {
    font-size: 14px;
    opacity: 0.6;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: var(--font-heading);
    color: var(--text-muted);
}

/* Book Appointment Section */
.appointment {
    background: linear-gradient(135deg, var(--bg-light) 0%, var(--bg-dark) 100%);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 60px;
}

.service-card {
    padding: 40px 30px;
    border: 1px solid var(--border-color-light);
    background: var(--bg-accent-light);
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.service-card.visible {
    opacity: 1;
    transform: translateY(0);
}

.service-card:hover {
    border-color: var(--border-color-strong);
    background: var(--bg-accent-medium);
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(202, 158, 122, 0.2); /* Keep rgba */
}

/* Service Logo Styling */
.service-logo {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(202, 158, 122, 0.08); /* Keep rgba */
    border: 1px solid rgba(202, 158, 122, 0.15); /* Keep rgba */
    border-radius: 8px;
    transition: all 0.4s ease;
}

.service-card:hover .service-logo {
    background: rgba(202, 158, 122, 0.15); /* Keep rgba */
    border-color: rgba(202, 158, 122, 0.4); /* Keep rgba */
    transform: scale(1.1);
}

.service-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
}

.service-title {
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 2px;
    margin-bottom: 15px;
    color: var(--primary-color);
}

.service-description {
    font-size: 14px;
    opacity: 0.7;
    line-height: 1.6;
    color: var(--text-muted);
}

/* Modal for Service Details */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(17, 7, 5, 0.95); /* Keep rgba */
    z-index: 2000;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.4s ease;
    overflow-y: auto;
}

.modal.active {
    display: flex;
    opacity: 1;
}

.modal-content {
    background: var(--bg-light);
    padding: 40px;
    max-width: 500px;
    width: 90%;
    border: 1px solid var(--border-color-medium);
    position: relative;
    transform: scale(0.9);
    transition: transform 0.4s ease;
    margin: auto;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-content.booking-modal {
    max-width: 650px;
}

.modal.active .modal-content {
    transform: scale(1);
}

.close-modal {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 40px;
    color: var(--primary-color);
    cursor: pointer;
    transition: all 0.3s ease;
    line-height: 1;
    background: none;
    border: none;
}

.close-modal:hover {
    color: var(--primary-light);
    transform: rotate(90deg);
}

.modal-title {
    font-size: 28px;
    font-weight: 300;
    margin-bottom: 20px;
    color: var(--primary-color);
    letter-spacing: 2px;
}

.modal-description {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 30px;
    opacity: 0.8;
    color: var(--primary-color);
}

.appointment-options {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
}

.time-option {
    flex: 1;
    padding: 20px 12px;
    border: 1px solid var(--border-color-medium);
    text-align: center;
    cursor: pointer;
    transition: all 0.4s ease;
    background: var(--bg-accent-light);
    position: relative;
}

.time-option input[type="radio"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.time-option label {
    cursor: pointer;
    display: block;
    width: 100%;
}

.duration-time {
    font-size: 16px;
    font-weight: 400;
    color: var(--primary-color);
    margin-bottom: 5px;
    letter-spacing: 1px;
}

.duration-desc {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
}

.time-option:hover {
    border-color: var(--border-color-strong);
    background: var(--bg-accent-medium);
    transform: translateY(-3px);
}

.time-option input[type="radio"]:checked + label,
.time-option:has(input[type="radio"]:checked) {
    border-color: var(--border-color-strong);
    background: var(--bg-accent-strong);
}

.step-title {
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 2px;
    color: var(--primary-color);
    margin-bottom: 20px;
    text-transform: uppercase;
    font-family: var(--font-heading);
}

/* Calendar Styles */
.calendar-container {
    margin: 20px 0;
    border: 1px solid var(--border-color-light);
    background: var(--bg-accent-light);
    padding: 20px;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.calendar-month {
    font-size: 16px;
    font-weight: 400;
    color: var(--primary-color);
    letter-spacing: 1px;
}

.calendar-nav {
    background: transparent;
    border: 1px solid var(--border-color-medium);
    color: var(--primary-color);
    width: 35px;
    height: 35px;
    cursor: pointer;
    font-size: 20px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.calendar-nav:hover {
    border-color: var(--border-color-strong);
    background: var(--bg-accent-strong);
}

.calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin-bottom: 10px;
}

.weekday {
    text-align: center;
    font-size: 11px;
    color: var(--text-muted);
    padding: 8px 0;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: var(--font-heading);
}

.calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    min-height: 250px;
}

.calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-color-light);
    background: var(--bg-accent-light);
    color: var(--primary-color);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 40px;
}

.calendar-day:hover:not(.disabled):not(.other-month) {
    border-color: var(--border-color-strong);
    background: var(--bg-accent-medium);
    transform: scale(1.05);
}

.calendar-day.selected {
    background: var(--bg-accent-strong);
    border-color: var(--border-color-strong);
    font-weight: 600;
}

.calendar-day.today {
    border: 2px solid var(--border-color-strong);
}

.calendar-day.disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.calendar-day.other-month {
    opacity: 0.3;
    color: var(--text-muted);
}

/* Time Slots */
.time-slots-container {
    margin-top: 30px;
}

.time-slots-title {
    font-size: 14px;
    font-weight: 300;
    color: var(--primary-color);
    margin-bottom: 15px;
    letter-spacing: 1px;
}

.time-slots {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
}

.time-slot {
    padding: 12px;
    border: 1px solid var(--border-color-medium);
    background: var(--bg-accent-light);
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--primary-color);
    font-size: 13px;
    letter-spacing: 0.5px;
}

.time-slot:hover:not(.booked) {
    border-color: var(--border-color-strong);
    background: var(--bg-accent-medium);
    transform: translateY(-2px);
}

.time-slot.selected {
    background: var(--bg-accent-strong);
    border-color: var(--border-color-strong);
    font-weight: 600;
}

.time-slot.booked {
    opacity: 0.4;
    cursor: not-allowed;
    text-decoration: line-through;
}

/* Summary Section */
.selected-summary {
    background: var(--bg-accent-medium);
    border: 1px solid var(--border-color-light);
    padding: 20px;
    margin-bottom: 25px;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color-light);
}

.summary-item:last-child {
    border-bottom: none;
}

.summary-label {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: var(--font-heading);
}

.summary-value {
    font-size: 13px;
    color: var(--primary-color);
    font-weight: 400;
}

/* Button Group */
.button-group {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}

.secondary-btn {
    flex: 1;
    padding: 15px 30px;
    background: transparent;
    border: 1px solid var(--border-color-medium);
    color: var(--primary-color);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: all 0.4s ease;
}

.secondary-btn:hover {
    border-color: var(--border-color-strong);
    background: var(--bg-accent-strong);
}

.booking-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.booking-form .form-group {
    display: flex;
    flex-direction: column;
}

.booking-form .form-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: var(--text-muted);
    font-family: var(--font-heading);
}

.booking-form .form-input,
.booking-form .form-textarea {
    padding: 12px;
    background: var(--bg-accent-light);
    border: 1px solid var(--border-color-light);
    color: var(--primary-color);
    font-family: var(--font-body);
    font-size: 14px;
    transition: all 0.3s ease;
}

.booking-form .form-input:focus,
.booking-form .form-textarea:focus {
    outline: none;
    border-color: var(--border-color-strong);
    background: var(--bg-accent-medium);
}

.booking-form .form-textarea {
    resize: vertical;
}

.booking-form .submit-btn {
    padding: 15px 30px;
    background: transparent;
    border: 1px solid var(--border-color-strong);
    color: var(--primary-color);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: all 0.5s ease;
    position: relative;
    overflow: hidden;
}

.booking-form .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.booking-form .submit-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--primary-color);
    transition: left 0.5s ease;
    z-index: -1;
}

.booking-form .submit-btn:hover:not(:disabled) {
    color: var(--bg-dark);
}

.booking-form .submit-btn:hover:not(:disabled)::before {
    left: 0;
}

/* --- New CSS for Booking Form Alignment --- */
/* (Keeping this for desktop) */
.booking-form .form-group {
    flex-direction: row; 
    align-items: center; 
    gap: 15px;
}
.booking-form .form-label {
    flex-basis: 180px; 
    flex-shrink: 0;
    margin-bottom: 0; 
    text-align: right;
    font-size: 12px;
}
.booking-form .form-input,
.booking-form .form-textarea {
    flex-grow: 1; 
}
.booking-form .form-group:has(textarea) {
    align-items: flex-start;
}
.booking-form .form-group:has(textarea) .form-label {
    padding-top: 12px; 
}
/* --- End of New CSS --- */

.form-response {
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    font-size: 13px;
    letter-spacing: 1px;
    display: none;
    margin-top: 10px;
}

.form-response.success {
    display: block;
    background: var(--success-bg);
    border: 1px solid var(--success-border);
    color: var(--success-text);
}

.form-response.error {
    display: block;
    background: var(--error-bg);
    border: 1px solid var(--error-border);
    color: var(--error-text);
}

/* Contact Modal */
.contact-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(17, 7, 5, 0.95); /* Keep rgba */
    z-index: 2000;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.4s ease;
    overflow-y: auto;
}

.contact-modal.active {
    display: flex;
    opacity: 1;
}

.contact-form-container {
    background: var(--bg-light);
    padding: 40px;
    max-width: 450px;
    width: 90%;
    border: 1px solid var(--border-color-medium);
    position: relative;
    transform: scale(0.9);
    transition: transform 0.4s ease;
    margin: auto;
}

.contact-modal.active .contact-form-container {
    transform: scale(1);
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: var(--text-muted);
    font-family: var(--font-heading);
}

.form-input,
.form-textarea {
    padding: 12px;
    background: var(--bg-accent-light);
    border: 1px solid var(--border-color-light);
    color: var(--primary-color);
    font-family: var(--font-body);
    font-size: 14px;
    transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
    outline: none;
    border-color: var(--border-color-strong);
    background: var(--bg-accent-medium);
}

.form-textarea {
    min-height: 100px;
    resize: vertical;
}

.submit-btn {
    padding: 15px 30px;
    background: transparent;
    border: 1px solid var(--border-color-strong);
    color: var(--primary-color);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: all 0.5s ease;
    position: relative;
    overflow: hidden;
}

.submit-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--primary-color);
    transition: left 0.5s ease;
    z-index: -1;
}

.submit-btn:hover {
    color: var(--bg-dark);
}

.submit-btn:hover::before {
    left: 0;
}

/* Contact Section */
.contact {
    background: var(--bg-dark);
    text-align: center;
}

.connect-btn {
    display: inline-block;
    padding: 20px 60px;
    background: transparent;
    border: 1px solid var(--border-color-strong);
    color: var(--primary-color);
    font-size: 14px;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: all 0.6s ease;
    margin-top: 40px;
    position: relative;
    overflow: hidden;
}

.connect-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--primary-color);
    transition: left 0.6s ease;
    z-index: -1;
}

.connect-btn:hover {
    color: var(--bg-dark);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(202, 158, 122, 0.3); /* Keep rgba */
}

.connect-btn:hover::before {
    left: 0;
}

/* Photo Gallery Section */
.gallery {
    background: var(--bg-light);
    min-height: 80vh;
    padding: 120px 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-content {
    max-width: 1200px;
    width: 100%;
}

.gallery-title {
    font-size: 64px;
    font-weight: 300;
    margin-bottom: 60px;
    letter-spacing: 2px;
    color: var(--primary-color);
}

.carousel-container {
    position: relative;
    overflow: hidden;
    background: var(--bg-accent-light);
    border: 1px solid var(--border-color-light);
    height: auto; /* Changed for responsive */
    aspect-ratio: 16 / 9; /* Changed for responsive */
    width: 100%;
}

.carousel-inner {
    display: flex;
    transition: transform 0.7s ease-in-out;
    height: 100%;
}

.carousel-item {
    min-width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(17, 7, 5, 0.8), rgba(135, 100, 75, 0.2)); /* Keep rgba */
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    font-size: 24px;
    letter-spacing: 2px;
    overflow: hidden;
}

.carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Changed back based on feedback */
    object-position: center;
}

.carousel-control { /* Re-enabled carousel controls */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(202, 158, 122, 0.3); /* Keep rgba */
    color: var(--primary-color);
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    transition: all 0.3s ease;
    z-index: 10;
    padding: 0;
}

.carousel-control:hover {
    background: rgba(202, 158, 122, 0.5); /* Keep rgba */
    color: var(--bg-dark);
}

.carousel-control.prev {
    left: 20px;
}

.carousel-control.next {
    right: 20px;
}

.carousel-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 10;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(202, 158, 122, 0.4); /* Keep rgba */
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(202, 158, 122, 0.6); /* Keep rgba */
}

.dot.active {
    background: var(--primary-color);
    transform: scale(1.3);
}

/* Footer Section */
.footer {
    background: #0a0402; /* Very dark, keep specific */
    border-top: 1px solid var(--border-color-light);
    padding: 40px 80px;
    margin-top: 60px;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}

.footer-left {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.footer-copyright {
    font-size: 13px;
    letter-spacing: 1px;
    color: var(--primary-color);
    font-weight: 300;
}

.footer-links {
    display: flex;
    gap: 15px;
    align-items: center;
}

.footer-link {
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--primary-color);
    text-decoration: none;
    transition: all 0.3s ease;
    font-family: var(--font-heading);
}

.footer-link:hover {
    color: var(--primary-light);
    text-decoration: underline;
}

.divider {
    color: rgba(202, 158, 122, 0.5); /* Keep rgba */
    font-size: 12px;
}

.footer-right {
    display: flex;
    justify-content: flex-end;
}

.social-icons {
    display: flex;
    gap: 25px;
}

.social-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-color-medium);
    border-radius: 50%;
    color: var(--primary-color);
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 16px;
}

.social-icon:hover {
    border-color: var(--border-color-strong);
    background: var(--bg-accent-strong);
    transform: translateY(-5px);
}

/* Keep specific social colors */
.social-icon.instagram:hover {
    background: linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7);
    color: #fff;
    border-color: transparent;
}
.social-icon.youtube:hover {
    background: #ff0000;
    color: #fff;
    border-color: transparent;
}
.social-icon.linkedin:hover {
    background: #0077b5;
    color: #fff;
    border-color: transparent;
}
.social-icon.whatsapp:hover {
    background: #25d366;
    color: #fff;
    border-color: transparent;
}

/* Policy Modal Styles */
.policy-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(17, 7, 5, 0.95); /* Keep rgba */
    z-index: 3000;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.4s ease;
    overflow: hidden;
    padding: 40px 20px;
}

.policy-modal.active {
    display: flex;
    opacity: 1;
    overflow-y: auto;
}

.policy-content {
    background: var(--bg-light);
    padding: 50px;
    max-width: 800px;
    width: 100%;
    border: 1px solid var(--border-color-medium);
    position: relative;
    transform: scale(0.9);
    transition: transform 0.4s ease;
    margin: auto;
    border-radius: 8px;
    max-height: 85vh;
    overflow-y: auto;
}

.policy-modal.active .policy-content {
    transform: scale(1);
}

.policy-title {
    font-size: 32px;
    font-weight: 300;
    margin-bottom: 30px;
    color: var(--primary-color);
    letter-spacing: 2px;
    border-bottom: 1px solid var(--border-color-light);
    padding-bottom: 20px;
}

.policy-body {
    color: var(--primary-color);
    font-size: 14px;
    line-height: 1.8;
}

.policy-body h3 {
    font-size: 18px;
    font-weight: 400;
    color: var(--primary-color);
    margin-top: 25px;
    margin-bottom: 15px;
    letter-spacing: 1px;
}

.policy-body h4 {
    font-size: 15px;
    font-weight: 400;
    color: var(--primary-light);
    margin-top: 15px;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
}

.policy-body p {
    margin-bottom: 15px;
    opacity: 0.85;
    text-align: justify;
}

.policy-body ul {
    margin-left: 30px;
    margin-bottom: 15px;
}

.policy-body ul li {
    margin-bottom: 10px;
    opacity: 0.85;
}

.policy-body ul ul {
    margin-top: 10px;
    margin-bottom: 10px;
}

.policy-body ul ul li {
    margin-bottom: 8px;
    font-size: 13px;
}

/* Scrollbar styling for policy modal */
.policy-content::-webkit-scrollbar {
    width: 8px;
}
.policy-content::-webkit-scrollbar-track {
    background: rgba(202, 158, 122, 0.05); /* Keep rgba */
    border-radius: 10px;
}
.policy-content::-webkit-scrollbar-thumb {
    background: rgba(202, 158, 122, 0.3); /* Keep rgba */
    border-radius: 10px;
}
.policy-content::-webkit-scrollbar-thumb:hover {
    background: rgba(202, 158, 122, 0.5); /* Keep rgba */
}

/* --- START: Mobile Responsive Code --- */
/* (Includes previous mobile fixes) */

/* 1. Style the new Nav Logo */
.nav-logo {
    display: none; /* Keep hidden */
    /* Other styles removed as logo is not displayed */
}

/* 2. Style the new Nav Toggle (Hamburger Button) */
.nav-toggle {
    display: none; /* Hide on desktop */
    background: transparent;
    border: 1px solid var(--border-color-medium);
    color: var(--primary-color);
    width: 40px;
    height: 40px;
    font-size: 18px;
    cursor: pointer;
    z-index: 1001;
}

/* 3. Main Media Query for Tablets and Phones (992px and smaller) */
@media (max-width: 992px) {
    /* --- NAVIGATION --- */
    .nav {
        padding: 20px 40px;
        height: 80px;
        justify-content: flex-end; /* Keep hamburger right */
    }

    /* .nav-logo rule removed as it's always hidden */

    .nav-toggle {
        display: block; /* Show hamburger */
    }

    .nav-links {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: var(--bg-dark);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 40px;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .nav-links.active {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }

    .nav-links a {
        font-size: 20px;
    }

    /* --- HERO --- */
    .hero {
        margin-top: 80px;
        height: 50vh; /* Shorter hero */
    }

    /* --- HERO TEXT --- */
    .hero-title {
        font-size: 60px;
        letter-spacing: 8px;
        margin-bottom: 20px; /* Corrected margin */
        margin-left: 0;
    }

    .hero-subtitle {
        font-size: 12px;
        letter-spacing: 3px;
    }

    /* --- GENERAL SECTIONS --- */
    .section {
        padding: 80px 40px;
        min-height: auto;
    }

    .section-title {
        font-size: 42px;
    }

    .section-text {
        font-size: 18px;
    }

    /* --- GRIDS --- */
    .companies-grid {
        grid-template-columns: 1fr;
        gap: 20px;
        margin-top: 40px;
    }

    /* --- BOOKING MODAL --- */
    .modal-content {
        width: 90%;
        padding: 30px 20px;
    }
    
    .appointment-options {
        flex-direction: column;
        gap: 10px;
    }

    /* Undo desktop form alignment for mobile */
    .booking-form .form-group {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
    }

    .booking-form .form-label {
        flex-basis: auto;
        text-align: left;
        font-size: 11px;
    }

    .booking-form .form-group:has(textarea) .form-label {
        padding-top: 0;
    }

    /* --- FOOTER --- */
    .footer {
        padding: 40px;
    }
    .footer-content {
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }
    .footer-left {
        align-items: center;
    }
}

/* 4. Extra Media Query for Small Phones (576px and smaller) */
@media (max-width: 576px) {
    .nav {
        padding: 20px;
    }

    .section {
        padding: 60px 20px;
    }

    .hero-title {
        font-size: 42px;
        letter-spacing: 6px;
    }

    .section-title {
        font-size: 32px;
    }

    .section-text {
        font-size: 16px;
    }

    .time-slots {
        grid-template-columns: 1fr 1fr;
    }
}
/* --- END: Mobile Responsive Code --- */
