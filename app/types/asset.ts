// MARK: - 자산 관련 타입 정의

// SECTION:  - 유니온 타입 정의
// 자산 상태
type AssetStatus = 'Active' | 'In Storage' | 'In Use' | 'Retired' | 'Under Maintenance';
// 자산 카테고리
type AssetCategory = 'Consumables' | 'IT Hardware' | 'Peripherals';
// 자산 타입
type AssetType = 'Desktop' | 'Laptop' | 'Monitor' | 'Printer' | 'Projecter' | 'Scanner' | 'Tablet' | 'Toner';


// 자산 등록
interface CreateAssetRequestDto {
    asset: AssetDto;

}

// 자산 삭제 요청
interface DeleteAssetRequestDto {
    assetId: string;
}

// 자산 삭제 응답
interface DeleteAssetResponseDto {
    success: boolean;
    message?: string; // 옵셔널 필드
}

// 자산 수정 요청
interface UpdateAssetRequestDto {
    assetId: string;
    asset: Partial<AssetDto>;


}

// 자산 수정 응답
interface UpdateAssetResponseDto {
    success: boolean;
    message?: string;
}

// 자산 목록 조회 요청
interface GetAssetsRequestDto {
    type?: AssetType;
    category?: AssetCategory;
    status?: AssetStatus;
}

// 자산 목록 조회 응답
interface GetAssetsResponseDto {
    assets: AssetDto[];
}

// 특정 자산 조회 요청
interface GetAssetByIdRequestDto {
    assetId: string;
}

// 특정 자산 조회 응답
interface GetAssetByIdResponseDto {
    asset: AssetDto;
    success: boolean;
}

// 자산 DTO
interface AssetDto {
    assetId: string;
    category: AssetCategory;
    type: AssetType;
    brand: string;
    name: string; // 엑셀 컬럼명: model
    supplier: string;
    serialNumber: string;
    purchaseOrderNumber: string; // 엑셀 컬럼명: invoiceNumber
    purchaseDate: Date;
    warrantyStartDate: Date;
    warrantyEndDate: Date;
    location: string;
    assignedCampus: string;
    assignedDepartment: string;
    renter: string; // 인터페이스는 기본값 할당 불가
    status: AssetStatus;
    createdAt: Date;  // 객체 생성시 Date()생성
    updatedAt: Date;
    depreciation: number;

}



