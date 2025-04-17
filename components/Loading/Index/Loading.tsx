import React from 'react';
import Svg, { Circle, RadialGradient, Defs, Stop, AnimateTransform } from 'react-native-svg';
export default function Loading() { 
  <Svg width={200} height={200} viewBox="0 0 200 200">
    <Defs>
      <RadialGradient
        id="a12"
        cx="0.66"
        fx="0.66"
        cy="0.3125"
        fy="0.3125"
        gradientTransform="scale(1.5)"
      >
        <Stop offset="0" stopColor="#FFFFFF" />
        <Stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0.9" />
        <Stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0.6" />
        <Stop offset="0.8" stopColor="#FFFFFF" stopOpacity="0.3" />
        <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </RadialGradient>
    </Defs>
    <Circle
      cx="100"
      cy="100"
      r="70"
      fill="none"
      stroke="url(#a12)"
      strokeWidth="13"
      strokeLinecap="round"
      strokeDasharray="200 1000"
      strokeDashoffset="0"
      transformOrigin="center"
    >
      <AnimateTransform
        attributeName="transform"
        type="rotate"
        dur="2"
        values="360 100 100;0 100 100"
        keyTimes="0;1"
        repeatCount="indefinite"
      />
    </Circle>
    <Circle
      cx="100"
      cy="100"
      r="70"
      fill="none"
      opacity="0.2"
      stroke="#FFFFFF"
      strokeWidth="13"
      strokeLinecap="round"
      transformOrigin="center"
    />
  </Svg>
}
