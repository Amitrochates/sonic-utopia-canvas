
import React from 'react';

export const SpotifyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="white" strokeWidth="1.5" />
    <path d="M6.5 10C10.5 8 14.5 9 18 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 13C10.5 11.5 13.5 12 16.5 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 16C10.5 15 12.5 15.5 14.5 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const AppleMusicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 5.07089C16.3923 5.55612 19 8.47353 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.83086 7.10851 6.14414 10 5.29489V3.26257C6.1 4.1502 3 7.7998 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.7998 17.9 4.1502 14 3.26257V5.07089" stroke="white" strokeWidth="1.5" />
    <path d="M13 14V2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="white" strokeWidth="1.5" />
    <path d="M14.5 12L10.5 10V14L14.5 12Z" stroke="white" strokeWidth="1.5" />
  </svg>
);

export const SoundCloudIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 14C5.9 14 5 13.1 5 12C5 10.9 5.9 10 7 10C8.1 10 9 10.9 9 12C9 13.1 8.1 14 7 14Z" stroke="white" strokeWidth="1.5" />
    <path d="M11 8C9.9 8 9 9.79086 9 12C9 14.2091 9.9 16 11 16" stroke="white" strokeWidth="1.5" />
    <path d="M15 6C13.9 6 13 8.68629 13 12C13 15.3137 13.9 18 15 18" stroke="white" strokeWidth="1.5" />
    <path d="M19 8C17.9 8 17 9.79086 17 12C17 14.2091 17.9 16 19 16" stroke="white" strokeWidth="1.5" />
  </svg>
);

export const getStreamingIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'spotify':
      return <SpotifyIcon />;
    case 'apple music':
      return <AppleMusicIcon />;
    case 'youtube':
      return <YouTubeIcon />;
    case 'soundcloud':
      return <SoundCloudIcon />;
    default:
      return <div className="w-6 h-6 bg-white rounded-full" />;
  }
};
