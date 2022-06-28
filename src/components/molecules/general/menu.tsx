import Router from "next/router";
import { MouseEventHandler, ReactNode } from "react";

export enum positionMenu {
  vertical = "VERTICAL",
  horizontal = "HORIZONTAL",
}

interface MenustructureNode {
  label: string;
  icon?: ReactNode;
  link?: string;
  disabled?: boolean;
  warning?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

interface MenuProps {
  position: positionMenu;
  structure: Array<MenustructureNode>;
}

export default function Menu(options: MenuProps) {
  const { position, structure } = options;
  return (
    <div>
      {structure.map((node) => {
        return (
          <div
            key={node.label}
            className={
              "grid grid-cols-[auto_1fr] my-3 fill-dark-grey " +
              (node.link || node.onClick ? "cursor-pointer" : "cursor-default")
            }
            onClick={
              node.onClick
                ? node.onClick
                : (_) => {
                    if (node.link) Router.push(node.link);
                  }
            }
          >
            <div
              className={
                "h-14 w-24 flex justify-center items-center " +
                (node.warning
                  ? "fill-secondary-color"
                  : Router.pathname.split("/")[1] ==
                    `${node.link}`.split("/")[1]
                  ? "fill-primary-color"
                  : "fill-inherit")
              }
            >
              {node.icon}
            </div>
            <h3
              className={
                "self-center " +
                (node.warning
                  ? "text-secondary-color"
                  : Router.pathname.split("/")[1] ==
                    `${node.link}`.split("/")[1]
                  ? "text-primary-color"
                  : "text-inherit")
              }
            >
              {node.label}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
