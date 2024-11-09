import { useState, useEffect } from "react";
//import { shoes, statistics } from "../constants";
import { Button, ShoeCard } from "../components";
import { arrowRight } from "../assets/icons";
import { useGetActiveHeroSectionByIdQuery } from "../state/api"; //../../state/api
//import { data } from "autoprefixer";


const Hero = () => {
  // Fetch active hero section by ID
  const { data: activeHeroSectionData, isLoading: isLoadingActiveHeroSection, error: activeHeroSectionError } = useGetActiveHeroSectionByIdQuery("6729375c7e4f7cc1e010e7f8");
  console.log("Active Hero Section data on the landing page:", activeHeroSectionData);

  if (activeHeroSectionError) {
    console.error("Error fetching active hero section:", activeHeroSectionError);
  }

  // Set the initial bigShoe to the first one in sorted order
  const [bigShoe, setBigShoe] = useState(null);

useEffect(() => {
  if (activeHeroSectionData && activeHeroSectionData.shoes.length > 0) {
    const sortedShoes = [...activeHeroSectionData.shoes].sort((a, b) => a.order - b.order);
    setBigShoe(sortedShoes[0]);
  }
}, [activeHeroSectionData]);

  if (isLoadingActiveHeroSection || !activeHeroSectionData) {
    return <p>Loading...</p>;
  }

  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        {/* Seasonal Label */}
        <p className="text-xl font-montserrat text-coral-red">
          {activeHeroSectionData.seasonalLabel}
        </p>

        {/* Title, Make, and Type */}
        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
            {activeHeroSectionData.title}
          </span>
          <br />
          <span className="text-coral-red inline-block mt-3">
            {activeHeroSectionData.make}
          </span> {activeHeroSectionData.type}
        </h1>

        {/* Description */}
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          {activeHeroSectionData.description}
        </p>

        <Button label="Shop now" iconURL={arrowRight} />

        {/* Statistics */}
        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {activeHeroSectionData.statistics.map((stat) => (
            <div key={stat._id}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shoes */}
      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
        {bigShoe && (
          <img
            src={bigShoe.bigShoe}
            alt={bigShoe.alt} 
            width={610}
            height={502}
            className="object-contain relative z-10"
          />
        )}

        <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6">
  {[...activeHeroSectionData.shoes].sort((a, b) => a.order - b.order).map((shoe) => (
    <ShoeCard
      key={shoe._id}
      imgURL={shoe.thumbnail}
      alt={shoe.alt} 
      changeBigShoeImage={() => setBigShoe(shoe)}
      isActive={bigShoe && bigShoe.bigShoe === shoe.bigShoe}
    />
  ))}
</div>
      </div>
    </section>
  );
};

export default Hero;
