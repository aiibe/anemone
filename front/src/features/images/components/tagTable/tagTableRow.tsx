import { TableCell, TableRow } from "@/components/ui/table";
import { formatBytes } from "@/utils/formatBytes";

import type { DockerTag } from "@/store/images";

type Props = DockerTag & {};

export const TagTableRow = (props: Props) => {
  const { version, size } = props;

  return (
    <TableRow>
      <TableCell>{version}</TableCell>
      <TableCell>{formatBytes(size || 0)}</TableCell>
    </TableRow>
  );
};
