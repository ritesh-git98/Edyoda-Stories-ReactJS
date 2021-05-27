import React, { useState, useEffect } from "react";
import "./Watch.css";
import Card from "../Card/Card";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import QueueIcon from "@material-ui/icons/Queue";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Typography } from "@material-ui/core";
import Loader from "../../Assets/loader.svg";
import { baseUrl } from "../../CommonResource/Common";
import axios from "axios";
import { connect } from "react-redux";
import { storeUserData } from "../../globalStore/store";
import { useHistory } from "react-router";

const Watch = ({ getUser, setUser,loginStatus }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoData, setVideoData] = useState({});
  const [allVideo, setAllVideo] = useState([]);
  const [authorData, setAuthorData] = useState("");
  const [like, setLike] = useState(false);
  const [likeBtn, setLikeBtn] = useState("");
  const [subscribedStatus, setSubscribedStatus] = useState(false);
  const [subscribe, setSubscribe] = useState("");
  const id = window.location.search;
  const res = id.split("?");
  const location = useHistory();
  if(loginStatus!="true"){
    location.push('/login');
  }
  else{
  if (getUser.videos_liked.includes(res[1]) && !like) {
    setLike(true);
  }
  if (getUser.subscribed.includes(videoData.educator) && !subscribedStatus) {
    setSubscribedStatus(true);
  }
}
  useEffect(() => {//component did mount
    if(loginStatus=="true"){
    if (!getUser.videos_watched.includes(res[1])) {
        getUser.videos_watched.push(res[1]);
        userApiUpdate();
        }
    let { subscribed } = getUser;
    axios.get(`${baseUrl}/findAllVideos/${res[1]}`).then(
      ({ data }) => {
        subscribed.includes(data._id)
          ? setSubscribedStatus(true)
          : setSubscribedStatus(false);
        let tempvData=data
        tempvData.views++;
        setVideoData(tempvData);
        axios({
            method: "put",
            url: `${baseUrl}/updateVideo/${res[1]}`,
            data: tempvData
          })


        axios
          .get(`${baseUrl}/findAllEducators/${data.educator}`)
          .then(({ data }) => {
            setAuthorData(`${data.firstName} ${data.lastName}`);
            setIsLoaded(true);
          });
      },
      error => {
        setIsLoaded(true);
      }
    );
    axios.get(`${baseUrl}/findAllVideos`).then(({ data }) => setAllVideo(data));
    }
  }, []);
  const likeClicked = () => {
    if (getUser.videos_liked.includes(res[1])) {
      let index = getUser.videos_liked.indexOf(res[1]);
      if (index !== -1) {
        getUser.videos_liked.splice(index, 1);
        let tempvData=videoData
        tempvData.likes--;
        setVideoData(tempvData);
        userApiUpdate("likesApi");
      }
    } else {
      getUser.videos_liked.push(res[1]);
      let tempvData=videoData
    tempvData.likes++;
    setVideoData(tempvData);
      userApiUpdate("likesApi");
    }
  };
  const userApiUpdate = (callTo) => {
    axios({
      method: "put",
      url: `${baseUrl}/updateUser/${getUser._id}`,
      data: getUser
    }).then(response => {
      if (response.data && response.status === 200) {
        axios.get(`${baseUrl}/findAllUsers/${getUser._id}`).then(resp => {
          if (resp.data && resp.status === 200) {
            setUser(resp.data);
          }
        });
      }
    });
    if(callTo="likesApi"){
        axios({
            method: "put",
            url: `${baseUrl}/updateVideo/${videoData._id}`,
            data: videoData
          })
    }
  };
  const subscribeClicked = () => {
    if (getUser.subscribed.includes(videoData.educator)) {
      let index = getUser.subscribed.indexOf(videoData.educator);
      if (index !== -1) {
        getUser.subscribed.splice(index, 1);
        userApiUpdate();
      }
    } else {
      getUser.subscribed.push(videoData.educator);
      userApiUpdate();
    }
  };
  useEffect(() => {
    //update

    // for subscribe button
    setSubscribedStatus(subscribedStatus);
    subscribedStatus ? setSubscribe("contained") : setSubscribe("outlined"); //if true push videoID to subscribed

    ////for like button
    like ? setLikeBtn("contained") : setLikeBtn("outlined");
    setLike(like);
  }, [subscribedStatus, subscribe, like, likeBtn]);
  if (!isLoaded) {
    return (
      <div>
        <img className="loader" src={Loader} alt="img" />
      </div>
    );
  } else {
    const { description, likes, title, video_url, views } = videoData;
    let time = res[1].split("v")[1];
    time = parseInt(time);
    let day = new Date(time).getDate();
    let month = new Date(time).getMonth() + 1;
    let year = new Date(time).getFullYear();
    return (
      <>
        <div className="Heading">
          <h1>Learning Videos</h1>
        </div>
        <div className="mainContainer">
          <div className="videoSection">
            <div className="videoWrapper">
              <iframe
                src={video_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <Typography variant="h5" className="title">
              <span>{title}...</span>
              <Button
                variant={likeBtn}
                color="primary"
                size="small"
                startIcon={<ThumbUpIcon />}
                onClick={() => {
                  setLike(!like);
                  likeClicked();
                }}
              >
                {" "}
                Like
              </Button>
            </Typography>
            <Typography variant="subtitle1">
              {likes} likes | {views} views
              <Typography>
                Published on: {day}/{month}/{year}
              </Typography>
            </Typography>
            <div className="videoActions">
              <Button size="large" startIcon={<AccountCircleIcon />}>
                {" "}
                {authorData}
              </Button>

              <Button
                variant={subscribe}
                color="primary"
                startIcon={<QueueIcon />}
                onClick={() => {
                  setSubscribedStatus(!subscribedStatus);
                  subscribeClicked();
                }}
              >
                {" "}
                Subscribe
              </Button>
            </div>
            <Typography variant="subtitle1">{description}</Typography>
          </div>
          <div className="videoList">
            <Typography variant="h5" className="headingTitle">
              Recomended Videos
            </Typography>
            <div className="allVideos">
              {allVideo.map(item => {
                return (
                  <div>
                    <Card prop={item} key={item._id} />
                    <hr className="sep" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
};

const mapStateToProps = store => ({
  getUser: store?.userData,
  loginStatus: store?.userLogin
});
const mapDispatchToProps = dispatch => ({
  setUser: data => dispatch(storeUserData(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Watch);
