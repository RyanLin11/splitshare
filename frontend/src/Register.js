import { useState } from 'react';
import { Button, TextField, Paper, Typography, Box, Container, CssBaseline } from '@mui/material';
import { register } from './services/UserService';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            let user = await register({ email, password });
            console.log(user);
            navigate('/login');
        } catch (err) {
            console.log("Error" + err);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3}>
            <Box p={2}>
            <Typography variant="h5" align="center">
                Register
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
                    onClick={handleRegister}
                >
                    Register
                </Button>
            </form>
            </Box>
        </Paper>
        </Container>
    );
};

export default Register;