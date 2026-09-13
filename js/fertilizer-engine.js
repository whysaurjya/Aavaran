/**
 * AAVARAN - Attendance & Bunk Intelligence Engine
 * Precision Academic Calculation Engine
 */

document.addEventListener('DOMContentLoaded', function () {
    // Subject Course Presets
    const SUBJECT_PRESETS = {
        cs101: { name: 'Data Structures & Algorithms', conducted: 38, attended: 33, credits: 4 },
        cs102: { name: 'Operating Systems', conducted: 34, attended: 30, credits: 4 },
        cs103: { name: 'Computer Networks', conducted: 30, attended: 24, credits: 3 },
        cs104: { name: 'Database Management Systems', conducted: 36, attended: 32, credits: 4 },
        cs105: { name: 'Discrete Mathematics', conducted: 40, attended: 30, credits: 3 },
        cs106: { name: 'Software Engineering Lab', conducted: 20, attended: 19, credits: 2 }
    };

    // Elements
    const subjectSelect = document.getElementById('fc-crop-select');
    const totalClassesInput = document.getElementById('fc-area-input');
    const attendedClassesInput = document.getElementById('fc-attended-input');
    const targetPctSelect = document.getElementById('fc-unit-select');
    const calculateBtn = document.getElementById('fc-calculate-btn');
    const resetBtn = document.getElementById('fc-reset-btn');
    const presetButtons = document.querySelectorAll('.fc-preset-btn');

    // Output Elements
    const attendancePctDisplay = document.getElementById('fc-res-urea');
    const statusPillDisplay = document.getElementById('fc-res-dap');
    const allowedBunkDisplay = document.getElementById('fc-res-mop');
    const catchupDisplay = document.getElementById('fc-res-advisory');
    const summaryCard = document.getElementById('fc-summary-card');

    let currentTargetPct = 75;

    // Preset Target Button click
    presetButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            presetButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const targetVal = parseFloat(this.getAttribute('data-preset'));
            if (!isNaN(targetVal)) {
                currentTargetPct = targetVal;
                if (targetPctSelect) targetPctSelect.value = targetVal.toString();
                computeAttendance();
            }
        });
    });

    if (targetPctSelect) {
        targetPctSelect.addEventListener('change', function () {
            currentTargetPct = parseFloat(this.value) || 75;
            presetButtons.forEach(b => {
                if (parseFloat(b.getAttribute('data-preset')) === currentTargetPct) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
            computeAttendance();
        });
    }

    if (subjectSelect) {
        subjectSelect.addEventListener('change', function () {
            const course = SUBJECT_PRESETS[this.value];
            if (course) {
                if (totalClassesInput) totalClassesInput.value = course.conducted;
                if (attendedClassesInput) attendedClassesInput.value = course.attended;
                computeAttendance();
            }
        });
    }

    function computeAttendance() {
        const total = parseFloat(totalClassesInput ? totalClassesInput.value : 0) || 0;
        const attended = parseFloat(attendedClassesInput ? attendedClassesInput.value : 0) || 0;
        const target = currentTargetPct || 75;

        if (total <= 0) {
            if (attendancePctDisplay) attendancePctDisplay.textContent = '0.0%';
            return;
        }

        const validAttended = Math.min(attended, total);
        const currentPct = (validAttended / total) * 100;

        if (attendancePctDisplay) {
            attendancePctDisplay.textContent = currentPct.toFixed(1) + '%';
        }

        const targetDecimal = target / 100;

        if (currentPct >= target) {
            // Can afford to miss classes
            // (validAttended) / (total + X) >= targetDecimal  =>  X <= (validAttended - targetDecimal * total) / targetDecimal
            const allowedBunks = Math.floor((validAttended - targetDecimal * total) / targetDecimal);
            if (allowedBunkDisplay) {
                allowedBunkDisplay.innerHTML = `<span style="color:#034bb9; font-weight:800; font-size:20px;">${allowedBunks}</span> Classes`;
            }
            if (statusPillDisplay) {
                statusPillDisplay.innerHTML = `<span style="background:#EFF6FF; color:#034bb9; padding:4px 10px; border-radius:999px; font-weight:700; font-size:12px;">Safe &bull; Above ${target}% Target</span>`;
            }
            if (catchupDisplay) {
                catchupDisplay.innerHTML = `<div style="color:#034bb9; font-size:13px; line-height:1.5;">
                    <i class="fa-solid fa-circle-check" style="color:#2563EB; margin-right:6px;"></i>
                    <strong>Safe Attendance Zone!</strong> You can safely miss up to <strong>${allowedBunks} more classes</strong> while staying above your ${target}% requirement.
                </div>`;
            }
        } else {
            // Need to attend consecutive classes
            // (validAttended + Y) / (total + Y) >= targetDecimal => Y >= (targetDecimal * total - validAttended) / (1 - targetDecimal)
            const neededClasses = Math.ceil((targetDecimal * total - validAttended) / (1 - targetDecimal));
            if (allowedBunkDisplay) {
                allowedBunkDisplay.innerHTML = `<span style="color:#DC2626; font-weight:800; font-size:20px;">0</span> Classes (Shortage)`;
            }
            if (statusPillDisplay) {
                statusPillDisplay.innerHTML = `<span style="background:#FEE2E2; color:#DC2626; padding:4px 10px; border-radius:999px; font-weight:700; font-size:12px;">Attendance Shortage &bull; Alert</span>`;
            }
            if (catchupDisplay) {
                catchupDisplay.innerHTML = `<div style="color:#991B1B; font-size:13px; line-height:1.5;">
                    <i class="fa-solid fa-triangle-exclamation" style="color:#EF4444; margin-right:6px;"></i>
                    <strong>Action Required:</strong> You must attend the next <strong>${neededClasses} consecutive classes</strong> without absence to reach your ${target}% minimum requirement.
                </div>`;
            }
        }
    }

    if (totalClassesInput) totalClassesInput.addEventListener('input', computeAttendance);
    if (attendedClassesInput) attendedClassesInput.addEventListener('input', computeAttendance);
    if (calculateBtn) calculateBtn.addEventListener('click', computeAttendance);

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            if (totalClassesInput) totalClassesInput.value = 40;
            if (attendedClassesInput) attendedClassesInput.value = 34;
            currentTargetPct = 75;
            computeAttendance();
        });
    }

    // Initial calculation
    computeAttendance();
});