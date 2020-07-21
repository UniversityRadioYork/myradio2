import React, { useState } from "react";
import { motion, MotionProps } from "framer-motion";
import classNames from "classnames";
import { Link, LinkProps } from "react-router-dom";

import "./Card.scss";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

interface CardButton {
  label: string;
  href?: string;
  action?: () => any;
  danger?: boolean;
  pending?: boolean;
}

interface CardBreadcrumb {
  label: string;
  location: LinkProps["to"];
}

interface CardProps extends MotionProps {
  title: string;
  subtitle?: string;
  buttons?: CardButton[];
  breadcrumbs?: CardBreadcrumb[];
  size?: "narrow" | "tall" | "giant";
  expandoLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card(props: CardProps) {
  const {
    title,
    subtitle,
    buttons,
    breadcrumbs,
    size,
    expandoLabel,
    children,
    className,
    ...motionProps
  } = props;
  const [expanded, setExpanded] = useState(false);

  const bodyVisible =
    (typeof children !== "undefined" && typeof expandoLabel === "undefined") ||
    expanded;

  const TitleType = size === "giant" ? motion.h1 : motion.div;

  return (
    <motion.div
      className={classNames([className, "myr-card", size || "narrow"])}
      {...motionProps}
    >
      {breadcrumbs &&
        breadcrumbs.map((crumb, idx) => (
          <div className="card-breadcrumbs">
            <Link
              key={"crumb" + idx}
              className="btn-link crumb"
              to={crumb.location}
            >
              {crumb.label}
            </Link>
            {idx !== breadcrumbs!.length - 1 && (
              <span className="crumb-separator">&gt;</span>
            )}
          </div>
        ))}
      <div className="card-header">
        <TitleType className="card-title">
          {title}
          {subtitle && (
            <>
              {" "}
              <motion.span className="card-subtitle">{subtitle}</motion.span>
            </>
          )}
        </TitleType>
        {buttons && (
          <div className="card-buttons">
            {buttons.map((btn) => {
              const ButtonType = !!btn.href ? motion.a : motion.div;
              return (
                <ButtonType
                  href={btn.href}
                  className={classNames([
                    "card-button",
                    btn.danger && "danger",
                    btn.pending && "pending",
                  ])}
                  onClick={() => btn.action && btn.action()}
                  target={
                    (btn.href?.indexOf("//") || "") > -1 ? "_blank" : undefined
                  }
                >
                  {btn.label}
                </ButtonType>
              );
            })}
          </div>
        )}
      </div>
      {expandoLabel && (
        <div className="expando" onClick={() => setExpanded(!expanded)}>
          <motion.span
            className="expando-icon-container"
            animate={{ rotate: expanded ? 180 : 0 }}
          >
            <Icon
              icon={IconNames.CHEVRON_DOWN}
              iconSize={Icon.SIZE_LARGE}
              className="expando-icon"
            />
          </motion.span>
          {expandoLabel}
        </div>
      )}
      {bodyVisible && <motion.div className="card-body">{children}</motion.div>}
    </motion.div>
  );
}
