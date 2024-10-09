import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model() {
  const textRef = useRef<{ rotation: { y: number } }>();

  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group>
      <Text ref={textRef} position={[0, 0, 0]} fontSize={8} textAlign="center">
        KOAH
      </Text>
    </group>
  );
}
