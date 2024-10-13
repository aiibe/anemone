import { useAuthStore } from "@/store/auth";

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

export const getTags: (
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

interface TagMetadata {
  digest: string;
  mediaType: string;
  size: number;
}

interface TagDetails {
  config: TagMetadata;
  layers: TagMetadata[];
}

export const getDetails: (
  repo: string,
  tag: string
) => Promise<TagDetails> = async (repo: string, tag: string) => {
  const token = useAuthStore.getState().token;

  try {
    const response = await fetch(`api/v2/${repo}/manifests/${tag}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
        Accept: `application/vnd.docker.distribution.manifest.v2+json`,
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
