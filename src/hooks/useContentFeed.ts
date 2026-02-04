import { useState, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';

export interface FeedItem {
    id: string;
    title: string;
    category: 'React' | 'Node' | 'AWS' | 'System Design' | 'Soft Skills';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    source: string;
    thumbnailColor: string;
    url: string;
    aiMatchingScore: number;
    aiReasoning: string;
}

export function useContentFeed() {
    const { techStack, englishLevel } = useUserStore();
    const [feed, setFeed] = useState<FeedItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            setIsLoading(true);
            try {
                // Using 10.0.2.2 for Android Emulator support if needed, or localhost
                const apiUrl = 'http://localhost:3000/feed/personalized';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ techStack, englishLevel })
                });

                if (response.ok) {
                    const data = await response.json();
                    setFeed(data);
                } else {
                    console.error("Feed API Error:", response.status);
                    // Keep empty or implementation fallback if needed
                }
            } catch (error) {
                console.error("Feed Fetch Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeed();
    }, [techStack, englishLevel]);

    return { feed, isLoading };
}
