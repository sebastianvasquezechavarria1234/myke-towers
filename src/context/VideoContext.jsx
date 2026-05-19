import React, { createContext, useContext, useState, useEffect } from 'react';
import { videos as staticVideos } from '../data/staticData';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (Array.isArray(staticVideos) && staticVideos.length > 0) {
            setVideos(staticVideos);
            const randomIndex = Math.floor(Math.random() * staticVideos.length);
            setCurrentVideo(staticVideos[randomIndex]);
        }
    }, []);

    const nextVideo = () => {
        if (videos.length > 0) {
            const randomIndex = Math.floor(Math.random() * videos.length);
            setCurrentVideo(videos[randomIndex]);
        }
    };

    const prevVideo = () => {
        // En este caso, como es random, prev hace lo mismo que next por ahora,
        // o podríamos llevar un historial si fuera necesario.
        nextVideo();
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <VideoContext.Provider value={{ 
            currentVideo, 
            videos, 
            nextVideo, 
            prevVideo, 
            isPlaying, 
            togglePlay 
        }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideo = () => useContext(VideoContext);
