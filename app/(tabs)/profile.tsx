import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container } from '../../src/components/Container';
import { Button } from '../../src/components/Button';
import { useUserStore } from '../../src/store/useUserStore';
import { useGamificationStore } from '../../src/store/useGamificationStore';
import { useTranslation } from '../../src/hooks/useTranslation';
import { User as UserIcon, Settings, Code, Target, Trash2, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
    const { user, techStack, englishLevel, setTechStack, logout } = useUserStore();
    const { dailyGoalMinutes, dailyGoalCards, setDailyGoals, resetDailyGoals } = useGamificationStore();
    const { t } = useTranslation();

    // Available stacks (could form a larger list)
    const availableStacks = ['React', 'Node', 'TypeScript', 'Python', 'Java', 'AWS', 'Docker', 'Go'];

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

    return (
        <Container safe centered={false}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View className="flex-row justify-between items-center mb-8 px-4">
                    <Text className="text-3xl font-bold text-slate-900 dark:text-white">{t.profile.title}</Text>
                    <Settings size={24} className="text-slate-400" />
                </View>

                {/* User Info Card */}
                <View className="px-4 mb-8">
                    <View className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex-row items-center">
                        <View className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full items-center justify-center mr-4">
                            <UserIcon size={32} className="text-blue-600 dark:text-blue-400" />
                        </View>
                        <View>
                            <Text className="text-xl font-bold text-slate-900 dark:text-white">{user?.name || 'Developer'}</Text>
                            <View className="flex-row items-center mt-1">
                                <Text className="text-slate-500 dark:text-slate-400 mr-2">@{techStack[0] || 'Dev'}</Text>
                                <View className="bg-slate-100 dark:bg-slate-700 pk-2 py-0.5 rounded px-2">
                                    <Text className="text-xs font-bold text-slate-600 dark:text-slate-300">{englishLevel}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Tech Stack */}
                <View className="px-4 mb-8">
                    <View className="flex-row items-center mb-4">
                        <Code size={20} className="text-blue-500 mr-2" />
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">{t.profile.techStack}</Text>
                    </View>

                    <View className="flex-row flex-wrap gap-2">
                        {availableStacks.map((tech) => (
                            <TouchableOpacity
                                key={tech}
                                onPress={() => toggleStack(tech)}
                                className={`px-4 py-2 rounded-full border ${techStack.includes(tech) ? 'bg-blue-600 border-blue-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                            >
                                <Text className={`font-medium ${techStack.includes(tech) ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                    {tech}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Goals */}
                <View className="px-4 mb-8">
                    <View className="flex-row items-center mb-4">
                        <Target size={20} className="text-green-500 mr-2" />
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">{t.profile.goals}</Text>
                    </View>

                    <View className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4 gap-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-600 dark:text-slate-300 font-medium">{t.profile.voiceGoal}</Text>
                            <View className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                                <Text className="font-bold text-slate-900 dark:text-white">{dailyGoalMinutes} min</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-600 dark:text-slate-300 font-medium">{t.profile.cardsGoal}</Text>
                            <View className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                                <Text className="font-bold text-slate-900 dark:text-white">{dailyGoalCards} cards</Text>
                            </View>
                        </View>

                        {/* Simple Controls (Could be sliders) */}
                        <View className="flex-row space-x-2 gap-2 mt-2">
                            <TouchableOpacity onPress={() => setDailyGoals(10, 5)} className="flex-1 bg-slate-50 dark:bg-slate-700/50 p-2 rounded items-center">
                                <Text className="text-xs text-slate-500 font-bold">Easy (10/5)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setDailyGoals(30, 20)} className="flex-1 bg-slate-50 dark:bg-slate-700/50 p-2 rounded items-center">
                                <Text className="text-xs text-blue-500 font-bold">Pro (30/20)</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Danger Zone */}
                <View className="px-4 space-y-4 gap-4">
                    <TouchableOpacity
                        onPress={handleReset}
                        className="flex-row items-center justify-center p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30"
                    >
                        <Trash2 size={18} className="text-red-500 mr-2" />
                        <Text className="text-red-600 dark:text-red-400 font-bold">{t.profile.reset}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={logout}
                        className="flex-row items-center justify-center p-4"
                    >
                        <LogOut size={18} className="text-slate-400 mr-2" />
                        <Text className="text-slate-500 font-bold">{t.profile.logout}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </Container>
    );
}
