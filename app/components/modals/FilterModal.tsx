// MARK: - 필터 모달

import { useState } from "react";
import { Modal } from "./Modal";

interface FilterModalProps {
    onApply: (filters: any) => void;
    onClose: () => void;
}

export function FilterModal({ onApply, onClose }: FilterModalProps) {
    const [filters, setFilters] = useState({
        type: [] as string[],
        category: [] as string[],
        status: [] as string[],
    });

    const types = ['Desktop', 'Laptop', 'Monitor', 'Printer', 'Projector', 'Scanner', 'Tablet', 'Toner'];
    const categories = ['Consumables', 'IT Hardware', 'Peripherals'];
    const statuses = ['In Use', 'Active', 'Retired', 'In Storage', 'Under Maintenance'];

    const toggleFilter = (category: 'type' | 'category' | 'status', value: string) => {
        setFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(v => v !== value)
                : [...prev[category], value]
        }));
    };

    const handleReset = () => {
        setFilters({
            type: [],
            category: [],
            status: [],
        });
    };

    const handleApply = () => {
        onApply(filters);
    };

    return (
        <Modal onClose={onClose}>
            <div className="p-8" style={{ width: '600px' }}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Filter</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Type 필터 */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3">Type</h3>
                    <div className="flex flex-wrap gap-2">
                        {types.map(type => (
                            <button
                                key={type}
                                onClick={() => toggleFilter('type', type)}
                                className={`px-4 py-2 rounded-lg transition-colors ${filters.type.includes(type)
                                    ? 'bg-[#4A9FFF] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category 필터 */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3">Category</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => toggleFilter('category', category)}
                                className={`px-4 py-2 rounded-lg transition-colors ${filters.category.includes(category)
                                    ? 'bg-[#4A9FFF] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status 필터 */}
                <div className="mb-8">
                    <h3 className="font-semibold mb-3">Status</h3>
                    <div className="flex flex-wrap gap-2">
                        {statuses.map(status => (
                            <button
                                key={status}
                                onClick={() => toggleFilter('status', status)}
                                className={`px-4 py-2 rounded-lg transition-colors ${filters.status.includes(status)
                                    ? 'bg-[#4A9FFF] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 버튼 */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleReset}
                        className="px-8 py-3 bg-[#DA1616] text-white rounded-lg hover:bg-[#CA0606] transition-colors font-medium"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-8 py-3 bg-[#4A9FFF] text-white rounded-lg hover:bg-[#3A8FEF] transition-colors font-medium"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </Modal>
    );
}