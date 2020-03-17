import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import CustomSnackbar from '../components/CustomSnackbar';
import ClientDialog from '../components/ClientDialog';
import ClientsTable from '../components/ClientsTable';
import Api from '../services/api';
import * as clientsActions from '../store/clients/actions';

export default function Clients() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [clientDialogOpen, setClientDialogOpen] = useState(false);
    const [clientDialogTitle, setClientDialogTitle] = useState('');
    const [clientDialogData, setClientDialogData] = useState({});
    const [clientDialogHandler, setClientDialogHandler] = useState(null);

    const clients = useSelector(state => state.clients.clients);
    const dispatch = useDispatch();

    const onAddClientDialogOpen = () => {
        setClientDialogOpen(true);
        setClientDialogTitle('Add client');
        setClientDialogData({login: '', email: '', country: '', sex: 0, age: 0});
        setClientDialogHandler(0);
    };

    const onUpdateClientDialogOpen = (data) => {
        setClientDialogOpen(true);
        setClientDialogTitle('Update client');
        setClientDialogData(data);
        setClientDialogHandler(1);
    };

    const onAddClientDialogSubmit = (data) => {
        Api.clientAdd(data).then((response) => {
            data._id = response._id;
            dispatch(clientsActions.clientAdd(data));

            setClientDialogOpen(false);

            setSnackbarMessage('Client successfully created!');
            setSnackbarOpen(true);
        }).catch(() => {
            setSnackbarMessage('Client email already exist!');
            setSnackbarOpen(true);
        });
    };

    const onUpdateClientDialogSubmit = (data) => {
        Api.clientUpdate(data).then((response) => {
            dispatch(clientsActions.clientUpdate(data));
            setClientDialogOpen(false);

            setSnackbarMessage('Client successfully updated!');
            setSnackbarOpen(true);
        }).catch(() => {
            setSnackbarMessage('Client email already exist!');
            setSnackbarOpen(true);
        });
    };

    const onRemoveClient = (_id) => {
        Api.clientRemove(_id).then(() => {
            dispatch(clientsActions.clientRemove(_id));
            setSnackbarMessage('Client successfully removed!');
            setSnackbarOpen(true);
        }).catch(() => {
            setSnackbarMessage('Client does not exist!');
            setSnackbarOpen(true);
        });
    };

    return (
        <TableContainer component={Paper}>
            <CustomSnackbar open={snackbarOpen}
                            message={snackbarMessage}
                            onClose={() => setSnackbarOpen(false)} />
            <ClientDialog open={clientDialogOpen}
                          title={clientDialogTitle}
                          data={clientDialogData}
                          onSubmit={(data) => clientDialogHandler
                              ? onUpdateClientDialogSubmit(data)
                              : onAddClientDialogSubmit(data)}
                          onClose={() => setClientDialogOpen(false)} />
            <Button onClick={onAddClientDialogOpen}>Add client</Button>
            <ClientsTable clients={clients}
                          onUpdateClientDialogOpen={onUpdateClientDialogOpen}
                          onRemoveClient={onRemoveClient} />
        </TableContainer>
    );
}
