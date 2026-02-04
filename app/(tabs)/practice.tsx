import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Container } from '../../src/components/Container';
import { useVoiceStore } from '../../src/store/useVoiceStore';
import { useTranslation } from '../../src/hooks/useTranslation';
import { useSessionFeedback } from '../../src/hooks/useSessionFeedback';
import { FeedbackView } from '../../src/components/FeedbackView';
import { DailyStandup } from '../../src/components/DailyStandup';
import { JobInterview } from '../../src/components/JobInterview';
import { Calendar, Briefcase, Mic } from 'lucide-react-native';

type PracticeMode = 'selection' | 'daily' | 'interview' | 'free';

export default function PracticeScreen() {
    const { sessionResult, resetSession } = useVoiceStore();
    const { t } = useTranslation();
    const { analyzeSession } = useSessionFeedback();
    const [mode, setMode] = useState<PracticeMode>('selection');

    const handleFinishDaily = async () => {
        await analyzeSession('mock-uri');
    };

    const handleFinishInterview = async () => {
        await analyzeSession('mock-uri');
    };

    if (sessionResult) {
        return (
            <Container safe centered>
                <FeedbackView onContinue={() => {
                    resetSession();
                    setMode('selection');
                }} />
            </Container>
        );
    }

    return (
        <Container safe centered>

            {mode === 'selection' && (
                <View className="flex-1 w-full justify-center px-2">
                    <Text className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                        {t.practice.modes.title}
                    </Text>

                    <View className="space-y-4 gap-4">
                        <TouchableOpacity
                            onPress={() => setMode('daily')}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-row items-center"
                        >
                            <View className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                                <Calendar size={24} className="text-blue-600 dark:text-blue-400" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-bold text-slate-900 dark:text-white">{t.practice.modes.daily.title}</Text>
                                <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.practice.modes.daily.desc}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setMode('interview')}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-row items-center"
                        >
                            <View className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                                <Briefcase size={24} className="text-purple-600 dark:text-purple-400" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-bold text-slate-900 dark:text-white">{t.practice.modes.interview.title}</Text>
                                <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.practice.modes.interview.desc}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.6}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-row items-center opacity-50"
                        >
                            <View className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                                <Mic size={24} className="text-green-600 dark:text-green-400" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-bold text-slate-900 dark:text-white">{t.practice.modes.free.title}</Text>
                                <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-1">{t.practice.modes.free.desc}</Text>
                                <View className="bg-slate-100 dark:bg-slate-700 self-start px-2 py-0.5 rounded">
                                    <Text className="text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase">Coming Soon</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {mode === 'daily' && (
                <DailyStandup onFinish={handleFinishDaily} />
            )}

            {mode === 'interview' && (
                <JobInterview onFinish={handleFinishInterview} />
            )}

        </Container>
    );
}
