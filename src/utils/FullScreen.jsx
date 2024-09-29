import { Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const FullScreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Error attempting to enable full-screen mode:', err.message);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error('Error attempting to exit full-screen mode:', err.message);
        });
      }
    }
  };

  return (
    <button onClick={toggleFullScreen}
      className="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
    >
      {isFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
    </button>
  );
};

export default FullScreenButton;
