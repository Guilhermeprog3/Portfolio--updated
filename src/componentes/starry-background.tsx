"use client"

import { useState, useEffect } from "react"

export function StarryBackground() {
  const [timeOfDay, setTimeOfDay] = useState({
    opacity: 1,
    gradient: "from-black to-blue-950",
    starsOpacity: 1,
  })

  useEffect(() => {
    const updateTimeOfDay = () => {
      const currentHour = new Date().getHours()

      if (currentHour >= 5 && currentHour < 8) {
        setTimeOfDay({
          opacity: 0.9,
          gradient: "from-black to-blue-950",
          starsOpacity: 0.9,
        })
      }
      else if (currentHour >= 8 && currentHour < 11) {
        setTimeOfDay({
          opacity: 0.8,
          gradient: "from-black to-blue-900",
          starsOpacity: 0.8,
        })
      }
      else if (currentHour >= 11 && currentHour < 16) {
        setTimeOfDay({
          opacity: 0.7,
          gradient: "from-blue-950 to-indigo-950",
          starsOpacity: 0.7,
        })
      }
      else if (currentHour >= 16 && currentHour < 19) {
        setTimeOfDay({
          opacity: 0.8,
          gradient: "from-black to-blue-900",
          starsOpacity: 0.8,
        })
      }
      else if (currentHour >= 19 && currentHour < 22) {
        setTimeOfDay({
          opacity: 0.9,
          gradient: "from-black to-blue-950",
          starsOpacity: 0.9,
        })
      }
      else {
        setTimeOfDay({
          opacity: 1,
          gradient: "from-black to-blue-950",
          starsOpacity: 1,
        })
      }
    }

    updateTimeOfDay()

    const interval = setInterval(updateTimeOfDay, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-b ${timeOfDay.gradient}`}
        style={{ opacity: timeOfDay.opacity }}
      ></div>
      <div className="stars-small" style={{ opacity: timeOfDay.starsOpacity }}></div>
      <div className="stars-medium" style={{ opacity: timeOfDay.starsOpacity }}></div>
      <div className="stars-large" style={{ opacity: timeOfDay.starsOpacity }}></div>
      <style jsx>{`
        .stars-small {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)), 
                            radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)), 
                            radial-gradient(1px 1px at 50px 160px, white, rgba(0,0,0,0)), 
                            radial-gradient(1px 1px at 90px 40px, white, rgba(0,0,0,0)), 
                            radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)), 
                            radial-gradient(1px 1px at 160px 120px, white, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: animateStars 100s linear infinite;
          transition: opacity 1s ease;
        }
        
        .stars-medium {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(1.5px 1.5px at 50px 80px, rgba(255,255,255,0.8), rgba(0,0,0,0)), 
                            radial-gradient(1.5px 1.5px at 100px 150px, rgba(255,255,255,0.8), rgba(0,0,0,0)), 
                            radial-gradient(1.5px 1.5px at 160px 50px, rgba(255,255,255,0.8), rgba(0,0,0,0)), 
                            radial-gradient(1.5px 1.5px at 200px 200px, rgba(255,255,255,0.8), rgba(0,0,0,0)), 
                            radial-gradient(1.5px 1.5px at 250px 120px, rgba(255,255,255,0.8), rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 300px 300px;
          animation: animateStars 150s linear infinite;
          transition: opacity 1s ease;
        }
        
        .stars-large {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(2px 2px at 100px 50px, rgba(255,255,255,0.9), rgba(0,0,0,0)), 
                            radial-gradient(2px 2px at 200px 100px, rgba(255,255,255,0.9), rgba(0,0,0,0)), 
                            radial-gradient(2px 2px at 300px 200px, rgba(255,255,255,0.9), rgba(0,0,0,0)), 
                            radial-gradient(2px 2px at 400px 150px, rgba(255,255,255,0.9), rgba(0,0,0,0)), 
                            radial-gradient(2px 2px at 500px 300px, rgba(255,255,255,0.9), rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 500px 500px;
          animation: animateStars 200s linear infinite;
          transition: opacity 1s ease;
        }
        
        @keyframes animateStars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-500px);
          }
        }
      `}</style>
    </div>
  )
}
