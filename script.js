// Service details
const serviceDetails = {
    consulting: { title: 'Strategic Consulting', description: 'Comprehensive business consulting...' },
    advocacy: { title: 'Advocacy Services', description: 'Expert advocacy to amplify your voice...' },
    legal: { title: 'Legal Advisory', description: 'Strategic legal guidance for complex business matters...' },
    policy: { title: 'Policy Advisory', description: 'Comprehensive policy development and analysis...' },
    government: { title: 'Government Relations', description: 'Navigate the complexities of government partnerships...' }
}; // Descriptions shortened for brevity

/* --- START: Mobile Navigation Toggle --- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const allNavLinks = document.querySelectorAll('.nav-links a');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
}
allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) { navLinks.classList.remove('active'); }
    });
});
/* --- END: Mobile Navigation Toggle --- */


/* --- START: Reusable Form Submission Function --- */
/**
 * A reusable function to send form data to a webhook.
 * @param {string} url - The webhook URL to send data to.
 * @param {object} formData - The JSON object to send.
 * @param {HTMLButtonElement} submitBtn - The button that was clicked.
 * @returns {boolean} - True if successful, false if failed.
 */
async function submitFormData(url, formData, submitBtn) {
    // Store original button text safely
    const originalBtnHTML = submitBtn.innerHTML; // Store full HTML if spans are used
    let originalBtnText = submitBtn.textContent; // Fallback text

    // Try to find specific spans first
    const btnTextSpan = submitBtn.querySelector('.btn-text');
    const btnLoadingSpan = submitBtn.querySelector('.btn-loading');

    if (btnTextSpan) {
       originalBtnText = btnTextSpan.textContent; // Get text from span if available
    }

    submitBtn.disabled = true;

    // Show loading state
    if (btnTextSpan && btnLoadingSpan) {
        btnTextSpan.style.display = 'none';
        btnLoadingSpan.style.display = 'inline';
    } else {
        submitBtn.textContent = 'Processing...'; // Generic loading text
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorBody = await response.text(); // Get more error details
            console.error(`Server responded with status ${response.status}: ${errorBody}`);
            throw new Error(`Server responded with status ${response.status}`);
        }
        return true; // Success!

    } catch (error) {
        console.error('Error submitting form to URL:', url, error);
        return false; // Failure

    } finally {
        // Restore button state
        submitBtn.disabled = false;
        if (btnTextSpan && btnLoadingSpan) {
            // Restore span visibility
            btnTextSpan.style.display = 'inline';
            btnLoadingSpan.style.display = 'none';
        } else {
             // Restore original text or HTML
            if (originalBtnHTML.includes('span')) { // Check if original had spans
                submitBtn.innerHTML = originalBtnHTML;
            } else {
                submitBtn.textContent = originalBtnText; // Restore simple text
            }
        }
    }
}
/* --- END: Reusable Form Submission Function --- */


// Smooth scrolling (no changes)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// Intersection Observer for sections (no changes)
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
}, observerOptions);
document.querySelectorAll('.section').forEach(section => { observer.observe(section); });

// Staggered animation for cards (no changes)
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) { setTimeout(() => { entry.target.classList.add('visible'); }, index * 150); }
    });
}, observerOptions);
const cards = document.querySelectorAll('.company-card, .service-card');
cards.forEach(item => { cardObserver.observe(item); });


// --- START: Booking Modal State Object ---
const bookingState = {
    currentService: '',
    selectedDate: null,
    selectedTime: null,
    selectedDuration: null,
    currentMonth: new Date()
};
// --- END: Booking Modal State Object ---

// Service modal functionality (uses bookingState)
const serviceModal = document.getElementById('serviceModal');
const closeServiceModal = document.getElementById('closeServiceModal');
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        const service = this.dataset.service;
        bookingState.currentService = service;
        if (serviceDetails[service]) {
            const details = serviceDetails[service];
            document.getElementById('serviceTitle').textContent = details.title;
            document.getElementById('serviceDescription').textContent = details.description;
            serviceModal.classList.add('active');

            const form = document.getElementById('bookingForm');
            if (form) form.reset();
            const responseEl = document.getElementById('bookingResponse');
            if (responseEl) { responseEl.style.display = 'none'; responseEl.className = 'form-response'; }
            showStep(1);
            // Reset state
            bookingState.selectedDate = null;
            bookingState.selectedTime = null;
            bookingState.selectedDuration = null;
            bookingState.currentMonth = new Date();
        }
    });
});

