import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    cancelAnimation
} from 'react-native-reanimated';

interface VoiceVisualizerProps {
    isRecording: boolean;
}

export function VoiceVisualizer({ isRecording }: VoiceVisualizerProps) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.5);

    // Outer rings
    const ring1Scale = useSharedValue(1);
    const ring2Scale = useSharedValue(1);

    useEffect(() => {
        if (isRecording) {
            // Pulse animation
            const options = { duration: 1000, easing: Easing.inOut(Easing.ease) };

            scale.value = withRepeat(withTiming(1.2, options), -1, true);
            opacity.value = withRepeat(withTiming(0.8, options), -1, true);

            ring1Scale.value = withRepeat(withTiming(1.5, { duration: 2000 }), -1, false);
            ring2Scale.value = withRepeat(withTiming(2.0, { duration: 2000 }), -1, false);
        } else {
            cancelAnimation(scale);
            cancelAnimation(opacity);
            cancelAnimation(ring1Scale);
            cancelAnimation(ring2Scale);

            scale.value = withTiming(1);
            opacity.value = withTiming(0.5);
            ring1Scale.value = withTiming(1);
            ring2Scale.value = withTiming(1);
        }
    }, [isRecording]);

    const centerStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const ring1Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring1Scale.value }],
        opacity: isRecording ? 1 - (ring1Scale.value - 1) / 0.5 : 0,
    }));

    return (
        <View className="items-center justify-center h-48 w-48">
            {/* Outer Rings */}
            <Animated.View className="absolute w-24 h-24 rounded-full bg-blue-400/30" style={ring1Style} />

            {/* Core */}
            <Animated.View
                className="w-24 h-24 rounded-full bg-blue-500 items-center justify-center"
                style={centerStyle}
            >
                <View className="w-16 h-16 rounded-full bg-blue-600 shadow-lg" />
            </Animated.View>
        </View>
    );
}
