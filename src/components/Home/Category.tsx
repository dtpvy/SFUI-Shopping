import { useMemo } from "react";

import { Link } from "react-router-dom";

import { type Category } from "@/types/category";
import { generateCategoryColors } from "@/utils/generateCategoryColors";

type Props = {
  category: Category;
};

const Category = ({ category }: Props) => {
  const categoryColor = useMemo(() => {
    return generateCategoryColors(category.name);
  }, [category.name]);

  return (
    <Link
      to={{ pathname: "search", search: `?category=${category.slug}` }}
      className="flex flex-col items-center gap-3 shrink-0 pb-3"
    >
      {category.imgUrl ? (
        <img src={category.imgUrl} className="h-[200px] w-[200px] rounded-lg" />
      ) : (
        <div
          style={{
            background: categoryColor.backgroundColor,
            color: categoryColor.textColor,
          }}
          className="h-[200px] w-[200px] rounded-lg font-bold flex items-center justify-center"
        >
          {category.name}
        </div>
      )}
      <div>{category.name}</div>
    </Link>
  );
};

export default Category;
