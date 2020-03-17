export default class Api {
    static clientGet() {
        return fetch('http://localhost:3001/client').then(response => {
            if (!response.ok) {
                throw Error(response.status.toString());
            }
            return response.json();
        });
    }

    static clientAdd(client) {
        return fetch('http://localhost:3001/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(client)
        }).then(response => {
            if (!response.ok) {
                throw Error(response.status.toString());
            }
            return response.json();
        });
    }

    static clientUpdate(client) {
        return fetch('http://localhost:3001/client', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(client)
        }).then(response => {
            if (!response.ok) {
                throw Error(response.status.toString());
            }
            return response.json();
        });
    }

    static clientRemove(_id) {
        return fetch('http://localhost:3001/client', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ _id: _id })
        }).then(response => {
            if (!response.ok) {
                throw Error(response.status.toString());
            }
            return response.json();
        });
    }
}
