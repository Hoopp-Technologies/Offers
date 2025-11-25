import { useGetTopCategories } from "@/services/products/queries";

const HomeCategories = () => {
  const { data: categories } = useGetTopCategories();
  console.log(categories);
  return (
    <div className="container mx-auto mb-16">
      <div className="bg-white flex items-center justify-center gap-9 py-6 rounded-lg">
        {categories?.map((category) => (
          <div key={category} className="text-lg">
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
