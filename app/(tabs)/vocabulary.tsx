import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Container } from '../../src/components/Container';
import { useVocabularyStore, Flashcard } from '../../src/store/useVocabularyStore';
import { Bookmark, Star, Info } from 'lucide-react-native';
import { useTranslation } from '../../src/hooks/useTranslation';

export default function VocabularyScreen() {
    const { cards } = useVocabularyStore();
    const { t } = useTranslation();

    const getMasteryColor = (level: number) => {
        if (level === 0) return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
        if (level < 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    };

    const getMasteryLabel = (level: number) => {
        if (level === 0) return t.vocabulary.mastery.new;
        if (level < 3) return t.vocabulary.mastery.learning;
        return t.vocabulary.mastery.mastered;
    };

    const renderCard = ({ item }: { item: Flashcard }) => {
        const badgeStyle = getMasteryColor(item.masteryLevel);

        return (
            <View className="bg-white dark:bg-slate-800 p-5 rounded-2xl mb-4 shadow-sm border border-slate-100 dark:border-slate-800 mx-1">

                {/* Header: Term & Badge */}
                <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-1 mr-4">
                        <Text className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {item.term}
                        </Text>
                        <Text className="text-sm text-slate-400 font-medium mt-1 uppercase tracking-wider">
                            {t.vocabulary.definition}
                        </Text>
                    </View>

                    <View className={`px-3 py-1.5 rounded-full flex-row items-center space-x-1 ${badgeStyle.split(' ').slice(0, 1).join(' ')}`}>
                        <Star size={12} color="currentColor" className={badgeStyle.split(' ').slice(1).join(' ')} />
                        <Text className={`text-xs font-bold ml-1 ${badgeStyle.split(' ').slice(1).join(' ')}`}>
                            {getMasteryLabel(item.masteryLevel)}
                        </Text>
                    </View>
                </View>

                {/* Definition */}
                <Text className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                    {item.definition}
                </Text>

                {/* Example Box */}
                <View className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border-l-4 border-blue-500">
                    <Text className="text-xs text-blue-500 font-bold mb-1 uppercase">{t.vocabulary.example}</Text>
                    <Text className="text-slate-600 dark:text-slate-400 text-base italic leading-relaxed">
                        "{item.example}"
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <Container safe={false} className="pt-14 px-2">
            <View className="px-2 mb-6">
                <View className="flex-row items-center space-x-2 gap-2 mb-2">
                    <View className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                        <Bookmark size={24} className="text-blue-600 dark:text-blue-400" color="#2563eb" />
                    </View>
                    <Text className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                        {t.vocabulary.library}
                    </Text>
                </View>
                <Text className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                    {t.vocabulary.title}
                </Text>
                <Text className="text-slate-500 dark:text-slate-400 text-lg mb-4">
                    {t.vocabulary.subtitle.replace('{count}', cards.length.toString())}
                </Text>

                {/* Explanation Block */}
                <View className="flex-row items-start bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                    <Info size={16} color="#64748b" className="mr-2 mt-0.5" />
                    <Text className="text-xs text-slate-500 dark:text-slate-400 flex-1 leading-relaxed">
                        {t.vocabulary.explanation.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </Text>
                </View>
            </View>

            <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 4 }}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}
