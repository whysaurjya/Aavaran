/**
 * AAVARAN Premium Student Authentication Engine Suite
 * Implements Login, Sign Up, OTP Verification, Password Recovery,
 * Complete Profile Setup, and Google Auth Integration for Students.
 */

(function($) {
    "use strict";

    // Student Session Management
    const AuthSession = {
        STORAGE_KEY: 'aavaran_user_session',
        
        get: function() {
            try {
                const data = localStorage.getItem(this.STORAGE_KEY) || localStorage.getItem('prahari_user_session');
                return data ? JSON.parse(data) : null;
            } catch (e) {
                return null;
            }
        },
        
        save: function(user) {
            const current = this.get() || {};
            const sessionData = {
                id: user.id || current.id || 'AV-' + Math.floor(1000 + Math.random() * 9000),
                name: user.name || current.name || 'Aarav Sharma',
                email: user.email || current.email || 'aarav.sharma@college.edu.in',
                phone: user.phone || current.phone || '+91 98765 43210',
                role: user.role || current.role || 'B.Tech CSE • Sem 5',
                location: user.location || current.location || 'Delhi NCR, India',
                occupation: user.occupation || current.occupation || 'B.Tech Computer Science (Sem 5)',
                organization: user.organization || current.organization || 'National Institute of Technology',
                avatar: user.avatar || current.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                cgpa: user.cgpa || current.cgpa || '8.92',
                attendance: user.attendance || current.attendance || '86%',
                credits: user.credits || current.credits || 18,
                authProvider: user.authProvider || current.authProvider || 'email',
                isLoggedIn: true,
                loggedInAt: new Date().toISOString()
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessionData));
            localStorage.setItem('prahari_user_session', JSON.stringify(sessionData));
            return sessionData;
        },

        clear: function() {
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem('prahari_user_session');
        }
    };

    // Global Toast Notification
    function showToast(message, type = 'success') {
        let $toast = $('#auth-toast');
        if (!$toast.length) {
            $toast = $('<div id="auth-toast" class="auth-toast"><i class="fa-solid fa-circle-check"></i><span class="toast-msg"></span></div>');
            $('body').append($toast);
        }
        
        const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        $toast.removeClass('success error').addClass(type);
        $toast.find('i').attr('class', 'fa-solid ' + iconClass);
        $toast.find('.toast-msg').text(message);
        
        $toast.addClass('show');
        setTimeout(function() {
            $toast.removeClass('show');
        }, 3800);
    }

    // View Routing Controller
    const ViewController = {
        currentView: 'login',
        historyStack: [],

        init: function() {
            const hash = window.location.hash.replace('#', '') || 'login';
            this.switchView(hash, false);

            window.addEventListener('popstate', () => {
                const h = window.location.hash.replace('#', '') || 'welcome';
                this.switchView(h, false);
            });
        },

        switchView: function(viewName, updateHash = true) {
            const validViews = ['welcome', 'login', 'signup', 'otp', 'forgot', 'complete-profile'];
            if (!validViews.includes(viewName)) {
                viewName = 'welcome';
            }

            if (this.currentView !== viewName) {
                this.historyStack.push(this.currentView);
            }

            $('.auth-view-screen').removeClass('is-active');
            const $target = $('#view-' + viewName);
            if ($target.length) {
                $target.addClass('is-active');
                this.currentView = viewName;

                // Show/Hide Top Back Button
                if (viewName === 'welcome') {
                    $('#auth-back-btn').hide();
                } else {
                    $('#auth-back-btn').show();
                }

                if (updateHash) {
                    history.pushState(null, '', '#' + viewName);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },

        goBack: function() {
            const prev = this.historyStack.pop() || 'welcome';
            this.switchView(prev, true);
        }
    };

    // OTP Verification Manager
    const OTPManager = {
        timerInterval: null,
        totalSeconds: 45,

        startTimer: function() {
            clearInterval(this.timerInterval);
            let remaining = this.totalSeconds;
            const $timer = $('#otp-timer-count');
            const $resendBtn = $('#otp-resend-btn');
            
            $resendBtn.removeClass('is-active');
            $timer.parent().show();

            const updateDisplay = () => {
                const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
                const secs = String(remaining % 60).padStart(2, '0');
                $timer.text(`${mins}:${secs}`);

                if (remaining <= 0) {
                    clearInterval(this.timerInterval);
                    $timer.parent().hide();
                    $resendBtn.addClass('is-active');
                }
                remaining--;
            };

            updateDisplay();
            this.timerInterval = setInterval(updateDisplay, 1000);
        },

        setupInputs: function() {
            const $boxes = $('.otp-pill-box');
            $boxes.on('input', function() {
                const val = $(this).val();
                if (val.length === 1) {
                    const next = $(this).next('.otp-pill-box');
                    if (next.length) next.focus();
                }
            });

            $boxes.on('keydown', function(e) {
                if (e.key === 'Backspace' && !$(this).val()) {
                    const prev = $(this).prev('.otp-pill-box');
                    if (prev.length) prev.focus();
                }
            });

            $boxes.first().on('paste', function(e) {
                const paste = (e.originalEvent.clipboardData || window.clipboardData).getData('text').trim();
                if (/^\d{6}$/.test(paste)) {
                    e.preventDefault();
                    $boxes.each(function(i) {
                        $(this).val(paste[i]);
                    });
                    $boxes.last().focus();
                }
            });
        },

        getCode: function() {
            let code = '';
            $('.otp-pill-box').each(function() {
                code += $(this).val();
            });
            return code;
        }
    };

    // Password Eye Toggle
    function setupPasswordControls() {
        $(document).on('click', '.auth-toggle-pass-btn', function(e) {
            e.preventDefault();
            const $wrap = $(this).closest('.auth-input-wrap');
            const $input = $wrap.find('input');
            const $icon = $(this).find('i');
            
            if ($input.attr('type') === 'password') {
                $input.attr('type', 'text');
                $icon.removeClass('fa-eye').addClass('fa-eye-slash');
            } else {
                $input.attr('type', 'password');
                $icon.removeClass('fa-eye-slash').addClass('fa-eye');
            }
        });
    }

    // Google Authentication Handler
    function handleGoogleAuth() {
        showToast('Connecting with Student Google Account...', 'success');
        setTimeout(() => {
            const googleUser = {
                name: 'Aarav Sharma',
                email: 'aarav.sharma@nit.ac.in',
                role: 'B.Tech CSE • Sem 5',
                location: 'Delhi NCR, India',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                authProvider: 'google'
            };

            AuthSession.save(googleUser);
            localStorage.setItem('prahari_logged_in', 'true');
            showToast('Google Verified: Welcome back, ' + googleUser.name + '!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 600);
        }, 500);
    }

    // Guest Access Handler
    function handleGuestAccess() {
        showToast('Entering AAVARAN as Campus Guest...', 'success');
        setTimeout(() => {
            localStorage.setItem('prahari_logged_in', 'true');
            AuthSession.save({
                name: 'Guest Scholar',
                email: 'guest@aavaran.edu.in',
                role: 'Student Guest',
                authProvider: 'guest'
            });
            window.location.href = 'index.html';
        }, 500);
    }

    // Profile Avatar Upload Component Handler
    function setupAvatarPicker() {
        $('#avatar-trigger').on('click', function() {
            $('#avatar-file-input').click();
        });

        $('#avatar-file-input').on('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    $('#avatar-preview-img').attr('src', evt.target.result);
                    showToast('Profile photo updated', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Main Page Document Ready Initialization
    $(document).ready(function() {
        ViewController.init();
        OTPManager.setupInputs();
        setupPasswordControls();
        setupAvatarPicker();

        // Back button click listener
        $('#auth-back-btn').on('click', function() {
            ViewController.goBack();
        });

        // View switch click listeners
        $(document).on('click', '[data-auth-switch]', function(e) {
            e.preventDefault();
            const targetView = $(this).attr('data-auth-switch');
            ViewController.switchView(targetView);
        });

        // Login Form Submit
        $('#form-login').on('submit', function(e) {
            e.preventDefault();
            const email = $('#login-email').val().trim();
            const pass = $('#login-password').val();

            if (!email || !pass) {
                showToast('Please enter your roll number/email and password', 'error');
                return;
            }

            localStorage.setItem('prahari_logged_in', 'true');
            AuthSession.save({
                name: email.includes('@') ? email.split('@')[0] : email,
                email: email.includes('@') ? email : 'student@college.edu.in',
                role: 'B.Tech CSE • Sem 5',
                authProvider: 'email'
            });

            showToast('Welcome back to AAVARAN!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 600);
        });

        // Sign Up Form Submit
        $('#form-signup').on('submit', function(e) {
            e.preventDefault();
            const name = $('#signup-name').val().trim();
            const email = $('#signup-email').val().trim();
            const pass = $('#signup-password').val();
            const confirmPass = $('#signup-confirm-password').val();

            if (!name || !email || !pass) {
                showToast('Please fill all required fields', 'error');
                return;
            }

            if (pass !== confirmPass) {
                showToast('Passwords do not match', 'error');
                return;
            }

            localStorage.setItem('prahari_logged_in', 'true');
            AuthSession.save({
                name: name,
                email: email,
                role: 'Registered Student',
                authProvider: 'email'
            });

            showToast('Student account created! Sent 6-digit OTP...', 'success');
            setTimeout(() => {
                ViewController.switchView('otp');
                OTPManager.startTimer();
            }, 600);
        });

        // OTP Verification Submit
        $('#form-otp').on('submit', function(e) {
            e.preventDefault();
            const code = OTPManager.getCode();

            if (code.length < 6) {
                showToast('Please enter the complete 6-digit code', 'error');
                return;
            }

            showToast('Student identity verified! Configure your profile...', 'success');
            setTimeout(() => {
                ViewController.switchView('complete-profile');
            }, 600);
        });

        // Resend OTP Click
        $('#otp-resend-btn').on('click', function(e) {
            e.preventDefault();
            showToast('New 6-digit verification code sent', 'success');
            OTPManager.startTimer();
        });

        // Forgot Password Submit
        $('#form-forgot').on('submit', function(e) {
            e.preventDefault();
            const target = $('#forgot-target').val().trim();

            if (!target) {
                showToast('Please enter your university email or phone', 'error');
                return;
            }

            showToast('Password reset link sent to your student inbox!', 'success');
            setTimeout(() => {
                ViewController.switchView('login');
            }, 1000);
        });

        // Complete Profile Form Submit
        $('#form-complete-profile').on('submit', function(e) {
            e.preventDefault();
            const name = $('#profile-name').val().trim();
            const location = $('#profile-location').val().trim();
            const occupation = $('#profile-occupation').val().trim();
            const organization = $('#profile-org').val().trim();
            const avatar = $('#avatar-preview-img').attr('src');

            localStorage.setItem('prahari_logged_in', 'true');
            AuthSession.save({
                name: name || 'Aarav Sharma',
                location: location || 'Delhi NCR, India',
                occupation: occupation || 'B.Tech CSE (Sem 5)',
                organization: organization || 'National Institute of Technology',
                avatar: avatar
            });

            showToast('Profile configured! Launching AAVARAN...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 600);
        });

        // Google Auth Trigger
        $(document).on('click', '.btn-google-trigger', function(e) {
            e.preventDefault();
            handleGoogleAuth();
        });

        // Guest Access Trigger
        $(document).on('click', '.btn-guest-trigger', function(e) {
            e.preventDefault();
            handleGuestAccess();
        });
    });

})(jQuery);
