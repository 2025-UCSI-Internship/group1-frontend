// MARK: - 필터 모달

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '~/components/ui/Button';
import { useUIStore } from '~/stores/uiStore';
import { useAssetStore } from '~/stores/assetStore';
import { colors } from '~/constants';

const types = ['Desktop', 'Laptop', 'Monitor', 'Printer', 'Projector', 'Scanner', 'Tablet', 'Toner'];
const categories = ['Consumables', 'IT Hardware', 'Peripherals'];
const statuses = ['In Use', 'Active', 'Retired', 'In Storage', 'Under Maintenance'];

export function FilterModal() {
    const { modals, closeModal } = useUIStore();
    const { setFilters, fetchAssets } = useAssetStore();
    
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    const handleTypeToggle = (type: string) => {
        setSelectedTypes(prev => 
            prev.includes(type) 
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleCategoryToggle = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleStatusToggle = (status: string) => {
        setSelectedStatuses(prev => 
            prev.includes(status) 
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const handleApply = () => {
        setFilters({
            type: selectedTypes.join(','),
            category: selectedCategories.join(','),
            status: selectedStatuses.join(','),
        });
        fetchAssets();
        closeModal('assetFilter');
    };

    const handleReset = () => {
        setSelectedTypes([]);
        setSelectedCategories([]);
        setSelectedStatuses([]);
    };

    return (
        <Modal
            isOpen={modals.assetFilter}
            onClose={() => closeModal('assetFilter')}
            title="Filter"
            width="max-w-xl"
        >
            {/* Type */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3" style={{ color: colors.text.BLACK }}>
                    Type
                </h3>
                <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => handleTypeToggle(type)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                selectedTypes.includes(type)
                                    ? 'text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            style={selectedTypes.includes(type) ? {
                                backgroundColor: colors.button.FILTER
                            } : {}}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3" style={{ color: colors.text.BLACK }}>
                    Category
                </h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryToggle(category)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                selectedCategories.includes(category)
                                    ? 'text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            style={selectedCategories.includes(category) ? {
                                backgroundColor: colors.button.FILTER
                            } : {}}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Status */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3" style={{ color: colors.text.BLACK }}>
                    Status
                </h3>
                <div className="flex flex-wrap gap-2">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => handleStatusToggle(status)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                selectedStatuses.includes(status)
                                    ? 'text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            style={selectedStatuses.includes(status) ? {
                                backgroundColor: colors.button.FILTER
                            } : {}}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-center gap-4 mt-6">
                <Button variant="delete" onClick={handleReset}>
                    Reset
                </Button>
                <Button variant="default" onClick={handleApply}>
                    Apply
                </Button>
            </div>
        </Modal>
    );
}
