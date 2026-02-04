import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { Container } from '../../src/components/Container';
import { useUserStore } from '../../src/store/useUserStore';
import { useGamificationStore } from '../../src/store/useGamificationStore';
import { useTranslation } from '../../src/hooks/useTranslation';
import { User as UserIcon, Settings, Code, Target, Trash2, LogOut, Cpu, Database, Smartphone, Cloud, Layers, Award } from 'lucide-react-native';
import { Button } from '../../src/components/Button';
import clsx from 'clsx';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const user = useUserStore(state => state.user);
    const techStack = useUserStore(state => state.techStack);
    const englishLevel = useUserStore(state => state.englishLevel);
    const setTechStack = useUserStore(state => state.setTechStack);
    const logout = useUserStore(state => state.logout);
    const setCountry = useUserStore(state => state.setCountry);
    const country = useUserStore(state => state.country); // 'BR' | 'US'

    const { dailyGoalMinutes, dailyGoalCards, setDailyGoals, resetDailyGoals } = useGamificationStore();
    const { t } = useTranslation();
    const router = useRouter();


    // Categorized Stacks
    const stackCategories = [
        { name: 'Frontend', icon: Layers, items: ['React', 'Vue', 'Angular', 'Next.js', 'Tailwind'] },
        { name: 'Backend', icon: Database, items: ['Node', 'Python', 'Java', 'Go', 'PHP'] },
        { name: 'Mobile', icon: Smartphone, items: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
        { name: 'Cloud & Tools', icon: Cloud, items: ['AWS', 'Docker', 'Kubernetes', 'Firebase', 'Git'] },
    ];

    const toggleStack = (stack: string) => {
        if (techStack.includes(stack)) {
            setTechStack(techStack.filter(s => s !== stack));
        } else {
            setTechStack([...techStack, stack]);
        }
    };

    const handleReset = () => {
        Alert.alert(
            "Reset Progress",
            "Are you sure? This will clear your streak and daily progress.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Reset", style: "destructive", onPress: resetDailyGoals }
            ]
        );
    };

    const goalOptions = [
        { level: 'Casual', min: 5, cards: 5, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-900' },
        { level: 'Regular', min: 15, cards: 15, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-900' },
        { level: 'Serious', min: 30, cards: 30, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-900' },
        { level: 'Hardcore', min: 60, cards: 50, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-900' },
    ];

    return (
        <Container safe centered={false}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View className="flex-row justify-between items-center mb-6 px-4">
                    <Text className="text-3xl font-bold text-slate-900 dark:text-white">{t.profile.title}</Text>
                    <Pressable className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <Settings size={20} className="text-slate-500" />
                    </Pressable>
                </View>

                {/* Language Selector */}
                <View className="px-4 mb-8">
                    <View className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex-row">
                        <Pressable
                            onPress={() => setCountry('BR')}
                            className={clsx(
                                "flex-1 py-2 rounded-lg items-center justify-center",
                                country === 'BR' && "bg-white dark:bg-slate-700 shadow-sm"
                            )}
                        >
                            <Text className={clsx("font-bold", country === 'BR' ? "text-slate-900 dark:text-white" : "text-slate-500")}>🇧🇷 Português</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setCountry('US')}
                            className={clsx(
                                "flex-1 py-2 rounded-lg items-center justify-center",
                                country !== 'BR' && "bg-white dark:bg-slate-700 shadow-sm"
                            )}
                        >
                            <Text className={clsx("font-bold", country !== 'BR' ? "text-slate-900 dark:text-white" : "text-slate-500")}>🇺🇸 English</Text>
                        </Pressable>
                    </View>
                </View>

                {/* User Card */}
                <View className="px-4 mb-10">
                    <View className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex-row items-center gap-4">
                        <View className="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full items-center justify-center border-4 border-white dark:border-slate-800 shadow-sm">
                            <UserIcon size={36} className="text-blue-600 dark:text-blue-400" />
                        </View>
                        <View>
                            <Text className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name || 'Developer'}</Text>
                            <View className="flex-row items-center mt-2 flex-wrap gap-2">
                                <View className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                                    <Text className="text-xs font-bold text-slate-600 dark:text-slate-300">@{techStack[0] || 'Dev'}</Text>
                                </View>
                                <View className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                                    <Text className="text-xs font-bold text-blue-600 dark:text-blue-400">{englishLevel}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Daily Goals */}
                <View className="px-4 mb-10">
                    <View className="flex-row items-center mb-4 gap-2">
                        <Target size={20} className="text-green-500" />
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">{t.profile.goals}</Text>
                    </View>

                    <View className="flex-row flex-wrap gap-3">
                        {goalOptions.map((opt) => {
                            const isActive = dailyGoalMinutes === opt.min;
                            return (
                                <Pressable
                                    key={opt.level}
                                    onPress={() => setDailyGoals(opt.min, opt.cards)}
                                    className={clsx(
                                        "flex-1 min-w-[45%] p-4 rounded-2xl border",
                                        isActive ? `${opt.bg} ${opt.border}` : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700"
                                    )}
                                >
                                    <Text className={clsx("font-bold text-sm mb-1", isActive ? opt.color : "text-slate-900 dark:text-white")}>
                                        {opt.level}
                                    </Text>
                                    <Text className="text-xs text-slate-500 dark:text-slate-400">
                                        {opt.min} min / {opt.cards} cards
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>
                </View>

                {/* Placement Test CTA */}
                <View className="px-4 mb-10">
                    <Pressable
                        className="bg-purple-600 p-5 rounded-3xl shadow-lg shadow-purple-300 dark:shadow-purple-900 overflow-hidden relative"
                        onPress={() => router.push('/placement-test')}
                    >
                        <View className="absolute top-0 right-0 p-4 opacity-20">
                            <Award size={100} color="white" />
                        </View>
                        <View className="flex-row items-center mb-2 gap-2">
                            <Award size={24} className="text-white" />
                            <Text className="text-white font-extrabold text-lg uppercase tracking-wider">Level Check</Text>
                        </View>
                        <Text className="text-purple-100 text-base mb-4 font-medium mr-12">
                            Not sure about your level? Take our 2-minute placement test to find out.
                        </Text>
                        <View className="bg-white/20 self-start px-4 py-2 rounded-full backdrop-blur-md">
                            <Text className="text-white font-bold text-sm">Start Test</Text>
                        </View>
                    </Pressable>
                </View>

                {/* Interview Prep */}
                <View className="px-4 mb-10">
                    <View className="flex-row items-center mb-4 gap-2">
                        <Code size={20} className="text-indigo-500" />
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">Interview Prep</Text>
                    </View>
                    <Pressable
                        className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800 flex-row items-center justify-between"
                        onPress={() => router.push('/intro-builder')}
                    >
                        <View className="flex-1 mr-4">
                            <Text className="text-indigo-900 dark:text-indigo-100 font-bold text-lg mb-1">"Tell Me About Yourself"</Text>
                            <Text className="text-indigo-600 dark:text-indigo-300 text-sm">Build your perfect 30-second elevator pitch for interviews.</Text>
                        </View>
                        <View className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">
                            <UserIcon size={24} className="text-indigo-600 dark:text-indigo-300" />
                        </View>
                    </Pressable>
                </View>

                {/* Tech Stack */}
                <View className="px-4 mb-10">
                    <View className="flex-row items-center mb-4 gap-2">
                        <Cpu size={20} className="text-blue-500" />
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">{t.profile.techStack}</Text>
                    </View>

                    <View className="space-y-6 gap-6">
                        {stackCategories.map((cat) => (
                            <View key={cat.name}>
                                <View className="flex-row items-center mb-3 gap-2">
                                    <cat.icon size={16} className="text-slate-400" />
                                    <Text className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{cat.name}</Text>
                                </View>
                                <View className="flex-row flex-wrap gap-2">
                                    {cat.items.map((tech) => (
                                        <Pressable
                                            key={tech}
                                            onPress={() => toggleStack(tech)}
                                            className={clsx(
                                                "px-4 py-2 rounded-xl border",
                                                techStack.includes(tech) ? "bg-blue-600 border-blue-600 shadow-sm shadow-blue-200" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                            )}
                                        >
                                            <Text className={clsx("font-medium text-sm", techStack.includes(tech) ? "text-white" : "text-slate-600 dark:text-slate-300")}>
                                                {tech}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Danger Zone */}
                <View className="px-4 gap-4 mt-4">
                    <Button
                        label={t.profile.reset}
                        variant="ghost"
                        icon={Trash2}
                        onPress={handleReset}
                        className="border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-600"
                        textClassName="text-red-600 dark:text-red-400"
                    />

                    <Button
                        label={t.profile.logout}
                        variant="outline"
                        icon={LogOut}
                        onPress={logout}
                        className="border-slate-200 dark:border-slate-700"
                    />
                </View>

                <Text className="text-center text-slate-400 text-xs mt-8 mb-4">LangFlow AI v1.0.0</Text>

            </ScrollView>
        </Container>
    );
}
