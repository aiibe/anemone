import { getTag, getDigestDetails, MEDIA_TYPE } from "@/services/images";
import type { DockerTag } from "@/store/images";

export function sortTagsByVersion(
  tags: DockerTag[],
  ascending = false
): DockerTag[] {
  return tags
    .map((tag) => ({ ...tag, version: tag.name.slice(1) })) // Remove the leading 'v' from the version
    .sort((a, b) => {
      const versionA = a.version.split(".").map(Number);
      const versionB = b.version.split(".").map(Number);

      // Compare major, minor, and patch versions
      for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
        const numA = versionA[i] || 0; // Default to 0 if undefined
        const numB = versionB[i] || 0; // Default to 0 if undefined

        // Determine the comparison result based on the sorting order
        const comparison = numA - numB;
        if (comparison !== 0) {
          return ascending ? comparison : -comparison; // Adjust based on order
        }
      }

      return 0; // Versions are equal
    })
    .map((tag) => ({ ...tag, version: `v${tag.version}` })); // Add the leading 'v' back
}

type CommonDetails = (repo: string, tag: string) => Promise<DockerTag>;

export const getTagManifests: CommonDetails = async (
  repo: string,
  tagName: string
) => {
  const tagData = await getTag(repo, tagName);

  if (tagData.mediaType === MEDIA_TYPE.DOCKER) {
    return {
      type: "docker",
      name: tagName,
      manifests: [tagData],
    };
  }

  const ret: DockerTag = {
    type: "oci",
    name: tagName,
    manifests: [],
  };

  for (const manifest of tagData.manifests) {
    const digestData = await getDigestDetails(repo, manifest.digest);
    ret.manifests.push({ ...digestData, platform: manifest.platform });
  }

  return ret;
};
