
import { Link } from "react-router-dom";
import { Category } from "@/data/questionnaires";
import * as icons from "lucide-react";
// Import SVG path for lungs icon
const LungsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6.081 20c0-2.21 2.02-4 4.5-4s4.5 1.79 4.5 4"></path>
    <path d="M4 10c0-1.93 1.57-3.5 3.5-3.5"></path>
    <path d="M20 10c0-1.93-1.57-3.5-3.5-3.5"></path>
    <path d="M12 12a4 4 0 0 0-4-4c-.99 0-3 .16-3 2.5C5 13 6 13 6 14c0 .5 0 2 2 2s2 0 2-2"></path>
    <path d="M12 12a4 4 0 0 1 4-4c.99 0 3 .16 3 2.5 0 2.5-1 2.5-1 3.5 0 .5 0 2-2 2s-2 0-2-2"></path>
    <path d="M7 16c-2.5.5-5 .5-5-2C2 8 6 6.5 8 7"></path>
    <path d="M17 16c2.5.5 5 .5 5-2 0-6-4-7.5-6-7"></path>
    <path d="M8 7c0-3 1.5-5 4-5s4 2 4 5"></path>
  </svg>
);

const CategoryCard = ({ category }: { category: Category }) => {
  // Handle the special case for lungs icon or use the dynamically imported icon
  const getIconComponent = () => {
    if (category.icon === "lungs") {
      return LungsIcon;
    }
    
    // First character needs to be uppercase for the icons import
    const iconName = category.icon.charAt(0).toUpperCase() + category.icon.slice(1);
    return (icons as any)[iconName];
  };
  
  const IconComponent = getIconComponent();

  return (
    <Link
      to={`/categorias/${category.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-start text-left group"
    >
      <div className="flex items-center gap-3 w-full">
        {IconComponent && (
          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
            <IconComponent className="h-8 w-8 text-primary-600" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg text-neutral-900 mb-2">{category.name}</h3>
          <p className="text-neutral-600 text-sm">{category.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
