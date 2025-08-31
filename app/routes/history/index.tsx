// MARK: - 대여 이력 페이지

import { useState, useEffect } from "react";
import { useMovementStore } from "~/stores/movementStore";
import type { Movement } from "~/types/movement";

export default function HistoryPage() {
    const { movements, loading, fetchMovements } = useMovementStore();
    const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');

    useEffect(() => {
        fetchMovements();
    }, []);

    const currentRentals = movements.filter(m => m.status === 'ACTIVE');
    const pastRentals = movements.filter(m => m.status === 'RETURNED');

    const handleReturn = (movementId: string) => {
        if (window.confirm('Would you like to return it?')) {
            // API 호출 로직
            console.log('Returning asset:', movementId);
        }
    };

    return (
        <div className="h-full bg-[#EFF6FC] p-8">
            {/* Current Rental Details */}
            <div className="bg-white rounded-2xl p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Current rental details</h1>
                <p className="text-gray-600 mb-6">You can check the list of items currently available for rent</p>

                {currentRentals.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No items currently on loan
                    </div>
                ) : (
                    <div className="space-y-4">
                        {currentRentals.map((rental) => (
                            <div key={rental.id} className="bg-[#F8F9FB] rounded-xl p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="font-semibold text-lg">Name</h3>
                                            {rental.isOverdue && (
                                                <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-medium">
                                                    ● overdue
                                                </span>
                                            )}
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p>Type: {rental.asset?.type || '자산타입'}</p>
                                            <p>Brand: {rental.asset?.brand || '자산 브랜드'}</p>
                                            <p>Serial No. : {rental.asset?.serialNumber || '일련 번호'}</p>
                                            <p>Loan Date: {new Date(rental.loanDate).toLocaleDateString()}</p>
                                            <p>Return Date: {rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : '반납 일자'}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleReturn(rental.id)}
                                        className="px-6 py-2 bg-[#4A9FFF] text-white rounded-lg hover:bg-[#3A8FEF] transition-colors font-medium"
                                    >
                                        Loan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Past Rental List */}
            <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Past Rental List</h2>
                <p className="text-gray-600 mb-6">You can check your past asset lending history.</p>

                {pastRentals.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No past rental history
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pastRentals.map((rental) => (
                            <div key={rental.id} className="bg-[#F8F9FB] rounded-xl p-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-3">Name</h3>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p>Type: {rental.asset?.type || '자산타입'}</p>
                                        <p>Brand: {rental.asset?.brand || '자산 브랜드'}</p>
                                        <p>Serial No. : {rental.asset?.serialNumber || '일련 번호'}</p>
                                        <p>Loan Date: {new Date(rental.loanDate).toLocaleDateString()}</p>
                                        <p>Return Date: {rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : '반납 일자'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}