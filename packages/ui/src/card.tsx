import React from "react";

export const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="ui-border ui-p-6 ui-bg-white ui-rounded-xl">
      <h1 className="ui-text-xl ui-border-b ui-pb-2">{title}</h1>
      <p>{children}</p>
    </div>
  );
};
