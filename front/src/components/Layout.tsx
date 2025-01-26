import { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div id="layout" className="container mx-auto">
      <div id="layout-content" className="p-5 pb-12 ">
        {children}
      </div>
    </div>
  );
};
