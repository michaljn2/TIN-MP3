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
    const promise = fetch(studiesBaseUrl, options);
    return promise;
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
    const promise = fetch(url, options);
    return promise;
}