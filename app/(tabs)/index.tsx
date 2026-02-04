import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import { Container } from '../../src/components/Container';
import { useUserStore } from '../../src/store/useUserStore';
import { useGamificationStore } from '../../src/store/useGamificationStore';
import { useTranslation } from '../../src/hooks/useTranslation';
import { useRouter } from 'expo-router';
import { Flame, Mic, BookOpen, Crown, ChevronRight, Play, Award } from 'lucide-react-native';
import { ImmersiveFeed } from '../../src/components/ImmersiveFeed';

export default function ImmersionScreen() {
    const { user, englishLevel, hasTakenPlacementTest } = useUserStore();
    const { streak, dailyVoiceMinutes, dailyGoalMinutes } = useGamificationStore();
    const { t } = useTranslation();
    const router = useRouter();

    const progressPercent = Math.min((dailyVoiceMinutes / dailyGoalMinutes) * 100, 100);

    return (
        <Container safe centered={false}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}>

                {/* Header Section */}
                <View className="flex-row justify-between items-center mb-8 px-4">
                    <View>
                        <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">Good Morning,</Text>
                        <Text className="text-2xl font-bold text-slate-900 dark:text-white">
                            {user?.name || 'Developer'}
                        </Text>
                    </View>

                    <View className="flex-row gap-3">
                        <View className="flex-row items-center bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-900">
                            <Flame size={16} className="text-orange-500 mr-1.5" />
                            <Text className="text-orange-700 dark:text-orange-400 font-bold">{streak} Days</Text>
                        </View>
                    </View>
                </View>

                {/* Focus Card (Quick Action) */}
                <View className="px-4 mb-8">
                    <View className="bg-blue-600 dark:bg-blue-600 rounded-3xl p-6 shadow-lg shadow-blue-200 dark:shadow-none overflow-hidden relative">
                        {/* Background Decoration */}
                        <View className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 rounded-full opacity-50" />

                        <View className="flex-row justify-between items-start mb-6">
                            <View>
                                <Text className="text-blue-100 font-medium mb-1">Daily Goal</Text>
                                <Text className="text-3xl font-bold text-white mb-2">{dailyVoiceMinutes}/{dailyGoalMinutes} min</Text>
                                <View className="flex-row items-center">
                                    <View className="h-1.5 w-24 bg-blue-800 rounded-full mr-2 overflow-hidden">
                                        <View className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
                                    </View>
                                    <Text className="text-xs text-blue-200 font-medium">{Math.round(progressPercent)}%</Text>
                                </View>
                            </View>
                            <View className="bg-blue-500 p-3 rounded-2xl">
                                <Crown size={24} color="white" />
                            </View>
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => router.push('/practice')}
                                className="flex-1 bg-white items-center justify-center py-3 rounded-xl flex-row shadow-sm"
                            >
                                <Mic size={18} className="text-blue-600 mr-2" />
                                <Text className="font-bold text-blue-700">Practice</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => router.push('/vocabulary')}
                                className="flex-1 bg-blue-700 items-center justify-center py-3 rounded-xl flex-row"
                            >
                                <BookOpen size={18} className="text-blue-200 mr-2" />
                                <Text className="font-bold text-white">Words</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Placement Test Prompt (Only if not taken) */}
                {!hasTakenPlacementTest && (
                    <Pressable
                        onPress={() => router.push('/placement-test')}
                        className="mx-4 mb-6 bg-purple-600 dark:bg-purple-700 p-5 rounded-3xl shadow-lg shadow-purple-200 dark:shadow-purple-900 flex-row items-center relative overflow-hidden"
                    >
                        <View className="absolute -right-4 -bottom-4 opacity-20">
                            <Award size={80} color="white" />
                        </View>
                        <View className="flex-1 mr-4">
                            <Text className="text-white font-bold text-lg mb-1">Discover your English Level</Text>
                            <Text className="text-purple-100 text-xs leading-5">
                                Take a 2-minute test to calibrate your learning path (A1-C2).
                            </Text>
                        </View>
                        <View className="bg-white px-4 py-2 rounded-full">
                            <Text className="text-purple-600 font-bold text-xs">Start</Text>
                        </View>
                    </Pressable>
                )}

                {/* Immersive Feed */}
                {/* <View className="px-4 flex-row justify-between items-end mb-4">
                    <Text className="text-xl font-bold text-slate-900 dark:text-white">For You</Text>
                    <TouchableOpacity>
                        <Text className="text-blue-600 dark:text-blue-400 font-medium text-sm">See All</Text>
                    </TouchableOpacity>
                </View> */}

                {/* Simulated Immersive Feed Items (Horizontal Scroll for now or masonry) */}
                <View className="px-4 gap-4">

                    <ImmersiveFeed />
                    {/* Card 1 */}
                    {/* <TouchableOpacity className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 flex-row gap-4 items-center">
                        <View className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl items-center justify-center">
                            <Play size={24} className="text-purple-600 dark:text-purple-400" fill="currentColor" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-slate-900 dark:text-white text-lg mb-1">Tech Interview Tips</Text>
                            <Text className="text-slate-500 dark:text-slate-400 text-sm">How to answer "Tell me about yourself" perfectly.</Text>
                        </View>
                        <ChevronRight size={20} className="text-slate-300" />
                    </TouchableOpacity> */}

                    {/* Card 2 */}
                    {/* <TouchableOpacity className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 flex-row gap-4 items-center">
                        <View className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl items-center justify-center">
                            <BookOpen size={24} className="text-green-600 dark:text-green-400" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-slate-900 dark:text-white text-lg mb-1">System Design 101</Text>
                            <Text className="text-slate-500 dark:text-slate-400 text-sm">Essential vocabulary for architecture discussions.</Text>
                        </View>
                        <ChevronRight size={20} className="text-slate-300" />
                    </TouchableOpacity> */}

                    {/* Card 3 (Placeholder for Feed) */}
                    {/* <TouchableOpacity className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 flex-row gap-4 items-center opacity-60">
                        <View className="w-16 h-16 bg-slate-200 dark:bg-slate-700/50 rounded-xl items-center justify-center">
                            <Text className="text-2xl">🚀</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-slate-900 dark:text-white text-lg mb-1">Coming Soon</Text>
                            <Text className="text-slate-500 dark:text-slate-400 text-sm">Daily challenges generated by AI based on your stack.</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>

            </ScrollView>
        </Container>
    );
}
