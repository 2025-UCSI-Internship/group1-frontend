// MARK: - 자산 등록 모달

import { useState } from "react";
import { Modal } from "./Modal";

interface RegisterAssetModalProps {
    onRegister: (data: any) => void;
    onCancel: () => void;
}

export function RegisterAssetModal({ onRegister, onCancel }: RegisterAssetModalProps) {
    const [formData, setFormData] = useState({
        type: '',
        supplier: '',
        brand: '',
        serialNumber: '',
        purchaseDate: '',
        purchaseOrderNo: '',
        warrantyStartDate: '',
        warrantyEndDate: '',
        category: '',
    });

    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const types = ['Desktop', 'Laptop', 'Monitor', 'Printer', 'Projector', 'Scanner', 'Tablet', 'Toner'];
    const categories = ['Consumables', 'IT Hardware', 'Peripherals'];

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // 유효성 검사
        if (!formData.type || !formData.supplier || !formData.serialNumber) {
            alert('Please fill in all required fields');
            return;
        }
        onRegister(formData);
    };

    return (
        <Modal onClose={onCancel}>
            <div className="p-8" style={{ width: '700px', maxHeight: '80vh', overflowY: 'auto' }}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Register assets</h2>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Type */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Type</label>
                        <div className="relative">
                            <button
                                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                                className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg bg-white flex justify-between items-center"
                            >
                                <span className={formData.type ? 'text-gray-900' : 'text-gray-400'}>
                                    {formData.type || 'Please select type of asset'}
                                </span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                            {showTypeDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {types.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                handleChange('type', type);
                                                setShowTypeDropdown(false);
                                            }}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Supplier */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Supplier</label>
                        <input
                            type="text"
                            value={formData.supplier}
                            onChange={(e) => handleChange('supplier', e.target.value)}
                            placeholder="Please enter supplier"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#4A9FFF] focus:outline-none"
                        />
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Brand</label>
                        <input
                            type="text"
                            value={formData.brand}
                            onChange={(e) => handleChange('brand', e.target.value)}
                            placeholder="Please enter brand name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#4A9FFF] focus:outline-none"
                        />
                    </div>

                    {/* Serial No. */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Serial No.</label>
                        <input
                            type="text"
                            value={formData.serialNumber}
                            onChange={(e) => handleChange('serialNumber', e.target.value)}
                            placeholder="Please enter serial number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#4A9FFF] focus:outline-none"
                        />
                    </div>

                    {/* Purchase Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Purchase Date</label>
                        <input
                            type="date"
                            value={formData.purchaseDate}
                            onChange={(e) => handleChange('purchaseDate', e.target.value)}
                            placeholder="Please enter purchase date"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#4A9FFF] focus:outline-none"
                        />
                    </div>

                    {/* Purchase Order No. */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Purchase Order No.</label>
                        <input
                            type="text"
                            value={formData.purchaseOrderNo}
                            onChange={(e) => handleChange('purchaseOrderNo', e.target.value)}
                            placeholder="Please enter purchase order No."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#4A9FFF] focus:outline-none"
                        />
                    </div>

                    {/* Warranty Start Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Warranty Start Date</label>
                        <input
                            type="date"
                            value={formData.warrantyStartDate}
                            onChange={(e) => handleChange('warrantyStartDate', e.target.value)}
                            placeholder="Please enter purchase date"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#4A9FFF] focus:outline-none"
                        />
                    </div>

                    {/* Warranty End Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Warranty End Date</label>
                        <input
                            type="date"
                            value={formData.warrantyEndDate}
                            onChange={(e) => handleChange('warrantyEndDate', e.target.value)}
                            placeholder="Please enter purchase order No."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#4A9FFF] focus:outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                        <label className="block text-sm font-semibold mb-2">Category</label>
                        <div className="relative">
                            <button
                                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg bg-white flex justify-between items-center"
                            >
                                <span className={formData.category ? 'text-gray-900' : 'text-gray-400'}>
                                    {formData.category || 'Please enter purchase date'}
                                </span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                            {showCategoryDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                handleChange('category', category);
                                                setShowCategoryDropdown(false);
                                            }}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 버튼 */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-[#4A9FFF] text-white rounded-lg hover:bg-[#3A8FEF] transition-colors font-medium"
                    >
                        Register
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-8 py-3 bg-[#DA1616] text-white rounded-lg hover:bg-[#CA0606] transition-colors font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}