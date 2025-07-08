import { useAuthStore } from "@/store/auth";

/**
 * Get a list of repositories/images
 */
export const getImageList: () => Promise<{
  repositories: string[];
}> = async () => {
  const token = useAuthStore.getState().token;

  try {
    const response = await fetch("api/v2/_catalog", {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
        Accept: `application/vnd.docker.distribution.manifest.v2+json`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch catalog");
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

/**
 * Get a list of tags for a given repository/image
 */
export const getTagList: (
  repo: string
) => Promise<{ name: string; tags: string[] }> = async (repo: string) => {
  const token = useAuthStore.getState().token;

  try {
    const response = await fetch(`api/v2/${repo}/tags/list`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
        Accept: `application/vnd.docker.distribution.manifest.v2+json`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch tags");
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export enum MEDIA_TYPE {
  OCI = "application/vnd.oci.image.index.v1+json",
  DOCKER = "application/vnd.docker.distribution.manifest.v2+json",
}

interface TagCommonDetails {
  schemaVersion: number;
  mediaType: MEDIA_TYPE;
}

interface TagMetadata {
  digest: string;
  mediaType: MEDIA_TYPE;
  size: number;
}

export interface TagDockerDetails extends TagCommonDetails {
  config: TagMetadata;
  layers: TagMetadata[];
}

interface TagOCIDetails extends TagCommonDetails {
  manifests: (TagMetadata & {
    platform?: {
      architecture: string;
      os: string;
    };
  })[];
}

/**
 * Get details for a given tag
 */
export const getTag: (
  repo: string,
  tag: string
) => Promise<TagDockerDetails & TagOCIDetails> = async (
  repo: string,
  tag: string
) => {
  const token = useAuthStore.getState().token;

  try {
    const response = await fetch(`api/v2/${repo}/manifests/${tag}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
        Accept: `${MEDIA_TYPE.DOCKER}, ${MEDIA_TYPE.OCI}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch details");
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getDigestDetails: (
  repo: string,
  digest: string
) => Promise<TagDockerDetails> = async (repo: string, digest: string) => {
  const token = useAuthStore.getState().token;

  try {
    const response = await fetch(`api/v2/${repo}/manifests/${digest}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
        Accept: `application/vnd.oci.image.manifest.v1+json`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch details");
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

// Delete image by its tag
export const deleteImage = async (repo: string, tag: string) => {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(`api/v2/${repo}/manifests/${tag}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${token}`,
        Accept: `${MEDIA_TYPE.DOCKER}, ${MEDIA_TYPE.OCI}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to delete image");
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};
