// MARK: - 홈 페이지 (자산 목록)

import { useState, useEffect } from "react";
import { useAssetStore } from "~/stores/assetStore";
import { FilterModal } from "~/components/modals";
import { AssetCard } from "~/components/ui";

export default function Home() {
  const { assets, loading, fetchAssets, filterAssets } = useAssetStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      filterAssets({ search: searchQuery, ...filters });
    } else {
      filterAssets(filters);
    }
  };

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    filterAssets({ search: searchQuery, ...newFilters });
    setShowFilter(false);
  };

  return (
    <div className="h-full bg-[#EFF6FC] p-8">
      {/* 헤더 섹션 */}
      <div className="bg-white rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Search your assets !</h1>
        <p className="text-gray-600 mb-6">You can view, register, and manage assets.</p>

        {/* 검색 바 */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Please enter your assets"
            className="w-full px-6 py-4 pr-12 rounded-xl border border-gray-200 focus:border-[#4A9FFF] focus:outline-none text-lg"
            style={{ backgroundColor: '#F8F9FB' }}
          />
          <button
            onClick={handleSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 자산 목록 섹션 */}
      <div className="bg-white rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Assets List</h2>
            <p className="text-gray-500">Total: {assets.length} items</p>
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="px-6 py-2 bg-[#4A9FFF] text-white rounded-lg hover:bg-[#3A8FEF] transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 4h18M3 12h18M3 20h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Filter
          </button>
        </div>

        {/* 자산 카드 그리드 */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : assets.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">No assets found</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>

      {/* 필터 모달 */}
      {showFilter && (
        <FilterModal
          onApply={handleFilter}
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  );
}