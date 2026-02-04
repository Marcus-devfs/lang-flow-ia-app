import '../global.css'; // NativeWind v4 import

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

export default function RootLayout() {
    const { colorScheme } = useColorScheme();

    return (
        <SafeAreaProvider>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </SafeAreaProvider>
    );
}
