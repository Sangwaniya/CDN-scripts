(function () {
            var scrollSpeedPercent = (function () {
                var element = document.querySelector('[scrollSpeedPercent]');
                if (element) {
                    var value = parseFloat(element.getAttribute('scrollSpeedPercent'));
                    if (!isNaN(value)) {
                        return value / 100; // Convert percentage to fraction
                    }
                }
                return 0.12; // Default value if not defined
            })(); // Percentage of viewport height to scroll per frame
            var autoScrollEnabled = false;
            var lastScrollY = window.scrollY;
            var requestId;
            var vh = window.innerHeight; // Viewport height in pixels

            function scrollPage() {
                if (autoScrollEnabled) {
                    var scrollAmount = (scrollSpeedPercent / 100) * vh; // Calculate scroll amount based on viewport height percentage
                    window.scrollBy(0, scrollAmount);
                }
                requestId = requestAnimationFrame(scrollPage);
            }

            function startAutoScroll() {
                if (!requestId) {
                    requestId = requestAnimationFrame(scrollPage);
                }
            }

            function stopAutoScroll() {
                if (requestId) {
                    cancelAnimationFrame(requestId);
                    requestId = null;
                }
            }

            function onUserScroll() {
                var currentScrollY = window.scrollY;
                var scrollingDown = currentScrollY > lastScrollY;

                if (scrollingDown) {
                    // Resume auto-scrolling if the user is scrolling down
                    autoScrollEnabled = true;
                    startAutoScroll();
                } else {
                    // Stop auto-scrolling if the user is scrolling up
                    autoScrollEnabled = false;
                    stopAutoScroll();
                }

                // Update last scroll position
                lastScrollY = currentScrollY;
            }

            // Update viewport height on resize
            function updateViewportHeight() {
                vh = window.innerHeight;
            }

            window.addEventListener('resize', updateViewportHeight);
            window.addEventListener('scroll', onUserScroll);
            startAutoScroll();
        })();
