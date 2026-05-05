document.addEventListener("DOMContentLoaded", function() {
    // Dynamic year for footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Telegram form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Format message for Telegram
            const text = `
*New Inquiry: Jothi Solar Solutions*
*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email || 'Not provided'}
*Service:* ${service || 'Not selected'}
*Message:*
${message}
            `;

            const token = '8482420548:AAFFIU1fv3o2uYkPobZ74HL3GkuXngqqydA';
            // You need your chat ID here. For now, this requires the user to input their chat ID.
            const chatId = 'YOUR_CHAT_ID_HERE'; 
            const url = `https://api.telegram.org/bot${token}/sendMessage`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'Markdown'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert('Thank you for contacting Jothi Solar Solutions. Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    alert('Oops! Something went wrong while sending your message. Please try calling us instead.');
                    console.error('Telegram API Error:', data);
                }
            })
            .catch(error => {
                alert('Oops! Something went wrong. Please check your internet connection or call us directly.');
                console.error('Fetch Error:', error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        });
    }
});
