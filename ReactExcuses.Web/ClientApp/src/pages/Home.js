import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import useInterval from '../useInterval';


const Home = () => {

    const [excuseApiItem, setExcuseApiItem] = useState({});
    const { user } = useAuthContext();
    const [refresh, setRefresh] = useState(true);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isRecent, setIsRecent] = useState(false);


    useInterval(() => updateCounts(), 2000)

    const setCounts = data => {        
            if (!data.liked) {
                return
            }
                const l = data.liked.filter(l => l.liked === true);
                const d = data.liked.filter(l => l.liked === false);
                setLikes(l.length);
            setDislikes(d.length)
        };   
    

    const recent = async liked => {
        const time = liked.time;
        const { data } = await axios.get(`/api/excuses/isrecent?time=${time}`);
        setIsRecent(data);
    };

    const liked = data => {
        var likedList = data.liked;
        if (!likedList) {
            return
        }
        else {
            var l = likedList.filter(l => l.excuseApiItemId === data.id && l.userId === user.id);
            if (l.length === 0) {
                setIsLiked(false);
            }
            else {
                setIsLiked(l[0]);
                recent(l[0]);
            }
        }
    };

    useEffect(() => {
        const getExcuses = async () => {
            const { data } = await axios.get('/api/excuses/getExcuse');
            setExcuseApiItem(data);
            setCounts(data);
            setIsRecent(false);
            if (user != null) {
                liked(data);
            }
        };
        getExcuses();
    }, [refresh]);

    const refreshPage = () => {
        setRefresh(!refresh);
    };

    const updateCounts = async () => {
        const { data } = await axios.get(`/api/excuses/GetUpdatedExcuse?ExcuseApiItemid=${excuseApiItem.id}`);
        liked(data);
        setCounts(data);
    };

    const likeButtonClick = async bool => {
        console.log(user.id)
        if (!isLiked) {

            const { data } = await axios.post(`/api/excuses/addlike?userId=${+user.id}&&ExcuseId=${excuseApiItem.id}&&Liked=${bool}`);
            setIsRecent(true);
            setExcuseApiItem(data);
            setCounts(data);
            liked(data);
        }
        else {
            const { data } = await axios.post(`/api/excuses/addlike?userId=${+user.id}&&ExcuseId=${excuseApiItem.id}&&Liked=${bool}`);
            setIsRecent(true);
            setExcuseApiItem(data);
            setCounts(data);
            liked(data);
        }
    };

    return (

        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <div>
                    <h4>{excuseApiItem.category}</h4>
                    <h4>{excuseApiItem.excuse}</h4>
                    <div>
                        <div>
                            {!user && <Link to='/login'>Login to your account to like/dislike this excuse</Link>}

                            {user && <>
                                {(!!isLiked && !isRecent) && <>
                                    <button className='btn btn-info' disabled onClick={() => likeButtonClick(true)}>Like</button>
                                    <button className='btn btn-warning' disabled onClick={() => likeButtonClick(false)}>Dislike</button>
                                </>}
                                {(isRecent && isLiked.liked) && <>
                                    <button className='btn btn-info' disabled onClick={() => likeButtonClick(true)}>Like</button>
                                    <button className='btn btn-warning' onClick={() => likeButtonClick(false)}>Dislike</button>
                                </>}
                                {(isRecent && !isLiked.liked) && <>
                                    <button className='btn btn-info' onClick={() => likeButtonClick(true)}>Like</button>
                                    <button className='btn btn-warning' disabled onClick={() => likeButtonClick(false)}>Dislike</button>
                                </>}
                                {!isLiked && <>
                                    <button className='btn btn-info' onClick={() => likeButtonClick(true)}>Like</button>
                                    <button className='btn btn-warning' onClick={() => likeButtonClick(false)}>Dislike</button>
                                </>}
                            </>
                            }
                        </div>
                        <br />
                        <h4>Likes: {likes}</h4>
                        <h4>Dislikes: {dislikes}</h4>
                        <h4><button className="btn btn-link" onClick={refreshPage}>Refresh</button></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home