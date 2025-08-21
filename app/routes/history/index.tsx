// MARK: - History 페이지

import { useEffect } from "react";
import { useMovementStore } from "~/stores/movementStore";
import { useAuthStore } from "~/stores/authStore";
import { colors } from "~/constants";
import { Button } from "~/components/ui/Button";

export default function HistoryPage() {
    const { user } = useAuthStore();
    const { currentRentals, rentalHistory, fetchCurrentRentals, fetchRentalHistory, isLoading } = useMovementStore();

    useEffect(() => {
        fetchCurrentRentals();
        fetchRentalHistory();
    }, []);

    return (
        <div className="min-h-screen" style={{ backgroundColor: colors.bg.MAIN }}>
            {/* 헤더 */}
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text.BLACK }}>
                    Current rental details
                </h1>
                <p style={{ color: colors.text.DESCRIPTION }}>
                    You can check the list of items currently available for rent.
                </p>
            </div>

            {/* 현재 대여 중인 자산 */}
            <div className="px-6 mb-8">
                {currentRentals.length === 0 ? (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bg.LEFT_PANNEL }}>
                        <p style={{ color: colors.text.DESCRIPTION }}>No items currently rented.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {currentRentals.map((rental) => (
                            <div key={rental.assetId} className="p-4 rounded-lg" style={{ backgroundColor: colors.bg.LEFT_PANNEL }}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold" style={{ color: colors.text.BLACK }}>
                                            Name
                                        </h3>
                                        <p className="text-sm mt-2" style={{ color: colors.text.DESCRIPTION }}>
                                            Type: {rental.type}
                                        </p>
                                        <p className="text-sm" style={{ color: colors.text.DESCRIPTION }}>
                                            Brand: {rental.brand}
                                        </p>
                                        <p className="text-sm" style={{ color: colors.text.DESCRIPTION }}>
                                            Serial No.: {rental.serialNumber}
                                        </p>
                                        <p className="text-sm" style={{ color: colors.text.DESCRIPTION }}>
                                            Loan Date: {new Date(rental.loanDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm" style={{ color: colors.text.DESCRIPTION }}>
                                            Return Date: {rental.status === 'overdue' ? '반납 지연' : '반납 예정'}
                                        </p>
                                    </div>
                                    <Button variant="rent" size="sm">
                                        Loan
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 과거 대여 이력 */}
            <div className="px-6 pb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text.BLACK }}>
                    Past Rental List
                </h2>
                <p className="mb-4" style={{ color: colors.text.DESCRIPTION }}>
                    You can check your past asset lending history.
                </p>

                {rentalHistory.length === 0 ? (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bg.LEFT_PANNEL }}>
                        <p style={{ color: colors.text.DESCRIPTION }}>No rental history.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {rentalHistory.map((history) => (
                            <div key={history.assetId} className="p-4 rounded-lg" style={{ backgroundColor: colors.bg.LEFT_PANNEL }}>
                                <h3 className="font-semibold" style={{ color: colors.text.BLACK }}>
                                    Name
                                </h3>
                                <p className="text-sm mt-2" style={{ color: colors.text.DESCRIPTION }}>
                                    Type: {history.type}
                                </p>
                                <p className="text-sm" style={{ color: colors.text.DESCRIPTION }}>
                                    Brand: {history.brand}
                                </p>
                                <p className="text-sm" style={{ color: colors.text.DESCRIPTION }}>
                                    Serial No.: {history.serialNumber}
                                </p>
                                <p className="text-sm" style={{ color: colors.text.DESCRIPTION }}>
                                    Loan Date: {new Date(history.loanDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm" style={{ color: colors.text.DESCRIPTION }}>
                                    Return Date: {history.returnDate ? new Date(history.returnDate).toLocaleDateString() : '-'}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
