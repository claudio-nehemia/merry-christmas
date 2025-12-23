"use client";

import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Gift, Star } from "lucide-react";

const ChristmasLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentWish, setCurrentWish] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const wishes = [
    {
      text: "Every moment with you feels like a gift I never want to lose. You're the reason this holiday feels so magical.",
      subtext: "Thank you for being the greatest gift I've ever received.",
    },
    {
      text: "You light up my world brighter than a thousand Christmas lights. Your smile is the star on top of my tree.",
      subtext: "With you, every season feels like Christmas.",
    },
    {
      text: "In this winter wonderland, you're the warmth that keeps my heart glowing. You make even the coldest days feel magical.",
      subtext: "You're my favorite Christmas miracle.",
    },
    {
      text: "All I want for Christmas is more moments with you. Every laugh, every hug, every memory we create together.",
      subtext: "You make my life a beautiful celebration.",
    },
    {
      text: "You've wrapped my heart in love and joy. Being with you is better than opening all the presents in the world.",
      subtext: "You're the answer to all my Christmas wishes.",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const wishInterval = setInterval(() => {
      setCurrentWish((prev) => (prev + 1) % wishes.length);
    }, 5000);

    // Auto play music on load
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // Browser might block autoplay, user needs to click
          console.log("Autoplay blocked, user needs to click play button");
        });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(wishInterval);
    };
  }, []);

  const photos = [
    { src: "1.jpeg", alt: "Moment 1" },
    { src: "2.jpeg", alt: "Moment 2" },
    { src: "3.jpeg", alt: "Moment 3" },
    { src: "4.jpeg", alt: "Moment 4" },
    { src: "5.jpeg", alt: "Moment 5" },
    { src: "6.jpeg", alt: "Moment 6" },
  ];

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (src: string) => {
    setLoadedImages((prev) => ({ ...prev, [src]: false }));
  };

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => ({ ...prev, [src]: true }));
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-blue-900 to-red-800 overflow-x-hidden">
      {/* Audio Player - Hidden but functional */}
      <audio ref={audioRef} loop>
        <source src="your-song.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control Button - Fixed position */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-red-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white border-opacity-30"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {/* Animated Background Elements */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Star
              className="text-blue-300 opacity-40"
              size={Math.random() * 20 + 10}
            />
          </div>
        ))}
      </div>
      )}
      

      {/* Floating Snowflakes */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`snow-${i}`}
            className="absolute text-white opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `fall ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>
      )}
      

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div
            className={`text-center transition-all duration-1500 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-8 inline-block">
              <Sparkles className="text-yellow-300 w-16 h-16 animate-pulse mx-auto mb-4" />
            </div>

            <h1
              className="text-6xl md:text-8xl font-bold text-white mb-6 animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              Merry Christmas
            </h1>

            <div className="relative inline-block mb-8">
              <Heart className="text-pink-400 w-12 h-12 absolute -left-16 top-1/2 transform -translate-y-1/2 animate-pulse" />
              <p className="text-3xl md:text-4xl text-red-100 font-light">
                To My Love
              </p>
              <Heart className="text-pink-400 w-12 h-12 absolute -right-16 top-1/2 transform -translate-y-1/2 animate-pulse" />
            </div>

            <div className="max-w-3xl mx-auto mt-12 space-y-6 relative">
              {/* Wish Cards Carousel */}
              <div className="relative h-64 overflow-hidden">
                {wishes.map((wish, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                      index === currentWish
                        ? "opacity-100 translate-x-0"
                        : index < currentWish
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                  >
                    <div className="text-xl md:text-2xl text-white leading-relaxed font-light px-4 bg-gradient-to-br from-blue-800 via-red-800 to-blue-900 bg-opacity-60 backdrop-blur-sm rounded-2xl py-8 border-2 border-blue-400 border-opacity-40 shadow-2xl h-full flex flex-col justify-center">
                      <p>{wish.text}</p>
                      <span className="block mt-4 text-blue-200">
                        {wish.subtext}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wish Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {wishes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentWish(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentWish
                        ? "bg-blue-400 w-8"
                        : "bg-blue-300 bg-opacity-50 hover:bg-opacity-80"
                    }`}
                    aria-label={`Go to wish ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <Gift
                  className="text-blue-300 w-10 h-10 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <Gift
                  className="text-blue-400 w-10 h-10 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
                <Gift
                  className="text-blue-300 w-10 h-10 animate-bounce"
                  style={{ animationDelay: "0.6s" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-16 animate-pulse">
              Our Beautiful Moments
            </h2>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s ease-out ${index * 0.1}s`,
                  }}
                >
                  <div className="aspect-square bg-gradient-to-br from-red-400 to-blue-600 relative">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(photo.src)}
                      onLoad={() => handleImageLoad(photo.src)}
                      style={{
                        display:
                          loadedImages[photo.src] === false ? "none" : "block",
                      }}
                    />

                    {/* Placeholder when image fails to load */}
                    {loadedImages[photo.src] === false && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
                        <Heart className="w-20 h-20 mb-4 opacity-60" />
                        <p className="text-lg font-light text-center">
                          {photo.alt}
                        </p>
                        <p className="text-sm mt-2 opacity-70">
                          Photo placeholder
                        </p>
                      </div>
                    )}

                    {/* Image hasn't loaded yet - show loading */}
                    {loadedImages[photo.src] === undefined && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <Heart className="text-pink-300 w-12 h-12 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Message Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-900 via-red-900 to-blue-800 bg-opacity-30 backdrop-blur-lg rounded-3xl p-12 border-2 border-blue-400 border-opacity-30 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Sparkles
                className="text-yellow-300 w-16 h-16 mx-auto mb-8 animate-spin"
                style={{ animationDuration: "4s" }}
              />

              <p className="text-2xl md:text-3xl text-white leading-relaxed mb-8 font-light">
                You make me feel like every day is Christmas morning -
                <span className="block mt-4 text-blue-400 font-normal">
                  excited, happy, and believing in magic.
                </span>
              </p>

              <p className="text-xl md:text-2xl text-red-300 leading-relaxed mb-8">
                Being with you is the best gift of all. As long as I have you,
                my Christmas will always be merry and bright.
              </p>

              <div className="mt-12 inline-block">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                  I Love You ❤️
                </p>
                <p className="text-xl text-blue-200">Forever and Always</p>
              </div>

              <div className="mt-12 flex justify-center gap-8">
                <div
                  className="animate-bounce"
                  style={{ animationDelay: "0s" }}
                >
                  <Star className="text-yellow-300 w-8 h-8" />
                </div>
                <div
                  className="animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Star className="text-yellow-300 w-10 h-10" />
                </div>
                <div
                  className="animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Star className="text-yellow-300 w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Final Message */}
            <div className="mt-16 text-white text-lg opacity-80">
              <p className="animate-pulse">
                Wishing us a magical Christmas together ✨
              </p>
              <p className="mt-4 text-blue-200">December 2025</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChristmasLandingPage;
