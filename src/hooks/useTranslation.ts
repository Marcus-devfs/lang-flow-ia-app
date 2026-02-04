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
            profile: "Perfil",
        },
        profile: {
            title: "Meu Perfil",
            techStack: "Minha Stack",
            goals: "Metas Diárias",
            voiceGoal: "Meta de Voz (min)",
            cardsGoal: "Meta de Cards",
            reset: "Resetar Progresso",
            logout: "Sair",
        },
        gamification: {
            dailyGoal: "Meta Diária",
            streak: "Dias seguidos",
            minutes: "min",
            cards: "cards",
        },
        immersion: {
            title: "LangFlow AI",
            subtitle: "Domine o Inglês Técnico para Engenharia através de prática de voz e vocabulário imersivo.",
            explanation: "A aba **Imersão** é seu painel principal. Aqui você seleciona sua preferência de idioma e inicia sua jornada diária.",
            ctaPrimary: "Iniciar Prática Diária",
            ctaSecondary: "Revisar Vocabulário",
            feedTitle: "Feed de Imersão",
            filters: {
                all: "Todos",
                beginner: "Iniciante",
                intermediate: "Intermediário",
                advanced: "Avançado",
            }
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
            modes: {
                title: "Escolha o Cenário",
                daily: {
                    title: "Daily Standup",
                    desc: "Simule sua reunião diária (Yesterday, Today, Blockers)."
                },
                interview: {
                    title: "Job Interview",
                    desc: "Perguntas comportamentais e técnicas."
                },
                free: {
                    title: "Conversa Livre",
                    desc: "Fale sobre qualquer assunto técnico."
                }
            },
            daily: {
                step1: "O que você fez ontem?",
                step2: "O que você fará hoje?",
                step3: "Existe algum impedimento?",
                next: "Próximo Passo",
                finish: "Finalizar Daily",
            },
            interview: {
                nextQuestion: "Próxima Pergunta",
                finish: "Finalizar Entrevista",
                question: "Questão",
            },
            feedback: {
                title: "Análise da Sessão",
                original: "O que você disse (Transcrição)",
                corrected: "Correção Sugerida",
                pronunciation: "Palavras-Chave & Pronúncia",
                saveToVocab: "Salvar no Vocabulário",
                saved: "Salvo!",
                continue: "Continuar Prática",
            }
        },
        vocabulary: {
            title: "Vocabulário",
            explanation: "O **Vocabulário** armazena os termos técnicos que você aprendeu. Revise as definições e acompanhe seu nível de maestria em cada palavra.",
            subtitle: "Você tem {count} cartões no baralho.",
            library: "Biblioteca",
            term: "Termo",
            definition: "Definição",
            example: "Exemplo",
            startQuiz: "Iniciar Quiz",
            quizMode: "Modo Revisão",
            tapToReveal: "Toque para ver a resposta",
            mastery: {
                new: "Novo",
                learning: "Estudando",
                mastered: "Dominado",
            },
            srs: {
                hard: "Difícil",
                good: "Bom",
                easy: "Fácil",
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
            profile: "Profile",
        },
        profile: {
            title: "My Profile",
            techStack: "My Stack",
            goals: "Daily Goals",
            voiceGoal: "Voice Goal (min)",
            cardsGoal: "Cards Goal",
            reset: "Reset Progress",
            logout: "Log Out",
        },
        gamification: {
            dailyGoal: "Daily Goal",
            streak: "Day streak",
            minutes: "min",
            cards: "cards",
        },
        immersion: {
            title: "LangFlow AI",
            subtitle: "Master English for Engineering through voice practice and immersive vocabulary.",
            explanation: "The **Immersion** tab is your main dashboard. Here you select your language preference and start your daily journey.",
            ctaPrimary: "Start Daily Practice",
            ctaSecondary: "Review Vocabulary",
            feedTitle: "Immersion Feed",
            filters: {
                all: "All",
                beginner: "Beginner",
                intermediate: "Intermediate",
                advanced: "Advanced",
            }
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
            modes: {
                title: "Choose Scenario",
                daily: {
                    title: "Daily Standup",
                    desc: "Simulate your daily meeting (Yesterday, Today, Blockers)."
                },
                interview: {
                    title: "Job Interview",
                    desc: "Behavioral and technical questions."
                },
                free: {
                    title: "Free Talk",
                    desc: "Talk about any technical topic."
                }
            },
            daily: {
                step1: "What did you do yesterday?",
                step2: "What will you do today?",
                step3: "Any blockers?",
                next: "Next Step",
                finish: "Finish Daily",
            },
            interview: {
                nextQuestion: "Next Question",
                finish: "Finish Interview",
                question: "Question",
            },
            feedback: {
                title: "Session Analysis",
                original: "What you said (Transcript)",
                corrected: "Suggested Correction",
                pronunciation: "Key Words & Pronunciation",
                saveToVocab: "Save to Vocabulary",
                saved: "Saved!",
                continue: "Continue Practice",
            }
        },
        vocabulary: {
            title: "Vocabulary",
            explanation: "**Vocabulary** stores the technical terms you've learned. Review definitions and track your mastery level for each word.",
            subtitle: "You have {count} cards in your deck.",
            library: "Library",
            term: "Term",
            definition: "Definition",
            example: "Example",
            startQuiz: "Start Quiz",
            quizMode: "Review Mode",
            tapToReveal: "Tap to reveal answer",
            mastery: {
                new: "New",
                learning: "Learning",
                mastered: "Mastered",
            },
            srs: {
                hard: "Hard",
                good: "Good",
                easy: "Easy",
            }
        }
    }
};

export function useTranslation() {
    const country = useUserStore((state) => state.country);
    const lang = country === 'BR' ? 'BR' : 'EN';

    return {
        t: TRANSLATIONS[lang],
        lang: lang
    };
}
