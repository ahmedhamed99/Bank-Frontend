import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function LatestTransfer({ latest, customers }) {

  return (
    <React.Fragment>
      <Title>Latest Transfer</Title>
      {Object.keys(latest).length > 0 ? (
      <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
        <h5>From</h5>
          <Item>{customers.map(row=>row.id==latest.sender_id&&row.username)}</Item>
        </Grid>
        <Grid item xs={8}>
        <h5>To</h5>
          <Item>{customers.map(row=>row.id==latest.receiver_id&&row.username)}</Item>
        </Grid>
      </Grid>
    </Box>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Amount : {latest.amount}$
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {new Date(latest.created_at).toLocaleDateString('en-US')} - {new Date(latest.created_at).toLocaleTimeString('en-US')}
      </Typography>
      </React.Fragment>):("No Transfers Yet")}
    </React.Fragment>
  );
}