import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Link } from 'react-router-dom';


export default function Customers({ customers }) {
  return (
    <React.Fragment>
      <Title>Customers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link style={{ textDecoration: "none", color: "#0000EE" }} to={`/customer/${row.id}`}>
                  {row.username}
                </Link>
              </TableCell>
              <TableCell>{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}