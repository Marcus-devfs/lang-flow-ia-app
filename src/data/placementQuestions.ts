export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number; // Index 0-3
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export const PLACEMENT_QUESTIONS: Question[] = [
    // A1 - Basic
    {
        id: 1,
        text: "Select the correct sentence:",
        options: ["I am engineer.", "I am an engineer.", "I an engineer.", "I is engineer."],
        correctAnswer: 1,
        level: 'A1'
    },
    {
        id: 2,
        text: "Which word is a verb?",
        options: ["Code", "Happy", "Computer", "Quickly"],
        correctAnswer: 0,
        level: 'A1'
    },

    // A2 - Elementary
    {
        id: 3,
        text: "I _____ working on this project since Monday.",
        options: ["have been", "am", "was", "has been"],
        correctAnswer: 0,
        level: 'A2'
    },
    {
        id: 4,
        text: "Where _____ you put the server logs?",
        options: ["did", "does", "done", "do"],
        correctAnswer: 0,
        level: 'A2'
    },

    // B1 - Intermediate
    {
        id: 5,
        text: "If I _____ the documentation, I would have understood the API.",
        options: ["read", "have read", "had read", "would read"],
        correctAnswer: 2,
        level: 'B1'
    },
    {
        id: 6,
        text: "The database needs to be _____ up every night.",
        options: ["backed", "back", "backing", "backs"],
        correctAnswer: 0,
        level: 'B1'
    },

    // B2 - Upper Intermediate
    {
        id: 7,
        text: "You should avoid _____ unnecessary dependencies.",
        options: ["to install", "installing", "install", "installed"],
        correctAnswer: 1,
        level: 'B2'
    },
    {
        id: 8,
        text: "The pull request was rejected _____ the poor code quality.",
        options: ["because", "due to", "since", "as"],
        correctAnswer: 1,
        level: 'B2'
    },

    // C1 - Advanced
    {
        id: 9,
        text: "Scarcely _____ deployment started when the server crashed.",
        options: ["had", "did", "have", "was"],
        correctAnswer: 0,
        level: 'C1'
    },
    {
        id: 10,
        text: "It is crucial that the bug _____ fixed immediately.",
        options: ["is", "be", "was", "were"],
        correctAnswer: 1,
        level: 'C1'
    },
    {
        id: 11,
        text: "The system architecture is remarkably robust, _____ its complexity.",
        options: ["despite", "although", "even though", "whereas"],
        correctAnswer: 0,
        level: 'C1'
    },

    // C2 - Mastery
    {
        id: 12,
        text: "Had I known about the memory leak, I _____ validated the inputs more rigorously.",
        options: ["would have", "will have", "would had", "should of"],
        correctAnswer: 0,
        level: 'C2'
    },
    {
        id: 13,
        text: "Choose the synonym for 'deprecated':",
        options: ["Obsolete", "Optimized", "Refactored", "Deployed"],
        correctAnswer: 0,
        level: 'C2'
    },
    {
        id: 14,
        text: "Which phrase best completes: 'We need to _____ the pros and cons.'",
        options: ["weight", "weigh", "way", "whey"],
        correctAnswer: 1,
        level: 'C2'
    },
    {
        id: 15,
        text: "The CTO suggested that the legacy monolith _____ decomposed into microservices.",
        options: ["be", "is", "was", "to be"],
        correctAnswer: 0,
        level: 'C2'
    }
];

export const calculateLevel = (score: number): 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' => {
    if (score <= 3) return 'A1';
    if (score <= 6) return 'A2';
    if (score <= 9) return 'B1';
    if (score <= 12) return 'B2';
    if (score <= 14) return 'C1';
    return 'C2';
};

export const LEVEL_DESCRIPTIONS = {
    'A1': {
        title: "Beginner",
        description: "You can understand and use familiar everyday expressions and very basic phrases. You can introduce yourself and ask simple questions."
    },
    'A2': {
        title: "Elementary",
        description: "You understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. basic personal and family information, shopping, local geography, employment)."
    },
    'B1': {
        title: "Intermediate",
        description: "You can produce simple connected text on topics which are familiar or of personal interest. You can describe experiences and events, dreams, hopes & ambitions."
    },
    'B2': {
        title: "Upper Intermediate",
        description: "You understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in your field of specialization."
    },
    'C1': {
        title: "Advanced",
        description: "You can express yourself fluently and spontaneously without much obvious searching for expressions. You can use language flexibly and effectively for social, academic and professional purposes."
    },
    'C2': {
        title: "Mastery",
        description: "You can understand with ease virtually everything heard or read. You can summarize information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation."
    }
};
