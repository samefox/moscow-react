import * as clientsTypes from './actions';

const initialState = {
    clients: []
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case clientsTypes.CLIENT_GET:
            return {
                ...state,
                clients: action.payload
            };
        case clientsTypes.CLIENT_ADD:
            return {
                ...state,
                clients: [...state.clients, action.payload]
            };
        case clientsTypes.CLIENT_UPDATE:
            return {
                ...state,
                clients: [...state.clients.map(client => client._id === action.payload._id ? action.payload : client)]
            };
        case clientsTypes.CLIENT_REMOVE:
            return {
                ...state,
                clients: [...state.clients.filter(client => client._id !== action.payload)]
            };
        default: return state;
    }
}
