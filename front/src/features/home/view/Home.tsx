import { Logout } from "@/features/auth/components/Logout";
import { ImageTable } from "@/features/images/components/imageTable/imageTable";
import { SearchImage } from "@/features/images/components/search/search";
import { Link } from "wouter";

export const Home = () => {
  return (
    <>
      {/* AppBar */}
      <div className="flex items-center justify-between mb-4">
        {/* Left */}
        <div>
          <Link href="/">
            <img src="/anemone.png" alt="logo" className="h-10" />
          </Link>
        </div>

        {/* Right */}
        <div className="flex gap-2">
          <SearchImage />
          <Logout />
        </div>
      </div>

      <ImageTable />
    </>
  );
};
