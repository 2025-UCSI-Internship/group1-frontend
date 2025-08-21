// MARK: - 홈 페이지 (자산 페이지로 리다이렉트)

import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // 홈 페이지 접근 시 자산 페이지로 리다이렉트
    navigate('/assets');
  }, [navigate]);

  return null;
}