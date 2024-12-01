import { useGetPopularProductsQuery } from "../state/api";
import { PopularProductCard } from "../components";
import Spinner from "../components/Spinner";

const PopularProducts = () => {
  const { data: popularProductsData, isLoading } = useGetPopularProductsQuery();

  if (isLoading) return <Spinner />;

  return (
    <section id='products' className='max-container max-sm:mt-12'>
      <div className='flex flex-col justify-start gap-5'>
        <h2 className='text-4xl font-palanquin font-bold'>
          {popularProductsData?.title || (
            <>Our <span className='text-coral-red'>Popular</span> Products</>
          )}
        </h2>
        <p className='lg:max-w-lg mt-2 font-montserrat text-slate-gray'>
          {popularProductsData?.description || 
            "Experience top-notch quality and style with our sought-after selections. Discover a world of comfort, design, and value"
          }
        </p>
      </div>

      <div className='mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14'>
        {popularProductsData?.products?.map((product) => (
          <PopularProductCard key={product._id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
