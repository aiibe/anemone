import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteImage } from "@/services/images";

type Props = {
  imageName: string;
  tagVersion: string;
};

export function DeleteTagButton(props: Props) {
  const { tagVersion, imageName } = props;

  async function handleDelete() {
    const resp = await deleteImage(imageName, tagVersion);
    console.log(resp);
  }

  return (
    <Button onClick={handleDelete} size="sm" variant="outline">
      <Trash size={16} className="hover:text-red-500" />
    </Button>
  );
}
