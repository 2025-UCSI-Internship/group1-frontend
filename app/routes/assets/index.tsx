// MARK: - 자산 목록 페이지

import { useEffect, useState } from "react";
import { useAssetStore } from "~/stores/assetStore";
import { useAuthStore } from "~/stores/authStore";
import { useUIStore } from "~/stores/uiStore";
import { AssetCard } from "~/components/ui/AssetCard";
import { Button } from "~/components/ui/Button";
import { colors } from "~/constants";

export default function AssetsPage() {
    const { assets, isLoading, fetchAssets } = useAssetStore();
    const { user } = useAuthStore();
    const { openModal, setSelectedAssetId } = useUIStore();
    const [searchQuery, setSearchQuery] = useState("");

    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleRent = (assetId: string) => {
        setSelectedAssetId(assetId);
        openModal('loanAsset');
    };

    const handleModify = (assetId: string) => {
        setSelectedAssetId(assetId);
        openModal('updateAsset');
    };

    const handleDelete = (assetId: string) => {
        setSelectedAssetId(assetId);
        openModal('deleteAsset');
    };

    const handleFilter = () => {
        openModal('assetFilter');
    };

    // 검색 필터링
    const filteredAssets = assets.filter(asset =>
        asset.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen" style={{ backgroundColor: colors.bg.MAIN }}>
            {/* 헤더 */}
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text.BLACK }}>
                    Search your assets !
                </h1>
                <p style={{ color: colors.text.DESCRIPTION }}>
                    You can view, register, and manage assets.
                </p>
            </div>

            {/* 검색 바 */}
            <div className="px-6 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Please enter your assets"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pr-12 rounded-lg shadow-sm focus:outline-none focus:ring-2"
                        style={{
                            backgroundColor: colors.bg.LEFT_PANNEL,
                            color: colors.text.BLACK,
                        }}
                    />
                    <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Assets List 헤더 */}
            <div className="px-6 mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold" style={{ color: colors.text.BLACK }}>
                            Assets List
                        </h2>
                        <p className="text-sm mt-1" style={{ color: colors.text.DESCRIPTION }}>
                            Check your assets • Total: {filteredAssets.length} items
                        </p>
                    </div>
                    <Button variant="filter" size="md" onClick={handleFilter}>
                        🔽 Filter
                    </Button>
                </div>
            </div>

            {/* 자산 카드 그리드 */}
            <div className="px-6 pb-6">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-lg" style={{ color: colors.text.DESCRIPTION }}>
                            Loading assets...
                        </div>
                    </div>
                ) : filteredAssets.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-lg" style={{ color: colors.text.DESCRIPTION }}>
                            No assets found.
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                        {filteredAssets.map((asset) => (
                            <AssetCard
                                key={asset.assetId}
                                asset={asset}
                                onRent={() => handleRent(asset.assetId)}
                                onModify={() => handleModify(asset.assetId)}
                                onDelete={() => handleDelete(asset.assetId)}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