if (closeServiceModal) {
    closeServiceModal.addEventListener('click', () => { serviceModal.classList.remove('active'); });
}

// Multi-step booking flow (no logic changes)
function showStep(stepNumber) {
    document.getElementById('step1').style.display = stepNumber === 1 ? 'block' : 'none';
    document.getElementById('step2').style.display = stepNumber === 2 ? 'block' : 'none';
    document.getElementById('step3').style.display = stepNumber === 3 ? 'block' : 'none';
    if (stepNumber === 2) { renderCalendar(); }
    if (stepNumber === 3) { updateSummary(); }
}

// Duration selection (uses bookingState)
const timeOptions = document.querySelectorAll('.time-option');
timeOptions.forEach(option => {
    option.addEventListener('click', function() {
        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            bookingState.selectedDuration = radio.value;
            timeOptions.forEach(opt => opt.classList.remove('selected')); // Visual only
            // this.classList.add('selected'); // Not needed if using :has() CSS
            setTimeout(() => showStep(2), 300);
        }
    });
});

// Calendar functionality (uses bookingState)
function renderCalendar() {
    const year = bookingState.currentMonth.getFullYear();
    const month = bookingState.currentMonth.getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('calendarMonth').textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    const today = new Date(); today.setHours(0, 0, 0, 0);

    // Prev month days
    for (let i = firstDay - 1; i >= 0; i--) { calendarDays.appendChild(createDayElement(daysInPrevMonth - i, 'other-month')); }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day); date.setHours(0, 0, 0, 0);
        const isPast = date < today;
        const isToday = date.getTime() === today.getTime();
        let selDate = null;
        if (bookingState.selectedDate) { selDate = new Date(bookingState.selectedDate + 'T00:00:00'); }
        const isSelected = bookingState.selectedDate && date.getTime() === selDate?.getTime();
        const classes = [];
        if (isPast) classes.push('disabled');
        if (isToday) classes.push('today');
        if (isSelected) classes.push('selected');
        calendarDays.appendChild(createDayElement(day, classes.join(' '), isPast ? null : date));
    }

    // Next month days
    const totalCells = calendarDays.children.length;
    for (let day = 1; day <= 42 - totalCells; day++) { calendarDays.appendChild(createDayElement(day, 'other-month')); }
}

function createDayElement(day, className, date) {
    const dayEl = document.createElement('div');
    dayEl.className = `calendar-day ${className}`;
    dayEl.textContent = day;
    if (date && !className.includes('disabled')) {
        dayEl.addEventListener('click', () => selectDate(date));
    }
    return dayEl;
}

function selectDate(date) { // Uses bookingState
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    bookingState.selectedDate = `${year}-${month}-${day}`;
    renderCalendar(); // Re-render to show selection
    generateTimeSlots(date);
}

function generateTimeSlots(date) { // Uses bookingState
    const container = document.getElementById('timeSlotsContainer');
    const slotsDiv = document.getElementById('timeSlots');
    const dateDisplay = document.getElementById('selectedDateDisplay');
    if (!container || !slotsDiv || !dateDisplay) return;

    dateDisplay.textContent = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
        for (let minute of [0, 30]) {
            if (hour === 17 && minute === 30) break;
            const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            slots.push({ value: timeStr, display: formatTime(hour, minute) });
        }
    }
    slotsDiv.innerHTML = '';
    slots.forEach(slot => {
        const slotEl = document.createElement('div');
        slotEl.className = 'time-slot';
        slotEl.textContent = slot.display;
        slotEl.dataset.time = slot.value;
        if (bookingState.selectedTime === slot.value) { slotEl.classList.add('selected'); }
        slotEl.addEventListener('click', () => selectTime(slot.value, slotEl));
        slotsDiv.appendChild(slotEl);
    });
    container.style.display = 'block';
}

function formatTime(hour, minute) { // No changes
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12; // More concise way to get 12-hour format
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
}

function selectTime(time, element) { // Uses bookingState
    bookingState.selectedTime = time;
    document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    setTimeout(() => showStep(3), 500);
}

