import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import { baseUrl } from '../../CommonResource/Common';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = () => {
    const firstName = useRef('')
    const lastName = useRef('')
    const email = useRef('')
    const contact = useRef('')
    const password = useRef('')
    const role = useRef('')
    const classes = useStyles();
    const history = useHistory();
    const [warning, setWarning] = useState("");
    const registerUser = e => {
        e.preventDefault();
        if(role.current.value === "Learner"){
            if(email.current.value.split('@')[1] !== "edyoda.com"){
                axios.get(`${baseUrl}/findAllUsers/${email.current.value}`)
                .then((res) => {
                    if (res.data && res.status === 200) {
                        setWarning("User already exists. Please login");
                    }
                    else {
                        axios({
                            method: 'post',
                            url: `${baseUrl}/addUser`,
                            data: {
                                _id: email.current.value,
                                firstName: firstName.current.value,
                                lastName: lastName.current.value,
                                phNum: contact.current.value,
                                password: password.current.value,
                                role: role.current.value,
                                videos_liked: [],
                                videos_watched: [],
                                subscribed: []
                            }
                        }).then(response => {
                            if (response.data && response.status === 200) {
                                setWarning("");
                                let path = ``;
                                history.push(path);
                            }
                            else {
                                setWarning("Someting went wrong. Try again later.");
                            }
                        })
                    }
                });
            }
            else{
                setWarning("Learner is not allowed to 'edyoda.com'");
            }
        }
        else{
            axios.get(`${baseUrl}/findAllEducators/${email.current.value}`)
            .then((res) => {
                if (res.data && res.status === 200) {
                    setWarning("Educator already exists. Please login");
                }
                else {
                    if(email.current.value.split('@')[1] === "edyoda.com"){
                        axios({
                            method: 'post',
                            url: `${baseUrl}/addEducator`,
                            data: {
                                _id: email.current.value,
                                firstName: firstName.current.value,
                                lastName: lastName.current.value,
                                phNum: contact.current.value,
                                password: password.current.value,
                                role: role.current.value,
                                video: []
                            }
                        }).then(response => {
                            if (response.data && response.status === 200) {
                                setWarning("");
                                let path = `login`;
                                history.push(path);
                            }
                            else {
                                setWarning("Someting went wrong. Try again later.");
                            }
                        })
                    }
                    else{
                        setWarning("Educator domain must like 'edyoda.com'");
                    }
                }
            });
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} onSubmit={registerUser} autoComplete='off'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="First Name"
                                autoFocus
                                inputRef={firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Last Name"
                                inputRef={lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                type="email"
                                inputRef={email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Contact no."
                                type="number"
                                placeholder="Enter 10 digit contact number"
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                }}
                                inputRef={contact}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                inputRef={password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Role"
                                fullWidth
                                required
                                inputRef={role}
                                helperText="Please select your Role"
                            >
                                <MenuItem key="Educator" value="Educator">
                                    Educator
                                </MenuItem>
                                <MenuItem key="Learner" value="Learner">
                                    Learner
                                </MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <p className="warningClass">{warning}</p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/' >
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default Register;