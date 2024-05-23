import { CategoryList } from "./_components/categories";
import { Header } from "./_components/header";
import { Banner } from "./_components/promo-banner";
import { Search } from "./_components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Banner
          imageUrl="/promo-banner-01.png"
          alt="Ate 30% de desconto em pizzas!"
        />
      </div>
    </>
  );
}
