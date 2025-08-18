// 배경 색상 관리
const backgrouds = {
    LANDING: "#23242A",
    MAIN: "#EFF6FC",
    LEFT_PANNEL: "#FFFFFF",
    INPUTFIELD: "#F7F7F8",
    BG_MODAL: "#0000003c", // 모달창 실행 시, 메인페이지 배경
    MODAL: "#FFFFFF",



};

// 버튼 색상 관리
const buttons = {
    DEFAULT: "#166ADA",
    ACTIVE_PAGE: "#2C2C31",
    RENT: "#05A2FF",
    FILTER: "#166ADA",
    USING: "#677078",
    MODIFY: "#6BBC63",
    DELETE: "#DA1616",
    CANCLE: "#DA1616",



};

// 텍스트 색상 관리
const texts = {
    BLACK: "#000000",
    DESCRIPTION: "#677078",
    
};

// UI 요소
const ui = {
    DIVIDER: "#d4d4d4B3", // opacity: 70%
    HEADER_DIVIDER: "#6691DC",
}



// 객체 내보내기
export const colors = {
    bg: backgrouds,
    text: texts,
    button: buttons,
    ui,
} as const; // as const: 값이 변경되지 않음을 명시(tsx)