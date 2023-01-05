const studentsBaseUrl = 'http://localhost:3000/api/students'

export function getStudentsApiCall() {
    const promise = fetch(studentsBaseUrl);
    return promise;
}

export function getStudentByIdApiCall (studId) {
    const url = `${studentsBaseUrl}/${studId}`;
    const promise = fetch(url);
    return promise;
}