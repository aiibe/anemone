import { TableCell, TableRow } from "@/components/ui/table";
import { CopyToClipboard } from "./copyToClipboard";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  name: string;
  description?: string;
  isExpanded: boolean;
  toggleRow: (name: string) => void;
}

export const ImageTableRow = (props: Props) => {
  const { name, description, isExpanded, toggleRow } = props;

  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{description || ""}</TableCell>
      <TableCell>
        <CopyToClipboard imageName={name} />
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" onClick={() => toggleRow(name)}>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};
