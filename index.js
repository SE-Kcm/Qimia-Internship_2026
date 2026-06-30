let programmingFundamentals = 1;
let databaseSystems = 2;
let webDevelopment = 3;
let mathematics = 4;
let algorithms = 5;

let student = {
    firstName: 'Sude',
    lastName: 'Koçman',
    age: 25,
    major: 'Computer Science',
    courses: [mathematics, databaseSystems]
}

function listStudentInformation (){
    console.log('First name: ' + student.firstName);
    console.log('Last name: ' + student.lastName);
    console.log('Age: ' + student.age);
    console.log('Major: ' + student.major);
    listAllCourses();
}
function listAllCourses () {
    student.courses.forEach(course => { console.log(course) });
}

function addNewCourse (course){
    student.courses.push(course);
    listAllCourses();
}

function deleteCourse(course){
    const ind = student.courses.indexOf(course);
    if(ind == -1){
        console.log('Course not found');
        return;
    }
    student.courses.splice(ind,1)
    listAllCourses();
}

listStudentInformation();
listAllCourses();
addNewCourse(algorithms);
deleteCourse(databaseSystems);
deleteCourse(webDevelopment);
