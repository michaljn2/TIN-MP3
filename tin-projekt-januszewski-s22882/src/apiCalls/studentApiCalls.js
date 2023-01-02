import {studentList, studentDetailsList} from "./studentApiMockData";

export function getStudentsApiCall() {
    return studentList;
}

export function getStudentByIdApiCall (studId) {
    const stud = studentDetailsList.find(stud => stud._id === studId);
    return stud;
}