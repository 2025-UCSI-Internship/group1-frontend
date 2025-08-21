import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { colors } from '../constants/colors';

export default function Landing() {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    // 스크롤 핸들러
    useEffect(() => {
        let touchStartY = 0;
        let isScrolling = false;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isScrolling) return;

            // 스크롤 감도 확인 (더 큰 값을 요구)
            if (Math.abs(e.deltaY) < 30) return;

            isScrolling = true;

            if (e.deltaY > 0 && currentSection < 2) {
                setCurrentSection(prev => prev + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                setCurrentSection(prev => prev - 1);
            }

            setTimeout(() => {
                isScrolling = false;
            }, 1200); // 더 긴 대기 시간
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling) return;

            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            if (Math.abs(deltaY) > 50) {
                isScrolling = true;

                if (deltaY > 0 && currentSection < 2) {
                    setCurrentSection(prev => prev + 1);
                } else if (deltaY < 0 && currentSection > 0) {
                    setCurrentSection(prev => prev - 1);
                }

                setTimeout(() => {
                    isScrolling = false;
                }, 1200); // 더 긴 대기 시간
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentSection]);

    // 섹션 전환 시 스크롤
    useEffect(() => {
        if (contentRef.current) {
            const sectionHeight = window.innerHeight - 72; // 헤더 높이 제외
            contentRef.current.style.transform = `translateY(-${currentSection * sectionHeight}px)`;
        }
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
                className="absolute top-[72px] left-0 right-0 bottom-0 w-full overflow-hidden"
            >
                <div
                    ref={contentRef}
                    className="w-full transition-transform duration-1000 ease-in-out"
                    style={{ willChange: 'transform' }}
                >
                    {/* Section 1: Hero - 피그마 디자인 정확한 비율 */}
                    <section
                        className="w-full"
                        style={{
                            height: 'calc(100vh - 72px)',
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
                        className="w-full flex items-center"
                        style={{
                            height: 'calc(100vh - 72px)',
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
                        className="w-full flex items-center"
                        style={{
                            height: 'calc(100vh - 72px)',
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

                                <div className="flex gap-8">
                                    <Button
                                        variant="default"
                                        size="custom"
                                        customWidth="280px"
                                        customHeight="70px"
                                        fontSize="24px"
                                        insetShadow={true}
                                        fontWeight="bold"
                                        onClick={() => navigate('/signup')}
                                    >
                                        Sign up
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="custom"
                                        customWidth="280px"
                                        customHeight="70px"
                                        fontSize="24px"
                                        insetShadow={true}
                                        fontWeight="bold"
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>

                            <div className={`flex-1 ${currentSection >= 2 ? 'animate-slideInRight' : 'opacity-0'} flex justify-center items-center`}>
                                <div className="relative">
                                    {/* 원형 배경 - 더 크게 */}
                                    <div
                                        className="flex items-center justify-center rounded-full"
                                        style={{
                                            backgroundColor: colors.bg.SKY,
                                            width: '450px',
                                            height: '450px'
                                        }}
                                    >
                                        {/* 태그 아이콘 */}
                                        <svg
                                            className="text-white"
                                            style={{
                                                width: '55%',
                                                height: '55%'
                                            }}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
                                        </svg>
                                    </div>

                                    {/* 회전하는 화살표 */}
                                    <svg
                                        className="absolute inset-0 w-full h-full animate-spin-slow scale-[1.25]"
                                        viewBox="0 0 100 100"
                                    >
                                        <defs>
                                            <marker
                                                id="arrowhead"
                                                markerWidth="10"
                                                markerHeight="10"
                                                refX="8"
                                                refY="3"
                                                orient="auto"
                                            >
                                                <polygon
                                                    points="0 0, 10 3, 0 6"
                                                    fill={colors.bg.SKY}
                                                />
                                            </marker>
                                        </defs>
                                        <path
                                            d="M 50,15 A 35,35 0 1,1 49.9,15"
                                            fill="none"
                                            stroke={colors.bg.SKY}
                                            strokeWidth="2"
                                            markerEnd="url(#arrowhead)"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
