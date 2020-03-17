export const CLIENT_GET = 'CLIENT_GET';
export const CLIENT_ADD = 'CLIENT_ADD';
export const CLIENT_UPDATE = 'CLIENT_UPDATE';
export const CLIENT_REMOVE = 'CLIENT_REMOVE';

export function clientGet(data) {
    return {
        type: CLIENT_GET,
        payload: data
    }
}

export function clientAdd(data) {
    return {
        type: CLIENT_ADD,
        payload: data
    }
}

export function clientUpdate(data) {
    return {
        type: CLIENT_UPDATE,
        payload: data
    }
}

export function clientRemove(client) {
    return {
        type: CLIENT_REMOVE,
        payload: client
    }
}
