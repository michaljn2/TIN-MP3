const studiesBaseUrl = 'http://localhost:3000/api/studies'
export function getStudiesApiCall(){
    return fetch(studiesBaseUrl);
}

export function getStudyByIdApiCall(studyId){
    const url = `${studiesBaseUrl}/${studyId}`;
    return fetch(url);
}