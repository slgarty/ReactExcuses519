import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ViewAll = () => {
    const [excuses, setExcuses] = useState([]);
    const getExcuses = async () => {
        const { data } = await axios.get('/api/excuses/ViewAll');
        setExcuses(data);
    }

    useEffect(() => {
        getExcuses();
    }, []);
    const getLikedCount = e => {
        if (!e.liked) {
            return 0
        }
        return e.liked.filter(l => !!l.liked).length;
    }
    const getDislikedCount = e => {
        if (!e.liked) {
            return 0
        }
        return e.liked.filter(l => !l.liked).length;
    }
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                {excuses && excuses.map(e => {
                    return <div className="card card-body bg-light mb-3">
                        <h5>{e.excuse}</h5>
                        <h5>{e.category}</h5>

                        <span>Likes: {getLikedCount(e)}</span>
                        <br />
                        <span>Dislikes: {getDislikedCount(e)}</span>
                    </div>
                })}

            </div>
        </div>
    );
};


export default ViewAll