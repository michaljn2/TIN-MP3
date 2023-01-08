const groupsBaseUrl = 'http://localhost:3000/api/groups'
export function getGroupsApiCall(){
    const promise = fetch(groupsBaseUrl);
    return promise;
}

export function getGroupByIdApiCall(groupId){
    const url = `${groupsBaseUrl}/${groupId}`;
    const promise = fetch(url);
    return promise;
}

export 