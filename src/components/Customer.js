import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Title from './Title'

import Button from '@mui/material/Button';
import serverUrl from '../server/serverUrl';

const Customer = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const getCustomer = async () => {
      const getCustomer = await fetchCustomer();
      setCustomer(getCustomer);
      setLoading(false)
    };
    getCustomer();
  }, [])

  const fetchCustomer = async () => {
    const res = await fetch(`${serverUrl}/customers/${param.id}`)
    const data = await res.json();
    return data
  }

  const goToTransfer = () => {
    navigate(`/transfer?from=${customer.id}`)
  }

  return (

    <React.Fragment>
      <Title>Customer Info</Title>
      {!loading ? (
        <React.Fragment>
          <h3>
            Name : {customer.username}
          </h3>
          <h3>
            Balance : {customer.balance}$
          </h3>

          <Button variant="contained" onClick={goToTransfer}>Transfer Money From {customer.username}</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p style={{ textAlign: "center" }}>Loading...</p>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Customer;