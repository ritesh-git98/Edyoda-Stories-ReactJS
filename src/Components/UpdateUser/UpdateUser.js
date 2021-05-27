import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { baseUrl } from "../../CommonResource/Common";
import axios from "axios";
import { storeUserData } from "../../globalStore/store";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const UpdateUser = ({getUser, setUser}) => {
  let userData = getUser;
  function updatedDataFun(){
    userData = getUser;
  }
  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const contact = useRef("");
  const classes = useStyles();
  const [warning, setWarning] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const updateData = e => {
    e.preventDefault();
    axios({
        method: 'put',
        url: userData.role  === "Learner"?`${baseUrl}/updateUser/${userData._id}`:`${baseUrl}/updateEducator/${userData._id}`,
        data: userData.role  === "Learner"?{
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            phNum: contact.current.value,
            password: userData.password,
            role: userData.role,
            videos_liked: userData.videos_liked,
            videos_watched: userData.videos_watched,
            subscribed: userData.subscribed
        }:{
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            phNum: contact.current.value,
            password: userData.password,
            role: userData.role,
            video: userData.video
        }
    }).then(response => {
        if (response.data && response.status === 200) {
            setWarning("");
            setSuccessMsg("Details updated Successfully :)")
            axios.get(userData.role  === "Learner"?`${baseUrl}/findAllUsers/${userData._id}`:`${baseUrl}/findAllEducators/${userData._id}`)
            .then((res) => {
                if(res.data && res.status===200){
                    setUser(res.data);
                    updatedDataFun();
                }
            });
        }
        else {
            setSuccessMsg("")
            setWarning("Someting went wrong. Try again later.");
        }
    })
    .catch(err =>{
        setSuccessMsg("")
        setWarning("Someting went wrong. Try again later.");
    })
    
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={updateData} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                label="Email Address"
                type="email"
                disabled
                value={userData._id}
                inputRef={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="First Name"
                size="small"
                autoFocus
                defaultValue={userData.firstName}
                inputRef={firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                label="Last Name"
                defaultValue={userData.lastName}
                inputRef={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                size="small"
                fullWidth
                label="Contact no."
                type="number"
                defaultValue={userData.phNum}
                placeholder="Enter 10 digit contact number"
                onInput={e => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                inputRef={contact}
              />
            </Grid>
          </Grid>
          <p className="warningClass">{warning}</p>
          <p className="successClass">{successMsg}</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (store) => ({
  getUser: store?.userData
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch(storeUserData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);