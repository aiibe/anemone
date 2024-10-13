import { Logout } from "@/features/auth/components/Logout";
import { ImageTable } from "@/features/images/components/imageTable/imageTable";
import { SearchImage } from "@/features/images/components/search/search";

export const Home = () => {
  return (
    <>
      {/* AppBar */}
      <div className="flex items-center justify-between mb-4">
        <div className=""></div>

        <div className="flex gap-2">
          <SearchImage />
          <Logout />
        </div>
      </div>

      <ImageTable />
    </>
  );
};
