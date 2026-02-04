import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container } from '../../src/components/Container';
import { Button } from '../../src/components/Button';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../src/store/useUserStore';
import { useTranslation } from '../../src/hooks/useTranslation';

export default function ImmersionScreen() {
    const router = useRouter();
    const { country, setCountry } = useUserStore();
    const { t } = useTranslation();

    return (
        <Container safe centered>
            <View className="flex-1 w-full justify-center">

                {/* Country Selector Header */}
                <View className="mb-10">
                    <Text className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-3 text-center uppercase tracking-wider">
                        {t.common.languageSelector}
                    </Text>
                    <View className="flex-row justify-center space-x-4 gap-4">
                        <TouchableOpacity
                            onPress={() => setCountry('BR')}
                            className={`flex-row items-center px-4 py-2 rounded-full border ${country === 'BR' ? 'bg-blue-50 border-blue-500' : 'bg-transparent border-slate-200 dark:border-slate-700'}`}
                        >
                            <Text className="text-xl mr-2">🇧🇷</Text>
                            <Text className={`font-semibold ${country === 'BR' ? 'text-blue-700' : 'text-slate-600 dark:text-slate-400'}`}>Brasil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setCountry('US')}
                            className={`flex-row items-center px-4 py-2 rounded-full border ${country !== 'BR' ? 'bg-blue-50 border-blue-500' : 'bg-transparent border-slate-200 dark:border-slate-700'}`}
                        >
                            <Text className="text-xl mr-2">🌎</Text>
                            <Text className={`font-semibold ${country !== 'BR' ? 'text-blue-700' : 'text-slate-600 dark:text-slate-400'}`}>World</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Main Content */}
                <View className="items-center space-y-8 gap-6">
                    <View className="items-center">
                        <Text className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                            {t.immersion.title}
                        </Text>
                        <Text className="text-lg text-slate-600 dark:text-slate-300 text-center leading-relaxed px-4">
                            {t.immersion.subtitle}
                        </Text>

                        {/* Explanation Block */}
                        <View className="mt-4 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
                            <Text className="text-sm text-slate-500 dark:text-slate-400 text-center italic">
                                {t.immersion.explanation.replace(/\*\*(.*?)\*\*/g, '$1')}
                            </Text>
                        </View>
                    </View>

                    <View className="w-full space-y-4 gap-4 mt-8">
                        <Button
                            label={t.immersion.ctaPrimary}
                            onPress={() => router.push('/practice')}
                            size="lg"
                            className="w-full shadow-lg shadow-blue-500/30"
                        />

                        <Button
                            label={t.immersion.ctaSecondary}
                            variant="secondary"
                            onPress={() => router.push('/vocabulary')}
                            size="lg"
                            className="w-full"
                        />
                    </View>
                </View>

            </View>
        </Container>
    );
}
