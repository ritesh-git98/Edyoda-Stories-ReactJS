import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Card.css'
import axios from 'axios';
import { baseUrl } from '../../CommonResource/Common';
import { connect } from "react-redux";


const Card = (props) => {
    const {isEducator}=props;
    const [author,setAuthor] = useState('');
    const {  educator, duration, likes, thumbnail_url, title, views,_id } = props.prop;
    let url="";
    if(isEducator == "true"){
        url="";
    }
    else{
        url=`/watch?${_id}`;
    }
    axios.get( `${baseUrl}/findAllEducators/${educator}`)
        .then((res) => {
            let fullName =res.data.firstName+' '+res.data.lastName;
            setAuthor(fullName)
        });
    return (
        <>
            <Link to={url} className="cardAnchor" >
                <div className="cardItem">
                    <div className="thumbnailContainer">
                        <img className="videoThumbnail" src={thumbnail_url} alt="video thumbnail" />
                        <div className="Overlay"></div>
                        <div className="videoDurationData">
                            <img className="videoPlayIcon" src="https://edyoda.com/static/media/icon-play-blue.68696826.svg" alt="play icon" />
                            <p className="videoDuration">{duration}</p>
                        </div>
                    </div>
                    <div className="videoMetaData">
                        <h3 className="videoTitle">
                            {title}<wbr />...
                        </h3>
                        <div className="videoOwnerData">
                            <div className="videoMetaDataSection"><span>{author}</span>
                                <span className="separator"> |</span>
                                <span>{likes} likes</span>
                                <span className="separator"> |</span> <span>{views} views</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}


const mapStateToProps = (store) => ({
    isEducator: store?.educatorLogin
  });
  
  export default connect(mapStateToProps, "")(Card);