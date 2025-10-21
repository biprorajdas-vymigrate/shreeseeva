// Service details
const serviceDetails = {
    consulting: {
        title: 'Strategic Consulting',
        description: 'Comprehensive business consulting services to help your organization achieve its strategic objectives. I work with leadership teams to develop actionable strategies, optimize operations, and drive sustainable growth through data-driven insights and proven methodologies.'
    },
    advocacy: {
        title: 'Advocacy Services',
        description: 'Expert advocacy to amplify your voice and advance your organizational mission. I help clients navigate stakeholder landscapes, build coalitions, craft compelling narratives, and implement effective advocacy campaigns that drive meaningful change and policy outcomes.'
    },
    legal: {
        title: 'Legal Advisory',
        description: 'Strategic legal guidance for complex business matters, regulatory compliance, and risk management. Drawing on extensive experience, I provide practical counsel on corporate governance, contracts, intellectual property, and dispute resolution to protect your interests and support your objectives.'
    },
    policy: {
        title: 'Policy Advisory',
        description: 'Comprehensive policy development and analysis services for organizations navigating regulatory environments. I assist in crafting policy positions, conducting impact assessments, engaging with policymakers, and developing advocacy strategies to influence policy outcomes aligned with your goals.'
    },
    government: {
        title: 'Government Relations',
        description: 'Navigate the complexities of government partnerships and regulatory landscapes. I provide strategic counsel on stakeholder engagement, regulatory affairs, public-private partnerships, and government procurement to help you build productive relationships and achieve your policy objectives.'
    }
};

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for sections
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Staggered animation for cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, observerOptions);

const cards = document.querySelectorAll('.company-card, .service-card');
cards.forEach(item => {
    cardObserver.observe(item);
});

// Service modal functionality
const serviceModal = document.getElementById('serviceModal');
const closeServiceModal = document.getElementById('closeServiceModal');
const serviceCards = document.querySelectorAll('.service-card');
let currentService = '';
let selectedDate = null;
let selectedTime = null;
let selectedDuration = null;
let currentMonth = new Date();

serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        const service = this.dataset.service;
        currentService = service;
        if (serviceDetails[service]) {
            const details = serviceDetails[service];
            document.getElementById('serviceTitle').textContent = details.title;
            document.getElementById('serviceDescription').textContent = details.description;
            serviceModal.classList.add('active');
            
            // Reset form and show step 1
            const form = document.getElementById('bookingForm');
            if (form) form.reset();
            const response = document.getElementById('bookingResponse');
            if (response) {
                response.style.display = 'none';
                response.className = 'form-response';
            }
            showStep(1);
            selectedDate = null;
            selectedTime = null;
            selectedDuration = null;
            currentMonth = new Date();
        }
    });
});

if (closeServiceModal) {
    closeServiceModal.addEventListener('click', () => {
        serviceModal.classList.remove('active');
    });
}

// Multi-step booking flow
function showStep(stepNumber) {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    if (step1) step1.style.display = stepNumber === 1 ? 'block' : 'none';
    if (step2) step2.style.display = stepNumber === 2 ? 'block' : 'none';
    if (step3) step3.style.display = stepNumber === 3 ? 'block' : 'none';
    
    if (stepNumber === 2) {
        renderCalendar();
    }
    
    if (stepNumber === 3) {
        updateSummary();
    }
}

// Duration selection
const timeOptions = document.querySelectorAll('.time-option');
timeOptions.forEach(option => {
    option.addEventListener('click', function() {
        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            selectedDuration = radio.value;
            timeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Auto-advance to step 2 after short delay
            setTimeout(() => showStep(2), 300);
        }
    });
});

// Calendar functionality
function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Update header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const monthDisplay = document.getElementById('calendarMonth');
    if (monthDisplay) {
        monthDisplay.textContent = monthNames[month] + ' ' + year;
    }
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const calendarDays = document.getElementById('calendarDays');
    if (!calendarDays) return;
    
    calendarDays.innerHTML = '';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayEl = createDayElement(day, 'other-month');
        calendarDays.appendChild(dayEl);
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        
        const isPast = date < today;
        const isToday = date.getTime() === today.getTime();
        let selDate = null;
        if (selectedDate) {
            // This trick (adding 'T00:00:00') forces JS to parse the string in your local timezone
            selDate = new Date(selectedDate + 'T00:00:00');
        }
        const isSelected = selectedDate && date.getTime() === selDate.getTime();
        
        const classes = [];
        if (isPast) classes.push('disabled');
        if (isToday) classes.push('today');
        if (isSelected) classes.push('selected');
        
        const dayEl = createDayElement(day, classes.join(' '), isPast ? null : date);
        calendarDays.appendChild(dayEl);
    }
    
    // Next month days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
        const dayEl = createDayElement(day, 'other-month');
        calendarDays.appendChild(dayEl);
    }
}

