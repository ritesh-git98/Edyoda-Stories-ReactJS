import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './Home.css'
import Loader from '../../Assets/loader.svg'
import { baseUrl } from '../../CommonResource/Common';
import { callAllVideos } from '../../globalStore/store';
import { connect } from 'react-redux';
const Home = ({callVideos}) => {

    useEffect(() => {
        callVideos()
    },[])

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/findAllVideos`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>
            <img className="loader" src={Loader} alt="img"/>
        </div>;
    } else {
        return (
            <div className="videosWrapper">
                <h2>Learning Videos</h2>
                <hr />
                <div className="cardWrapper">
                    {items.map(item => <Card key={item._id} prop={item} />)}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    callVideos: (data) => dispatch(callAllVideos(data))
  });
  
  export default connect("", mapDispatchToProps)(Home);