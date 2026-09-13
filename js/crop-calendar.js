/**
 * AAVARAN - Semester & Exam Countdown Calendar Engine
 * Dynamic Course Switcher, Exam Timetable, Study Checklist & Revision Roadmap
 */

const CROPS_DATABASE = {
    tomato: {
        id: 'tomato',
        name: 'Data Structures (CS101)',
        variety: 'Core Theory + Practical',
        sowingDate: 'Semester Start: 15 Jul',
        currentDay: 45,
        totalDays: 60,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&auto=format&fit=crop&q=80',
        activeStageIndex: 2, // Midterms
        stages: [
            { id: 'sowing', name: 'Arrays & Lists', days: 'Week 1-3', icon: 'fa-cubes' },
            { id: 'vegetative', name: 'Trees & Heaps', days: 'Week 4-6', icon: 'fa-diagram-project' },
            { id: 'flowering', name: 'Midterm Prep', days: 'Week 7 (Current)', icon: 'fa-stopwatch' },
            { id: 'fruiting', name: 'Graphs & DP', days: 'Week 8-11', icon: 'fa-network-wired' },
            { id: 'harvest', name: 'End-Terms', days: 'Week 12-14', icon: 'fa-award' }
        ],
        tasks: [
            { id: 'tom_t1', text: 'Revise Binary Search Tree balancing & rotations', checked: true },
            { id: 'tom_t2', text: 'Solve Dijkstra & Floyd-Warshall graph problems', checked: false },
            { id: 'tom_t3', text: 'Practice 0/1 Knapsack dynamic programming table', checked: true },
            { id: 'tom_t4', text: 'Complete previous year university midterm questions', checked: false }
        ],
        upcoming: [
            { icon: 'fa-pen-to-square', class: 'icon-spray', title: 'Midterm Theory Exam', sub: 'Hall B • 10:00 AM - 12:00 PM', day: 'In 6 Days' },
            { icon: 'fa-laptop-code', class: 'icon-fertilizer', title: 'Data Structures Lab Exam', sub: 'Coding Evaluation (C++ / Java)', day: 'In 10 Days' },
            { icon: 'fa-file-lines', class: 'icon-monitoring', title: 'Assignment 3 Submission', sub: 'AVL Trees implementation report', day: 'In 12 Days' }
        ],
        guide: {
            title: 'Midterm Exam Preparation Guide',
            irrigation: 'Focus on time complexity proofs (Big-O analysis) and recursion tree unrolling.',
            nutrition: 'Write clean pseudocode for QuickSort partition and Heapify operations.',
            protection: 'Practice dry-running algorithms on paper to avoid boundary bugs in final exams.'
        }
    },
    rice: {
        id: 'rice',
        name: 'Operating Systems (CS102)',
        variety: 'System Engineering',
        sowingDate: 'Semester Start: 15 Jul',
        currentDay: 48,
        totalDays: 60,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=80',
        activeStageIndex: 2,
        stages: [
            { id: 'nursery', name: 'Processes', days: 'Week 1-3', icon: 'fa-microchip' },
            { id: 'tillering', name: 'Threads & Sync', days: 'Week 4-6', icon: 'fa-arrows-split-up-and-left' },
            { id: 'panicle', name: 'Midterm Prep', days: 'Week 7 (Current)', icon: 'fa-stopwatch' },
            { id: 'heading', name: 'Deadlocks & Mem', days: 'Week 8-11', icon: 'fa-memory' },
            { id: 'harvest', name: 'End-Terms', days: 'Week 12-14', icon: 'fa-award' }
        ],
        tasks: [
            { id: 'rice_t1', text: 'Solve Banker\'s Algorithm safety state numericals', checked: true },
            { id: 'rice_t2', text: 'Study Peterson\'s algorithm and Semaphore primitives', checked: false },
            { id: 'rice_t3', text: 'Revise Paging, Virtual Memory & TLB miss rates', checked: true },
            { id: 'rice_t4', text: 'Trace process fork() creation trees and PID tables', checked: false }
        ],
        upcoming: [
            { icon: 'fa-pen-to-square', class: 'icon-irrigation', title: 'Operating Systems Exam', sub: 'Lecture Hall A • 02:00 PM', day: 'In 10 Days' },
            { icon: 'fa-laptop-code', class: 'icon-spray', title: 'Linux Bash & POSIX Lab', sub: 'System call fork/exec test', day: 'In 14 Days' },
            { icon: 'fa-file-lines', class: 'icon-fertilizer', title: 'Kernel Module Report', sub: 'Device driver assignment', day: 'In 18 Days' }
        ],
        guide: {
            title: 'Operating Systems Study Strategy',
            irrigation: 'Focus on Producer-Consumer and Dining Philosophers synchronization problems.',
            nutrition: 'Review Page Replacement algorithms (FIFO, LRU, Optimal) numericals carefully.',
            protection: 'Understand race conditions and critical section requirements (Mutual Exclusion, Progress, Bounded Waiting).'
        }
    },
    cotton: {
        id: 'cotton',
        name: 'Database Systems (CS104)',
        variety: 'Enterprise Data',
        sowingDate: 'Semester Start: 15 Jul',
        currentDay: 52,
        totalDays: 60,
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=200&auto=format&fit=crop&q=80',
        activeStageIndex: 2,
        stages: [
            { id: 'emergence', name: 'ER Modeling', days: 'Week 1-3', icon: 'fa-sitemap' },
            { id: 'squaring', name: 'Relational SQL', days: 'Week 4-6', icon: 'fa-database' },
            { id: 'flowering', name: 'Midterm Prep', days: 'Week 7 (Current)', icon: 'fa-stopwatch' },
            { id: 'boll_dev', name: 'Normalization', days: 'Week 8-11', icon: 'fa-table-cells' },
            { id: 'picking', name: 'End-Terms', days: 'Week 12-14', icon: 'fa-award' }
        ],
        tasks: [
            { id: 'cot_t1', text: 'Practice 3NF and BCNF lossless decomposition proofs', checked: true },
            { id: 'cot_t2', text: 'Write complex SQL queries with nested GROUP BY & HAVING', checked: false },
            { id: 'cot_t3', text: 'Study ACID properties and Serializability schedules', checked: true },
            { id: 'cot_t4', text: 'Understand B+ Tree insertion and deletion splits', checked: false }
        ],
        upcoming: [
            { icon: 'fa-pen-to-square', class: 'icon-spray', title: 'DBMS Midterm Test', sub: 'Auditorium • 10:00 AM', day: 'In 14 Days' },
            { icon: 'fa-laptop-code', class: 'icon-fertilizer', title: 'PostgreSQL Practical Lab', sub: 'Stored procedures & triggers', day: 'In 16 Days' },
            { icon: 'fa-file-lines', class: 'icon-monitoring', title: 'Final Database Schema Project', sub: 'Full stack relational backend', day: 'In 20 Days' }
        ],
        guide: {
            title: 'DBMS Revision Strategy',
            irrigation: 'Ensure functional dependency closure calculations are foolproof.',
            nutrition: 'Review Strict 2-Phase Locking (2PL) and Deadlock detection graphs.',
            protection: 'Practice SQL correlated subqueries to maximize marks in the practical exam.'
        }
    }
};

