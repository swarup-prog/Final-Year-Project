import React, { MouseEventHandler } from "react";

export  type InputProps = {
  type: string; 
  value: string;
  name: string;
  label: string;
  style?: React.CSSProperties; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
  isDisabled?: boolean;
  type?: "button" | "submit";
  title: string; 
  styles?: React.CSSProperties;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}