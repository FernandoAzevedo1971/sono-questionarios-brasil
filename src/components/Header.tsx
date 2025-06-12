
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/pesquisa?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-primary-700 font-bold text-xl">
            Portal de Questionários em Medicina do Sono – Dr. Fernando Azevedo
          </Link>
          <div className="md:hidden">
            {/* Mobile menu button would go here if needed */}
          </div>
        </div>
        <div className="mt-3 md:mt-0 flex items-center gap-3">
          <div className="w-full md:w-80">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar questionário..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
