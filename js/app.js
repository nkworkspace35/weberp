const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");

const pageTitle = document.getElementById("pageTitle");
const breadcrumbPage = document.getElementById("breadcrumbPage");

const dashboardPage = document.getElementById("dashboardPage");
const dynamicPage = document.getElementById("dynamicPage");
const dynamicTitle = document.getElementById("dynamicTitle");


// ================= SIDEBAR TOGGLE =================

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("show");
});


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

        // Remove active class
        document.querySelectorAll(".sidebar-menu a").forEach(item => {
            item.classList.remove("active");
        });

        // Add active class
        this.classList.add("active");

        // Close mobile sidebar
        if (window.innerWidth <= 992) {
            sidebar.classList.remove("show");
        }

    });

});


// ================= OPEN PAGE =================

function openPage(page) {

    if (page === "dashboard") {

        dashboardPage.classList.add("active-page");
        dynamicPage.classList.remove("active-page");

        pageTitle.textContent = "Dashboard";
        breadcrumbPage.textContent = "Dashboard";

        return;
    }


    dashboardPage.classList.remove("active-page");
    dynamicPage.classList.add("active-page");


    const titles = {

        students: "Students",
        "add-student": "Add Student",

        teachers: "Teachers",
        "add-teacher": "Add Teacher",

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

    pageTitle.textContent = title;
    breadcrumbPage.textContent = title;
    dynamicTitle.textContent = title;

}


// ================= INITIAL PAGE =================

openPage("dashboard");