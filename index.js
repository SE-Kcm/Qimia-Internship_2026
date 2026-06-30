let programmingFundamentals = 1;
let databaseSystems = 2;
let webDevelopment = 3;
let mathematics = 4;
let algorithms = 5;

let Student = {
    firstName: 'Sude',
    lastName: 'Koçman',
    age: 25,
    major: 'Computer Science',
    courses: [mathematics, databaseSystems]
}

function listStudentInformation (){
    console.log('First name: ' + Student.firstName);
    console.log('Last name: ' + Student.lastName);
    console.log('Age: ' + Student.age);
    console.log('Major: ' + Student.major);
    listAllCourses();
}
function listAllCourses () {
    Student.courses.forEach(course => { console.log(course) });
}

function addNewCourse (course){
    Student.courses.push(course);
    listAllCourses();
}

function deleteCourse(course){
    const ind = Student.courses.indexOf(course);
    if(ind == -1){
        console.log('Course not found');
        return;
    }
    Student.courses.splice(ind,1)
    listAllCourses();
}

listStudentInformation();
listAllCourses();
addNewCourse(algorithms);
deleteCourse(databaseSystems);
deleteCourse(webDevelopment);
