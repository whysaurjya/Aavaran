(function($) {
    "use strict";

    var $window = $(window);
    var $body = $('body');

    /* Preloader Effect - Bulletproof Dismissal */
    function dismissPreloader() {
        var $preloader = $(".preloader");
        if ($preloader.length && !$preloader.hasClass("is-hidden")) {
            $preloader.addClass("is-hidden").fadeOut(400, function() {
                $(this).css({ display: 'none', visibility: 'hidden' });
            });
        }
    }

    // Dismiss on window load
    $window.on('load', dismissPreloader);

    // Dismiss as soon as document ready or state complete
    $(document).ready(function() {
        if (document.readyState === 'complete') {
            dismissPreloader();
        } else {
            setTimeout(dismissPreloader, 350);
        }
    });

    // Hard fallback: never allow preloader to hang beyond 800ms
    setTimeout(dismissPreloader, 800);

    /* Sticky Header */
    if ($('.active-sticky-header').length) {
        $window.on('resize', function() {
            setHeaderHeight();
        });

        function setHeaderHeight() {
            $("header.main-header").css("height", $('header .header-sticky').outerHeight());
        }

        $(window).on("scroll", function() {
            var fromTop = $(window).scrollTop();
            setHeaderHeight();
            var headerHeight = $('header .header-sticky').outerHeight()
            $("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
            $("header .header-sticky").toggleClass("active", (fromTop > 600));
        });
    }

    /* Slick Menu JS */
    if ($('#menu').length) {
        $('#menu').slicknav({
            label: '',
            prependTo: '.responsive-menu'
        });
    }

    /* Floating bottom navigation active state */
    var $floatingNav = $('.floating-bottom-nav');
    if ($floatingNav.length) {
        var currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        if (!currentPage || currentPage.indexOf('.html') === -1) {
            currentPage = 'index.html';
        }
        $floatingNav.find('.floating-bottom-nav__item').each(function() {
            var href = ($(this).attr('href') || '').toLowerCase();
            if (href === currentPage) {
                $(this).addClass('is-active');
            }
        });
    }

    if ($("a[href='#top']").length) {
        $("a[href='#top']").click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
    }

    /* Hero Slider Layout JS */
    if ($('.hero-slider-layout .swiper').length) {
        const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 4000,
            },
            pagination: {
                el: '.hero-pagination',
                clickable: true,
            },
        });
    }

    /* testimonial Slider JS */
    if ($('.testimonial-slider').length) {
        const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                }
            }
        });
    }

    /* Service Single Image Carousel JS */
    if ($('.service-single-slider').length) {
        const service_single_slider = new Swiper('.service-single-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 10,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.service-single-button-next',
                prevEl: '.service-single-button-prev',
            },
        });
    }

    /* Youtube Background Video JS */
    if ($('#herovideo').length) {
        var myPlayer = $("#herovideo").YTPlayer();
    }

    /* Init Counter */
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 6,
            time: 3000
        });
    }

    /* Image Reveal Animation */
    if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

    /* Text Effect Animation */
    if ($('.text-anime-style-1').length) {
        let staggerAmount = 0.05,
            translateXValue = 0,
            delayValue = 0.5,
            animatedTextElements = document.querySelectorAll('.text-anime-style-1');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.words, {
                duration: 1,
                delay: delayValue,
                x: 20,
                autoAlpha: 0,
                stagger: staggerAmount,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-2').length) {
        let staggerAmount = 0.03,
            translateXValue = 20,
            delayValue = 0.1,
            easeType = "power2.out",
            animatedTextElements = document.querySelectorAll('.text-anime-style-2');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.chars, {
                duration: 1,
                delay: delayValue,
                x: translateXValue,
                autoAlpha: 0,
                stagger: staggerAmount,
                ease: easeType,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-3').length) {
        let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

        animatedTextElements.forEach((element) => {
            //Reset if needed
            if (element.animation) {
                element.animation.progress(1).kill();
                element.split.revert();
            }

            element.split = new SplitText(element, {
                type: "lines,words,chars",
                linesClass: "split-line",
            });
            gsap.set(element, {
                perspective: 400
            });

            gsap.set(element.split.chars, {
                opacity: 0,
                x: "50",
            });

            element.animation = gsap.to(element.split.chars, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%"
                },
                x: "0",
                y: "0",
                rotateX: "0",
                opacity: 1,
                duration: 1,
                ease: Back.easeOut,
                stagger: 0.02,
            });
        });
    }

    /* Parallaxie js */
    var $parallaxie = $('.parallaxie');
    if ($parallaxie.length && ($window.width() > 991)) {
        if ($window.width() > 768) {
            $parallaxie.parallaxie({
                speed: 0.55,
                offset: 0,
            });
        }
    }

    /* Zoom Gallery screenshot */
    $('.gallery-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });

    /* Contact form validation */
    var $contactform = $("#contactForm");
    $contactform.validator({
        focus: false
    }).on("submit", function(event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        /* Initiate Variables With Form Content*/
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var message = $("#msg").val();

        $.ajax({
            type: "POST",
            url: "form-process.php",
            data: "fname=" + fname + "&lname=" + lname + "&email=" + email + "&phone=" + phone + "&message=" + message,
            success: function(text) {
                if (text == "success") {
                    formSuccess();
                } else {
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $contactform[0].reset();
        submitMSG(true, "Message Sent Successfully!")
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-success";
        } else {
            var msgClasses = "h3 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Contact form validation end */

    /* Our Project (filtering) Start */
    $window.on("load", function() {
        if ($(".work-item-boxes").length) {

            /* Init Isotope */
            var $menuitem = $(".work-item-boxes").isotope({
                itemSelector: ".work-item-box",
                layoutMode: "masonry",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                }
            });

            /* Filter items on click */
            var $menudisesnav = $(".our-work-nav li a");
            $menudisesnav.on('click', function(e) {

                var filterValue = $(this).attr('data-filter');
                $menuitem.isotope({
                    filter: filterValue
                });

                $menudisesnav.removeClass("active-btn");
                $(this).addClass("active-btn");
                e.preventDefault();
            });
            $menuitem.isotope({
                filter: "*"
            });
        }
    });
    /* Our Project (filtering) End */

    /* Animated Wow Js */
    new WOW().init();

    /* Popup Video */
    if ($('.popup-video').length) {
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }

})(jQuery);

    /* Floating Bottom Navigation Active State */
    $(document).ready(function() {
        var currentPath = window.location.pathname.split("/").pop();
        if (currentPath === "") {
            currentPath = "index.html";
        }
        $(".floating-bottom-nav__item").each(function() {
            var navPath = $(this).attr("data-nav");
            if (navPath === currentPath) {
                $(this).addClass("is-active");
            }
        });
    });


    /* Scanner Modal Logic */
    $(document).ready(function() {
        $('#scanner-trigger').on('click', function(e) {
            e.preventDefault();
            $('#scanner-modal').addClass('is-active');
        });

        $('#scanner-close').on('click', function() {
            $('#scanner-modal').removeClass('is-active');
        });
    });

    /* App-Inspired Navigation Drawer & Account Menu Sheet Logic */
    $(document).ready(function() {
        var $drawer = $('#nav-drawer');
        var $drawerBackdrop = $('#nav-drawer-backdrop');
        var $drawerOpenBtn = $('#drawer-open-btn');
        var $drawerCloseBtn = $('#nav-drawer-close');

        var $accountSheet = $('#account-sheet');
        var $accountBackdrop = $('#account-sheet-backdrop');
        var $profileOpenBtn = $('#profile-open-btn');
        var $accountCloseBtn = $('#account-sheet-close');

        function openDrawer() {
            closeAccountSheet();
            $drawer.addClass('is-active').attr('aria-hidden', 'false');
            $drawerBackdrop.addClass('is-active');
            $drawerOpenBtn.addClass('is-active').attr('aria-expanded', 'true');
            $('body').addClass('drawer-open');
        }

        function closeDrawer() {
            $drawer.removeClass('is-active').attr('aria-hidden', 'true');
            $drawerBackdrop.removeClass('is-active');
            $drawerOpenBtn.removeClass('is-active').attr('aria-expanded', 'false');
            $('body').removeClass('drawer-open');
        }

        function openAccountSheet() {
            closeDrawer();
            $accountSheet.addClass('is-active').attr('aria-hidden', 'false');
            $accountBackdrop.addClass('is-active');
            $profileOpenBtn.addClass('is-active').attr('aria-expanded', 'true');
        }

        function closeAccountSheet() {
            $accountSheet.removeClass('is-active').attr('aria-hidden', 'true');
            $accountBackdrop.removeClass('is-active');
            $profileOpenBtn.removeClass('is-active').attr('aria-expanded', 'false');
        }

        // Drawer Event Listeners
        if ($drawerOpenBtn.length) {
            $drawerOpenBtn.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if ($drawer.hasClass('is-active')) {
                    closeDrawer();
                } else {
                    openDrawer();
                }
            });
        }

        if ($drawerCloseBtn.length) {
            $drawerCloseBtn.on('click', function(e) {
                e.preventDefault();
                closeDrawer();
            });
        }

        if ($drawerBackdrop.length) {
            $drawerBackdrop.on('click', function() {
                closeDrawer();
            });
        }

        // Account Sheet Event Listeners
        if ($profileOpenBtn.length) {
            $profileOpenBtn.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if ($accountSheet.hasClass('is-active')) {
                    closeAccountSheet();
                } else {
                    openAccountSheet();
                }
            });
        }

        if ($accountCloseBtn.length) {
            $accountCloseBtn.on('click', function(e) {
                e.preventDefault();
                closeAccountSheet();
            });
        }

        if ($accountBackdrop.length) {
            $accountBackdrop.on('click', function() {
                closeAccountSheet();
            });
        }

        // Keyboard navigation (ESC closes open menus)
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                closeDrawer();
                closeAccountSheet();
                $('#scanner-modal').removeClass('is-active');
            }
        });

        // Highlight active page link in nav drawer
        var currentPath = window.location.pathname.split("/").pop() || "index.html";
        $(".nav-drawer__link").each(function() {
            var navPath = $(this).attr("data-nav");
            if (navPath === currentPath) {
                $(this).addClass("is-active");
            }
        });

        // Close drawer on internal hash link click
        $('.nav-drawer__link[href*="#"]').on('click', function() {
            closeDrawer();
        });

        // Interactive demo logout feedback
        $('#logout-demo-btn').on('click', function(e) {
            e.preventDefault();
            var $btn = $(this);
            $btn.html('<i class="fa-solid fa-check"></i> Signed Out');
            setTimeout(function() {
                closeAccountSheet();
                $btn.html('<i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out');
            }, 600);
        });
    });


