import * as React from 'react';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



export const mainListItems = (
  <React.Fragment>
    <Link to="/" style={{textDecoration:"none" , color: "black"}}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    </Link>
    <Link to="/customers" style={{textDecoration:"none", color: "black"}}>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    </Link>
    <Link to="/transfer" style={{textDecoration:"none", color: "black"}}>
    <ListItemButton>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Transfers" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);
