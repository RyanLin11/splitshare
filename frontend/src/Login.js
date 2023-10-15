import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Typography, Box, Container, CssBaseline } from '@mui/material';
import { login } from './services/UserService';
import { useAuth } from './auth/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const handleLogin = async () => {
    try{
        let user = await auth.signin(email, password);
        console.log(user);
    }catch (err) {
        console.log("Error" + err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3}>
        <Box p={2}>
          <Typography variant="h5" align="center">
            Login
          </Typography>
          <form>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;