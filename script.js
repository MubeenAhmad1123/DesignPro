// Sticky Navbar
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Fade in on scroll animation
        const fadeElements = document.querySelectorAll('.fade-in');

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        fadeElements.forEach(el => fadeObserver.observe(el));

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Newsletter form submission
        document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input').value;
            if (email) {
                alert('Thank you for subscribing! Check your email for confirmation.');
                e.target.reset();
            }
        });

        // Course card hover effect
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Filter courses
                const filter = this.dataset.filter;
                document.querySelectorAll('.course-card').forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });

        // Countdown Timer Function
        function startCountdown() {
            // Set countdown to 3 days from now
            const countdownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

            const timer = setInterval(function () {
                const now = new Date().getTime();
                const distance = countdownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('days').textContent = String(days).padStart(2, '0');
                document.getElementById('hours').textContent = String(hours).padStart(2, '0');
                document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
                document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

                if (distance < 0) {
                    clearInterval(timer);
                    document.getElementById('countdown').innerHTML = '<h3 style="color: #111827; font-size: 32px;">Offer Ended! Check back for new deals.</h3>';
                }
            }, 1000);
        }

        // Start countdown when page loads
        startCountdown();

        document.addEventListener('DOMContentLoaded', () => {
            const slider = document.querySelector('.testimonial-slider');
            if (!slider) return; // safe-guard

            const wrapper = slider.querySelector('.slider-wrapper');
            const slides = slider.querySelectorAll('.slide');
            const prevBtn = slider.querySelector('.prev-btn');
            const nextBtn = slider.querySelector('.next-btn');
            const dotsContainer = slider.querySelector('.dots-container');

            if (!wrapper || slides.length === 0) return; // nothing to do

            let currentIndex = 0;
            let autoplayInterval = null;
            const autoplayDelay = 4000;

            // create scoped dots
            slides.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('.dot');

            function updateSlider() {
                wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
            }

            function goToSlide(index) {
                currentIndex = index;
                updateSlider();
                resetAutoplay();
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            }

            function startAutoplay() {
                stopAutoplay();
                autoplayInterval = setInterval(nextSlide, autoplayDelay);
            }

            function stopAutoplay() {
                if (autoplayInterval) clearInterval(autoplayInterval);
                autoplayInterval = null;
            }

            function resetAutoplay() {
                stopAutoplay();
                startAutoplay();
            }

            // button listeners (guard in case missing)
            if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
            if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

            // pause on hover
            const sliderContainer = slider.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', stopAutoplay);
                sliderContainer.addEventListener('mouseleave', startAutoplay);
            }

            // init
            updateSlider();
            startAutoplay();
        });
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const original = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
                btn.style.background = '#16A34A';
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = original;
                    btn.style.background = '';
                }, 1600);
            });
        });
    