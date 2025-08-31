// MARK: - 자산 상세 페이지

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAssetStore } from "~/stores/assetStore";

export default function AssetDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getAsset, updateAsset } = useAssetStore();
    const [asset, setAsset] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        if (id) {
            const assetData = getAsset(id);
            setAsset(assetData);
            
            // 변경 이력 더미 데이터
            setHistory([
                {
                    date: '2020.08.16',
                    changes: [
                        { type: 'Type is changed.', description: 'The asset type has changed.' },
                        { type: 'Supplier is changed.', description: 'The asset type has changed.' },
                        { type: 'Brand is changed', description: 'The asset type has changed.' },
                    ]
                },
                {
                    date: '2020.08.15',
                    changes: [
                        { type: 'Status is chaged', description: 'The asset type has changed.' },
                        { type: 'Status is chaged', description: 'The asset type has changed.' },
                    ]
                },
                {
                    date: '2020.08.14',
                    changes: [
                        { type: 'Status is chaged', description: 'The asset type has changed.' },
                    ]
                }
            ]);
        }
    }, [id]);

    const handleSort = () => {
        // 정렬 로직
        const sortedHistory = [...history].reverse();
        setHistory(sortedHistory);
    };

    if (!asset) {
        return (
            <div className="h-full bg-[#EFF6FC] p-8">
                <div className="bg-white rounded-2xl p-8">
                    <div className="text-center py-12 text-gray-500">
                        Asset not found
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-[#EFF6FC] p-8">
            <div className="bg-white rounded-2xl p-8">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {asset.name || 'Macbook Air 15 inch'}
                    </h1>
                    <button
                        onClick={() => navigate('/home')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                <p className="text-gray-600 mb-6">You can check the change history of the asset.</p>

                {/* 정렬 버튼 */}
                <button
                    onClick={handleSort}
                    className="px-6 py-2 bg-[#4A9FFF] text-white rounded-lg hover:bg-[#3A8FEF] transition-colors mb-8"
                >
                    ↓ Sort
                </button>

                {/* 변경 이력 */}
                <div className="space-y-8">
                    {history.map((entry, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-bold mb-4">{entry.date}.</h2>
                            
                            <div className="relative">
                                {/* 왼쪽 파란색 라인 */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4A9FFF]"></div>
                                
                                <div className="pl-8 space-y-4">
                                    {entry.changes.map((change, changeIndex) => (
                                        <div key={changeIndex}>
                                            <h3 className="font-semibold text-lg mb-1">{change.type}</h3>
                                            <p className="text-gray-600">{change.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}