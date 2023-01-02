const studentsBaseUrl = 'http://localhost:3000/api/students'

export function getStudentsApiCall() {
    const promise = fetch(studentsBaseUrl);
    return promise;
}

export function getStudentByIdApiCall (studId) {
    // const stud = studentDetailsList.find(stud => stud._id === studId);
    // return stud;
}