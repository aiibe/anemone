import { TableCell } from "@/components/ui/table";
import { DeleteTagButton } from "./tagActions/deleteTagButton";

type Props = {
  imageName: string;
  tagVersion: string;
};

export function TagActionCell(props: Props) {
  const { tagVersion, imageName } = props;

  return (
    <TableCell className="flex items-center gap-2">
      <DeleteTagButton imageName={imageName} tagVersion={tagVersion} />
    </TableCell>
  );
}
