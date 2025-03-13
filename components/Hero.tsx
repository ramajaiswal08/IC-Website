"use client";

import { useCallback, useEffect, useState } from "react";


export default function Hero() {
  const [video, setVideo] = useState<string | null>(null);
  const [documentWidth, setDocumentWidth] = useState<number>(0);

  useEffect(() => {
    setDocumentWidth(window.innerWidth);

    const handleResize = () => setDocumentWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const VideoPlay = useCallback((src: string) => {
    setVideo(src);
    const videoElement = document.getElementById(
      "heroVideo"
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.style.opacity = "1";
      videoElement.play();
    }
  }, []);

  const VideoPause = useCallback(() => {
    const videoElement = document.getElementById(
      "heroVideo"
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.style.opacity = "0";
      videoElement.pause();
    }
    setVideo(null);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-start pt-20 bg-black text-white">


      {documentWidth >= 600 && (
        <div className="absolute inset-0 flex justify-center items-center">
          <video
            id="heroVideo"
            src={video ? `/videos/${video}.mp4` : ""}
            autoPlay
            muted
            loop
            controls={false}
            className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
              video ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col text-center space-y-6">
        {documentWidth >= 600 ? (
          <>
            <h1
              className="text-7xl md:text-8xl font-bold cursor-pointer hover:text-gray-300 transition-colors"
              onMouseEnter={() => VideoPlay("design")}
              onMouseLeave={VideoPause}
              onTouchStart={() => VideoPlay("design")}
            >
              Welcome to
            </h1>
            <h1
              className="text-7xl md:text-8xl font-bold cursor-pointer hover:text-gray-300 transition-colors"
              onMouseEnter={() => VideoPlay("develop")}
              onMouseLeave={VideoPause}
              onTouchStart={() => VideoPlay("develop")}
            >
              Infinity
            </h1>
            <h1
              className="text-7xl md:text-8xl font-bold cursor-pointer hover:text-gray-300 transition-colors"
              onMouseEnter={() => VideoPlay("code")}
              onMouseLeave={VideoPause}
              onTouchStart={() => VideoPlay("code")}
            >
              Coders.
            </h1>
            <p className="text-2xl md:text-3xl mt-6 tracking-wider font-light">
              <span className="text-blue-400">DESIGN</span> · 
              <span className="text-green-400"> CODE</span> · 
              <span className="text-purple-400"> CONQUER</span>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-7xl font-bold">Welcome to</h1>
            <h1 className="text-7xl font-bold">Infinity</h1>
            <h1 className="text-7xl font-bold">Coders.</h1>
            <p className="text-xl mt-4 tracking-wider font-light">
              <span className="text-blue-400">DESIGN</span> · 
              <span className="text-green-400"> CODE</span> · 
              <span className="text-purple-400"> CONQUER</span>
            </p>
          </>
        )}
      </div>
    </section>
  );
}