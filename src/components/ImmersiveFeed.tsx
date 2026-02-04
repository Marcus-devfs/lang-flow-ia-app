import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Linking } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { useContentFeed, FeedItem } from '../hooks/useContentFeed';
import { PlayCircle, Sparkles } from 'lucide-react-native';

export function ImmersiveFeed() {
    const { t } = useTranslation();
    const { feed, isLoading } = useContentFeed();
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'React', 'Node', 'System Design', 'AWS'];

    const filteredFeed = activeFilter === 'All'
        ? feed
        : feed.filter(item => item.category === activeFilter);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center py-20">
                <ActivityIndicator size="large" color="#4f46e5" />
                <Text className="mt-4 text-slate-500 font-medium">Analyzing your profile...</Text>
            </View>
        );
    }

    const handlePress = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };

    return (
        <View className="flex-1 w-full">
            <Text className="text-xl font-bold text-slate-900 dark:text-white mb-4 px-1">
                {t.immersion.feedTitle}
            </Text>

            {/* Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6"
                contentContainerStyle={{ paddingHorizontal: 4 }}
            >
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        onPress={() => setActiveFilter(filter)}
                        className={`mr-3 px-4 py-2 rounded-full border ${activeFilter === filter ? 'bg-blue-600 border-blue-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                    >
                        <Text className={`font-medium ${activeFilter === filter ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* List */}
            <View className="space-y-4 gap-4 pb-20">
                {filteredFeed.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
                        onPress={() => handlePress(item.url)}
                    >
                        {/* AI Insight Header */}
                        {item.aiMatchingScore > 75 && (
                            <View className="flex-row items-center mb-3 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg self-start">
                                <Sparkles size={14} className="text-purple-600 dark:text-purple-400 mr-2" />
                                <Text className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                                    {item.aiMatchingScore}% Match • {item.aiReasoning}
                                </Text>
                            </View>
                        )}

                        <View className="flex-row items-center">
                            {/* Thumbnail Placeholder */}
                            <View className={`w-16 h-16 rounded-xl ${item.thumbnailColor} items-center justify-center mr-4`}>
                                <PlayCircle color="white" size={24} />
                            </View>

                            <View className="flex-1">
                                <View className="flex-row justify-between items-start mb-1">
                                    <Text className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                                        {item.category}
                                    </Text>
                                    <Text className="text-xs text-slate-400">
                                        {item.level}
                                    </Text>
                                </View>
                                <Text className="text-base font-bold text-slate-900 dark:text-white mb-1 leading-tight">
                                    {item.title}
                                </Text>
                                <Text className="text-xs text-slate-500">
                                    {item.source} • {item.duration}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
