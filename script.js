// Get DOM elements
const studentForm = document.getElementById('studentForm');
const addButton = document.getElementById('addButton');
const studentTable = document.getElementById('studentTable').querySelector('tbody');

// Load data from local storage
const students = JSON.parse(localStorage.getItem('students')) || [];
displayStudents();

// Add student
addButton.addEventListener('click', () => {
    const studentName = document.getElementById('studentName').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const studentClass = document.getElementById('studentClass').value.trim();
    const studentRollNo = document.getElementById('studentRollNo').value.trim();

    if (!studentName || !studentClass || !studentClass || !studentRollNo) {
        alert("All fields are required!");
        return;
    }

    const newStudent = { studentName, studentId, studentClass, studentRollNo };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();

    studentForm.reset();
});

// Display students
function displayStudents() {
    studentTable.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.studentId}</td>
            <td>${student.studentClass}</td>
            <td>${student.studentRollNo}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}

// Edit student
function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.studentName;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('studentClass').value = student.studentClass;
    document.getElementById('studentRollNo').value = student.studentRollNo;

    deleteStudent(index);
}

// Delete student
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}
