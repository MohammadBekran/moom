import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface IMeetingModalProps {
  isOpen: boolean;
  title: string;
  image?: string;
  buttonText: string;
  buttonIcon?: string;
  className?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  onClose: () => void;
}

const MeetingModal = ({
  isOpen,
  title,
  image,
  buttonText,
  buttonIcon,
  className,
  buttonClassName,
  children,
  handleClick,
  onClose,
}: IMeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[520px] flex flex-col gap-6 border-none py9 px-6 bg-dark-1 text-white">
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
        <div className="space-y-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            className={cn(
              "w-full bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0",
              buttonClassName
            )}
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="Button icon"
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
