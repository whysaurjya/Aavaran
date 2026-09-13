/**
 * AAVARAN - Assignment Tracker & Academic Task Engine
 * Milestone Tracking, Submission Management, Priority Flags & Toast Alerts
 */

const STORAGE_TASK_DATA = 'aavaran_assignments_v1';

const DEFAULT_ACADEMIC_STATE = {
    score: 84,
    status: 'High On-Time Rate',
    statusClass: 'status-good',
    N: { val: '14 Tasks', status: 'Total Assigned', alert: false },
    P: { val: '11 Done', status: 'Submitted', alert: false },
    K: { val: '3 Due', status: 'Pending Review', alert: true },
    pH: { val: '92%', status: 'Average Score', alert: false },
    EC: { val: '0 Missed', status: 'Deadlines Kept', alert: false },
    OC: { val: '3.8 / 4.0', status: 'Submission GPA', alert: false },
    suggestions: [
        { icon: 'fa-clock', text: 'Submit OS Assignment 3 before midnight' },
        { icon: 'fa-code', text: 'Run unit tests on Data Structures AVL tree' },
        { icon: 'fa-file-pdf', text: 'Export DBMS schema report to PDF' }
    ],
    lastUpdated: '12 Sep 2026'
};

function getAcademicState() {
    try {
        const stored = localStorage.getItem(STORAGE_TASK_DATA);
        return stored ? JSON.parse(stored) : DEFAULT_ACADEMIC_STATE;
    } catch (e) {
        return DEFAULT_ACADEMIC_STATE;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const scoreValEl = document.getElementById('sh-score-val');
    const statusTextEl = document.getElementById('sh-status-text');

    const nStatusEl = document.getElementById('sh-n-status');
    const nValEl = document.getElementById('sh-n-val');
    const pStatusEl = document.getElementById('sh-p-status');
    const pValEl = document.getElementById('sh-p-val');
    const kStatusEl = document.getElementById('sh-k-status');
    const kValEl = document.getElementById('sh-k-val');
    const phValEl = document.getElementById('sh-ph-val');
    const phStatusEl = document.getElementById('sh-ph-status');
    const ecValEl = document.getElementById('sh-ec-val');
    const ecStatusEl = document.getElementById('sh-ec-status');
    const ocValEl = document.getElementById('sh-oc-val');
    const ocStatusEl = document.getElementById('sh-oc-status');

    function renderAcademicState(state) {
        if (scoreValEl) scoreValEl.textContent = state.score + '%';
        if (statusTextEl) statusTextEl.textContent = state.status;

        if (nValEl) nValEl.textContent = state.N.val;
        if (nStatusEl) nStatusEl.textContent = state.N.status;

        if (pValEl) pValEl.textContent = state.P.val;
        if (pStatusEl) pStatusEl.textContent = state.P.status;

        if (kValEl) kValEl.textContent = state.K.val;
        if (kStatusEl) kStatusEl.textContent = state.K.status;

        if (phValEl) phValEl.textContent = state.pH.val;
        if (phStatusEl) phStatusEl.textContent = state.pH.status;

        if (ecValEl) ecValEl.textContent = state.EC.val;
        if (ecStatusEl) ecStatusEl.textContent = state.EC.status;

        if (ocValEl) ocValEl.textContent = state.OC.val;
        if (ocStatusEl) ocStatusEl.textContent = state.OC.status;
    }

    const state = getAcademicState();
    renderAcademicState(state);
});