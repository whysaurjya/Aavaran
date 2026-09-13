/**
 * AAVARAN - Student Expense Tracker Engine
 * Dynamic Donut Chart, Student Budget Categories, Add New Month & LocalStorage CRUD
 */

// Category Palette Configuration for Student Life
const CATEGORIES = {
    fertilizer: { name: 'Books & Supplies', color: '#3B82F6', icon: 'fa-book', class: 'icon-fertilizer' },
    pesticide: { name: 'Mess & Food', color: '#F59E0B', icon: 'fa-utensils', class: 'icon-pesticide' },
    labor: { name: 'Tuition & Courses', color: '#034bb9', icon: 'fa-graduation-cap', class: 'icon-labor' },
    irrigation: { name: 'Hostel & Rent', color: '#06B6D4', icon: 'fa-building', class: 'icon-irrigation' },
    diesel: { name: 'Travel & Metro', color: '#EF4444', icon: 'fa-bus', class: 'icon-diesel' },
    others: { name: 'Subscriptions & Misc', color: '#8B5CF6', icon: 'fa-film', class: 'icon-others' }
};

// Initial Default Dataset for College Students
const DEFAULT_EXPENSES_DATA = {
    'September 2026': [
        { id: 'exp_1', title: 'Data Structures Textbook & Notes', category: 'fertilizer', amount: 1250, date: '10 Sep' },
        { id: 'exp_2', title: 'Monthly Mess & Canteen Meals', category: 'pesticide', amount: 3200, date: '08 Sep' },
        { id: 'exp_3', title: 'AWS Cloud Certification Voucher', category: 'labor', amount: 1800, date: '05 Sep' },
        { id: 'exp_4', title: 'Hostel Room & Wi-Fi Share', category: 'irrigation', amount: 3500, date: '01 Sep' },
        { id: 'exp_5', title: 'Campus Metro Rail Pass', category: 'diesel', amount: 650, date: '02 Sep' },
        { id: 'exp_6', title: 'Notion & Spotify Student Subs', category: 'others', amount: 499, date: '03 Sep' },
        { id: 'exp_7', title: 'Lab Record Sheets & Stationary', category: 'fertilizer', amount: 340, date: '06 Sep' },
        { id: 'exp_8', title: 'Evening Coffee & Study Snacks', category: 'pesticide', amount: 560, date: '09 Sep' }
    ],
    'August 2026': [
        { id: 'exp_aug_1', title: 'Semester Registration Fee', category: 'labor', amount: 4500, date: '25 Aug' },
        { id: 'exp_aug_2', title: 'Reference Handbooks', category: 'fertilizer', amount: 1600, date: '22 Aug' },
        { id: 'exp_aug_3', title: 'Hostel Advance Deposit', category: 'irrigation', amount: 3500, date: '15 Aug' },
        { id: 'exp_aug_4', title: 'Campus Canteen Card Recharge', category: 'pesticide', amount: 2800, date: '10 Aug' },
        { id: 'exp_aug_5', title: 'Local Bus Travel Pass', category: 'diesel', amount: 600, date: '05 Aug' }
    ]
};

const STORAGE_KEY = 'aavaran_student_expenses_v1';

function loadAllExpenses() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading expenses:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_EXPENSES_DATA));
}

function saveAllExpenses(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving expenses:', e);
    }
}

let allExpenses = loadAllExpenses();
let currentMonth = 'September 2026';
let selectedCategoryForNewExpense = 'fertilizer';

