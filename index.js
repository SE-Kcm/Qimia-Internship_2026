let Course1 =  {
    id: 1,
    name: 'programmingFundamentals'
}
let Course2 =  {
    id: 2,
    name: 'webDevelopment'
}
let Course3 =  {
    id: 3,
    name: 'mathematics'
}
let Course4 =  {
    id: 4,
    name: 'algorithms'
}
let Course5 =  {
    id: 5,
    name: 'databaseSystems'
}

let student = {
    firstName: 'Sude',
    lastName: 'Koçman',
    age: 25,
    major: 'Computer Science',
    courses: [Course3, Course5]
}

function listStudentInformation (){
    console.log('First name: ' + student.firstName);
    console.log('Last name: ' + student.lastName);
    console.log('Age: ' + student.age);
    console.log('Major: ' + student.major);
    listAllCourses();
}
function listAllCourses () {
    student.courses.forEach(course => { console.log(course.name) });
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
addNewCourse(Course1);
deleteCourse(Course5);
deleteCourse(Course2);
