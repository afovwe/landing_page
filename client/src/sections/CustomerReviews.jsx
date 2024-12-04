import { star } from "../assets/icons";
import { useGetActiveCustomerReviewsQuery } from "../state/api";
import Spinner from "../components/Spinner";

const CustomerReviews = () => {
  const { data: reviewsData, isLoading } = useGetActiveCustomerReviewsQuery();

  // Function to split title
  const renderTitle = (title) => {
    if (!title) return null;
    
    const words = title.split(' ');
    const customerIndex = words.findIndex(word => word.toLowerCase() === 'customers');
    
    if (customerIndex !== -1) {
      return (
        <>
          {words.slice(0, customerIndex).join(' ')}{' '}
          <span className='text-coral-red'>{words[customerIndex]}</span>{' '}
          {words.slice(customerIndex + 1).join(' ')}
        </>
      );
    }
    return title;
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const numberOfStars = Math.round(rating);
    return [...Array(numberOfStars)].map((_, index) => (
      <img
        key={index}
        src={star}
        alt='rating star'
        width={24}
        height={24}
        className='object-contain m-0'
      />
    ));
  };

  if (isLoading) return <Spinner />;

  return (
    <section className='max-container'>
      <h3 className='font-palanquin text-center text-4xl font-bold'>
        {reviewsData?.title ? renderTitle(reviewsData.title) : 
          <>
            What Our
            <span className='text-coral-red'> Customers </span>
            Say?
          </>
        }
      </h3>

      <p className='m-auto mt-4 max-w-lg text-center info-text'>
        {reviewsData?.description}
      </p>

      <div className='mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14'>
        {reviewsData?.reviews.map((review) => (
          <div key={review._id} className='flex justify-center items-center flex-col'>
            <img
              src={review.imgURL}
              alt={review.customerName}
              className='rounded-full object-cover w-[120px] h-[120px]'
            />
            <div className='mt-6 flex justify-center items-center gap-2.5'>
              {renderStars(review.rating)}
            </div>
            <p className='mt-6 max-w-sm text-center info-text'>
              {review.feedback}
            </p>
            <p className='mt-3 font-palanquin text-3xl font-bold'>
              {review.customerName}
            </p>
            <p className='mt-2 font-montserrat text-slate-gray text-lg'>
              {review.designation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
