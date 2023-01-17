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

export function addGroupApiCall(group) {
    const groupString = JSON.stringify(group);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: groupString
    };
    const promise = fetch(groupsBaseUrl, options);
    return promise;
}

export function updateGroupApiCall(groupId, group) {
    const groupString = JSON.stringify(group);
    const url = `${groupsBaseUrl}/${groupId}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: groupString
    };
    const promise = fetch(url, options);
    return promise;
}

export function deleteGroupApiCall(groupId) {
    const url = `${groupsBaseUrl}/${groupId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(url, options);
}