import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from 'nativewind'; // Assuming standard cn utility is available or I should create it.

// Note: If 'cn' is not available, I will use clsx/tailwind-merge inline or create a utility.
// I'll create a utility lib first? Or just usage classes directly. 
// I'll stick to a simple implementation without 'cn' utility for now to reduce files, 
// using className prop directly with backticks if complex logic needed.

interface ContainerProps extends ViewProps {
    safe?: boolean;
    centered?: boolean;
}

export function Container({ children, style, className, safe = true, centered = false, ...props }: ContainerProps) {
    const Component = safe ? SafeAreaView : View;

    return (
        <Component
            className={`flex-1 bg-gray-50 dark:bg-slate-900 ${centered ? 'items-center justify-center' : ''} ${className}`}
            style={style}
            {...props}
        >
            <View className="flex-1 px-4 w-full max-w-md mx-auto">
                {children}
            </View>
        </Component>
    );
}
