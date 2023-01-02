import {studyList, studyDetailsList} from "./studyApiMockData";

export function getStudiesApiCall(){
    return studyList;
}

export function getStudyByIdApiCall(studyId){
    const study = studyDetailsList.find(study => study._id === studyId);
    return study;
}