import React from 'react';
import { View, Text } from 'react-native';
import { useGamificationStore } from '../store/useGamificationStore';
import { useTranslation } from '../hooks/useTranslation';
import { Flame, Mic, Layers } from 'lucide-react-native';

export function DailyProgress() {
    const { streak, dailyVoiceMinutes, dailyCardsReviewed, dailyGoalMinutes, dailyGoalCards } = useGamificationStore();
    const { t } = useTranslation();

    const voiceProgress = Math.min(dailyVoiceMinutes / dailyGoalMinutes, 1) * 100;
    const cardProgress = Math.min(dailyCardsReviewed / dailyGoalCards, 1) * 100;

    return (
        <View className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 w-full mb-6">

            {/* Header: Title & Streak */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="font-bold text-slate-900 dark:text-white text-lg">
                    {t.gamification.dailyGoal}
                </Text>
                <View className="flex-row items-center bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                    <Flame size={18} color="#f97316" fill="#f97316" />
                    <Text className="text-orange-600 dark:text-orange-400 font-bold ml-1">
                        {streak} {t.gamification.streak}
                    </Text>
                </View>
            </View>

            {/* Progress Bars */}
            <View className="space-y-4 gap-4">

                {/* Voice Minutes */}
                <View>
                    <View className="flex-row justify-between mb-1">
                        <View className="flex-row items-center space-x-2 gap-2">
                            <Mic size={14} className="text-slate-500" />
                            <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">Voice Practice</Text>
                        </View>
                        <Text className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {dailyVoiceMinutes}/{dailyGoalMinutes} {t.gamification.minutes}
                        </Text>
                    </View>
                    <View className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <View className="h-full bg-blue-500 rounded-full" style={{ width: `${voiceProgress}%` }} />
                    </View>
                </View>

                {/* Cards Reviewed */}
                <View>
                    <View className="flex-row justify-between mb-1">
                        <View className="flex-row items-center space-x-2 gap-2">
                            <Layers size={14} className="text-slate-500" />
                            <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">Cards Reviewed</Text>
                        </View>
                        <Text className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {dailyCardsReviewed}/{dailyGoalCards} {t.gamification.cards}
                        </Text>
                    </View>
                    <View className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <View className="h-full bg-green-500 rounded-full" style={{ width: `${cardProgress}%` }} />
                    </View>
                </View>

            </View>
        </View>
    );
}
