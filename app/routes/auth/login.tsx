// MARK: - 로그인 페이지

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuthStore } from "~/stores/authStore";
import { useUIStore } from "~/stores/uiStore";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuthStore();
    const { showNotification } = useUIStore();

    const [formData, setFormData] = useState({
        id: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login(formData);
            showNotification('로그인 성공!', 'success');
            navigate('/home');
        } catch (error) {
            showNotification('로그인에 실패했습니다.', 'error');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: '#3A3D44' }}
        >
            {/* 상단 로고 */}
            <div className="absolute top-6 left-6">
                <div className="w-12 h-12 rounded-full bg-[#4A9FFF] flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* 로그인 카드 */}
            <div 
                className="bg-white rounded-[20px] shadow-2xl w-full"
                style={{ 
                    maxWidth: '440px',
                    padding: '48px 40px'
                }}
            >
                {/* 로고 및 타이틀 */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 rounded-full bg-[#4A9FFF] flex items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <path d="M9 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-[26px] font-bold text-[#1A1A1A] tracking-tight">PantsPants</h1>
                    <p className="text-[20px] font-medium text-[#2C2C2C] mt-6">Welcome</p>
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* 로그인 폼 */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="id" className="block text-[14px] font-medium text-[#4A4A4A] mb-2">
                            ID
                        </label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-[10px] border border-[#E5E7EB] focus:border-[#4A9FFF] focus:outline-none transition-colors"
                            style={{
                                backgroundColor: '#F8F9FB',
                                fontSize: '15px'
                            }}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-[14px] font-medium text-[#4A4A4A] mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-[10px] border border-[#E5E7EB] focus:border-[#4A9FFF] focus:outline-none transition-colors"
                            style={{
                                backgroundColor: '#F8F9FB',
                                fontSize: '15px'
                            }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full text-white py-3.5 rounded-[12px] font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none mt-8"
                        style={{ 
                            backgroundColor: '#4A9FFF',
                            fontSize: '16px'
                        }}
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                {/* 회원가입 링크 */}
                <div className="mt-8 text-center">
                    <p className="text-[14px] text-[#6B6B6B]">
                        Don't have an account?{' '}
                        <Link 
                            to="/signup" 
                            className="text-[#4A9FFF] font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
