const form = document.getElementById("studentForm");

const studentId = document.getElementById("studentId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");

const tableBody = document.getElementById("studentTableBody");

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");


// ==========================
// READ - Get Students
// ==========================

async function getStudents() {

    try {

        const response = await fetch("/api/students");

        const result = await response.json();

        displayStudents(result.data);

    } catch (error) {

        console.log("Error:", error);

    }

}


// ==========================
// Display Students
// ==========================

function displayStudents(students) {

    tableBody.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.age}</td>

            <td>${student.course}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent('${student._id}')"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent('${student._id}')"
                >
                    Delete
                </button>

            </td>

        `;

        tableBody.appendChild(row);

    });

}


// ==========================
// CREATE / UPDATE
// ==========================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const studentData = {

        name: nameInput.value,

        email: emailInput.value,

        age: Number(ageInput.value),

        course: courseInput.value

    };


    try {

        let response;


        // UPDATE

        if (studentId.value) {

            response = await fetch(
                `/api/students/${studentId.value}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(studentData)
                }
            );

        }

        // CREATE

        else {

            response = await fetch(
                "/api/students",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(studentData)
                }
            );

        }


        const result = await response.json();

        alert(result.message);

        resetForm();

        getStudents();


    } catch (error) {

        console.log("Error:", error);

    }

});


// ==========================
// EDIT STUDENT
// ==========================

async function editStudent(id) {

    try {

        const response = await fetch(
            `/api/students/${id}`
        );

        const student = await response.json();


        studentId.value = student._id;

        nameInput.value = student.name;

        emailInput.value = student.email;

        ageInput.value = student.age;

        courseInput.value = student.course;


        formTitle.innerText = "Update Student";

        submitBtn.innerText = "Update Student";

        cancelBtn.style.display = "block";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    } catch (error) {

        console.log("Error:", error);

    }

}


// ==========================
// DELETE STUDENT
// ==========================

async function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `/api/students/${id}`,
            {
                method: "DELETE"
            }
        );


        const result = await response.json();

        alert(result.message);

        getStudents();


    } catch (error) {

        console.log("Error:", error);

    }

}


// ==========================
// RESET FORM
// ==========================

function resetForm() {

    studentId.value = "";

    nameInput.value = "";

    emailInput.value = "";

    ageInput.value = "";

    courseInput.value = "";

    formTitle.innerText = "Add Student";

    submitBtn.innerText = "Add Student";

    cancelBtn.style.display = "none";

}


// ==========================
// CANCEL EDIT
// ==========================

function cancelEdit() {

    resetForm();

}


// Load students when page opens

getStudents();