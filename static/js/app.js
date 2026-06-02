document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const passengersInput = document.getElementById('passengers');
    const totalPriceCalc = document.getElementById('totalPriceCalc');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    // Update price dynamically
    passengersInput.addEventListener('input', () => {
        let count = parseInt(passengersInput.value) || 1;
        if (count < 1) count = 1;
        if (count > 8) count = 8;
        totalPriceCalc.textContent = `${count * 10}€`;
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset message
        formMessage.className = 'form-message hidden';
        
        // Change button state
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Processing...</span><i class="ph ph-spinner-gap" style="animation: spin 1s linear infinite;"></i>';
        submitBtn.disabled = true;

        const bookingData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            pickup_location: document.getElementById('pickup').value,
            dropoff_location: document.getElementById('dropoff').value,
            travel_date: document.getElementById('date').value,
            travel_time: document.getElementById('time').value,
            passengers: parseInt(document.getElementById('passengers').value)
        };

        try {
            const response = await fetch('/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();

            if (response.ok) {
                formMessage.textContent = 'Booking Confirmed! We will contact you shortly via WhatsApp.';
                formMessage.className = 'form-message success';
                form.reset();
                totalPriceCalc.textContent = '10€';
            } else {
                formMessage.textContent = result.detail || 'Failed to submit booking. Please try again.';
                formMessage.className = 'form-message error';
            }
        } catch (error) {
            formMessage.textContent = 'Network error. Please check your connection.';
            formMessage.className = 'form-message error';
        } finally {
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled = false;
            formMessage.classList.remove('hidden');
        }
    });
});

// Add spin animation dynamically for the loading icon
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
