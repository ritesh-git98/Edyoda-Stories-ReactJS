import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import CustomizedDialogs from "../Utils/Modal";
import SimpleList from "../Utils/List";
import Loader from "../../Assets/loader.svg";
import { callAllVideos, storeUserData } from "../../globalStore/store";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../CommonResource/Common";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    margin: "15% auto",
    padding: "2rem"
  },
  title: {
    fontSize: 24,
    display: "flex",
    justifyContent: "space-between"
  },
  key: {
    fontSize: 16,
    display: "flex",
    margin: " 8px 0"
  },
  icon: {
    marginRight: "5px"
  }
});
const Profile = ({ getUser, callVideos, getVideos, loginStatus }) => {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const userData = getUser;
  const allVideo = getVideos;
  const [allAuthor, setAllAuthor] = useState(null);
  const { subscribed, videos_watched } = userData;
  useEffect(() => {
    setIsLoaded(true);
    if(loginStatus=="true"){
      callVideos();
      if (getVideos) {
        axios.get(`${baseUrl}/findAllEducators`)
          .then((res) => {
            setAllAuthor(res.data);
          }
          );
      }
    }
  }, []);
  let videosWatched;
  let subscribedChannel;
  if(loginStatus=="true"){
    subscribedChannel= (allAuthor?.filter((item) => {
      return subscribed.includes(item._id)
    }));
    videosWatched= (allVideo?.filter((item) => {
      return videos_watched.includes(item._id)
    }));
  }
  if (!isLoaded) {
    return (
      <div>
        <img className="loader" src={Loader} alt="img" />
      </div>
    );
  } else {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            User Profile
            <CustomizedDialogs prop="Register" />
          </Typography>
          <Typography className={classes.key} color="textPrimary" gutterBottom>
            <PersonIcon className={classes.icon} /> Full Name: {userData.firstName} {userData.lastName}
          </Typography>
          <Typography className={classes.key} color="textPrimary" gutterBottom>
            <EmailIcon className={classes.icon} /> Email: {userData._id}
          </Typography>
          <Typography className={classes.key} color="textPrimary" gutterBottom>
            <PhoneIcon className={classes.icon} /> Contact Number: {userData.phNum}
          </Typography>
          <Typography></Typography>
          {userData.role === "Learner" ?
            <>
              <Typography className={classes.key} color="textPrimary" gutterBottom>
                <VideoLibraryIcon className={classes.icon} /> Videos Watched
                </Typography>
              <Typography>
                {videosWatched?.map((item)=>
                 <SimpleList data={item.title} key={item.title} />
                )}
                
              </Typography>
              <Typography className={classes.key} color="textPrimary" gutterBottom>
                <SubscriptionsIcon className={classes.icon} /> Channel Subscribed
                </Typography>
              <Typography>
                {subscribedChannel?.map(
                  (item) => <SimpleList data={item.firstName+" "+item.lastName} key={item._id}/>
                )}

              </Typography>
            </> : ""}
        </CardContent>
      </Card>
    );
  }
};

const mapStateToProps = (store) => ({
  getUser: store?.userData,
  getVideos: store?.allVideoStore,
  loginStatus: store?.userLogin
});
const mapDispatchToProps = (dispatch) => ({
  userDataStore: (data) => dispatch(storeUserData(data)),
  callVideos: (data) => dispatch(callAllVideos(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);