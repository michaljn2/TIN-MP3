const studentsBaseUrl = 'http://localhost:3000/api/students'

export function getStudentsApiCall() {
    return fetch(studentsBaseUrl);
}

export function getStudentByIdApiCall (studId) {
    const url = `${studentsBaseUrl}/${studId}`;
    return fetch(url);
}

export function addStudentApiCall(stud) {
    const studString = JSON.stringify(stud);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: studString
    }
    return fetch(studentsBaseUrl, options);
}

export function updateStudentApiCall(studId, stud) {
    const studString = JSON.stringify(stud);
    const url = `${studentsBaseUrl}/${studId}`
    const options = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: studString
    }
    return fetch(url, options);
}