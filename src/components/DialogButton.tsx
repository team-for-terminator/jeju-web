import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const DialogButton = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>이미지 {index}</DialogTitle>
          <DialogDescription>확대 이미지 입니다.</DialogDescription>
        </DialogHeader>
        <div className="overflow-auto scrollbar">
          <div className="">
            <img src={"/images/converted_image.png"} alt="확대이미지"></img>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButton;