// Calendar navigation (uses bookingState)
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
if (prevMonthBtn) { prevMonthBtn.addEventListener('click', () => { bookingState.currentMonth.setMonth(bookingState.currentMonth.getMonth() - 1); renderCalendar(); }); }
if (nextMonthBtn) { nextMonthBtn.addEventListener('click', () => { bookingState.currentMonth.setMonth(bookingState.currentMonth.getMonth() + 1); renderCalendar(); }); }

// Back button (no changes)
const backBtn = document.getElementById('backBtn');
if (backBtn) { backBtn.addEventListener('click', () => { showStep(2); }); }

// Update summary (uses bookingState)
function updateSummary() {
    document.getElementById('summaryService').textContent = document.getElementById('serviceTitle')?.textContent || '';
    if (bookingState.selectedDuration) { document.getElementById('summaryDuration').textContent = `${bookingState.selectedDuration} minutes`; }
    if (bookingState.selectedDate && bookingState.selectedTime) {
        const date = new Date(bookingState.selectedDate + 'T00:00:00'); // Ensure local date
        const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        const timeParts = bookingState.selectedTime.split(':');
        const timeStr = formatTime(parseInt(timeParts[0]), parseInt(timeParts[1]));
        document.getElementById('summaryDateTime').textContent = `${dateStr} at ${timeStr}`;
    }
}

// --- START: Updated Booking Form Handler ---
const bookingForm = document.getElementById('bookingForm');
const n8nBookingWebhookUrl = 'https://n8n.srv1068626.hstgr.cloud/webhook/51a45f27-5307-4454-b452-937d18a5d0f7';

if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBooking');
        const responseDiv = document.getElementById('bookingResponse');
        if (responseDiv) { responseDiv.style.display = 'none'; responseDiv.className = 'form-response'; } // Reset response

        // 1. Collect form data
        const formData = {
            service: bookingState.currentService,
            serviceTitle: document.getElementById('serviceTitle')?.textContent || '',
            duration: bookingState.selectedDuration ? `${bookingState.selectedDuration} minutes` : '',
            date: bookingState.selectedDate,
            time: bookingState.selectedTime,
            name: document.getElementById('bookingName')?.value.trim() || '',
            email: document.getElementById('bookingEmail')?.value.trim() || '',
            phone: document.getElementById('bookingPhone')?.value.trim() || '',
            message: document.getElementById('bookingMessage')?.value.trim() || '',
            timestamp: new Date().toISOString()
        };

        // 2. Simple Validation
        if (!formData.duration || !formData.date || !formData.time || !formData.name || !formData.email || !formData.phone) {
            if (responseDiv) {
                responseDiv.textContent = 'Please complete all required fields (Duration, Date, Time, Name, Email, Phone).';
                responseDiv.className = 'form-response error';
                responseDiv.style.display = 'block';
            }
            return; // Stop if validation fails
        }

        // 3. Call the reusable function
        const success = await submitFormData(n8nBookingWebhookUrl, formData, submitBtn);

        // 4. Handle the result
        if (responseDiv) {
            responseDiv.style.display = 'block'; // Show response area
            if (success) {
                responseDiv.textContent = 'Appointment request submitted successfully! We will contact you soon to confirm.';
                responseDiv.className = 'form-response success';
                bookingForm.reset(); // Clear form fields
                // Optionally reset state if needed, though opening modal does this
                setTimeout(() => {
                    if (serviceModal) serviceModal.classList.remove('active');
                    showStep(1); // Reset to step 1 view
                }, 3000);
            } else {
                responseDiv.textContent = 'Error submitting appointment. Please try again or contact us directly.';
                responseDiv.className = 'form-response error';
            }
        }
    });
}
// --- END: Updated Booking Form Handler ---


// --- START: Updated Contact Form Handler ---
const contactForm = document.getElementById('contactForm');
const contactModal = document.getElementById('contactModal');
const openContactForm = document.getElementById('openContactForm');
const closeContactModal = document.getElementById('closeContactModal');
// --- ⚠️ PASTE YOUR ACTUAL CONTACT WEBHOOK URL HERE ---
const n8nContactWebhookUrl = 'https://n8n.srv1068626.hstgr.cloud/webhook/51a45f27-5307-4454-b452-937d18a5d0f7'; // Replace if different!
// --------------------------------------------------

