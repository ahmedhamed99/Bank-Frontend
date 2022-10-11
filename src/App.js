import React from 'react';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from "react";
import serverUrl from './server/serverUrl';

function App() {
  const [customers, setCustomers] = useState([]);
  const [latestTransfer, setLatestTransfer] = useState({});

  useEffect(() => {
    console.log(serverUrl)
    const getCustomers = async () => {
      const getCustomers = await fetchCustomers();
      setCustomers(getCustomers);
    }
    const getLatestTransfer = async () => {
      const latest = await fetchLatestTransfer();
      if (latest !== "No Transfers") {
        setLatestTransfer(latest);
      }
      
    }
    getCustomers();
    getLatestTransfer();
  }, [latestTransfer])
  const fetchCustomers = async () => {
    const res = await fetch(`${serverUrl}/customers/`);
    const data = await res.json();
    return data;
  }

  const fetchLatestTransfer = async () => {
    const res = await fetch(`${serverUrl}/transactions/latest`)
    const data = await res.json();
    return data;
  }

  return (
    <React.Fragment>
      <Dashboard customers={customers} latest={latestTransfer} />
    </React.Fragment>
  );
}

export default App;
