import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HeartIconProps {
  size?: number;
  color?: string;
}

const HeartIcon = ({ size = 24, color = '#000000' }: HeartIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 20L4.3314 12.0474C3.47892 11.1633 3 9.96429 3 8.71405C3 6.11055 5.11929 4 7.73143 4C8.97986 4 10.1748 4.47738 11.0553 5.32698L12 6.24264L12.9447 5.32698C13.8252 4.47738 15.0201 4 16.2686 4C18.8807 4 21 6.11055 21 8.71405C21 9.96429 20.5211 11.1633 19.6686 12.0474L12 20Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M16.5 7.5H16.51"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default HeartIcon;