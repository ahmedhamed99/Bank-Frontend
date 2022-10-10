import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import serverUrl from '../server/serverUrl';
import { useSearchParams , useNavigate } from 'react-router-dom';

export default function Transfer({ customers }) {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  useEffect(() => {
    const paramsAsObject = Object.fromEntries([...searchParams]);

    if(Object.keys(paramsAsObject).length !== 0){
      setSender(paramsAsObject.from)
    }
  }, [searchParams]);


  const handleSender = (e) => {
    setSender(e.target.value)
  }

  const handleReceiver = (e) => {
    setReceiver(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  const makeTransfer = async () => {
    var unix = new Date();
    const data = { sender_id: sender, receiver_id: receiver, amount: amount, created_at: unix }

    if(sender == receiver){
      setError(" - Can't Transfer Money to the same Customer.")
      return
    }

    if (!sender) {
      setError(" - Select Sender.")
      return
    }
    if (!receiver) {
      setError(" - Select Receiver.")
      return
    }
    if (!parseInt(amount)) {
      setError(" - Enter a number for amount.")
      return
    }

    try {
      const res = await fetch(`${serverUrl}/transactions/`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if(res.status === 400){
        setError(await res.json());
        return
      }
      
      navigate('/')
    } catch (e) {
      setError(e)
    }

  }

  return (
    <React.Fragment>
      <p>From</p>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">From</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sender}
            label="From"
            onChange={handleSender}
          >
            {customers.map(row => (
              <MenuItem key={row.id} value={row.id}>{row.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <p>To</p>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">To</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={receiver}
            label="To"
            onChange={handleReceiver}
          >
            {customers.map(row => (
              <MenuItem key={row.id} value={String(row.id)}>{row.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minHeight: 30 }}></Box>
      <TextField id="outlined-basic" value={amount} label="Amount" variant="outlined" onChange={handleAmount} />
      <p style={{ color: "red", padding: "1px" }}>{error}</p>
      <Button variant="contained" onClick={makeTransfer}>Transfer</Button>
    </React.Fragment>
  );
}
