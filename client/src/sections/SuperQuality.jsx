import { Button } from "../components";
import { useGetActiveSuperQualityQuery } from "../state/api";
import Spinner from "../components/Spinner";

const SuperQuality = () => {
  const { data: superQualityData, isLoading } = useGetActiveSuperQualityQuery();

  // Function to split description into two paragraphs
  const splitDescription = (description) => {
    if (!description) return { firstPart: "", secondPart: "" };
    const parts = description.split('.');
    return {
      firstPart: parts[0] + '.',
      secondPart: parts.slice(1).join('.').trim()
    };
  };

  // Split the description
  const { firstPart, secondPart } = splitDescription(superQualityData?.description);

  if (isLoading) return <Spinner />;

  return (
    <section
      id='about-us'
      className='flex justify-between items-center max-lg:flex-col gap-10 w-full max-container'
    >
      <div className='flex flex-1 flex-col'>
        <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold'>
          We Provide You
          <span className='text-coral-red'> Super </span>
          <span className='text-coral-red'>Quality </span> Shoes
        </h2>
        <p className='mt-4 lg:max-w-lg info-text'>
          {firstPart}
        </p>
        <p className='mt-6 lg:max-w-lg info-text'>
          {secondPart}
        </p>
        <div className='mt-11'>
          <Button label='View details' />
        </div>
      </div>

      <div className='flex-1 flex justify-center items-center'>
        <img
          src={superQualityData?.src}
          alt='product detail'
          width={570}
          height={522}
          className='object-contain'
        />
      </div>
    </section>
  );
};

export default SuperQuality;
