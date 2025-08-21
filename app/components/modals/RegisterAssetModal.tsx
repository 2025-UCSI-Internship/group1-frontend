// MARK: - 자산 등록 모달

import { useState } from 'react';
import { Modal } from './Modal';
import { Input } from '~/components/ui/Input';
import { Button } from '~/components/ui/Button';
import { useAssetStore } from '~/stores/assetStore';
import { useUIStore } from '~/stores/uiStore';
import { colors } from '~/constants';

const assetTypes = ['Desktop', 'Laptop', 'Monitor', 'Printer', 'Projector', 'Scanner', 'Tablet', 'Toner'];
const categories = ['Consumables', 'IT Hardware', 'Peripherals'];

export function RegisterAssetModal() {
    const { modals, closeModal, showNotification } = useUIStore();
    const { createAsset } = useAssetStore();
    
    const [formData, setFormData] = useState({
        type: '',
        supplier: '',
        brand: '',
        serialNumber: '',
        purchaseDate: '',
        purchaseOrderNumber: '',
        warrantyStartDate: '',
        warrantyEndDate: '',
        category: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async () => {
        try {
            await createAsset({
                ...formData,
                name: `${formData.brand} ${formData.type}`,
                status: 'Active',
            } as any);
            
            showNotification('자산이 성공적으로 등록되었습니다.', 'success');
            closeModal('registerAsset');
            setFormData({
                type: '',
                supplier: '',
                brand: '',
                serialNumber: '',
                purchaseDate: '',
                purchaseOrderNumber: '',
                warrantyStartDate: '',
                warrantyEndDate: '',
                category: '',
            });
        } catch (error) {
            showNotification('자산 등록에 실패했습니다.', 'error');
        }
    };

    return (
        <Modal
            isOpen={modals.registerAsset}
            onClose={() => closeModal('registerAsset')}
            title="Register assets"
            width="max-w-2xl"
        >
            <div className="grid grid-cols-2 gap-4">
                {/* Type */}
                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.text.BLACK }}>
                        Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        style={{
                            backgroundColor: colors.bg.INPUTFIELD,
                            borderColor: '#E5E5E5',
                            color: colors.text.BLACK
                        }}
                    >
                        <option value="">Please select type of asset</option>
                        {assetTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Supplier */}
                <Input
                    label="Supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    placeholder="Please enter supplier"
                />

                {/* Brand */}
                <Input
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Please enter brand name"
                />

                {/* Serial No. */}
                <Input
                    label="Serial No."
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    placeholder="Please enter serial number"
                />

                {/* Purchase Date */}
                <Input
                    label="Purchase Date"
                    name="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                />

                {/* Purchase Order No. */}
                <Input
                    label="Purchase Order No."
                    name="purchaseOrderNumber"
                    value={formData.purchaseOrderNumber}
                    onChange={handleChange}
                    placeholder="Please enter purchase order No."
                />

                {/* Warranty Start Date */}
                <Input
                    label="Warranty Start Date"
                    name="warrantyStartDate"
                    type="date"
                    value={formData.warrantyStartDate}
                    onChange={handleChange}
                />

                {/* Warranty End Date */}
                <Input
                    label="Warranty End Date"
                    name="warrantyEndDate"
                    type="date"
                    value={formData.warrantyEndDate}
                    onChange={handleChange}
                />

                {/* Category */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.text.BLACK }}>
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        style={{
                            backgroundColor: colors.bg.INPUTFIELD,
                            borderColor: '#E5E5E5',
                            color: colors.text.BLACK
                        }}
                    >
                        <option value="">Please enter purchase date</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-center gap-4 mt-6">
                <Button variant="default" onClick={handleSubmit}>
                    Register
                </Button>
                <Button variant="cancel" onClick={() => closeModal('registerAsset')}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}
