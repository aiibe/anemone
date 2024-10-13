import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TagTableRow } from "./tagTableRow";

import { useImageStore } from "@/store/images";
import { sortTagsByVersion } from "./tagTable.helpers";

interface Props {
  imageName: string;
}

export const TagTable = (props: Props) => {
  const { imageName } = props;

  const records = useImageStore((state) => state.records);
  const sortTags = sortTagsByVersion(records[imageName].tags || []);

  return (
    <TableRow>
      <TableCell colSpan={4} className="bg-muted/50 p-0">
        <Table className="ml-4">
          <TableHeader>
            <TableRow>
              <TableHead>Tag Version</TableHead>
              <TableHead>Size</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortTags.map((tag) => (
              <TagTableRow key={tag.version} {...tag} />
            ))}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
};
