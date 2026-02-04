import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Simple utility for merging tailwind classes
function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    label: string;
    isLoading?: boolean;
}

export function Button({
    variant = 'primary',
    size = 'md',
    label,
    isLoading,
    className,
    disabled,
    ...props
}: ButtonProps) {

    const baseStyles = "flex-row items-center justify-center rounded-xl font-medium";

    const variants = {
        primary: "bg-blue-600 active:bg-blue-700",
        secondary: "bg-slate-100 dark:bg-slate-800 active:opacity-80",
        outline: "border-2 border-slate-200 dark:border-slate-700 bg-transparent",
        ghost: "bg-transparent active:bg-slate-100 dark:active:bg-slate-800",
        destructive: "bg-red-500 active:bg-red-600",
    };

    const textVariants = {
        primary: "text-white font-bold",
        secondary: "text-slate-900 dark:text-white font-semibold",
        outline: "text-slate-700 dark:text-slate-300 font-semibold",
        ghost: "text-slate-600 dark:text-slate-400 font-medium",
        destructive: "text-white font-bold",
    };

    const sizes = {
        sm: "px-3 py-2",
        md: "px-4 py-3",
        lg: "px-6 py-4",
    };

    return (
        <TouchableOpacity
            className={cn(baseStyles, variants[variant], sizes[size], disabled && "opacity-50", className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === 'primary' ? 'white' : '#64748b'} />
            ) : (
                <Text className={cn("text-base", textVariants[variant])}>{label}</Text>
            )}
        </TouchableOpacity>
    );
}
