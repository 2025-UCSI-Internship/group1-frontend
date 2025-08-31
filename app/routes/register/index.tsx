// MARK: - 자산 등록 페이지

import { useState } from "react";
import { useNavigate } from "react-router";
import { useAssetStore } from "~/stores/assetStore";
import { RegisterAssetModal } from "~/components/modals";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { createAsset } = useAssetStore();
    const [showModal, setShowModal] = useState(true);

    const handleRegister = async (assetData: any) => {
        try {
            await createAsset(assetData);
            alert('The asset has been registered.');
            navigate('/home');
        } catch (error) {
            alert('Failed to register asset');
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        navigate('/home');
    };

    return (
        <div className="h-full bg-[#EFF6FC] p-8">
            <div className="bg-white rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Search your assets !</h1>
                <p className="text-gray-600 mb-6">You can view, register, and manage assets.</p>
                
                {/* 검색 바 */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Please enter your assets"
                        className="w-full px-6 py-4 pr-12 rounded-xl border border-gray-200 focus:border-[#4A9FFF] focus:outline-none text-lg"
                        style={{ backgroundColor: '#F8F9FB' }}
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Click the button below to register a new asset</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-8 py-3 bg-[#4A9FFF] text-white rounded-lg hover:bg-[#3A8FEF] transition-colors font-medium"
                    >
                        Register New Asset
                    </button>
                </div>
            </div>

            {/* 등록 모달 */}
            {showModal && (
                <RegisterAssetModal
                    onRegister={handleRegister}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}