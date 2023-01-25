import {getCurrentUser} from "../helpers/authHelper";

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
    const user = getCurrentUser();
    let token;
    if (user && user.token){
        token = user.token;
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: studString
    }
    return fetch(studentsBaseUrl, options);
}

export function updateStudentApiCall(studId, stud) {
    const studString = JSON.stringify(stud);
    const url = `${studentsBaseUrl}/${studId}`;
    const user = getCurrentUser();
    let token;
    if (user && user.token){
        token = user.token;
    }
    const options = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: studString
    }
    return fetch(url, options);
}

export function deleteStudentApiCall(studId) {
    const url = `${studentsBaseUrl}/${studId}`;
    const user = getCurrentUser();
    let token;
    if (user && user.token){
        token = user.token;
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(url, options);
}