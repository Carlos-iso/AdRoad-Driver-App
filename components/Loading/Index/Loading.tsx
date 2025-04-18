import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle, RadialGradient, Defs, Stop } from 'react-native-svg';

export default function Loading() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
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
      <Animated.View 
        style={{ 
          transform: [{ rotate: rotateInterpolation }],
          width: 200,
          height: 200
        }}
      >
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
        />
      </Animated.View>
      <Circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        opacity="0.2"
        stroke="#FFFFFF"
        strokeWidth="13"
        strokeLinecap="round"
      />
    </Svg>
  );
}