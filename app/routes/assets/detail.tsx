// MARK: - 자산 상세 페이지

import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAssetStore } from "~/stores/assetStore";
import { colors } from "~/constants";
import { Button } from "~/components/ui/Button";

export default function AssetDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentAsset, fetchAssetById, isLoading } = useAssetStore();

    useEffect(() => {
        if (id) {
            fetchAssetById(id);
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (!currentAsset) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div>Asset not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: colors.bg.MAIN }}>
            <div className="max-w-4xl mx-auto">
                <Button onClick={() => navigate(-1)}>← Back</Button>
                <h1 className="text-2xl font-bold mt-4">Asset Details</h1>
                <div className="mt-4 p-6 rounded-lg" style={{ backgroundColor: colors.bg.LEFT_PANNEL }}>
                    <pre>{JSON.stringify(currentAsset, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}
