import React, { useState, useEffect } from 'react';
import './home.css';
import VideoCard from '../VideoCard.js'
import db from "../firebase.js";

function App() {
  const [refresh, doRefresh] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(
    () => {
      db.collection("tutorials").onSnapshot(
        snapshot => {
          setVideos(snapshot.docs.map(doc => doc.data()))
        }
      );
    }, []
  );

  return (
    <div className="app">
      <div className="app__video-cards" onScroll={() => doRefresh(prev => prev + 1)}>
        {videos.map(({ songName, comments, likes, shares, fileurl, channel, description }, i) => (
          <VideoCard
            key={i}
            songName={songName}
            comments={comments}
            likes={likes}
            shares={shares}
            fileurl={fileurl}
            channel={channel}
            description={description}
            refresh={refresh}
          />
        ))}

      </div>
    </div>
  );
}

export default App;