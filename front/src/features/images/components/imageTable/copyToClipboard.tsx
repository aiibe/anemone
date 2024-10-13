import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";

interface Props {
  imageName: string;
}

export const CopyToClipboard = (props: Props) => {
  const { imageName } = props;

  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied((prev) => ({ ...prev, [text]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [text]: false }));
      }, 2000);
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(`docker pull ${imageName}`)}
            className="flex items-center"
          >
            {copied[`docker pull ${imageName}`] ? (
              <>
                Copied! <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                docker pull {imageName} <Copy className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