function createDayElement(day, className, date) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day ' + className;
    dayEl.textContent = day;
    
    if (date && !className.includes('disabled')) {
        dayEl.addEventListener('click', () => selectDate(date));
    }
    
    return dayEl;
}

// ---- NEW CODE ----
function selectDate(date) {
    // Manually format as YYYY-MM-DD in local time to avoid timezone shift
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    selectedDate = `${year}-${month}-${day}`;
    
    renderCalendar();
    generateTimeSlots(date);
}


function generateTimeSlots(date) {
    const container = document.getElementById('timeSlotsContainer');
    const slotsDiv = document.getElementById('timeSlots');
    const dateDisplay = document.getElementById('selectedDateDisplay');
    
    if (!container || !slotsDiv || !dateDisplay) return;
    
    // Format date for display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = date.toLocaleDateString('en-US', options);
    
    // Generate time slots (9 AM to 5 PM)
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
        for (let minute of [0, 30]) {
            if (hour === 17 && minute === 30) break;
            
            const timeStr = hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0');
            const displayTime = formatTime(hour, minute);
            slots.push({ value: timeStr, display: displayTime });
        }
    }
    
    slotsDiv.innerHTML = '';
    slots.forEach(slot => {
        const slotEl = document.createElement('div');
        slotEl.className = 'time-slot';
        slotEl.textContent = slot.display;
        slotEl.dataset.time = slot.value;
        
        if (selectedTime === slot.value) {
            slotEl.classList.add('selected');
        }
        
        slotEl.addEventListener('click', () => selectTime(slot.value, slotEl));
        slotsDiv.appendChild(slotEl);
    });
    
    container.style.display = 'block';
}

function formatTime(hour, minute) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return displayHour + ':' + minute.toString().padStart(2, '0') + ' ' + period;
}

function selectTime(time, element) {
    selectedTime = time;
    document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    
    // Auto-advance to step 3 after short delay
    setTimeout(() => showStep(3), 500);
}

// Calendar navigation
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        renderCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        renderCalendar();
    });
}

// Back button
const backBtn = document.getElementById('backBtn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        showStep(2);
    });
}

// Update summary
function updateSummary() {
    const serviceTitle = document.getElementById('serviceTitle');
    const summaryService = document.getElementById('summaryService');
    const summaryDuration = document.getElementById('summaryDuration');
    const summaryDateTime = document.getElementById('summaryDateTime');
    
    if (summaryService && serviceTitle) {
        summaryService.textContent = serviceTitle.textContent;
    }
    
    if (summaryDuration && selectedDuration) {
        summaryDuration.textContent = selectedDuration + ' minutes';
    }
    
    if (summaryDateTime && selectedDate && selectedTime) {
        const date = new Date(selectedDate);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const dateStr = date.toLocaleDateString('en-US', options);
        
        const timeParts = selectedTime.split(':');
        const hour = parseInt(timeParts[0]);
        const minute = parseInt(timeParts[1]);
        const timeStr = formatTime(hour, minute);
        
        summaryDateTime.textContent = dateStr + ' at ' + timeStr;
    }
}

// Booking form submission to n8n
const bookingForm = document.getElementById('bookingForm');
const n8nWebhookUrl = 'https://n8n.srv1068626.hstgr.cloud/webhook/51a45f27-5307-4454-b452-937d18a5d0f7';

