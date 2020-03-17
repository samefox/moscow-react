import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ClientDialog(props) {
    const [errorKey, setErrorKey] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [data, setData] = React.useState(props.data);

    useEffect(() => {
        setData(props.data);
    }, [props]);

    const onSubmit = () => {
        if (data.login.length < 3) {
            setErrorKey('login');
            setErrorMessage('Login must be more than 3 symbols.');

            return;
        } else if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(data.email)) {
            setErrorKey('email');
            setErrorMessage('Please past the correct email.');

            return;
        } else if (data.age < 0 || data.age > 100) {
            setErrorKey('age');
            setErrorMessage('Please past the correct age.');

            return;
        }

        setErrorKey('');
        props.onSubmit(data);
    };

    const onChange = (key, value) => {
        setData({...data, [key]: value});
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="Add client">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="login" label="Login" type="text" fullWidth value={data.login}
                           onChange={(e) => onChange('login', e.target.value)} error={errorKey === 'login'}
                           helperText={errorKey === 'login' ? errorMessage : ''} />
                <TextField margin="dense" id="name" label="Email" type="email" fullWidth value={data.email}
                           onChange={(e) => onChange('email', e.target.value)} error={errorKey === 'email'}
                           helperText={errorKey === 'email' ? errorMessage : ''} />
                <TextField margin="dense" id="country" label="Country" type="text" fullWidth value={data.country}
                           onChange={(e) => onChange('country', e.target.value)} />
                <TextField margin="normal" id="sex" select value={data.sex} fullWidth
                           onChange={(e) => onChange('sex', e.target.value)}>
                    <MenuItem value={0}>Male</MenuItem>
                    <MenuItem value={1}>Female</MenuItem>
                </TextField>
                <TextField margin="dense" id="age" label="Age" type="number" fullWidth value={data.age}
                           onChange={(e) => onChange('age', e.target.value)} error={errorKey === 'age'}
                           helperText={errorKey === 'age' ? errorMessage : ''} />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Cancel</Button>
                <Button onClick={onSubmit} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}
