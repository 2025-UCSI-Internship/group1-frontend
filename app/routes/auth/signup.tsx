// MARK: - 회원가입 페이지

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuthStore } from "~/stores/authStore";
import { useUIStore } from "~/stores/uiStore";
import type { UserRole } from "~/types/auth";

export default function SignupPage() {
    const navigate = useNavigate();
    const { signup, isLoading, error } = useAuthStore();
    const { showNotification } = useUIStore();

    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phoneNumber: '',
        role: 'USER' as UserRole,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 비밀번호 확인
        if (formData.password !== formData.confirmPassword) {
            showNotification('비밀번호가 일치하지 않습니다.', 'error');
            return;
        }

        try {
            await signup(formData);
            showNotification('회원가입 성공! 로그인해주세요.', 'success');
            navigate('/login');
        } catch (error) {
            showNotification('회원가입에 실패했습니다.', 'error');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-8"
            style={{ backgroundColor: '#3B3E45' }}
        >
            {/* 상단 로고 */}
            <div className="absolute top-8 left-8 cursor-pointer" onClick={() => navigate('/')}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#166ADA" />
                    <path d="M10 8l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* 회원가입 카드 - 반응형 */}
            <div
                className="rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg my-4"
                style={{
                    backgroundColor: '#FFFFFF',
                    maxWidth: '500px'
                }}
            >
                {/* 로고 및 타이틀 */}
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" fill="#166ADA" />
                            <path d="M10 8l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-sm mt-2 text-gray-600">
                        Join PantsPants to manage your assets
                    </p>
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* 회원가입 폼 - 반응형 그리드 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                style={{
                                    backgroundColor: '#F8F9FA',
                                    fontSize: '14px'
                                }}
                                placeholder="Full name"
                                required
                            />
                        </div>

                        {/* User ID */}
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium mb-1 text-gray-700">
                                User ID
                            </label>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                style={{
                                    backgroundColor: '#F8F9FA',
                                    fontSize: '14px'
                                }}
                                placeholder="Choose a username"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                style={{
                                    backgroundColor: '#F8F9FA',
                                    fontSize: '14px'
                                }}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                style={{
                                    backgroundColor: '#F8F9FA',
                                    fontSize: '14px'
                                }}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* E-mail address */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            style={{
                                backgroundColor: '#F8F9FA',
                                fontSize: '14px'
                            }}
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone number */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1 text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                style={{
                                    backgroundColor: '#F8F9FA',
                                    fontSize: '14px'
                                }}
                                placeholder="010-0000-0000"
                                required
                            />
                        </div>

                        {/* User Role */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium mb-1 text-gray-700">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                style={{
                                    backgroundColor: '#F8F9FA',
                                    fontSize: '14px',
                                    color: '#000000'
                                }}
                                required
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                    </div>

                                        <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full text-white font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        style={{ 
                            height: '73px',
                            padding: '10px 20px',
                            borderRadius: '20px',
                            backgroundColor: '#166ADA',
                            boxShadow: '0 0 10px 4px rgba(78, 204, 252, 0.30) inset',
                            fontSize: '18px'
                        }}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                {/* 로그인 링크 */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold hover:underline" style={{ color: '#166ADA' }}>
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
