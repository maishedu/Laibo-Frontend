import twFocusClass from "@/utils/twFocusClass";
import React, { ButtonHTMLAttributes, FC } from "react";
import {  ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const NextBtn: FC<Props> = ({ className = "w-10 h-10 text-lg", ...args }) => {
  return (
    <button
      className={`NextBtn ${className} bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full inline-flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
      {...args}
    >
      {/* <i className="las la-angle-right"></i> */}
      <ChevronRightIcon className="h-7 w-7" />
    </button>
  );
};

export default NextBtn;