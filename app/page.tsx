'use client'

import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Star } from 'lucide-react';

const ChristmasLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const photos = [
    { src: '1.png', alt: 'Moment 1' },
    { src: '2.png', alt: 'Moment 2' },
    { src: '3.png', alt: 'Moment 3' },
    { src: '4.png', alt: 'Moment 4' },
    { src: '5.png', alt: 'Moment 5' },
    { src: '6.png', alt: 'Moment 6' },
  ];

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (src: string) => {
    setLoadedImages(prev => ({ ...prev, [src]: false }));
  };

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => ({ ...prev, [src]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-900 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Star className="text-red-300 opacity-30" size={Math.random() * 20 + 10} />
          </div>
        ))}
      </div>

      {/* Floating Snowflakes */}
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

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className={`text-center transition-all duration-1500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8 inline-block">
              <Sparkles className="text-yellow-300 w-16 h-16 animate-pulse mx-auto mb-4" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
              Merry Christmas
            </h1>
            
            <div className="relative inline-block mb-8">
              <Heart className="text-pink-400 w-12 h-12 absolute -left-16 top-1/2 transform -translate-y-1/2 animate-pulse" />
              <p className="text-3xl md:text-4xl text-red-100 font-light">
                To My Love
              </p>
              <Heart className="text-pink-400 w-12 h-12 absolute -right-16 top-1/2 transform -translate-y-1/2 animate-pulse" />
            </div>

            <div className="max-w-3xl mx-auto mt-12 space-y-6">
              <p className="text-xl md:text-2xl text-white leading-relaxed font-light px-4 bg-red-800 bg-opacity-40 backdrop-blur-sm rounded-2xl py-8 border-2 border-red-300 border-opacity-30 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                Every moment with you feels like a gift I never want to lose. 
                You're the reason this holiday feels so magical. 
                <span className="block mt-4 text-red-200">
                  Thank you for being the greatest gift I've ever received.
                </span>
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <Gift className="text-blue-300 w-10 h-10 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <Gift className="text-blue-400 w-10 h-10 animate-bounce" style={{ animationDelay: '0.4s' }} />
                <Gift className="text-blue-300 w-10 h-10 animate-bounce" style={{ animationDelay: '0.6s' }} />
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
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease-out ${index * 0.1}s`
                  }}
                >
                  <div className="aspect-square bg-gradient-to-br from-red-400 to-blue-600 relative">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(photo.src)}
                      onLoad={() => handleImageLoad(photo.src)}
                      style={{ display: loadedImages[photo.src] === false ? 'none' : 'block' }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end justify-center pb-8">
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
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white border-opacity-20 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Sparkles className="text-yellow-300 w-16 h-16 mx-auto mb-8 animate-spin" style={{ animationDuration: '4s' }} />
              
              <p className="text-2xl md:text-3xl text-white leading-relaxed mb-8 font-light">
                You make me feel like every day is Christmas morning - 
                <span className="block mt-4 text-blue-500 font-normal">
                  excited, happy, and believing in magic.
                </span>
              </p>

              <p className="text-xl md:text-2xl text-red-500 leading-relaxed mb-8">
                Being with you is the best gift of all. 
                As long as I have you, my Christmas will always be merry and bright.
              </p>

              <div className="mt-12 inline-block">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                  I Love You ❤️
                </p>
                <p className="text-xl text-blue-200">
                  Forever and Always
                </p>
              </div>

              <div className="mt-12 flex justify-center gap-8">
                <div className="animate-bounce" style={{ animationDelay: '0s' }}>
                  <Star className="text-yellow-300 w-8 h-8" />
                </div>
                <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <Star className="text-yellow-300 w-10 h-10" />
                </div>
                <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
                  <Star className="text-yellow-300 w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Final Message */}
            <div className="mt-16 text-white text-lg opacity-80">
              <p className="animate-pulse">
                Wishing us a magical Christmas together ✨
              </p>
              <p className="mt-4 text-blue-200">
                December 2025
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChristmasLandingPage;