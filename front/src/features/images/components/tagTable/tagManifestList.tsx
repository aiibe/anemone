import type { TagDockerDetails } from "@/services/images";
import { DockerTag } from "@/store/images";
import { formatBytes } from "@/utils/formatBytes";

const getTotalSize = (layers: TagDockerDetails["layers"]) => {
  const total = layers.reduce((acc, layer) => acc + layer.size, 0);
  return formatBytes(total);
};

export const TagManifestList = (props: {
  manifests: DockerTag["manifests"];
}) => {
  const { manifests } = props;

  return (
    <>
      {manifests.map((manifest, index) => (
        <div key={index}>
          {getTotalSize(manifest.layers)}

          {manifest.platform && (
            <span className="ml-2 text-gray-500">
              ({manifest.platform?.architecture}, {manifest.platform?.os})
            </span>
          )}
        </div>
      ))}
    </>
  );
};
