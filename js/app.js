// ================= SELECTORS =================
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const mainArea = document.querySelector(".main-area");
const pageTitle = document.getElementById("pageTitle");
const breadcrumbPage = document.getElementById("breadcrumbPage");
const dashboardPage = document.getElementById("dashboardPage");
const dynamicPage = document.getElementById("dynamicPage");
const dynamicTitle = document.getElementById("dynamicTitle");

// ================= SIDEBAR TOGGLE =================
if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
        // For Mobile Devices
        sidebar.classList.toggle("show");
        // For Desktop Devices
        sidebar.classList.toggle("collapsed");
        if (mainArea) {
            mainArea.classList.toggle("expanded");
        }
    });
}

// ================= DROPDOWN MENU =================
const dropdowns = document.querySelectorAll(".menu-dropdown > a");

dropdowns.forEach(dropdown => {
    dropdown.addEventListener("click", function(event) {
        event.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle("open");
    });
});

// ================= PAGE NAVIGATION =================
const pageLinks = document.querySelectorAll("[data-page]");

pageLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        
        const page = this.dataset.page;
        openPage(page);

        // Remove active class from all links
        document.querySelectorAll(".sidebar-menu a").forEach(item => {
            item.classList.remove("active");
        });

        // Add active class to the clicked link
        this.classList.add("active");

        // Close mobile sidebar if window is small
        if (window.innerWidth <= 992 && sidebar) {
            sidebar.classList.remove("show");
        }
    });
});
// ================= OPEN PAGE LOGIC =================
function openPage(page) {
    const dashboardPage = document.getElementById("dashboardPage");
    const dynamicPage = document.getElementById("dynamicPage");
    const pageTitle = document.getElementById("pageTitle");
    const breadcrumbPage = document.getElementById("breadcrumbPage");
    const dynamicTitle = document.getElementById("dynamicTitle");

    // 1. Dashboard View
    if (page === "dashboard") {
        if (dashboardPage) dashboardPage.style.display = "block";
        if (dynamicPage) dynamicPage.style.display = "none";
        
        if (pageTitle) pageTitle.textContent = "Dashboard";
        if (breadcrumbPage) breadcrumbPage.textContent = "Dashboard";
        return;
    }

    // 2. Other Dynamic Pages View
    if (dashboardPage) dashboardPage.style.display = "none";
    if (dynamicPage) dynamicPage.style.display = "block";

    // 3. Toggle Inner Cards for All Modules
    const addStudentCard = document.getElementById("addStudentCard");
    const studentListCard = document.getElementById("studentListCard");
    const addTeacherCard = document.getElementById("addTeacherCard");
    const teacherListCard = document.getElementById("teacherListCard");

    // First, HIDE everything
    if (addStudentCard) addStudentCard.style.display = "none";
    if (studentListCard) studentListCard.style.display = "none";
    if (addTeacherCard) addTeacherCard.style.display = "none";
    if (teacherListCard) teacherListCard.style.display = "none";

    // Then, SHOW only the one that was clicked
    if (page === "students") {
        if (studentListCard) studentListCard.style.display = "block";
    } else if (page === "add-student") {
        if (addStudentCard) addStudentCard.style.display = "block";
    } else if (page === "teachers") {
        if (teacherListCard) teacherListCard.style.display = "block";
    } else if (page === "add-teacher") {
        if (addTeacherCard) addTeacherCard.style.display = "block";
    }

    // Set corresponding titles
    const titles = {
        students: "Student Directory",
        "add-student": "Add New Student",
        teachers: "Teacher Directory",
        "add-teacher": "Add New Teacher",
        parents: "Parents",
        classes: "Classes & Sections",
        subjects: "Subjects",
        "student-attendance": "Student Attendance",
        "teacher-attendance": "Teacher Attendance",
        "attendance-report": "Attendance Report",
        exams: "Examinations",
        "exam-schedule": "Exam Schedule",
        results: "Exam Results",
        timetable: "Timetable",
        fees: "Fee Collection",
        invoices: "Invoices",
        payments: "Payment History",
        library: "Library",
        transport: "Transport",
        events: "Events",
        notices: "Notices & Announcements",
        staff: "Staff & HR",
        reports: "Reports",
        settings: "Settings"
    };

    const title = titles[page] || "School ERP";

    if (pageTitle) pageTitle.textContent = title;
    if (breadcrumbPage) breadcrumbPage.textContent = title;
    if (dynamicTitle) dynamicTitle.textContent = title;
} 
// ================= INITIALIZE APP =================
document.addEventListener("DOMContentLoaded", () => {
    // Load dashboard by default when the page loads
    openPage("dashboard");
});

// ================= DASHBOARD DYNAMIC STATS =================
async function loadDashboardStats() {
    try {
        // CHANGED HERE: Updated localhost to Vercel URL
        const response = await fetch('https://weberp-seven.vercel.app/api/dashboard/stats');
        const result = await response.json();

        if (result.success) {
            const studentStatEle = document.getElementById('statTotalStudents');
            const teacherStatEle = document.getElementById('statTotalTeachers');

            // Update HTML DOM with real database numbers
            if (studentStatEle) studentStatEle.innerText = result.data.totalStudents;
            if (teacherStatEle) teacherStatEle.innerText = result.data.totalTeachers;
        }
    } catch (error) {
        console.error("Error loading dashboard stats:", error);
    }
}

// Ensure stats are loaded when the application starts
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardStats();
});