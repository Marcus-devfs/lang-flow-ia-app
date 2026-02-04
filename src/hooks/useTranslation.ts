import { useUserStore } from '../store/useUserStore';

const TRANSLATIONS = {
    BR: {
        common: {
            languageSelector: "Selecione sua origem:",
        },
        tabs: {
            immersion: "Imersão",
            practice: "Prática",
            vocabulary: "Vocabulário",
        },
        immersion: {
            title: "LangFlow AI",
            subtitle: "Domine o Inglês Técnico para Engenharia através de prática de voz e vocabulário imersivo.",
            explanation: "A aba **Imersão** é seu painel principal. Aqui você seleciona sua preferência de idioma e inicia sua jornada diária.",
            ctaPrimary: "Iniciar Prática Diária",
            ctaSecondary: "Revisar Vocabulário",
        },
        practice: {
            title: "Prática de Fala",
            explanation: "A **Prática** é onde você interage com a IA. Grave sua voz para receber feedback instantâneo sobre pronúncia e gramática técnica.",
            statusListening: "Ouvindo...",
            statusIdle: "Toque abaixo para começar",
            btnStart: "Iniciar Chat de Voz",
            btnStop: "Parar Gravação",
            permRequired: "Permissão de microfone necessária",
            lastRecording: "Última gravação",
            savedAlertTitle: "Gravação Salva",
            savedAlertMsg: "Áudio pronto para análise.",
        },
        vocabulary: {
            title: "Vocabulário",
            explanation: "O **Vocabulário** armazena os termos técnicos que você aprendeu. Revise as definições e acompanhe seu nível de maestria em cada palavra.",
            subtitle: "Você tem {count} cartões no baralho.",
            library: "Biblioteca",
            term: "Termo",
            definition: "Definição",
            example: "Exemplo",
            mastery: {
                new: "Novo",
                learning: "Estudando",
                mastered: "Dominado",
            }
        }
    },
    EN: {
        common: {
            languageSelector: "Select your origin:",
        },
        tabs: {
            immersion: "Immersion",
            practice: "Practice",
            vocabulary: "Vocabulary",
        },
        immersion: {
            title: "LangFlow AI",
            subtitle: "Master English for Engineering through voice practice and immersive vocabulary.",
            explanation: "The **Immersion** tab is your main dashboard. Here you select your language preference and start your daily journey.",
            ctaPrimary: "Start Daily Practice",
            ctaSecondary: "Review Vocabulary",
        },
        practice: {
            title: "Speaking Practice",
            explanation: "**Practice** is where you interact with the AI. Record your voice to receive instant feedback on pronunciation and technical grammar.",
            statusListening: "Listening...",
            statusIdle: "Tap below to start speaking",
            btnStart: "Start Voice Chat",
            btnStop: "Stop Recording",
            permRequired: "Microphone permission required",
            lastRecording: "Last recording",
            savedAlertTitle: "Recording Saved",
            savedAlertMsg: "Audio ready for analysis.",
        },
        vocabulary: {
            title: "Vocabulary",
            explanation: "**Vocabulary** stores the technical terms you've learned. Review definitions and track your mastery level for each word.",
            subtitle: "You have {count} cards in your deck.",
            library: "Library",
            term: "Term",
            definition: "Definition",
            example: "Example",
            mastery: {
                new: "New",
                learning: "Learning",
                mastered: "Mastered",
            }
        }
    }
};

export function useTranslation() {
    const { country } = useUserStore();
    const lang = country === 'BR' ? 'BR' : 'EN';

    return {
        t: TRANSLATIONS[lang],
        lang: lang
    };
}
