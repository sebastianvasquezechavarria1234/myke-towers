import React, { createContext, useContext, useState, useEffect } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch("http://localhost:3000/videos");
                const data = await res.json();
                if (data.videos && data.videos.length > 0) {
                    setVideos(data.videos);
                    const randomIndex = Math.floor(Math.random() * data.videos.length);
                    setCurrentVideo(data.videos[randomIndex]);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        fetchVideos();
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
