// MARK: - Register 페이지 (관리자 전용)

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/stores/authStore";
import { useUIStore } from "~/stores/uiStore";
import { colors } from "~/constants";
import { Button } from "~/components/ui/Button";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { openModal } = useUIStore();

    useEffect(() => {
        // 관리자가 아니면 홈으로 리다이렉트
        if (user?.role !== 'ADMIN') {
            navigate('/');
        }
    }, [user, navigate]);

    const handleRegisterAsset = () => {
        openModal('registerAsset');
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: colors.bg.MAIN }}>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text.BLACK }}>
                    Register Assets
                </h1>
                <p style={{ color: colors.text.DESCRIPTION }}>
                    Register new assets to the system.
                </p>

                <div className="mt-8">
                    <Button
                        variant="default"
                        size="lg"
                        onClick={handleRegisterAsset}
                    >
                        + Register New Asset
                    </Button>
                </div>

                <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: colors.bg.LEFT_PANNEL }}>
                    <p style={{ color: colors.text.DESCRIPTION }}>
                        Click the button above to register a new asset. You can add details such as:
                    </p>
                    <ul className="mt-4 space-y-2" style={{ color: colors.text.BLACK }}>
                        <li>• Asset Type (Desktop, Laptop, Monitor, Printer, etc.)</li>
                        <li>• Brand and Serial Number</li>
                        <li>• Purchase Information</li>
                        <li>• Warranty Details</li>
                        <li>• Category (Consumables, IT Hardware, Peripherals)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