let currentCropId = 'tomato';

document.addEventListener('DOMContentLoaded', function () {
    const cropSelectorBtn = document.getElementById('cc-crop-btn');
    const cropDropdown = document.getElementById('cc-crop-dropdown');
    const cropNameEl = document.getElementById('cc-crop-name');
    const cropVarietyEl = document.getElementById('cc-crop-variety');
    const currentDayEl = document.getElementById('cc-current-day');
    const progressFillEl = document.getElementById('cc-progress-fill');
    const stagesContainerEl = document.getElementById('cc-stages-track');
    const tasksContainerEl = document.getElementById('cc-tasks-list');
    const upcomingContainerEl = document.getElementById('cc-upcoming-list');
    const cropHeroImg = document.getElementById('cc-crop-hero-img');

    function renderCourse() {
        const c = CROPS_DATABASE[currentCropId];
        if (!c) return;

        if (cropNameEl) cropNameEl.textContent = c.name;
        if (cropVarietyEl) cropVarietyEl.textContent = c.variety;
        if (currentDayEl) currentDayEl.textContent = `Week 7 • In 6 Days`;
        if (cropHeroImg) cropHeroImg.src = c.image;

        const pct = Math.min(100, Math.round((c.currentDay / c.totalDays) * 100));
        if (progressFillEl) progressFillEl.style.width = pct + '%';

        // Render Stages
        if (stagesContainerEl) {
            stagesContainerEl.innerHTML = '';
            c.stages.forEach((st, idx) => {
                const isPassed = idx < c.activeStageIndex;
                const isCurrent = idx === c.activeStageIndex;
                const el = document.createElement('div');
                el.className = `cc-stage-step ${isPassed ? 'completed' : ''} ${isCurrent ? 'active' : ''}`;
                el.innerHTML = `
                    <div class="cc-stage-icon-circle">
                        <i class="fa-solid ${st.icon}"></i>
                    </div>
                    <div class="cc-stage-meta">
                        <span class="cc-stage-name">${st.name}</span>
                        <span class="cc-stage-days">${st.days}</span>
                    </div>
                `;
                stagesContainerEl.appendChild(el);
            });
        }

        // Render Tasks
        if (tasksContainerEl) {
            tasksContainerEl.innerHTML = '';
            c.tasks.forEach(t => {
                const el = document.createElement('div');
                el.className = 'cc-task-item';
                el.innerHTML = `
                    <label class="cc-checkbox-label">
                        <input type="checkbox" ${t.checked ? 'checked' : ''} data-id="${t.id}">
                        <span class="cc-checkbox-custom"><i class="fa-solid fa-check"></i></span>
                        <span class="cc-task-text ${t.checked ? 'checked' : ''}">${t.text}</span>
                    </label>
                `;
                tasksContainerEl.appendChild(el);
            });

            tasksContainerEl.querySelectorAll('input[type="checkbox"]').forEach(box => {
                box.addEventListener('change', function () {
                    const txt = this.closest('.cc-task-item').querySelector('.cc-task-text');
                    if (txt) {
                        if (this.checked) txt.classList.add('checked');
                        else txt.classList.remove('checked');
                    }
                });
            });
        }

        // Render Upcoming
        if (upcomingContainerEl) {
            upcomingContainerEl.innerHTML = '';
            c.upcoming.forEach(up => {
                const el = document.createElement('div');
                el.className = 'cc-upcoming-item';
                el.innerHTML = `
                    <div class="cc-upcoming-left">
                        <div class="cc-upcoming-icon ${up.class}">
                            <i class="fa-solid ${up.icon}"></i>
                        </div>
                        <div>
                            <div class="cc-upcoming-title">${up.title}</div>
                            <div class="cc-upcoming-sub">${up.sub}</div>
                        </div>
                    </div>
                    <span class="cc-upcoming-badge">${up.day}</span>
                `;
                upcomingContainerEl.appendChild(el);
            });
        }
    }

    if (cropSelectorBtn) {
        cropSelectorBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (cropDropdown) cropDropdown.classList.toggle('open');
        });
    }

    document.querySelectorAll('.cc-crop-option').forEach(opt => {
        opt.addEventListener('click', function () {
            currentCropId = this.getAttribute('data-crop') || 'tomato';
            if (cropDropdown) cropDropdown.classList.remove('open');
            renderCourse();
        });
    });

    document.addEventListener('click', function () {
        if (cropDropdown) cropDropdown.classList.remove('open');
    });

    renderCourse();
});