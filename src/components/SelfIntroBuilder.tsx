import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUserStore } from '../store/useUserStore';
import { Button } from './Button';
import { ArrowRight, ArrowLeft, CheckCircle, Copy, PlayCircle, StopCircle } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export function SelfIntroBuilder({ onFinish }: { onFinish: () => void }) {
    const { techStack } = useUserStore();
    const { speak, stop, isSpeaking } = useTextToSpeech();

    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        name: '',
        role: 'Software Developer',
        yearsExp: '3',
        highlight: '',
        goal: 'build scalable applications',
    });

    const updateData = (key: string, value: string) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const steps = [
        {
            title: "The Hook",
            description: "Start strong. Who are you and what do you do?",
            fields: [
                { label: "Your Name", key: "name", placeholder: "e.g. Alex" },
                { label: "Current Role", key: "role", placeholder: "e.g. Frontend Engineer" },
                { label: "Years of Experience", key: "yearsExp", placeholder: "e.g. 5", keyboardType: 'numeric' }
            ]
        },
        {
            title: "The Highlight",
            description: "Mention a key project or achievement that defines your expertise.",
            fields: [
                { label: "Key Achievement / Project", key: "highlight", placeholder: "e.g. I led the migration to Next.js reducing load times by 40%...", multiline: true }
            ]
        },
        {
            title: "The Closing",
            description: "Why are you here? Connect your past to this opportunity.",
            fields: [
                { label: "Your Goal / Motivation", key: "goal", placeholder: "e.g. work on distributed systems", multiline: false }
            ]
        }
    ];

    const generatePitch = () => {
        const stackText = techStack.length > 0 ? `specializing in ${techStack.join(', ')}` : '';
        return `Hi, I'm ${data.name || '[Name]'}, a ${data.role} with ${data.yearsExp} years of experience ${stackText}. 
Recently, ${data.highlight || 'I worked on building critical features for my team'}. 
I'm passionate about ${data.goal}, which is why I'm excited about this opportunity to bring my skills to your team.`;
    };

    const handleNext = () => {
        if (step < steps.length) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(prev => prev - 1);
    };

    if (step === steps.length) {
        const finalPitch = generatePitch();

        const copyToClipboard = async () => {
            await Clipboard.setStringAsync(finalPitch);
            Alert.alert("Copied!", "Pitch copied to clipboard.");
        };

        const toggleSpeech = () => {
            if (isSpeaking) {
                stop();
            } else {
                speak(finalPitch);
            }
        };

        return (
            <View className="flex-1 p-4 bg-white dark:bg-slate-900 rounded-3xl">
                <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Your Pitch</Text>
                <Text className="text-slate-500 text-center mb-6">Here is your generated introduction.</Text>

                <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl mb-6 border border-slate-100 dark:border-slate-700">
                    <Text className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        "{finalPitch}"
                    </Text>
                </ScrollView>

                <View className="flex-row gap-3 mb-4 justify-center">
                    <TouchableOpacity onPress={toggleSpeech} className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        {isSpeaking ? <StopCircle size={24} className="text-blue-600" /> : <PlayCircle size={24} className="text-blue-600" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={copyToClipboard} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <Copy size={24} className="text-slate-600 dark:text-slate-400" />
                    </TouchableOpacity>
                </View>

                <Button label="Finish" onPress={onFinish} />
                <TouchableOpacity onPress={() => setStep(0)} className="mt-4 py-2">
                    <Text className="text-center text-slate-500">Edit Answers</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const currentStep = steps[step];

    return (
        <View className="flex-1 p-6 bg-white dark:bg-slate-900 justify-between">
            <View>
                <View className="flex-row items-center mb-8">
                    <View className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <View className="h-full bg-purple-600" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                    </View>
                    <Text className="ml-4 text-slate-400 font-bold">{step + 1}/{steps.length}</Text>
                </View>

                <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{currentStep.title}</Text>
                <Text className="text-slate-500 dark:text-slate-400 mb-8">{currentStep.description}</Text>

                <View className="space-y-4">
                    {currentStep.fields.map((field) => (
                        <View key={field.key}>
                            <Text className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase">{field.label}</Text>
                            <TextInput
                                className={`w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white ${field.multiline ? 'h-32 text-top' : ''}`}
                                placeholder={field.placeholder}
                                placeholderTextColor="#94a3b8"
                                value={(data as any)[field.key]}
                                onChangeText={(text) => updateData(field.key, text)}
                                keyboardType={field.keyboardType as any}
                                multiline={field.multiline}
                            />
                        </View>
                    ))}
                </View>
            </View>

            <View className="flex-row gap-4 mt-8">
                {step > 0 && (
                    <TouchableOpacity onPress={handleBack} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 rounded-xl items-center justify-center">
                        <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleNext} className="flex-1 py-4 bg-purple-600 rounded-xl items-center justify-center flex-row">
                    <Text className="text-white font-bold mr-2">Next</Text>
                    <ArrowRight size={20} className="text-white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
