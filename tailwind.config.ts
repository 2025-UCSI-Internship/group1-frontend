import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'pretendard': [
          'Pretendard', // 우선순위 폰트
          '-apple-system', // 없다면 다음 시스템 폰트로
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Roboto',
          'Segoe UI',
          'Malgun Gothic',
          'sans-serif'
        ],
      },
      
      // 모든 폰트 웨이트 명시적 정의
      fontWeight: {
        'thin': '100',
        'extralight': '200', 
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
    },
  },
  plugins: [],
} satisfies Config