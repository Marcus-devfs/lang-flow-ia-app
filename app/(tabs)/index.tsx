import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container } from '../../src/components/Container';
import { Button } from '../../src/components/Button';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../src/store/useUserStore';
import { Globe, MapPin } from 'lucide-react-native';

const TRANSLATIONS = {
    BR: {
        title: 'LangFlow AI',
        subtitle: 'Domine o Inglês Técnico para Engenharia através de prática de voz e vocabulário imersivo.',
        ctaPrimary: 'Iniciar Prática Diária',
        ctaSecondary: 'Revisar Vocabulário',
        selectCountry: 'Selecione sua origem:',
    },
    EN: {
        title: 'LangFlow AI',
        subtitle: 'Master English for Engineering through voice practice and immersive vocabulary.',
        ctaPrimary: 'Start Daily Practice',
        ctaSecondary: 'Review Vocabulary',
        selectCountry: 'Select your origin:',
    },
};

export default function ImmersionScreen() {
    const router = useRouter();
    const { country, setCountry } = useUserStore();

    const isBr = country === 'BR';
    const t = isBr ? TRANSLATIONS.BR : TRANSLATIONS.EN;

    return (
        <Container safe centered>
            <View className="flex-1 w-full justify-center">

                {/* Country Selector Header */}
                <View className="mb-12">
                    <Text className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-3 text-center uppercase tracking-wider">
                        {t.selectCountry}
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
                            {t.title}
                        </Text>
                        <Text className="text-lg text-slate-600 dark:text-slate-300 text-center leading-relaxed px-4">
                            {t.subtitle}
                        </Text>
                    </View>

                    <View className="w-full space-y-4 gap-4 mt-8">
                        <Button
                            label={t.ctaPrimary}
                            onPress={() => router.push('/practice')}
                            size="lg"
                            className="w-full shadow-lg shadow-blue-500/30"
                        />

                        <Button
                            label={t.ctaSecondary}
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
