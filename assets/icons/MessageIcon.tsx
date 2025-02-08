import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MessageIconProps {
  size?: number;
  color?: string;
}

const MessageIcon = ({ size = 24, color = '#000000' }: MessageIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 9.5H16M8 13.5H13M19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H8L11.6464 20.6464C11.8417 20.8417 12.1583 20.8417 12.3536 20.6464L16 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default MessageIcon;