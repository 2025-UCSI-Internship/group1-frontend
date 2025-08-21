// MARK: - 공통 Button 컴포넌트

import { colors } from "~/constants";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // 기본 variant
    variant?: 'default' | 'rent' | 'using' | 'modify' | 'delete' | 'cancel' | 'filter' | 'custom';

    // 크기 옵션 (프리셋 또는 커스텀)
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
    customWidth?: string | number;
    customHeight?: string | number;

    // 스타일 옵션
    fullWidth?: boolean;
    borderRadius?: string | number;
    boxShadow?: string;
    insetShadow?: boolean;
    customColor?: string;

    // 텍스트 옵션
    fontSize?: string | number;
    fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export function Button({
    variant = 'default',
    size = 'md',
    customWidth,
    customHeight,
    fullWidth = false,
    borderRadius,
    boxShadow,
    insetShadow = false,
    customColor,
    fontSize,
    fontWeight = 'medium',
    children,
    className = '',
    style,
    ...props
}: ButtonProps) {
    // Variant 색상 매핑
    const variantColors = {
        default: colors.button.DEFAULT,
        rent: colors.button.RENT,
        using: colors.button.USING,
        modify: colors.button.MODIFY,
        delete: colors.button.DELETE,
        cancel: colors.button.CANCLE,
        filter: colors.button.FILTER,
        custom: customColor || colors.button.DEFAULT,
    };

    // 크기 프리셋
    const sizePresets = {
        sm: {
            padding: '8px 16px',
            fontSize: '14px',
            height: '36px',
        },
        md: {
            padding: '10px 20px',
            fontSize: '16px',
            height: '44px',
        },
        lg: {
            padding: '12px 24px',
            fontSize: '18px',
            height: '52px',
        },
        xl: {
            padding: '16px 48px',
            fontSize: '20px',
            height: '60px',
        },
        '2xl': {
            padding: '10px 20px',  // 피그마 스타일
            fontSize: '20px',
            height: '73px',
            width: '304px',
        },
        custom: {
            padding: '10px 20px',
            fontSize: fontSize || '16px',
            height: customHeight || 'auto',
            width: customWidth || 'auto',
        },
    };

    const currentSize = sizePresets[size];

    // Font weight 클래스 매핑
    const fontWeightClasses = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    // 기본 box-shadow 효과 (피그마 스타일)
    const defaultInsetShadow = '0 0 10px 4px rgba(78, 204, 252, 0.30) inset';

    // 최종 스타일 결정
    const buttonStyle = {
        backgroundColor: variantColors[variant],
        width: fullWidth ? '100%' : (customWidth || (currentSize as any).width || 'auto'),
        height: customHeight || currentSize.height,
        padding: currentSize.padding,
        fontSize: fontSize || currentSize.fontSize,
        borderRadius: borderRadius || '20px',  // 피그마 기본값
        boxShadow: boxShadow || (insetShadow ? defaultInsetShadow : 'none'),
        ...style
    };

    return (
        <button
            {...props}
            className={`
                inline-flex justify-center items-center
                text-white ${fontWeightClasses[fontWeight]}
                hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                font-pretendard
                ${className}
            `}
            style={buttonStyle}
        >
            {children}
        </button>
    );
}