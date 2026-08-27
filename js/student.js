const API_BASE_URL = 'https://weberp-seven.vercel.app/api';

// Global variables to manage edit state
let allStudents = [];
let editingStudentId = null;

// Function to fetch and display students
async function fetchStudents() {
    try {
        const response = await fetch(`${API_BASE_URL}/students/all`);
        const result = await response.json();

        if (result.success) {
            allStudents = result.data; // Store data globally for editing
            const tableBody = document.getElementById('studentTableBody');
            if (!tableBody) return;
            
            tableBody.innerHTML = ''; 

            allStudents.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${student.student_code}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${student.first_name} ${student.last_name}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${student.email}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${student.class_name || 'N/A'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                        <button onclick="populateEditForm(${student.id})" style="background-color: #ffc107; color: black; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-right: 5px;">
                            <i class="fa-solid fa-pen"></i> Edit
                        </button>
                        <button onclick="deleteStudentData(${student.id})" style="background-color: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

// Function to populate the form for editing
function populateEditForm(id) {
    const student = allStudents.find(s => s.id === id);
    if (!student) return;

    // Fill form fields with existing data
    document.getElementById('firstName').value = student.first_name;
    document.getElementById('lastName').value = student.last_name;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone || '';
    document.getElementById('className').value = student.class_name || '';

    // Set state to editing mode
    editingStudentId = student.id;
    
    // Change Button appearance
    const submitBtn = document.querySelector('#addStudentForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerText = "Update Data";
        submitBtn.style.backgroundColor = "#ffc107";
        submitBtn.style.color = "black";
    }

    // Change Form Heading
    const formHeading = document.querySelector('#addStudentCard h3');
    if (formHeading) {
        formHeading.innerText = "Edit Student Details";
    }

    // Automatically navigate to the form page
    const addStudentTab = document.querySelector('.sidebar-menu a[data-page="add-student"]');
    if (addStudentTab) {
        addStudentTab.click(); 
    }

    // Change top Page Title to reflect Edit mode
    const mainPageTitle = document.getElementById('pageTitle');
    const breadcrumb = document.getElementById('breadcrumbPage');
    
    if (mainPageTitle) mainPageTitle.innerText = "Edit Student";
    if (breadcrumb) breadcrumb.innerText = "Edit Student";
}

// Function to handle Add or Update form submission
document.getElementById('addStudentForm')?.addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const studentData = {
        first_name: document.getElementById('firstName').value.trim(),
        last_name: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        class_name: document.getElementById('className').value.trim()
    };

    try {
        let url = `${API_BASE_URL}/students/add`;
        let method = 'POST';

        // If we are in edit mode, change the URL and Method
        if (editingStudentId) {
            url = `${API_BASE_URL}/students/update/${editingStudentId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();

        if (result.success) {
            alert(editingStudentId ? 'Student updated successfully!' : 'Student added successfully!');
            
            // Reset form and state
            this.reset(); 
            editingStudentId = null;
            
            // Reset button styling
            const submitBtn = document.querySelector('#addStudentForm button[type="submit"]');
            submitBtn.innerText = "Save Student";
            submitBtn.style.backgroundColor = ""; // Reset to default CSS
            submitBtn.style.color = "";
            
            fetchStudents(); 
        } else {
            alert('Failed to save student: ' + result.message);
        }
    } catch (error) {
        console.error('Error saving student:', error);
    }
});

// Function to delete a student
async function deleteStudentData(studentId) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_BASE_URL}/students/delete/${studentId}`, { method: 'DELETE' });
        const result = await response.json();

        if (result.success) {
            alert('Student deleted successfully!');
            fetchStudents(); 
        } else {
            alert('Failed to delete student: ' + result.message);
        }
    } catch (error) {
        console.error('Error deleting student:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchStudents);