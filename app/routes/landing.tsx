import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { colors } from '../constants/colors';

export default function Landing() {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollAccumulatorRef = useRef(0);
    const isScrollingRef = useRef(false);
    const touchStartYRef = useRef(0);
    const currentSectionRef = useRef(0);

    // 스크롤 핸들러
    useEffect(() => {

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isScrollingRef.current) return;

            // 스크롤 누적값 계산
            scrollAccumulatorRef.current += e.deltaY;

            // 임계값을 넘어야 섹션 전환 (더 큰 값으로 설정)
            if (Math.abs(scrollAccumulatorRef.current) < 100) return;

            isScrollingRef.current = true;

            if (scrollAccumulatorRef.current > 0 && currentSectionRef.current < 2) {
                currentSectionRef.current += 1;
                setCurrentSection(currentSectionRef.current);
            } else if (scrollAccumulatorRef.current < 0 && currentSectionRef.current > 0) {
                currentSectionRef.current -= 1;
                setCurrentSection(currentSectionRef.current);
            }

            // 누적값 초기화
            scrollAccumulatorRef.current = 0;

            setTimeout(() => {
                isScrollingRef.current = false;
            }, 1800); // 더 긴 대기 시간
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartYRef.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrollingRef.current) return;

            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartYRef.current - touchEndY;

            if (Math.abs(deltaY) > 50) {
                isScrollingRef.current = true;

                if (deltaY > 0 && currentSectionRef.current < 2) {
                    currentSectionRef.current += 1;
                    setCurrentSection(currentSectionRef.current);
                } else if (deltaY < 0 && currentSectionRef.current > 0) {
                    currentSectionRef.current -= 1;
                    setCurrentSection(currentSectionRef.current);
                }

                setTimeout(() => {
                    isScrollingRef.current = false;
                }, 1800); // 충분한 대기 시간
            }
        };

        // 키보드 네비게이션 추가
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrollingRef.current) return;

            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                if (currentSection < 2) {
                    isScrollingRef.current = true;
                    setCurrentSection(prev => prev + 1);
                    setTimeout(() => {
                        isScrollingRef.current = false;
                    }, 1800);
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                if (currentSection > 0) {
                    isScrollingRef.current = true;
                    setCurrentSection(prev => prev - 1);
                    setTimeout(() => {
                        isScrollingRef.current = false;
                    }, 1800);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // 디버깅을 위한 로그
    useEffect(() => {
        console.log('Current Section:', currentSection);
    }, [currentSection]);

    return (
        <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ background: colors.bg.BLACK }}>
            {/* 고정된 헤더 */}
            <header
                className="absolute top-0 left-0 right-0 z-50 flex items-center"
                style={{
                    width: '100%',
                    height: '72px',
                    padding: '0 40px',
                    background: colors.bg.LANDING,
                    borderBottom: `1px solid ${colors.ui.HEADER_DIVIDER}`
                }}
            >
                <img
                    src="/logo_small.png"
                    alt="UCSI Logo"
                    className="h-10 cursor-pointer"
                    onClick={() => navigate('/')}
                />
            </header>

            {/* 스크롤 가능한 콘텐츠 영역 */}
            <div
                ref={containerRef}
                className="absolute top-[72px] left-0 right-0 bottom-0 w-full overflow-hidden"
                style={{
                    height: 'calc(100vh - 72px)'
                }}
            >
                {/* Section 1: Hero - 피그마 디자인 정확한 비율 */}
                <section
                    className={`absolute inset-0 w-full transition-all duration-1000 ${currentSection === 0
                        ? 'opacity-100 translate-y-0'
                        : currentSection > 0
                            ? 'opacity-0 -translate-y-full'
                            : 'opacity-0 translate-y-full'
                        }`}
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #9CECFB 0%, #65C7F7 30.3%, #0052D4 100%)',
                        padding: '60px'
                    }}
                >
                    {/* 컨테이너 - 적절한 여백과 함께 */}
                    <div
                        className="w-full h-full rounded-[20px] border-[3px] border-[#6691DC]/40 bg-[#9CECFB]/20 backdrop-blur-sm
                            flex items-center"
                        style={{
                            padding: '0 5%'
                        }}
                    >
                        {/* 왼쪽: 텍스트 영역 - 피그마 비율 */}
                        <div
                            className="flex flex-col justify-center flex-shrink-0"
                            style={{
                                width: '35%',
                                minWidth: '320px',
                                paddingLeft: '20px'
                            }}
                        >
                            <h1
                                className="font-pretendard font-bold"
                                style={{
                                    color: colors.text.WHITE,
                                    letterSpacing: '-0.02em',
                                    fontSize: 'clamp(70px, 6vw, 96px)',
                                    lineHeight: '1.2',
                                    marginBottom: '20px'
                                }}
                            >
                                UCSI<br />
                                ASSET<br />
                                System with HBNU
                            </h1>

                        </div>

                        {/* 오른쪽: 이미지 영역 - 큰 비율 */}
                        <div className="flex-1 flex items-center justify-center" style={{ height: '70%', paddingRight: '20px' }}>
                            <img
                                src="/main_page.jpg"
                                alt="UCSI Asset Management System Preview"
                                className="h-full w-auto rounded-xl shadow-2xl"
                                style={{
                                    maxWidth: '90%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 2: Features - 피그마 정확한 비율 */}
                <section
                    className={`absolute inset-0 w-full flex items-center transition-all duration-1000 ${currentSection === 1
                        ? 'opacity-100 translate-y-0'
                        : currentSection > 1
                            ? 'opacity-0 -translate-y-full'
                            : 'opacity-0 translate-y-full'
                        }`}
                    style={{
                        height: '100%',
                        background: colors.bg.BLACK,
                        padding: '60px'
                    }}
                >
                    <div className="w-full h-full flex items-center justify-between" style={{ padding: '0 8%' }}>
                        <div className="flex-1 max-w-[45%]">
                            <div className={currentSection >= 1 ? 'animate-slideInLeft' : 'opacity-0'}>
                                <h2 className="font-pretendard font-black mb-2"
                                    style={{
                                        color: colors.text.WHITE,
                                        fontSize: 'clamp(50px, 6vw, 90px)',
                                        lineHeight: '1.15'
                                    }}>
                                    You can<br />
                                    manage
                                </h2>
                                <h2 className="font-pretendard font-black mb-8"
                                    style={{
                                        color: colors.bg.SKY,
                                        fontSize: 'clamp(50px, 6vw, 90px)',
                                        lineHeight: '1.15'
                                    }}>
                                    your asset
                                </h2>
                                <p className="font-pretendard font-normal"
                                    style={{
                                        color: colors.text.DESCRIPTION,
                                        fontSize: 'clamp(16px, 1.8vw, 24px)',
                                        lineHeight: 1.5
                                    }}>
                                    You can view, register, and manage assets.
                                </p>
                            </div>
                        </div>

                        <div className={`flex-1 ${currentSection >= 1 ? 'animate-slideInRight' : 'opacity-0'} flex justify-center items-center`}>
                            <img
                                src="/ic_laptop.png"
                                alt="Laptop"
                                className="object-contain"
                                style={{
                                    width: '70%',
                                    maxWidth: '500px',
                                    height: 'auto'
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 3: Get Started - 피그마 정확한 비율 */}
                <section
                    className={`absolute inset-0 w-full flex items-center transition-all duration-1000 ${currentSection === 2
                        ? 'opacity-100 translate-y-0'
                        : currentSection > 2
                            ? 'opacity-0 -translate-y-full'
                            : 'opacity-0 translate-y-full'
                        }`}
                    style={{
                        height: '100%',
                        background: colors.bg.BLACK,
                        padding: '60px'
                    }}
                >
                    <div className="w-full h-full flex items-center justify-between" style={{ padding: '0 5%' }}>
                        <div className={`flex-1 max-w-[50%] ${currentSection >= 2 ? 'animate-slideInLeft' : 'opacity-0'}`}>
                            <h2 className="font-pretendard font-black mb-20"
                                style={{
                                    color: colors.text.WHITE,
                                    fontSize: 'clamp(70px, 9vw, 140px)',
                                    lineHeight: '1.15'
                                }}>
                                Get<br />
                                Started
                            </h2>

                            <div className="flex gap-12">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="hover:opacity-90 transition-all duration-200 flex items-center justify-center"
                                    style={{
                                        width: '304px',
                                        height: '73px',
                                        padding: '10px 20px',
                                        borderRadius: '20px',
                                        backgroundColor: '#166ADA',
                                        boxShadow: '0 0 10px 4px rgba(78, 204, 252, 0.30) inset',
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        color: '#FFFFFF'
                                    }}
                                >
                                    Sign up
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="hover:opacity-90 transition-all duration-200 flex items-center justify-center"
                                    style={{
                                        width: '304px',
                                        height: '73px',
                                        padding: '10px 20px',
                                        borderRadius: '20px',
                                        backgroundColor: '#166ADA',
                                        boxShadow: '0 0 10px 4px rgba(78, 204, 252, 0.30) inset',
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        color: '#FFFFFF'
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </div>

                        <div className={`flex-1 ${currentSection >= 2 ? 'animate-slideInRight' : 'opacity-0'} flex justify-center items-center`}>
                            <img
                                src="/logo.png"
                                alt="UCSI Logo"
                                className="w-[450px] h-[450px] object-contain"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
