import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

function Customer({data}) {
    return (
        <TableRow>
            <TableCell>{data.no}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.phone}</TableCell>
            <TableCell>{data.birthday}</TableCell>
            <TableCell>{data.gender}</TableCell>
            <TableCell>{data.addr}</TableCell>
        </TableRow>
    );
}

export default Customer;