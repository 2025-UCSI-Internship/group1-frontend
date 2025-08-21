// MARK: - Button 컴포넌트 사용 예시

import { Button } from './Button';

export function ButtonExamples() {
    return (
        <div className="p-8 space-y-8">
            <h2 className="text-2xl font-bold">Button Component Examples</h2>

            {/* 기본 Variants */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">기본 Variants</h3>
                <div className="flex gap-4 flex-wrap">
                    <Button variant="default">Default</Button>
                    <Button variant="rent">Rent</Button>
                    <Button variant="using">Using</Button>
                    <Button variant="modify">Modify</Button>
                    <Button variant="delete">Delete</Button>
                    <Button variant="cancel">Cancel</Button>
                    <Button variant="filter">Filter</Button>
                </div>
            </div>

            {/* 크기 옵션 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">크기 옵션</h3>
                <div className="flex gap-4 items-end flex-wrap">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                    <Button size="2xl">2X Large (피그마)</Button>
                </div>
            </div>

            {/* 피그마 스타일 (Inset Shadow) */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">피그마 스타일 (Inset Shadow)</h3>
                <div className="flex gap-4 flex-wrap">
                    <Button
                        variant="default"
                        size="2xl"
                        insetShadow={true}
                    >
                        Sign up (피그마)
                    </Button>
                    <Button
                        variant="default"
                        size="xl"
                        insetShadow={true}
                    >
                        Login (피그마)
                    </Button>
                </div>
            </div>

            {/* 커스텀 옵션 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">커스텀 옵션</h3>
                <div className="flex gap-4 flex-wrap">
                    <Button
                        variant="custom"
                        customColor="#FF6B6B"
                        customWidth="200px"
                        customHeight="60px"
                        fontSize="18px"
                        borderRadius="30px"
                        fontWeight="bold"
                    >
                        커스텀 색상
                    </Button>

                    <Button
                        variant="custom"
                        customColor="#4ECDC4"
                        size="custom"
                        customWidth="250px"
                        customHeight="80px"
                        fontSize="22px"
                        borderRadius="40px"
                        boxShadow="0 4px 20px rgba(78, 205, 196, 0.4)"
                        fontWeight="bold"
                    >
                        완전 커스텀
                    </Button>

                    <Button
                        variant="default"
                        size="custom"
                        customWidth="180px"
                        customHeight="50px"
                        borderRadius="8px"
                        insetShadow={false}
                        boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
                    >
                        그림자 커스텀
                    </Button>
                </div>
            </div>

            {/* Full Width */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Full Width</h3>
                <Button
                    variant="default"
                    fullWidth={true}
                    size="lg"
                    insetShadow={true}
                >
                    Full Width Button
                </Button>
            </div>

            {/* Disabled State */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Disabled State</h3>
                <div className="flex gap-4">
                    <Button disabled>Disabled Default</Button>
                    <Button variant="rent" disabled>Disabled Rent</Button>
                    <Button size="2xl" insetShadow={true} disabled>
                        Disabled 피그마
                    </Button>
                </div>
            </div>
        </div>
    );
}
