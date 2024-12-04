import { Button } from "../components";
import { arrowRight } from "../assets/icons";
import { useGetActiveSpecialOfferQuery } from "../state/api";
import Spinner from "../components/Spinner";

const SpecialOffer = () => {
  const { data: specialOfferData, isLoading } = useGetActiveSpecialOfferQuery();

  // Function to split title and highlight first word
  const renderTitle = (title) => {
    if (!title) return null;
    
    const words = title.split(' ');
    const firstWord = words[0];
    const remainingWords = words.slice(1).join(' ');

    return (
      <h2 className='text-4xl font-palanquin font-bold'>
        <span className='text-coral-red'>{firstWord} </span>
        {remainingWords}
      </h2>
    );
  };

  // Function to split description into sentences
  const renderDescription = (description) => {
    if (!description) return null;
    
    // Split by period followed by space or end of string
    const sentences = description.split(/\.(?:\s|$)/).filter(Boolean);
    
    return sentences.map((sentence, index) => (
      <p key={index} className='mt-4 info-text'>
        {sentence.trim()}.
      </p>
    ));
  };

  if (isLoading) return <Spinner />;

  return (
    <section className='flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container'>
      <div className='flex-1'>
        <img
          src={specialOfferData?.imgURL}
          alt='Special offer'
          width={773}
          height={687}
          className='object-contain w-full'
        />
      </div>

      <div className='flex flex-1 flex-col'>
        {renderTitle(specialOfferData?.title)}
        
        {renderDescription(specialOfferData?.description)}

        <div className='mt-11 flex flex-wrap gap-4'>
          <Button 
            label={specialOfferData?.buttonText || 'Shop now'} 
            iconURL={arrowRight}
          />
          <Button 
            label='Learn more'
            backgroundColor='bg-white'
            borderColor='border-slate-gray'
            textColor='text-slate-gray'
          />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
