import '../global.css'; // NativeWind v4 import

import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { useUserStore } from '../src/store/useUserStore';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
    const { colorScheme } = useColorScheme();
    const hasCompletedOnboarding = useUserStore((state) => state.hasCompletedOnboarding);
    const isLoading = useUserStore((state) => state.isLoading);
    const router = useRouter();
    const segments = useSegments();
    const [isReady, setIsReady] = useState(false);

    // Wait for hydration
    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const inAuthGroup = segments[0] === '(tabs)';

        if (!hasCompletedOnboarding && inAuthGroup) {
            // Redirect to onboarding if not completed
            router.replace('/onboarding');
        } else if (hasCompletedOnboarding && segments[0] === 'onboarding') {
            // Redirect back to tabs if already onboarded (e.g. deep link)
            router.replace('/(tabs)');
        }
    }, [hasCompletedOnboarding, segments, isReady]);

    if (!isReady) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-black">
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
            </Stack>
        </SafeAreaProvider>
    );
}
