import { Tabs } from 'expo-router';
import { Home, Mic, Layers, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function TabLayout() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Colors for tab bar
    const activeColor = '#2563eb'; // blue-600
    const inactiveColor = isDark ? '#94a3b8' : '#64748b'; // slate-400 : slate-500
    const bgColor = isDark ? '#0f172a' : '#ffffff'; // slate-900 : white

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: bgColor,
                    borderTopColor: isDark ? '#1e293b' : '#e2e8f0',
                },
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                tabBarShowLabel: true,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="practice"
                options={{
                    title: "Practice",
                    tabBarIcon: ({ color, size }) => <Mic color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="vocabulary"
                options={{
                    title: "Vocabulary",
                    tabBarIcon: ({ color, size }) => <Layers color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}
