import React from 'react';
import { Pressable, Text, TouchableOpacityProps, View } from 'react-native';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react-native';

interface ButtonProps extends TouchableOpacityProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    textClassName?: string;
}

export function Button({
    label,
    variant = 'primary',
    size = 'md',
    className,
    icon: Icon,
    textClassName,
    ...props
}: ButtonProps) {

    const baseStyles = "rounded-xl items-center justify-center flex-row";

    const variants = {
        primary: "bg-blue-600 active:bg-blue-700",
        secondary: "bg-slate-100 dark:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700",
        outline: "border border-slate-200 dark:border-slate-700 bg-transparent",
        ghost: "bg-transparent active:bg-slate-100 dark:active:bg-slate-800",
        destructive: "bg-red-500 active:bg-red-600",
    };

    const textColors = {
        primary: "text-white",
        secondary: "text-slate-900 dark:text-white",
        outline: "text-slate-700 dark:text-slate-300",
        ghost: "text-slate-600 dark:text-slate-400",
        destructive: "text-white",
    };

    const sizes = {
        sm: "px-3 py-2",
        md: "px-4 py-3",
        lg: "px-6 py-4",
    };

    return (
        <Pressable
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            <Text className={clsx("font-bold text-base", textColors[variant], textClassName)}>
                {label}
            </Text>
            {Icon && <View className="ml-2"><Icon size={20} color={variant === 'primary' || variant === 'destructive' ? 'white' : '#64748b'} /></View>}
        </Pressable>
    );
}
