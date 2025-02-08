import React from 'react';
import Svg, { G, Circle, Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

interface MicIconProps {
  size?: number; // 아이콘 크기
  color?: string; // 기본 색상
}

const MicIcon: React.FC<MicIconProps> = ({ size = 132, color = '#6A8EF0' }) => {
  return (
    <Svg width={size} height={(size * 133) / 132} viewBox="0 0 132 133" fill="none">
      <Defs>
        <Filter id="filter0_d_33_354" x="0" y="0.452881" width="132.009" height="132.009" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <FeOffset dy="2" />
          <FeGaussianBlur stdDeviation="5" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_33_354" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_33_354" result="shape" />
        </Filter>
        <Filter id="filter1_d_33_354" x="10.1826" y="9.61731" width="112.662" height="112.662" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <FeOffset dy="2" />
          <FeGaussianBlur stdDeviation="5" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_33_354" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_33_354" result="shape" />
        </Filter>
      </Defs>
      <G filter="url(#filter0_d_33_354)">
        <Circle cx="66.0045" cy="64.4574" r="56.0045" fill="white" fillOpacity="0.2" shapeRendering="crispEdges" />
      </G>
      <G filter="url(#filter1_d_33_354)">
        <Circle cx="66.5137" cy="63.9483" r="46.331" fill="white" />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M68.332 76.5056V81.768H65.7136V76.5056C62.7168 76.1853 59.9452 74.778 57.9313 72.554C55.9174 70.3301 54.8035 67.4465 54.8036 64.4575V60.9954H57.422V64.4575C57.422 66.9825 58.4336 69.4042 60.234 71.1897C62.0345 72.9752 64.4765 73.9782 67.0228 73.9782C69.5691 73.9782 72.0111 72.9752 73.8116 71.1897C75.6121 69.4042 76.6236 66.9825 76.6236 64.4575V60.9954H79.242V64.4575C79.2421 67.4465 78.1282 70.3301 76.1144 72.554C74.1005 74.778 71.3288 76.1853 68.332 76.5056ZM60.0404 54.0712C60.0404 52.2348 60.7761 50.4736 62.0855 49.175C63.395 47.8765 65.171 47.147 67.0228 47.147C68.8747 47.147 70.6507 47.8765 71.9601 49.175C73.2696 50.4736 74.0052 52.2348 74.0052 54.0712V64.4575C74.0052 66.2939 73.2696 68.0551 71.9601 69.3536C70.6507 70.6522 68.8747 71.3817 67.0228 71.3817C65.171 71.3817 63.395 70.6522 62.0855 69.3536C60.7761 68.0551 60.0404 66.2939 60.0404 64.4575V54.0712Z"
        fill={color}
      />
    </Svg>
  );
};

export default MicIcon;
