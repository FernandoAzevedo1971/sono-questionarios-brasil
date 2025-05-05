
import { Link } from "react-router-dom";
import { categories, Category } from "@/data";
import { getCategoryQuestionnaires } from "@/data";
import { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Helper function to get the icon component by name
const getIconByName = (iconName: string): LucideIcon => {
  const icon = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;
  return icon || LucideIcons.FileText;
};

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = getIconByName(category.icon);
  const questionnairesCount = getCategoryQuestionnaires(category.id).length;

  return (
    <Link to={`/categorias/${category.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg border border-gray-100 hover:border-primary-100 h-full flex flex-col">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mr-4">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900">{category.name}</h3>
        </div>
        <p className="text-neutral-600 text-sm mb-4 flex-grow text-left">{category.description}</p>
        <div className="text-sm text-primary-600 font-medium">
          {questionnairesCount} questionário{questionnairesCount !== 1 ? 's' : ''}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
