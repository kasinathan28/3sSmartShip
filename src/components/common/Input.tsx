import React from 'react';
import { Search } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  onSearch?: (value: string) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          "flex items-center bg-white rounded-xl border border-gray-200/80",
          "shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(0,0,0,0.06)]",
          "h-[40px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 focus-within:shadow-md overflow-hidden cursor-text",
          "w-[120px] px-3.5 focus-within:w-[260px]",
          className,
          containerClassName
        )}
        onClick={() => ref && 'current' in ref && ref.current?.focus()}
      >
        <Search
          className="text-gray-500 group-focus-within:text-blue-500 transition-colors flex-shrink-0 mr-2.5"
          size={18}
          strokeWidth={2}
        />
        <input
          ref={ref}
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-[15px] leading-none text-gray-900 placeholder-gray-500 focus:ring-0 p-0 h-full placeholder:text-gray-400 font-medium w-full"
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