// ==========================================================================
// Language Switcher Logic in Profile Menu
// ==========================================================================
window.changePlatformLanguage = function(langCode) {
    var langNames = {
        'en': 'English (Default)',
        'hi': 'à¤¹à¤¿à¤¨à¥à¤¦à¥€ (Hindi)',
        'bn': 'à¦¬à¦¾à¦‚à¦²à¦¾ (Bengali)',
        'te': 'à°¤à±†à°²à±à°—à± (Telugu)',
        'ta': 'à®¤à®®à®¿à®´à¯ (Tamil)',
        'mr': 'à¤®à¤°à¤¾à¤ à¥€ (Marathi)'
    };
    var selectedName = langNames[langCode] || 'English (Default)';
    $('#current-lang-label').text(selectedName);
    localStorage.setItem('prahari_language', langCode);

    // Show interactive toast notification
    $('.lang-change-toast').remove();
    var toast = $('<div class="lang-change-toast"><i class="fa-solid fa-circle-check text-success"></i> Language changed to ' + selectedName + '</div>');
    $('body').append(toast);
    setTimeout(function() { toast.addClass('show'); }, 50);
    setTimeout(function() {
        toast.removeClass('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 2400);
};

// Restore saved language preference on load
$(function() {
    var savedLang = localStorage.getItem('prahari_language');
    if (savedLang) {
        $('#profile-lang-select').val(savedLang);
        var langNames = {
            'en': 'English (Default)',
            'hi': 'à¤¹à¤¿à¤¨à¥à¤¦à¥€ (Hindi)',
            'bn': 'à¦¬à¦¾à¦‚à¦²à¦¾ (Bengali)',
            'te': 'à°¤à±†à°²à±à°—à± (Telugu)',
            'ta': 'à®¤à®®à®¿à®´à¯ (Tamil)',
            'mr': 'à¤// ==========================================================================
// Global AAVARAN AI Student Assistant Chatbot Engine
// ==========================================================================
$(function() {
    if (!$('#prahari-ai-chatbot-modal').length) {
        var chatHtml = `
        <div class="prahari-chat-backdrop" id="prahari-chat-backdrop"></div>
        <div class="prahari-chat-modal" id="prahari-ai-chatbot-modal" role="dialog" aria-modal="true">
            <div class="prahari-chat-header">
                <div class="prahari-chat-title-wrap">
                    <div class="prahari-chat-avatar"><i class="fa-solid fa-graduation-cap"></i></div>
                    <div>
                        <div class="prahari-chat-title">AAVARAN Student AI</div>
                        <div class="prahari-chat-status"><span class="prahari-chat-status-dot"></span> Online &bull; 24/7 Academic Assistant</div>
                    </div>
                </div>
                <button type="button" class="prahari-chat-close-btn" id="prahari-chat-close" aria-label="Close Chat"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div class="prahari-chat-body" id="prahari-chat-messages">
                <div class="prahari-msg bot">
                    <div class="prahari-msg-bubble">
                        Hello! 🎓 I am your AAVARAN Student AI Assistant. Ask me about calculating attendance, safe bunk allowances, CGPA/SGPA grade simulation, or scanning lecture notes.
                    </div>
                </div>
            </div>

            <div class="prahari-chat-chips">
                <button type="button" class="prahari-chat-chip" data-q="How to calculate safe bunks?">📚 Calculate Safe Bunks</button>
                <button type="button" class="prahari-chat-chip" data-q="How to simulate target CGPA?">🎯 Target CGPA Simulator</button>
                <button type="button" class="prahari-chat-chip" data-q="Scan lecture notes with AI">📷 AI Note Scanner</button>
                <button type="button" class="prahari-chat-chip" data-q="Track campus expenses">💰 Campus Budget Tracker</button>
            </div>

            <form class="prahari-chat-footer" id="prahari-chat-form">
                <input type="text" id="prahari-chat-input" class="prahari-chat-input" placeholder="Ask any college, attendance, or GPA question..." autocomplete="off">
                <button type="submit" class="prahari-chat-send-btn" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button>
            </form>
        </div>
        `;
        $('body').append(chatHtml);
    }

    var $chatBackdrop = $('#prahari-chat-backdrop');
    var $chatModal = $('#prahari-ai-chatbot-modal');
    var $chatMsgs = $('#prahari-chat-messages');
    var $chatInput = $('#prahari-chat-input');

    function openChat() {
        $chatBackdrop.addClass('is-active');
        $chatModal.addClass('is-active');
        $chatInput.focus();
    }

    function closeChat() {
        $chatBackdrop.removeClass('is-active');
        $chatModal.removeClass('is-active');
    }

    $(document).on('click', '.prahari-chatbot-trigger, a[href="#ai-chatbot-modal"]', function(e) {
        e.preventDefault();
        openChat();
    });

    $(document).on('click', '#prahari-chat-close, #prahari-chat-backdrop', function() {
        closeChat();
    });

    function botReply(text) {
        var reply = "For precise academic planning, explore our Attendance Forecaster, CGPA Simulator, and Note Scanner!";
        var q = text.toLowerCase();
        
        if (q.includes('attendance') || q.includes('bunk') || q.includes('shortage') || q.includes('75%') || q.includes('class')) {
            reply = "To maintain 75% attendance without shortage, use our Attendance Forecaster. Enter your conducted and attended lectures to simulate allowed bunks.<br><br><a href='fertilizer-calculator.html' style='color:#034bb9; font-weight:700; text-decoration:underline;'>Open Attendance Calculator &rarr;</a>";
        } else if (q.includes('cgpa') || q.includes('sgpa') || q.includes('grade') || q.includes('credit') || q.includes('gpa')) {
            reply = "You can simulate semester credit weightings and find out what grades you need in upcoming midterms/finals to reach an 8.5+ CGPA.<br><br><a href='pesticide-calculator.html' style='color:#034bb9; font-weight:700; text-decoration:underline;'>Open CGPA Simulator &rarr;</a>";
        } else if (q.includes('note') || q.includes('scan') || q.includes('ocr') || q.includes('summary') || q.includes('formula')) {
            reply = "Capture handwritten notes, textbook diagrams, or whiteboard slides. AAVARAN's OCR pipeline extracts formulas and generates bullet study guides instantly.<br><br><a href='#scanner-modal' class='scanner-trigger-btn' style='color:#034bb9; font-weight:700; text-decoration:underline;'>Launch AI Note Scanner &rarr;</a>";
        } else if (q.includes('expense') || q.includes('budget') || q.includes('money') || q.includes('canteen') || q.includes('mess')) {
            reply = "Track your mess fees, hostel rent, textbooks, and daily transit with our student spending analytics.<br><br><a href='farm-expenses.html' style='color:#034bb9; font-weight:700; text-decoration:underline;'>Open Campus Expense Tracker &rarr;</a>";
        } else if (q.includes('exam') || q.includes('assignment') || q.includes('deadline') || q.includes('timetable')) {
            reply = "Check your upcoming exam countdowns, practical dates, and submission milestones.<br><br><a href='crop-calendar.html' style='color:#034bb9; font-weight:700; text-decoration:underline;'>Open Exam Timetable &rarr;</a>";
        }

        setTimeout(function() {
            $chatMsgs.append('<div class="prahari-msg bot"><div class="prahari-msg-bubble">' + reply + '</div></div>');
            $chatMsgs.scrollTop($chatMsgs[0].scrollHeight);
        }, 450);
    }

    $(document).on('submit', '#prahari-chat-form', function(e) {
        e.preventDefault();
        var txt = $chatInput.val().trim();
        if (!txt) return;
        $chatMsgs.append('<div class="prahari-msg user"><div class="prahari-msg-bubble">' + txt + '</div></div>');
        $chatInput.val('');
        $chatMsgs.scrollTop($chatMsgs[0].scrollHeight);
        botReply(txt);
    });

    $(document).on('click', '.prahari-chat-chip', function() {
        var q = $(this).attr('data-q');
        $chatInput.val(q);
        $('#prahari-chat-form').trigger('submit');
    });
});