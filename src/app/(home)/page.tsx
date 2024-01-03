"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaMapLocationDot } from "react-icons/fa6";

export default function Page() {
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="hover:opacity-80">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <FaMapLocationDot />
              </div>
              <div>지도</div>
            </CardTitle>
            <CardDescription>
              제주도 위성사진을 이용한 파노라마 지도
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            <div></div>
            <Button
              onClick={() => {
                router.push("/map");
              }}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