document.addEventListener('DOMContentLoaded', function () {
    const monthSelectorBtn = document.getElementById('fet-month-btn');
    const monthSelectorText = document.getElementById('fet-month-text');
    const monthDropdown = document.getElementById('fet-month-dropdown');
    const monthOptionsList = document.getElementById('fet-month-options-list');
    const addMonthTrigger = document.getElementById('fet-add-month-trigger');
    
    const totalAmountEl = document.getElementById('fet-total-amount');
    const donutSvgEl = document.getElementById('fet-donut-svg');
    const legendListEl = document.getElementById('fet-legend-list');
    const entriesListEl = document.getElementById('fet-entries-list');
    const entriesCountEl = document.getElementById('fet-entries-count');
    
    // Add Expense Modal Elements
    const addExpenseBtn = document.getElementById('fet-add-expense-btn');
    const modalBackdrop = document.getElementById('fet-modal-backdrop');
    const modalSheet = document.getElementById('fet-modal-sheet');
    const modalCloseBtn = document.getElementById('fet-modal-close-btn');
    const saveExpenseSubmitBtn = document.getElementById('fet-save-expense-btn');
    const catPillButtons = document.querySelectorAll('.fet-cat-pill');
    
    const inputTitle = document.getElementById('fet-input-title');
    const inputAmount = document.getElementById('fet-input-amount');
    const inputDate = document.getElementById('fet-input-date');

    function renderMonthDropdown() {
        if (!monthOptionsList) return;
        monthOptionsList.innerHTML = '';
        const months = Object.keys(allExpenses);
        months.forEach(m => {
            const item = document.createElement('div');
            item.className = 'fet-month-option' + (m === currentMonth ? ' active' : '');
            item.textContent = m;
            item.addEventListener('click', function () {
                currentMonth = m;
                if (monthSelectorText) monthSelectorText.textContent = m;
                if (monthDropdown) monthDropdown.classList.remove('open');
                renderAll();
            });
            monthOptionsList.appendChild(item);
        });
    }

    function renderAll() {
        const items = allExpenses[currentMonth] || [];
        
        let total = 0;
        const categoryTotals = {};
        Object.keys(CATEGORIES).forEach(k => categoryTotals[k] = 0);

        items.forEach(item => {
            total += Number(item.amount) || 0;
            if (categoryTotals[item.category] !== undefined) {
                categoryTotals[item.category] += Number(item.amount) || 0;
            } else {
                categoryTotals['others'] = (categoryTotals['others'] || 0) + (Number(item.amount) || 0);
            }
        });

        if (totalAmountEl) {
            totalAmountEl.textContent = '₹' + total.toLocaleString('en-IN');
        }

        if (entriesCountEl) {
            entriesCountEl.textContent = items.length + ' transactions';
        }

        // Render Donut Chart
        if (donutSvgEl) {
            donutSvgEl.innerHTML = '';
            let cumulativePercent = 0;
            const radius = 38;
            const circumference = 2 * Math.PI * radius;

            if (total === 0) {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', '50');
                circle.setAttribute('cy', '50');
                circle.setAttribute('r', radius);
                circle.setAttribute('fill', 'none');
                circle.setAttribute('stroke', '#E2E8F0');
                circle.setAttribute('stroke-width', '16');
                donutSvgEl.appendChild(circle);
            } else {
                Object.keys(CATEGORIES).forEach(catKey => {
                    const catAmount = categoryTotals[catKey] || 0;
                    if (catAmount <= 0) return;
                    const slicePct = catAmount / total;
                    const strokeDasharray = `${slicePct * circumference} ${circumference}`;
                    const strokeDashoffset = -cumulativePercent * circumference;

                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', '50');
                    circle.setAttribute('cy', '50');
                    circle.setAttribute('r', radius);
                    circle.setAttribute('fill', 'none');
                    circle.setAttribute('stroke', CATEGORIES[catKey].color);
                    circle.setAttribute('stroke-width', '16');
                    circle.setAttribute('stroke-dasharray', strokeDasharray);
                    circle.setAttribute('stroke-dashoffset', strokeDashoffset);
                    donutSvgEl.appendChild(circle);

                    cumulativePercent += slicePct;
                });
            }
        }

        // Render Legend
        if (legendListEl) {
            legendListEl.innerHTML = '';
            Object.keys(CATEGORIES).forEach(catKey => {
                const catAmount = categoryTotals[catKey] || 0;
                if (catAmount <= 0 && total > 0) return;
                const pct = total > 0 ? ((catAmount / total) * 100).toFixed(0) : 0;

                const li = document.createElement('div');
                li.className = 'fet-legend-item';
                li.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="fet-legend-dot" style="background:${CATEGORIES[catKey].color};"></span>
                        <span class="fet-legend-name">${CATEGORIES[catKey].name}</span>
                    </div>
                    <div class="fet-legend-values">
                        <span class="fet-legend-amount">₹${catAmount.toLocaleString('en-IN')}</span>
                        <span class="fet-legend-pct">${pct}%</span>
                    </div>
                `;
                legendListEl.appendChild(li);
            });
        }

        // Render Entries List
        if (entriesListEl) {
            entriesListEl.innerHTML = '';
            if (items.length === 0) {
                entriesListEl.innerHTML = `
                    <div style="text-align:center; padding:32px 16px; color:#94A3B8;">
                        <i class="fa-solid fa-receipt" style="font-size:32px; margin-bottom:8px; opacity:0.5;"></i>
                        <p>No student expense recorded for ${currentMonth}.</p>
                    </div>
                `;
            } else {
                items.forEach((item, idx) => {
                    const cat = CATEGORIES[item.category] || CATEGORIES.others;
                    const card = document.createElement('div');
                    card.className = 'fet-entry-card';
                    card.innerHTML = `
                        <div class="fet-entry-left">
                            <div class="fet-entry-icon" style="background:${cat.color}15; color:${cat.color};">
                                <i class="fa-solid ${cat.icon}"></i>
                            </div>
                            <div>
                                <div class="fet-entry-title">${item.title}</div>
                                <div class="fet-entry-meta">
                                    <span>${cat.name}</span> &bull; <span>${item.date || 'Recent'}</span>
                                </div>
                            </div>
                        </div>
                        <div class="fet-entry-right">
                            <div class="fet-entry-amount">₹${Number(item.amount).toLocaleString('en-IN')}</div>
                            <button type="button" class="fet-entry-delete" data-id="${item.id}" title="Delete entry">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    `;
                    entriesListEl.appendChild(card);
                });

                // Attach delete handlers
                document.querySelectorAll('.fet-entry-delete').forEach(btn => {
                    btn.addEventListener('click', function (e) {
                        e.stopPropagation();
                        const id = this.getAttribute('data-id');
                        allExpenses[currentMonth] = allExpenses[currentMonth].filter(x => x.id !== id);
                        saveAllExpenses(allExpenses);
                        renderAll();
                    });
                });
            }
        }
    }

    if (monthSelectorBtn) {
        monthSelectorBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (monthDropdown) monthDropdown.classList.toggle('open');
        });
    }

    document.addEventListener('click', function () {
        if (monthDropdown) monthDropdown.classList.remove('open');
    });

    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', function () {
            if (modalBackdrop) modalBackdrop.classList.add('active');
            if (modalSheet) modalSheet.classList.add('active');
            if (inputDate) {
                const now = new Date();
                inputDate.value = now.toISOString().split('T')[0];
            }
        });
    }

    function closeModal() {
        if (modalBackdrop) modalBackdrop.classList.remove('active');
        if (modalSheet) modalSheet.classList.remove('active');
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    catPillButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            catPillButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedCategoryForNewExpense = this.getAttribute('data-cat') || 'fertilizer';
        });
    });

    if (saveExpenseSubmitBtn) {
        saveExpenseSubmitBtn.addEventListener('click', function () {
            const title = inputTitle ? inputTitle.value.trim() : '';
            const amount = parseFloat(inputAmount ? inputAmount.value : 0) || 0;
            const dateStr = inputDate ? inputDate.value : '';

            if (!title || amount <= 0) {
                alert('Please enter a valid title and amount.');
                return;
            }

            const newEntry = {
                id: 'exp_' + Date.now(),
                title: title,
                category: selectedCategoryForNewExpense,
                amount: amount,
                date: dateStr ? dateStr.substring(5) : 'Recent'
            };

            if (!allExpenses[currentMonth]) allExpenses[currentMonth] = [];
            allExpenses[currentMonth].unshift(newEntry);
            saveAllExpenses(allExpenses);

            if (inputTitle) inputTitle.value = '';
            if (inputAmount) inputAmount.value = '';
            closeModal();
            renderAll();
        });
    }

    renderMonthDropdown();
    renderAll();
});