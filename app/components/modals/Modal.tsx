// MARK: - 기본 모달 컴포넌트

import React from 'react';
import { colors } from '~/constants';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    width?: string;
}

export function Modal({ isOpen, onClose, title, children, width = 'max-w-md' }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: colors.bg.BG_MODAL }}
            onClick={onClose}
        >
            <div
                className={`${width} w-full mx-4 rounded-2xl shadow-xl`}
                style={{ backgroundColor: colors.bg.MODAL }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* 헤더 */}
                {title && (
                    <div className="p-6 border-b" style={{ borderColor: colors.ui.DIVIDER }}>
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold" style={{ color: colors.text.BLACK }}>
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* 내용 */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
