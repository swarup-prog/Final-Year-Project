import React, {  MouseEventHandler } from "react";

export  interface InputProps  {
  type: string; 
  value: string;
  name: string;
  label: string;
  style?: React.CSSProperties; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface ButtonProps {
  isDisabled?: boolean;
  type?: "button" | "submit";
  title: string; 
  styles?: React.CSSProperties;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode
}

export interface UserData {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
}