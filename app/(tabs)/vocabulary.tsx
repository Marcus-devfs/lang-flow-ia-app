import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Container } from '../../src/components/Container';
import { useVocabularyStore, Flashcard } from '../../src/store/useVocabularyStore';

export default function VocabularyScreen() {
    const { cards } = useVocabularyStore();

    const renderCard = ({ item }: { item: Flashcard }) => (
        <View className="bg-white dark:bg-slate-800 p-6 rounded-2xl mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <View className="flex-row justify-between items-start mb-2">
                <Text className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.term}
                </Text>
                <View className={`px-2 py-1 rounded-full ${item.masteryLevel > 2 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    <Text className="text-xs font-medium text-slate-700">
                        Lvl {item.masteryLevel}
                    </Text>
                </View>
            </View>

            <Text className="text-slate-600 dark:text-slate-300 mb-2 italic">
                {item.definition}
            </Text>

            <View className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg mt-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">
                    "{item.example}"
                </Text>
            </View>
        </View>
    );

    return (
        <Container safe={false} className="pt-12">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-3xl font-bold text-slate-900 dark:text-white">
                    Vocabulary
                </Text>
                <Text className="text-slate-500">
                    {cards.length} cards
                </Text>
            </View>

            <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}
