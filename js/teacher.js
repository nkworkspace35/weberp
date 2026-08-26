const TEACHER_API_BASE_URL = 'http://localhost:5000/api';

let allTeachers = [];
let editingTeacherId = null;

// Function to fetch and display teachers
async function fetchTeachers() {
    try {
        const response = await fetch(`${TEACHER_API_BASE_URL}/teachers/all`);
        const result = await response.json();

        if (result.success) {
            allTeachers = result.data; 
            const tableBody = document.getElementById('teacherTableBody');
            if (!tableBody) return;
            
            tableBody.innerHTML = ''; 

            allTeachers.forEach(teacher => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${teacher.teacher_code}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${teacher.first_name} ${teacher.last_name}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${teacher.email}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${teacher.department || 'N/A'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                        <button onclick="populateTeacherEditForm(${teacher.id})" style="background-color: #ffc107; color: black; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-right: 5px;">
                            <i class="fa-solid fa-pen"></i> Edit
                        </button>
                        <button onclick="deleteTeacherData(${teacher.id})" style="background-color: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
}

// Function to populate the form for editing
function populateTeacherEditForm(id) {
    const teacher = allTeachers.find(t => t.id === id);
    if (!teacher) return;

    // Fill form fields
    document.getElementById('teacherFirstName').value = teacher.first_name;
    document.getElementById('teacherLastName').value = teacher.last_name;
    document.getElementById('teacherEmail').value = teacher.email;
    document.getElementById('teacherPhone').value = teacher.phone || '';
    document.getElementById('teacherDept').value = teacher.department || '';

    // Set state to editing mode
    editingTeacherId = teacher.id;
    
    // Change button appearance
    const submitBtn = document.querySelector('#addTeacherForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerText = "Update Teacher";
        submitBtn.style.backgroundColor = "#ffc107";
        submitBtn.style.color = "black";
    }

    // Change form heading
    const formHeading = document.querySelector('#addTeacherCard h3');
    if (formHeading) {
        formHeading.innerText = "Edit Teacher Details";
    }

    // Automatically navigate to the form page
    const addTeacherTab = document.querySelector('.sidebar-menu a[data-page="add-teacher"]');
    if (addTeacherTab) {
        addTeacherTab.click(); 
    }

    // Change main page titles
    const mainPageTitle = document.getElementById('pageTitle');
    const breadcrumb = document.getElementById('breadcrumbPage');
    
    if (mainPageTitle) mainPageTitle.innerText = "Edit Teacher";
    if (breadcrumb) breadcrumb.innerText = "Edit Teacher";
}

// Function to handle form submission (Add or Update)
document.getElementById('addTeacherForm')?.addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const teacherData = {
        first_name: document.getElementById('teacherFirstName').value.trim(),
        last_name: document.getElementById('teacherLastName').value.trim(),
        email: document.getElementById('teacherEmail').value.trim(),
        phone: document.getElementById('teacherPhone').value.trim(),
        department: document.getElementById('teacherDept').value.trim()
    };

    try {
        let url = `${TEACHER_API_BASE_URL}/teachers/add`;
        let method = 'POST';

        if (editingTeacherId) {
            url = `${TEACHER_API_BASE_URL}/teachers/update/${editingTeacherId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teacherData)
        });

        const result = await response.json();

        if (result.success) {
            alert(editingTeacherId ? 'Teacher updated successfully!' : 'Teacher added successfully!');
            
            // Reset form and state
            this.reset(); 
            editingTeacherId = null;
            
            // Reset UI elements to default
            const submitBtn = document.querySelector('#addTeacherForm button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerText = "Save Teacher";
                submitBtn.style.backgroundColor = ""; 
                submitBtn.style.color = "";
            }

            const formHeading = document.querySelector('#addTeacherCard h3');
            if (formHeading) {
                formHeading.innerText = "Add New Teacher";
            }
            
            fetchTeachers(); 
        } else {
            alert('Failed to save teacher: ' + result.message);
        }
    } catch (error) {
        console.error('Error saving teacher:', error);
    }
});

// Function to delete a teacher
async function deleteTeacherData(teacherId) {
    const confirmDelete = confirm("Are you sure you want to delete this teacher?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${TEACHER_API_BASE_URL}/teachers/delete/${teacherId}`, { method: 'DELETE' });
        const result = await response.json();

        if (result.success) {
            alert('Teacher deleted successfully!');
            fetchTeachers(); 
        } else {
            alert('Failed to delete teacher: ' + result.message);
        }
    } catch (error) {
        console.error('Error deleting teacher:', error);
    }
}

// Load data on page initialization
document.addEventListener('DOMContentLoaded', fetchTeachers);