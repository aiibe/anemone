import React from "react";
import { ImageTable } from "./components/imageTable/imageTable";
import SearchImage from "./components/searchImage/search";
import { Logout } from "@/components/Logout";

export default function Page() {
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
}
