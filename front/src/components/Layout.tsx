import { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div id="layout" className="flex max-w-5xl m-auto">
      <div className="p-5 pb-12 min-h-screen m-auto">{children}</div>
    </div>
  );
};
