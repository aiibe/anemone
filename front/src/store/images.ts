import React from "react";
import { create } from "zustand";

export interface DockerTag {
  version: string;
  size?: number;
}

export interface DockerImage {
  name: string;
  description?: string;
  tags: DockerTag[];
}

interface ImageStore {
  records: Record<string, DockerImage>;
  addRecord: (newImages: DockerImage[]) => void;
}

export const useImageStore = create<ImageStore>()((set) => ({
  records: {},
  addRecord: (newImages: DockerImage[]) => {
    set((prev) => ({
      records: {
        ...prev.records,
        ...newImages.reduce((acc, cur) => ({ ...acc, [cur.name]: cur }), {}),
      },
    }));
  },
}));

export const useImages = (names?: string[]) => {
  const records = useImageStore((state) => state.records);

  const images = React.useMemo(() => {
    if (!Object.keys(records).length) return [];
    if (names?.length) return names.map((name) => records[name]);
    return Object.values(records);
  }, [names, records]);

  return images;
};

export const useImageActions = () => {
  const addRecord = useImageStore((state) => state.addRecord);
  return { addRecord };
};
