// MARK: - 자산 카드 컴포넌트

import { colors } from "~/constants";
import { Button } from "./Button";
import type { AssetDto } from "~/types/asset";

interface AssetCardProps {
    asset: AssetDto;
    onRent?: () => void;
    onModify?: () => void;
    onDelete?: () => void;
    isAdmin?: boolean;
}

export function AssetCard({ asset, onRent, onModify, onDelete, isAdmin }: AssetCardProps) {
    const isUsing = asset.status === 'In Use';

    return (
        <div
            className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            style={{ backgroundColor: colors.bg.LEFT_PANNEL }}
        >
            {/* 헤더 - Name과 상태 라벨 */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-semibold text-lg" style={{ color: colors.text.BLACK }}>
                        Name
                    </h3>
                    <p className="text-xs mt-1" style={{ color: colors.text.DESCRIPTION }}>
                        Person in Charge: {asset.status === 'Active' ? 'Hyeonsong Hwang' : asset.renter || 'None'}
                    </p>
                    <p className="text-xs" style={{ color: colors.text.DESCRIPTION }}>
                        Asset Location: {asset.status === 'Active' ? 'Residence by 2' : 'In Use'}
                    </p>
                </div>
                {/* 상태에 따른 버튼 */}
                {!isAdmin && (
                    <Button
                        variant={isUsing ? "using" : "rent"}
                        size="sm"
                        onClick={isUsing ? undefined : onRent}
                        disabled={isUsing}
                    >
                        {isUsing ? 'Using' : 'Rent'}
                    </Button>
                )}
                {/* 관리자용 버튼 */}
                {isAdmin && (
                    <div className="flex gap-2">
                        <Button variant="modify" size="sm" onClick={onModify}>
                            Modify
                        </Button>
                        <Button variant="delete" size="sm" onClick={onDelete}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            {/* 자산 정보 */}
            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span style={{ color: colors.text.DESCRIPTION }}>Type:</span>
                    <span style={{ color: colors.text.BLACK }}>{asset.type}</span>
                </div>
                <div className="flex justify-between">
                    <span style={{ color: colors.text.DESCRIPTION }}>Brand:</span>
                    <span style={{ color: colors.text.BLACK }}>{asset.brand}</span>
                </div>
                <div className="flex justify-between">
                    <span style={{ color: colors.text.DESCRIPTION }}>Serial No.:</span>
                    <span style={{ color: colors.text.BLACK }}>{asset.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                    <span style={{ color: colors.text.DESCRIPTION }}>Purchase Date:</span>
                    <span style={{ color: colors.text.BLACK }}>
                        {new Date(asset.purchaseDate).toLocaleDateString()}
                    </span>
                </div>

                {/* 구분선 */}
                <div className="border-t pt-1 mt-2" style={{ borderColor: colors.ui.DIVIDER }}>
                    <div className="flex justify-between">
                        <span style={{ color: colors.text.DESCRIPTION }}>Supplier:</span>
                        <span style={{ color: colors.text.BLACK }}>{asset.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                        <span style={{ color: colors.text.DESCRIPTION }}>Purchase Order No.:</span>
                        <span style={{ color: colors.text.BLACK }}>{asset.purchaseOrderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span style={{ color: colors.text.DESCRIPTION }}>Warranty Start Date:</span>
                        <span style={{ color: colors.text.BLACK }}>
                            {new Date(asset.warrantyStartDate).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span style={{ color: colors.text.DESCRIPTION }}>Warranty End Date:</span>
                        <span style={{ color: colors.text.BLACK }}>
                            {new Date(asset.warrantyEndDate).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
