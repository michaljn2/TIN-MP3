const studiesBaseUrl = 'http://localhost:3000/api/studies'
export function getStudiesApiCall(){
    return fetch(studiesBaseUrl);
}

export function getStudyByIdApiCall(studyId){
    const url = `${studiesBaseUrl}/${studyId}`;
    return fetch(url);
}

export function addStudyApiCall(study){
    const studyString = JSON.stringify(study);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: studyString
    };
    return fetch(studiesBaseUrl, options);
}
export function updateStudyApiCall(studyId, study) {
    const studyString = JSON.stringify(study);
    const url = `${studiesBaseUrl}/${studyId}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: studyString
    };
    return fetch(url, options);
}

export function deleteStudyApiCall(studyId) {
    const url = `${studiesBaseUrl}/${studyId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(url, options);
}