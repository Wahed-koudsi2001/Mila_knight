(function ($) {
    "use strict";

    const mainHeader = document.querySelector('.main-header');

    // Add a scroll event listener to the window
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            mainHeader.classList.add('active');
        } else {
            mainHeader.classList.remove('active');
        }
    });

    var $window = $(window);
    var $body = $('body');

    /* Preloader Effect */
    $window.on('load', function () {
        $(".preloader").fadeOut(600);
    });

    /* Sticky Header */
    if ($('.active-sticky-header').length) {
        $window.on('resize', function () {
            setHeaderHeight();
        });

        function setHeaderHeight() {
            $("header.main-header").css("height", $('header .header-sticky').outerHeight());
        }

        $(window).on("scroll", function () {
            var fromTop = $(window).scrollTop();
            setHeaderHeight();
            var headerHeight = $('header .header-sticky').outerHeight()
            $("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
            $("header .header-sticky").toggleClass("active", (fromTop > 600));
        });
    }

    /* Slick Menu JS */
    $('#menu').slicknav({
        label: '',
        prependTo: '.responsive-menu'
    });

    if ($("a[href='#top']").length) {
        $("a[href='#top']").click(function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    }

    /* Typed subtitle */
    if ($('.typed-title').length) {
        $('.typed-title').typed({
            stringsElement: $('.typing-title'),
            backDelay: 2000,
            typeSpeed: 0,
            loop: true
        });
    }

    /* Hero Slider Layout JS */
    const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
        effect: 'fade',
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

    /* testimonial Slider JS */
    if ($('.testimonial-slider').length) {
        const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
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

    /* Youtube Background Video JS */
    if ($('#herovideo').length) {
        var myPlayer = $("#herovideo").YTPlayer();
    }

    /* Init Counter */
    if ($('.counter').length) {
        $('.counter').counterUp({ delay: 6, time: 3000 });
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
            gsap.set(element, { perspective: 400 });

            gsap.set(element.split.chars, {
                opacity: 0,
                x: "50",
            });

            element.animation = gsap.to(element.split.chars, {
                scrollTrigger: { trigger: element, start: "top 90%" },
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
            opener: function (element) {
                return element.find('img');
            }
        }
    });

    /* Contact form validation */
    var $contactform = $("#contactForm");
    $contactform.validator({ focus: false }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-process.php",
            data: $contactform.serialize(),
            success: function (text) {
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
            var msgClasses = "h4 text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Contact form validation end */

    /* Our Project (filtering) Start */
    $window.on("load", function () {
        if ($(".project-item-boxes").length) {

            /* Init Isotope */
            var $menuitem = $(".project-item-boxes").isotope({
                itemSelector: ".project-item-box",
                layoutMode: "masonry",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                }
            });

            /* Filter items on click */
            var $menudisesnav = $(".our-Project-nav li a");
            $menudisesnav.on('click', function (e) {

                var filterValue = $(this).attr('data-filter');
                $menuitem.isotope({
                    filter: filterValue
                });

                $menudisesnav.removeClass("active-btn");
                $(this).addClass("active-btn");
                e.preventDefault();
            });
            $menuitem.isotope({ filter: "*" });
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

    /* Popup Images */
    if ($('.popup-image').length) {
        $('.popup-image').magnificPopup({
            type: 'image',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }

    /* Why Choose us active Start */
    if ($('.why-choose-content').length) {
        var element = $('.why-choose-content');
        var items = element.find('.why-choose-item');
        if (items.length) {
            items.on({
                mouseenter: function () {
                    if ($(this).hasClass('active')) return;

                    items.removeClass('active');
                    $(this).addClass('active');

                },
                mouseleave: function () {
                    //stuff to do on mouse leave
                }
            });
        }
    }
    /* Why Choose us active End */


    $(document).ready(function () {
        "use strict";

        //Scroll back to top

        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress');
            } else {
                jQuery('.progress-wrap').removeClass('active-progress');
            }
        });
        jQuery('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        })
    });

    // $(document).ready(function () {
    //     // Disable Ctrl+U
    //     $(document).on("keydown", function (event) {
    //         if (event.ctrlKey && event.key.toLowerCase() === "u") {
    //             event.preventDefault();
    //             alert("View Source is disabled!");
    //         }
    //         // Disable Ctrl+Shift+I (Developer Tools)
    //         if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") {
    //             event.preventDefault();
    //             alert("Developer Tools are disabled!");
    //         }
    //         // Disable Ctrl+Shift+C (Inspect Element)
    //         if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c") {
    //             event.preventDefault();
    //             alert("Inspect Element is disabled!");
    //         }
    //         // Disable F12 (Developer Tools)
    //         if (event.key === "F12") {
    //             event.preventDefault();
    //             alert("Developer Tools are disabled!");
    //         }
    //     });

    //     // Disable right-click
    //     $(document).on("contextmenu", function (event) {
    //         event.preventDefault();
    //         alert("Right-click is disabled!");
    //     });
    // });


    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.breadcrumb-item.active').forEach(item => {
            const text = item.textContent.trim();
            if (text.length > 23) {
                item.textContent = text.slice(0, 23) + '...';
            }
        });
    });

    // Select all 'getQuote' links and the popup
    const getQuoteLinks = document.querySelectorAll('.getQuote'); // Trigger links
    const orderPopup = document.querySelector('.order-popup'); // The popup container
    const contactForm = document.querySelector('.contact-us-form'); // The form itself
    const overlay = document.querySelector('.overlay'); // The overlay

    // Function to open the popup
    getQuoteLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            orderPopup.style.display = 'block'; // Show the popup
            overlay.style.display = 'block'; // Show the overlay
        });
    });

    // Close the overlay when it's clicked
    overlay.addEventListener('click', function () {
        orderPopup.style.display = 'none'; // Hide the popup
        overlay.style.display = 'none'; // Hide the overlay
    });

    // Prevent the popup from closing when clicking inside the form
    contactForm.addEventListener('click', function (event) {
        event.stopPropagation(); // Stop the event from bubbling up
    });


    document.addEventListener("DOMContentLoaded", function () {
        // Select all pricing boxes
        const pricingBoxes = document.querySelectorAll(".box-pricing");

        pricingBoxes.forEach((box) => {
            const list = box.querySelector("ul"); // Get the <ul> inside the box
            const items = list.querySelectorAll("li"); // Get all <li> elements in the <ul>
            const readMoreBtn = box.querySelector(".read-more"); // Get the Read More button

            // Check if there are more than 5 <li> items
            if (items.length > 5) {
                // Hide all items beyond the 5th
                for (let i = 5; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                // Add a click event listener to the "Read More" button
                readMoreBtn.addEventListener("click", function () {
                    const isExpanded = items[5].style.display === "list-item";

                    // Toggle visibility of extra items
                    for (let i = 5; i < items.length; i++) {
                        items[i].style.display = isExpanded ? "none" : "list-item";
                    }

                    // Change button text
                    readMoreBtn.textContent = isExpanded ? "اقرأ المزيد" : "اقرأ أقل";
                });
            } else {
                // If there are 5 or fewer items, hide the Read More button
                readMoreBtn.style.display = "none";
            }
        });
    });


})(jQuery);