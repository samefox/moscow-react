import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

const tableHeads = [
    { id: 'login', label: 'Login' },
    { id: 'email', label: 'Email' },
    { id: 'country', label: 'Country' },
    { id: 'sex', label: 'Sex' },
    { id: 'age', label: 'Age' }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);

        if (order !== 0) {
            return order;
        }

        return a[1] - b[1];
    });

    return stabilizedThis.map(el => el[0]);
}

export default function ClientsTable(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(0);

    const onSort = (row) => {
        setOrderBy(row.id);
        setOrder(orderBy === row.id && order === 'asc' ? 'desc' : 'asc');
    };

    const classes = useStyles();

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    {tableHeads.map((item) => {
                        return (
                            <TableCell key={item.id} align="center" sortDirection={orderBy === item.id ? order: false}>
                                <TableSortLabel active={orderBy === item.id} direction={orderBy === item.id ? order : 'asc'}
                                                onClick={() => onSort(item)}>
                                    {item.label}
                                </TableSortLabel>
                            </TableCell>
                        );
                    })}
                    <TableCell align="center">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {stableSort(props.clients, getComparator(order, orderBy)).map(item => (
                    <TableRow key={item._id}>
                        <TableCell align="center">{item.login}</TableCell>
                        <TableCell align="center">{item.email}</TableCell>
                        <TableCell align="center">{item.country}</TableCell>
                        <TableCell align="center">{item.sex ? 'Female' : 'Male'}</TableCell>
                        <TableCell align="center">{item.age}</TableCell>
                        <TableCell align="center">
                            <IconButton aria-label="edit" onClick={() => props.onUpdateClientDialogOpen(item)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => props.onRemoveClient(item._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
