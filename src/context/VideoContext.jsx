import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { videos as staticVideos } from '../data/staticData';

const VideoContext = createContext();

// Extraer ID de YouTube de una URL
const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// Cargar el script de la API de YouTube (solo una vez)
let ytApiLoaded = false;
let ytApiLoadPromise = null;
const loadYouTubeAPI = () => {
    if (ytApiLoaded) return Promise.resolve();
    if (ytApiLoadPromise) return ytApiLoadPromise;

    ytApiLoadPromise = new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            ytApiLoaded = true;
            resolve();
            return;
        }
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            ytApiLoaded = true;
            resolve();
        };
    });
    return ytApiLoadPromise;
};

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // Empieza muteado (autoplay policy)
    const ytPlayerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);

    // Inicializar videos
    useEffect(() => {
        if (Array.isArray(staticVideos) && staticVideos.length > 0) {
            setVideos(staticVideos);
            const randomIndex = Math.floor(Math.random() * staticVideos.length);
            setCurrentVideo(staticVideos[randomIndex]);
        }
    }, []);

    // Crear el reproductor de YouTube cuando tenemos un video
    useEffect(() => {
        if (!currentVideo) return;

        const videoId = getYouTubeId(currentVideo.url);
        if (!videoId) return;

        loadYouTubeAPI().then(() => {
            // Si ya existe un player, cargar el nuevo video
            if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
                ytPlayerRef.current.loadVideoById(videoId);
                if (isPlaying) {
                    ytPlayerRef.current.playVideo();
                }
                if (!isMuted) {
                    ytPlayerRef.current.unMute();
                    ytPlayerRef.current.setVolume(100);
                }
                return;
            }

            // Crear nuevo player
            if (!playerContainerRef.current) return;

            // Limpiar contenido anterior
            playerContainerRef.current.innerHTML = '';
            const playerDiv = document.createElement('div');
            playerDiv.id = 'yt-global-player';
            playerContainerRef.current.appendChild(playerDiv);

            ytPlayerRef.current = new window.YT.Player('yt-global-player', {
                height: '200',
                width: '200',
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    loop: 1,
                    playlist: videoId,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    disablekb: 1,
                    playsinline: 1,
                },
                events: {
                    onReady: (event) => {
                        setPlayerReady(true);
                        event.target.playVideo();
                        // Empieza muteado para que autoplay funcione
                        event.target.mute();
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            // Siguiente video cuando termina
                            const nextIdx = Math.floor(Math.random() * staticVideos.length);
                            setCurrentVideo(staticVideos[nextIdx]);
                        }
                    }
                }
            });
        });
    }, [currentVideo?.id]);

    // Sincronizar play/pause con el player
    useEffect(() => {
        if (!ytPlayerRef.current || !playerReady) return;
        try {
            if (isPlaying) {
                ytPlayerRef.current.playVideo();
            } else {
                ytPlayerRef.current.pauseVideo();
            }
        } catch (e) { /* player not ready */ }
    }, [isPlaying, playerReady]);

    // Sincronizar mute/unmute
    useEffect(() => {
        if (!ytPlayerRef.current || !playerReady) return;
        try {
            if (isMuted) {
                ytPlayerRef.current.mute();
            } else {
                ytPlayerRef.current.unMute();
                ytPlayerRef.current.setVolume(100);
            }
        } catch (e) { /* player not ready */ }
    }, [isMuted, playerReady]);

    const nextVideo = useCallback(() => {
        if (videos.length > 0) {
            const randomIndex = Math.floor(Math.random() * videos.length);
            setCurrentVideo(videos[randomIndex]);
        }
    }, [videos]);

    const prevVideo = useCallback(() => {
        // En este caso, como es random, prev hace lo mismo que next por ahora
        nextVideo();
    }, [nextVideo]);

    const togglePlay = useCallback(() => {
        const newPlaying = !isPlaying;
        setIsPlaying(newPlaying);
        // Cuando el usuario da play por primera vez, desmutear
        if (newPlaying && isMuted) {
            setIsMuted(false);
        }
    }, [isPlaying, isMuted]);

    return (
        <VideoContext.Provider value={{ 
            currentVideo, 
            videos, 
            nextVideo, 
            prevVideo, 
            isPlaying, 
            togglePlay,
            isMuted,
            setIsMuted
        }}>
            {children}
            {/* Reproductor global de YouTube - visible pero discreto para que el browser permita audio */}
            <div 
                ref={playerContainerRef}
                style={{ 
                    position: 'fixed', 
                    bottom: 0, 
                    right: 0, 
                    width: '200px', 
                    height: '200px', 
                    zIndex: 9999,
                    opacity: 0.01,
                    pointerEvents: 'none'
                }}
            />
        </VideoContext.Provider>
    );
};

export const useVideo = () => useContext(VideoContext);
