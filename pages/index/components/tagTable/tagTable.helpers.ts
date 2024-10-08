import { DockerTag } from "@/store/images";

export function sortTagsByVersion(
  tags: DockerTag[],
  ascending = false
): DockerTag[] {
  return [...tags].sort((a, b) => {
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
  });
}
