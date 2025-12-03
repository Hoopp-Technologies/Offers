import { useGetTopCategories } from "@/services/products/queries";
import { useNavigate } from "react-router-dom";
import useFilterStore from "@/store/filter";

const HomeCategories = () => {
  const { data: categories } = useGetTopCategories();
  const navigate = useNavigate();
  const { setCategory, setIsApplied } = useFilterStore();

  const handleCategoryClick = (category: string) => {
    setCategory(category);
    setIsApplied(true);
    navigate("/products");
  };

  return (
    <div className="container mx-auto mb-16">
      <div className="bg-white flex items-center justify-center gap-9 py-6 rounded-lg px-5">
        {categories?.map((category) => (
          <div
            key={category}
            className="text-lg text-center cursor-pointer hover:text-[#F15822] transition-colors"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
