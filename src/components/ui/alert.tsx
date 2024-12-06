import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface IAlertProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: IAlertProps) => {
  return (
    <section>
      <Card className="w-full max-w-[520px] border-none p-6 py-9 bg-dark-1 text-white">
        <CardContent>
          <div className="flex flex-col gap-3.5">
            {iconUrl && (
              <div className="flex justify-center items-center">
                <Image src={iconUrl} alt="Icon" width={72} height={72} />
              </div>
            )}
            <p className="text-center text-xl font-semibold">{title}</p>
          </div>
          <Button asChild className="bg-blue-1">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
