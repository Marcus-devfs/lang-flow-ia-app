export interface FeedItem {
    id: string;
    title: string;
    category: 'React' | 'Node' | 'AWS' | 'System Design' | 'Soft Skills';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    source: string;
    thumbnailColor: string;
}

export function useContentFeed() {
    const feed: FeedItem[] = [
        { id: '1', title: 'React Server Components Explained', category: 'React', level: 'Advanced', duration: '12 min', source: 'React Labs', thumbnailColor: 'bg-blue-500' },
        { id: '2', title: 'Node.js Event Loop Deep Dive', category: 'Node', level: 'Intermediate', duration: '8 min', source: 'Node Weekly', thumbnailColor: 'bg-green-500' },
        { id: '3', title: 'System Design Interview Basics', category: 'System Design', level: 'Beginner', duration: '15 min', source: 'ByteByteGo', thumbnailColor: 'bg-purple-500' },
        { id: '4', title: 'AWS Lambda vs EC2', category: 'AWS', level: 'Intermediate', duration: '10 min', source: 'Cloud Guru', thumbnailColor: 'bg-orange-500' },
        { id: '5', title: 'Negotiating Your Salary', category: 'Soft Skills', level: 'Advanced', duration: '20 min', source: 'Tech Lead', thumbnailColor: 'bg-pink-500' },
    ];

    return { feed };
}
