import React, {useRef, useState  } from 'react';
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
import { baseUrl } from '../../CommonResource/Common';
import { useHistory } from "react-router-dom";
import { userLoggedIn, educatorLoggedIn, storeUserData } from '../../globalStore/store';
import { connect } from 'react-redux';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({userLoginStatus, educatorLoginStatus, setUser}) => {
    const classes = useStyles();
    const email = useRef('')
    const password = useRef('')
    const [warning, setWarning] = useState("");
    const history = useHistory();
    const checkDetails = e => {
        e.preventDefault();
        axios.get( email.current.value.split('@')[1] === "edyoda.com" ? `${baseUrl}/findAllEducators/${email.current.value}` :  `${baseUrl}/findAllUsers/${email.current.value}`)
        .then((res) => {
            if(res.data && res.status===200){
                if(res.data._id === email.current.value && res.data.password === password.current.value){
                    setWarning("");
                    if(res.data.role === "Learner"){
                        userLoginStatus(true);
                    }
                    else{
                        educatorLoginStatus(true);
                    }
                    setUser(res.data);
                    let path = ``; 
                    history.push(path);
                }
                else{
                    setWarning("Incorrect credentials");
                }
            }
            else{
                if(email.current.value.split('@')[1] === "edyoda.com"){
                    setWarning("Educator doesn't exist. Please signup");
                }
                else{
                    setWarning("User doesn't exist. Please signup");
                }
            }
        });
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} onSubmit={checkDetails}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        label="Email Address"
                        inputRef={email}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        inputRef={password}
                    />
                    <p className="warningClass">{warning}</p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link to='/signup' >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}

  const mapDispatchToProps = (dispatch) => ({
    userLoginStatus: (data) => dispatch(userLoggedIn(data)),
    educatorLoginStatus: (data) => dispatch(educatorLoggedIn(data)),
    setUser: (data) => dispatch(storeUserData(data))
  });

export default connect("", mapDispatchToProps)(Login);