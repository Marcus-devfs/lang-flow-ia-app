import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { useContentFeed, FeedItem } from '../hooks/useContentFeed';
import { PlayCircle } from 'lucide-react-native';

export function ImmersiveFeed() {
    const { t } = useTranslation();
    const { feed } = useContentFeed();
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'React', 'Node', 'System Design', 'AWS'];

    const filteredFeed = activeFilter === 'All'
        ? feed
        : feed.filter(item => item.category === activeFilter);

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
                        className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex-row items-center"
                        onPress={() => Alert.alert('Playing', `Starting ${item.title}`)}
                    >
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
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
