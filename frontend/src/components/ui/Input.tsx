import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean;
}

export function Input({ icon, ...props }: InputProps) {
  return (
    <div className="relative w-full max-w-md">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        data-testid="search-input"
        {...props}
        className={`w-full px-4 py-2.5 ${icon ? "pl-10" : ""} bg-white border border-gray-200 rounded-full text-gray-900 
                   placeholder:text-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 
                   transition-all duration-150 outline-none shadow-inner text-sm`}
      />
    </div>
  );
}
