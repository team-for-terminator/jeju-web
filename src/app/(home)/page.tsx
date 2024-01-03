"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return <div className="p-4">홈페이지</div>;
}
