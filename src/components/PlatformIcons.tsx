import React from 'react';
import itchLogo from '@/assets/platforms/itch.png';
import nuuvemLogo from '@/assets/platforms/nuuvem.svg';

interface IconProps {
  className?: string;
}

export const SteamIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.979 0C5.678 0 .511 4.86.022 10.92l6.432 2.658a3.387 3.387 0 011.912-.588c.063 0 .125.002.188.006l2.861-4.142V8.77a4.508 4.508 0 014.502-4.504 4.508 4.508 0 014.503 4.504 4.508 4.508 0 01-4.503 4.503h-.105l-4.076 2.91c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396a3.406 3.406 0 01-3.345-2.81L.453 14.202A11.985 11.985 0 0011.979 24c6.627 0 12.001-5.373 12.001-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.985 1.31 1.22a2.56 2.56 0 003.337-1.39 2.545 2.545 0 00-.005-1.949 2.548 2.548 0 00-1.38-1.382 2.547 2.547 0 00-1.874-.053l1.523.63a1.883 1.883 0 01-1.438 3.534zM19.415 8.77a3.005 3.005 0 00-3.002-3.003 3.005 3.005 0 00-3.003 3.003 3.005 3.005 0 003.003 3.002 3.005 3.005 0 003.002-3.002zm-5.255-.005a2.255 2.255 0 012.253-2.253 2.255 2.255 0 012.253 2.253 2.255 2.255 0 01-2.253 2.253 2.255 2.255 0 01-2.253-2.253z" />
  </svg>
);

export const ItchIcon: React.FC<IconProps> = ({ className }) => (
  <img src={itchLogo} alt="itch.io" className={className} />
);

export const SpawndIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 256 359" fill="currentColor" style={{ opacity: 0.85 }}>
    <path d="M0,97l25.4-17.8L122.4,147.3l-26.2,18.4L30.1,119.3v218.3L0,358.8V97ZM53.2,280.5l29.1,20.4L255.4,179.4l-26.2-18.4L83.3,263.5V183.6L53.2,162.5v118ZM158,147.8l-52.4,36.8v36.8l78.6-55.2V129.4L0,0v36.8L158,147.8Z" />
  </svg>
);
