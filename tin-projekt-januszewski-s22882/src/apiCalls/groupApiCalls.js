import {groupList, groupDetailsList} from "./groupApiMockData";

export function getGroupsApiCall(){
    return groupList;
}

export function getGroupByIdApiCall(groupId){
    const group = groupDetailsList.find(group => group._id === groupId);
    return group;
}