(function(){
    // Target date: 31 December 2025 23:59:59 (local time)
    const targetDate = new Date('December 31, 2025 23:59:59').getTime();

    // Select the four number elements inside the timer grid
    const daysEl = document.querySelector('.style-43 .style-45');
    const hoursEl = document.querySelector('.style-43 .style-48');
    const minsEl = document.querySelector('.style-43 .style-51');
    const secsEl = document.querySelector('.style-43 .style-54');

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .pulse {
            animation: pulse 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    function updateTimer(){
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            // Timer has ended
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            clearInterval(timerInterval);
            return;
        }

        // Calculate time units
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Update the display with padded numbers
        daysEl.textContent = two(days);
        hoursEl.textContent = two(hours);
        minsEl.textContent = two(minutes);
        secsEl.textContent = two(seconds);

        // Add animation class when seconds change
        secsEl.classList.add('pulse');
        setTimeout(() => secsEl.classList.remove('pulse'), 500);
    }

    // Helper function to pad numbers with leading zero
    function two(n){ 
        return n < 10 ? '0' + n : '' + n; 
    }

    // Start the timer (run immediately and then every second)
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
})();