import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle, RadialGradient, Defs, Stop } from 'react-native-svg';
interface LoadingProps {
  size?: number;         // Tamanho do componente (largura e altura)
  color?: string;        // Cor principal do loader
  bgColor?: string;      // Cor de fundo do círculo estático
  strokeWidth?: number;  // Espessura da linha
}
export default function Loading({
  size = 13,           // Valores padrão
  color = '#FFFFFF',
  bgColor = '#C2C2C2',
  strokeWidth = 2
}: LoadingProps) {
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
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient
          id="a12"
          cx="0.66"
          fx="0.66"
          cy="0.3125"
          fy="0.3125"
          gradientTransform="scale(1.5)"
        >
          <Stop offset="0" stopColor={color} />
          <Stop offset="0.3" stopColor={color} stopOpacity="0.9" />
          <Stop offset="0.6" stopColor={color} stopOpacity="0.6" />
          <Stop offset="0.8" stopColor={color} stopOpacity="0.3" />
          <Stop offset="1" stopColor={color} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Animated.View 
        style={{ 
          transform: [{ rotate: rotateInterpolation }],
          width: size,
          height: size
        }}
      >
        <Circle
          cx={size/2}
          cy={size/2}
          r={size/2 - strokeWidth}
          fill="none"
          stroke="url(#a12)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${size/2} ${size*2}`}
          strokeDashoffset="0"
        />
      </Animated.View>
      <Circle
        cx={size/2}
        cy={size/2}
        r={size/2 - strokeWidth}
        fill="none"
        opacity="0.2"
        stroke={bgColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}