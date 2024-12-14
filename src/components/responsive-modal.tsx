import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { Options } from "nuqs";
import { useMedia } from "react-use";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

type TStringStatusOpenChange = (status: string) => void;
type TBooleanOpenChange = (
  value: boolean | ((old: boolean) => boolean | null) | null,
  options?: Options
) => Promise<URLSearchParams>;

interface IResponsiveModalProps {
  open: string | boolean | null;
  className?: string;
  background?: string;
  onOpenChange: TStringStatusOpenChange | TBooleanOpenChange;
  children: React.ReactNode;
}

const ResponsiveModal = ({
  open,
  className,
  background,
  children,
  onOpenChange,
}: IResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  const isStringStatusOpenChange = (
    fn: unknown
  ): fn is TStringStatusOpenChange =>
    typeof fn === "function" && fn.length === 1;

  const handleOpenChange = () => {
    if (isStringStatusOpenChange(onOpenChange)) onOpenChange("");
    else (onOpenChange as TBooleanOpenChange)(false);
  };

  const TitleVisuallyHidden = () => {
    return (
      <VisuallyHidden asChild>
        <DialogTitle />
      </VisuallyHidden>
    );
  };

  if (isDesktop)
    return (
      <Dialog open={!!open} onOpenChange={handleOpenChange}>
        <TitleVisuallyHidden />
        <DialogContent
          className={cn(
            "overflow-y-auto w-full max-w-[85vh] p-0 sm:max-w-lg hide-scrollbar",
            className,
            background
          )}
        >
          {children}
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={!!open} onOpenChange={handleOpenChange}>
      <DrawerContent className={cn("w-full border-none", background)}>
        <TitleVisuallyHidden />
        <div
          className={cn(
            "overflow-y-auto max-w-[85vh] hide-scrollbar",
            className,
            background
          )}
        >
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModal;
