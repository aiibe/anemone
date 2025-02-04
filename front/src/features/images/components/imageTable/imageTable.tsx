import React, { Fragment, useState } from "react";
import { useImageActions, useImages } from "@/store/images";
import { getImageList, getTagList } from "@/services/images";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TagTable } from "../tagTable/tagTable";
import { ImageTableRow } from "./imageTableRow";
import { useSearchStore } from "../search/store";
import { getTagManifests } from "../tagTable/tagTable.helpers";

export function ImageTable() {
  const images = useImages();
  const { addRecord } = useImageActions();
  const searchQuery = useSearchStore((state) => state.searchQuery);

  // Filter the images based on the search query
  const filteredImages = React.useMemo(() => {
    if (!searchQuery) return images;
    return images.filter((image) =>
      image.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [images, searchQuery]);

  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  /**
   * Fetch the list of images and add them to the store
   */
  React.useEffect(() => {
    async function loadImages() {
      const { repositories } = await getImageList();
      if (!repositories) return;
      addRecord(
        repositories.map((name) => ({
          name,
          tags: [],
        }))
      );
    }
    loadImages();
  }, [addRecord]);

  /**
   * Toggle the expansion of a row
   */
  const toggleRow = React.useCallback(
    async (imageName: string, isExpanded: boolean) => {
      setExpandedRows((prev) => ({ ...prev, [imageName]: !prev[imageName] }));

      if (isExpanded) return;
      const { name, tags } = await getTagList(imageName);

      const tagsWithSize = await Promise.all(
        tags.map(async (tag) => await getTagManifests(imageName, tag))
      );

      addRecord([{ name, tags: tagsWithSize }]);
    },
    [addRecord]
  );

  return (
    <div id="image-table" className="container">
      <h1 className="text-2xl font-bold mb-4">Images</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Pull Command</TableHead>
            <TableHead className="w-[100px]">Tags</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredImages.map((image) => {
            const isExpanded = Boolean(expandedRows[image.name]);

            return (
              <Fragment key={image.name}>
                <ImageTableRow
                  name={image.name}
                  description={image.description}
                  isExpanded={isExpanded}
                  toggleRow={() => toggleRow(image.name, isExpanded)}
                />

                {isExpanded && <TagTable imageName={image.name} />}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