if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBooking');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const responseDiv = document.getElementById('bookingResponse');
        
        if (!submitBtn || !btnText || !btnLoading || !responseDiv) return;
        
        const serviceTitleEl = document.getElementById('serviceTitle');
        const nameEl = document.getElementById('bookingName');
        const emailEl = document.getElementById('bookingEmail');
        const phoneEl = document.getElementById('bookingPhone');
        const messageEl = document.getElementById('bookingMessage');
        
        // Collect form data
        const formData = {
            service: currentService,
            serviceTitle: serviceTitleEl ? serviceTitleEl.textContent : '',
            duration: selectedDuration + ' minutes',
            date: selectedDate,
            time: selectedTime,
            name: nameEl ? nameEl.value : '',
            email: emailEl ? emailEl.value : '',
            phone: phoneEl ? phoneEl.value : '',
            message: messageEl ? messageEl.value : '',
            timestamp: new Date().toISOString()
        };
        
        // Disable button and show loading
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        responseDiv.style.display = 'none';
        
        try {
            const response = await fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                responseDiv.textContent = 'Appointment request submitted successfully! We will contact you soon to confirm.';
                responseDiv.className = 'form-response success';
                bookingForm.reset();
                
                // Close modal after 3 seconds
                setTimeout(() => {
                    serviceModal.classList.remove('active');
                    showStep(1);
                }, 3000);
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            responseDiv.textContent = 'Error submitting appointment. Please try again or contact us directly.';
            responseDiv.className = 'form-response error';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

// Contact form modal
const contactModal = document.getElementById('contactModal');
const openContactForm = document.getElementById('openContactForm');
const closeContactModal = document.getElementById('closeContactModal');

if (openContactForm) {
    openContactForm.addEventListener('click', () => {
        contactModal.classList.add('active');
    });
}

if (closeContactModal) {
    closeContactModal.addEventListener('click', () => {
        contactModal.classList.remove('active');
    });
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
        serviceModal.classList.remove('active');
    }
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const phoneEl = document.getElementById('phone');
        const companyEl = document.getElementById('company');
        const messageEl = document.getElementById('message');
        
        const formData = {
            name: nameEl ? nameEl.value : '',
            email: emailEl ? emailEl.value : '',
            phone: phoneEl ? phoneEl.value : '',
            company: companyEl ? companyEl.value : '',
            message: messageEl ? messageEl.value : ''
        };

        console.log('Form submitted:', formData);
        alert('Thank you for reaching out! We will get back to you shortly.');
        contactModal.classList.remove('active');
        contactForm.reset();
    });
}

// Carousel functionality
let currentSlide = 0;
const carousel = document.getElementById('carouselInner');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (carousel && dots.length > 0) {
    const totalSlides = dots.length;

    function goToSlide(n) {
        currentSlide = (n + totalSlides) % totalSlides;
        carousel.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
        });
    });

    // Auto-advance carousel every 5 seconds
    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}

// Footer Social Links and Terms/Privacy Modal
document.addEventListener('DOMContentLoaded', function() {
    const termsLink = document.getElementById('termsLink');
    const privacyLink = document.getElementById('privacyLink');
    const termsModal = document.getElementById('termsModal');
    const privacyModal = document.getElementById('privacyModal');
    const closeTermsModal = document.getElementById('closeTermsModal');
    const closePrivacyModal = document.getElementById('closePrivacyModal');

    if (termsLink && termsModal) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.classList.add('active');
        });
    }

    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.classList.add('active');
        });
    }

    if (closeTermsModal && termsModal) {
        closeTermsModal.addEventListener('click', () => {
            termsModal.classList.remove('active');
        });
    }

    if (closePrivacyModal && privacyModal) {
        closePrivacyModal.addEventListener('click', () => {
            privacyModal.classList.remove('active');
        });
    }

    // Close policy modals when clicking outside
    window.addEventListener('click', (e) => {
        if (termsModal && e.target === termsModal) {
            termsModal.classList.remove('active');
        }
        if (privacyModal && e.target === privacyModal) {
            privacyModal.classList.remove('active');
        }
        
    });
// --- ADD THIS NEW CODE --- //

// Handle the "please contact us" link in the policy modals
const policyContactLink = document.getElementById('policyContactLink');
const contactModal = document.getElementById('contactModal'); // We need this again

if (policyContactLink && contactModal) {
    policyContactLink.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the link from jumping to the top

        // Close any open policy modals
        if (termsModal) termsModal.classList.remove('active');
        if (privacyModal) privacyModal.classList.remove('active');

        // Open the contact modal
        contactModal.classList.add('active');
    });
}
// --- ADD THIS NEW CODE --- //

// Handle the "please contact us" link in the Terms modal
const termsContactLink = document.getElementById('termsContactLink');

if (termsContactLink && contactModal && termsModal) {
    termsContactLink.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the link from jumping

        // Close the Terms modal
        termsModal.classList.remove('active');

        // Open the contact modal
        contactModal.classList.add('active');
    });
}

// --- END OF NEW CODE --- //

});

