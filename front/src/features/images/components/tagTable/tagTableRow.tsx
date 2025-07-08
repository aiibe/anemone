import { TableCell, TableRow } from "@/components/ui/table";

import { TagManifestList } from "./tagManifestList";
import { TagActionCell } from "./tagActionsCell";

import type { DockerTag } from "@/store/images";

type Props = DockerTag & {
  imageName: string;
};

export const TagTableRow = (props: Props) => {
  const { name, type, manifests, imageName } = props;

  return (
    <TableRow>
      {/* Version */}
      <TableCell>{name}</TableCell>

      {/* Type */}
      <TableCell>{type}</TableCell>

      {/* Manifests */}
      <TableCell>
        <TagManifestList manifests={manifests} />
      </TableCell>

      {/* Actions */}
      <TagActionCell imageName={imageName} tagVersion={name} />
    </TableRow>
  );
};