if (openContactForm && contactModal) { openContactForm.addEventListener('click', () => { contactModal.classList.add('active'); }); }
if (closeContactModal && contactModal) { closeContactModal.addEventListener('click', () => { contactModal.classList.remove('active'); }); }

if (contactForm && contactModal) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // 1. Collect form data
        const formData = {
            name: document.getElementById('name')?.value.trim() || '',
            email: document.getElementById('email')?.value.trim() || '',
            phone: document.getElementById('phone')?.value.trim() || '',
            company: document.getElementById('company')?.value.trim() || '', // Optional
            message: document.getElementById('message')?.value.trim() || '',
            timestamp: new Date().toISOString()
        };

        // 2. Simple Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert('Please fill out Name, Email, Phone, and Message.');
            return; // Stop if validation fails
        }

        // 3. Call the reusable function
        const success = await submitFormData(n8nContactWebhookUrl, formData, submitBtn);

        // 4. Handle the result
        if (success) {
            alert('Thank you for reaching out! We will get back to you shortly.');
            contactModal.classList.remove('active');
            contactForm.reset();
        } else {
            alert('There was an error submitting your message. Please try again.');
        }
    });
}
// --- END: Updated Contact Form Handler ---

// Close modals when clicking outside (no changes)
window.addEventListener('click', (e) => {
    if (e.target === serviceModal) { serviceModal.classList.remove('active'); }
    if (e.target === contactModal) { contactModal.classList.remove('active'); }
});

// Carousel functionality (minor optimization)
let currentSlide = 0;
const carousel = document.getElementById('carouselInner');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let autoSlideInterval = null; // Store interval ID

function stopAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
}
function startAutoSlide() {
    stopAutoSlide(); // Clear existing interval first
    autoSlideInterval = setInterval(() => { goToSlide(currentSlide + 1); }, 5000);
}

if (carousel && dots.length > 0) {
    const totalSlides = dots.length;
    function goToSlide(n) {
        currentSlide = (n + totalSlides) % totalSlides;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
        startAutoSlide(); // Reset timer on manual navigation
    }

    if (nextBtn) { nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1)); }
    if (prevBtn) { prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1)); }
    dots.forEach(dot => dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index))));

    startAutoSlide(); // Initial start
}

// Footer Social Links and Terms/Privacy Modal (Combined link handler)
document.addEventListener('DOMContentLoaded', function() {
    const termsLink = document.getElementById('termsLink');
    const privacyLink = document.getElementById('privacyLink');
    const termsModal = document.getElementById('termsModal');
    const privacyModal = document.getElementById('privacyModal');
    const closeTermsModal = document.getElementById('closeTermsModal');
    const closePrivacyModal = document.getElementById('closePrivacyModal');
    const policyContactLink = document.getElementById('policyContactLink');
    const termsContactLink = document.getElementById('termsContactLink');
    // Ensure contactModal is defined here if not already global
    // const contactModal = document.getElementById('contactModal');

    if (termsLink && termsModal) { termsLink.addEventListener('click', (e) => { e.preventDefault(); termsModal.classList.add('active'); }); }
    if (privacyLink && privacyModal) { privacyLink.addEventListener('click', (e) => { e.preventDefault(); privacyModal.classList.add('active'); }); }
    if (closeTermsModal && termsModal) { closeTermsModal.addEventListener('click', () => { termsModal.classList.remove('active'); }); }
    if (closePrivacyModal && privacyModal) { closePrivacyModal.addEventListener('click', () => { privacyModal.classList.remove('active'); }); }

    // Reusable handler for policy links to contact modal
    function openContactFromPolicy(e) {
         e.preventDefault();
         if (termsModal) termsModal.classList.remove('active');
         if (privacyModal) privacyModal.classList.remove('active');
         // Make sure contactModal is accessible here
         const contactModalInstance = document.getElementById('contactModal');
         if (contactModalInstance) contactModalInstance.classList.add('active');
    }
    if (policyContactLink) { policyContactLink.addEventListener('click', openContactFromPolicy); }
    if (termsContactLink) { termsContactLink.addEventListener('click', openContactFromPolicy); }

    // Close policy modals when clicking outside
    window.addEventListener('click', (e) => {
        if (termsModal && e.target === termsModal) { termsModal.classList.remove('active'); }
        if (privacyModal && e.target === privacyModal) { privacyModal.classList.remove('active'); }
    });
}); // End DOMContentLoaded
