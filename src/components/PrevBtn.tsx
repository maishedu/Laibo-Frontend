import twFocusClass from "@/utils/twFocusClass";
import React, { ButtonHTMLAttributes, FC } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PrevBtn: FC<Props> = ({ className = "w-10 h-10 text-lg", ...args }) => {
  return (
    <button
      className={`PrevBtn ${className} bg-white  border border-neutral-200  dark:hover:border-neutral-500 rounded-full inline-flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
      {...args}
    >
      {/* <i className="las la-angle-left"></i> */}
      <ChevronLeftIcon className="h-7 w-7" />
    </button>
  );
};

export default PrevBtn;
