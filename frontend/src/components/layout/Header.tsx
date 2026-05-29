import { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { useDebounce } from "../../hooks/useDebounce";
import Image from "next/image";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);
  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Logotipo oficial da CaseCellShop"
            width={44}
            height={44}
            priority
            className="object-contain rounded-xl"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-gray-950 tracking-tighter">
              CaseCell<span className="text-blue-600">Shop</span>
            </span>
            <span className="text-xs text-gray-500 -mt-0.5">
              As melhores capinhas do Brasil
            </span>
          </div>
        </div>

        <Input
          icon
          type="search"
          placeholder="Procure por modelo (ex: iPhone 13)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </nav>
    </header>
  );
}
