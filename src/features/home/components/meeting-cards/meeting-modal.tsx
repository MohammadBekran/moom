import Image from "next/image";

import ResponsiveModal from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
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
    <ResponsiveModal
      open={isOpen}
      className="flex flex-col gap-6 border-none py-9 px-6 text-white"
      background="bg-dark-1"
      onOpenChange={onClose}
    >
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
            <Image src={buttonIcon} alt="Button icon" width={13} height={13} />
          )}
          &nbsp;
          {buttonText}
        </Button>
      </div>
    </ResponsiveModal>
  );
};

export default MeetingModal;
