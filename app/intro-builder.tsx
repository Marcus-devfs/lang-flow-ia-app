import React from 'react';
import { Container } from '../src/components/Container';
import { SelfIntroBuilder } from '../src/components/SelfIntroBuilder';
import { useRouter } from 'expo-router';

export default function IntroBuilderScreen() {
    const router = useRouter();

    return (
        <Container safe>
            <SelfIntroBuilder onFinish={() => router.back()} />
        </Container>
    );
}
