import React from 'react';
import { Button, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
    <div>
      <Typography variant="h1">Benvenuto in MUI!</Typography>
      <Button variant="contained" color="primary">Cliccami</Button>
    </div>
  );
};

export default App;