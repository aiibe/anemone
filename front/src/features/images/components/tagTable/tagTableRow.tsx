import { TableCell, TableRow } from "@/components/ui/table";

import { TagManifestList } from "./tagManifestList";

import type { DockerTag } from "@/store/images";

export const TagTableRow = (props: DockerTag) => {
  const { name, type, manifests } = props;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>
        <TagManifestList manifests={manifests} />
      </TableCell>
    </TableRow>
  );
};
