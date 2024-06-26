import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

export default async function CategoryList() {
  const categories = await db.category.findMany({});

  return (
    <div className="flex gap-3 overflow-x-scroll py-2 [-ms-overflow-style:none] [scrollbar-width:none] [`&::-webkit-scrollbar`]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
