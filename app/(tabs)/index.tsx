import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Container } from '../../src/components/Container';
import { useUserStore } from '../../src/store/useUserStore';
import { useTranslation } from '../../src/hooks/useTranslation';
import { DailyProgress } from '../../src/components/DailyProgress';
import { ImmersiveFeed } from '../../src/components/ImmersiveFeed';

export default function ImmersionScreen() {
    const { country, setCountry } = useUserStore();
    const { t } = useTranslation();

    return (
        <Container safe centered={false}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}>

                {/* Header Row: Title + Country Selector */}
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {t.immersion.title}
                        </Text>
                        <Text className="text-xs text-slate-500 font-medium">
                            {country === 'BR' ? '🇧🇷 Português' : '🇺🇸 English'}
                        </Text>
                    </View>

                    <View className="flex-row space-x-2 gap-2">
                        <TouchableOpacity onPress={() => setCountry('BR')}>
                            <Text className={`text-2xl ${country === 'BR' ? 'opacity-100' : 'opacity-40'}`}>🇧🇷</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCountry('US')}>
                            <Text className={`text-2xl ${country !== 'BR' ? 'opacity-100' : 'opacity-40'}`}>🌎</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Gamification Dashboard */}
                <DailyProgress />

                {/* Dynamic Feed */}
                <ImmersiveFeed />

            </ScrollView>
        </Container>
    );
}
