import FeatureSection from "./Feature/FeatureSection";
import FileUpload from "./FileUpload/FileUpload";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Testimonial from "./Testimonial/Testimonial";
import Footer from "../Footer/Footer";

const AnimatedHeading = () => {
  const [position, setPosition] = useState(0);
  const [isForward, setIsForward] = useState(true);

  const headingText = "AI-Powered\nRetinal Disease\nDiagnosis";

  const subText = "Diagnosing retinal diseases with AI for explainable results";
  const words = subText.split(" ");

  useEffect(() => {
    let timeoutId;
    const totalLength = headingText.length + words.join(" ").length;

    if (isForward && position < totalLength) {
      // Forward animation - normal speed (100ms)
      timeoutId = setTimeout(() => {
        setPosition(position + 1);
      }, 50);
    } else if (isForward && position === totalLength) {
      // Pause at the end before reversing (1000ms)
      timeoutId = setTimeout(() => setIsForward(false), 100);
    } else if (!isForward && position > 0) {
      // Reverse animation - faster speed (30ms)
      timeoutId = setTimeout(() => {
        setPosition(position - 1);
      }, 30);
    } else if (!isForward && position === 0) {
      // Short pause before starting forward again (100ms)
      timeoutId = setTimeout(() => setIsForward(true), 10);
    }

    return () => clearTimeout(timeoutId);
  }, [position, isForward, headingText.length, words]);

  const renderAnimatedText = (text, isHeading = true) => {
    const lines = text.split("\n");
    const currentPos = isHeading
      ? position
      : Math.max(0, position - headingText.length);
    let charCount = 0;

    return lines.map((line, lineIndex) => {
      const chars = line.split("");
      return (
        <div
          key={lineIndex}
          className={`relative ${
            isHeading
              ? "text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              : "text-sm sm:text-base md:text-lg text-gray-600 mt-6 tracking-wide"
          }`}
        >
          {chars.map((char, charIndex) => {
            const isVisible =
              charCount <
              (isHeading
                ? position
                : Math.max(0, position - headingText.length));
            charCount++;
            return (
              <span key={charIndex} className="relative inline-block">
                {isVisible && (
                  <>
                    {charCount ===
                      (isHeading
                        ? position
                        : position - headingText.length) && (
                      <span
                        className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-3 h-3 lg:w-8 lg:h-8 rounded-full"
                        style={{
                          background: "#8A929E",
                          animation: "infinite",
                        }}
                      />
                    )}
                    {char}
                  </>
                )}
              </span>
            );
          })}
        </div>
      );
    });
  };

  const renderAnimatedSubText = () => {
    let charCount = headingText.length;
    return (
      <div className="text-sm sm:text-base md:text-lg text-slate-300 mt-6 tracking-wide flex flex-wrap justify-center gap-x-2">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="relative inline-block">
            {word.split("").map((char, charIndex) => {
              const isVisible = charCount < position;
              charCount++;
              return (
                <span key={charIndex} className="relative inline-block">
                  {isVisible && (
                    <>
                      {charCount === position && (
                        <span
                          className="absolute -right-5 lg:-right-8 top-1/2 -translate-y-1/2 w-3 h-3 lg:w-6 lg:h-6 rounded-full"
                          style={{
                            background: "#8A929E",
                            animation: "infinite",
                          }}
                        />
                      )}
                      {char}
                    </>
                  )}
                </span>
              );
            })}{" "}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="mb-2 ">{renderAnimatedText(headingText)}</div>
      {renderAnimatedSubText()}
    </div>
  );
};

const Home = () => {
  return (
    <>
      <div
        className="min-h-screen w-full relative text-center"
        style={{
          backgroundImage: 'url("/images/eye1.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Shadow Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-85"></div>

        <style>
          {`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}
        </style>

        <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto pt-16 md:pt-24 lg:pt-32 z-10">
          <AnimatedHeading />

          <div className="mt-12 flex flex-row justify-center gap-4 px-4">
            <Link
              to="/login"
              className="lg:w-48 bg-gradient-to-r from-gray-950 via-gray-800 to-gray-600 
               hover:from-gray-800 hover:via-gray-700 hover:to-gray-500
               transition-colors duration-300 text-white rounded-lg 
               px-6 py-3 text-base md:text-lg shadow-lg hover:shadow-xl 
               font-serif flex items-center justify-center gap-2"
            >
              Start
              
            </Link>
          </div>
        </div>
      </div>

      <FeatureSection />
      <Testimonial />
 
    </>
  );
};

export default Home;
