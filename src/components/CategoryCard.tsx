
import { Link } from "react-router-dom";
import { Category } from "@/data/questionnaires";
import * as icons from "lucide-react";
import { Lungs } from "lucide-react"; // Explicitly import Lungs icon

const CategoryCard = ({ category }: { category: Category }) => {
  // Dynamically get the icon component
  let IconComponent;
  if (category.icon === "lungs") {
    IconComponent = Lungs;
  } else {
    IconComponent = (icons as any)[category.icon.charAt(0).toUpperCase() + category.icon.slice(1)];
  }

  return (
    <Link
      to={`/categorias/${category.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center group"
    >
      {IconComponent && (
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
          <IconComponent className="h-8 w-8 text-primary-600" />
        </div>
      )}
      <h3 className="font-semibold text-lg text-neutral-900 mb-2">{category.name}</h3>
      <p className="text-neutral-600 text-sm">{category.description}</p>
    </Link>
  );
};

export default CategoryCard;
