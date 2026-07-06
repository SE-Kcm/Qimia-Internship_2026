const course1 = {
    id: 1,
    name: "programmingFundamentals",
};
const course2 = {
    id: 2,
    name: "webDevelopment",
};
const course3 = {
    id: 3,
    name: "mathematics",
};
const course4 = {
    id: 4,
    name: "algorithms",
};
const course5 = {
    id: 5,
    name: "databaseSystems",
};

const student = {
    firstName: "Sude",
    lastName: "Koçman",
    age: 25,
    major: "Computer Science",
    courses: [course3, course5],
};

function listStudentInformation() {
    console.log("First name: " + student.firstName);
    console.log("Last name: " + student.lastName);
    console.log("Age: " + student.age);
    console.log("Major: " + student.major);
    listAllCourses();
}
function listAllCourses() {
    student.courses.forEach((course) => {
        console.log(course.name);
    });
}

function addNewCourse(course) {
    student.courses.push(course);
    listAllCourses();
}

function deleteCourse(course) {
    const ind = student.courses.indexOf(course);
    if (ind == -1) {
        console.error("Course not found");
        return;
    }
    student.courses.splice(ind, 1);
    listAllCourses();
}

listStudentInformation();
listAllCourses();
addNewCourse(course1);
deleteCourse(course5);
deleteCourse(course2);
