import { useState } from 'react';
import { Button } from "../components";
import { useGetActiveSubscribeQuery } from "../state/api";
import Spinner from "../components/Spinner";

const Subscribe = () => {
  const { data: subscribeData, isLoading } = useGetActiveSubscribeQuery();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/subscribe/subscribe-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
      setEmail('');
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
    }
  };

  // Function to split title and highlight "Updates"
  const renderTitle = (title) => {
    if (!title) return null;
    
    const words = title.split(' ');
    const updatesIndex = words.findIndex(word => word.toLowerCase() === 'updates');
    
    if (updatesIndex !== -1) {
      return (
        <>
          {words.slice(0, updatesIndex).join(' ')}{' '}
          <span className='text-coral-red'>{words[updatesIndex]}</span>{' '}
          {words.slice(updatesIndex + 1).join(' ')}
        </>
      );
    }
    return title;
  };

  if (isLoading) return <Spinner />;

  return (
    <section
      id='contact-us'
      className='max-container flex justify-between items-center max-lg:flex-col gap-10'
    >
      <h3 className='text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold'>
        {subscribeData?.title ? 
          renderTitle(subscribeData.title) : 
          <>
            Sign Up for
            <span className='text-coral-red'> Updates </span>
            & Newsletter
          </>
        }
      </h3>

      <form onSubmit={handleSubmit} className='lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={subscribeData?.placeHolderText || "subscribe@nike.com"}
          className='input'
          required
        />
        <div className='flex max-sm:justify-end items-center max-sm:w-full'>
          <Button 
            label={subscribeData?.buttonText || "Sign Up"} 
            type="submit"
            fullWidth 
          />
        </div>
      </form>
      {message && (
        <p className='text-center text-coral-red mt-2'>{message}</p>
      )}
    </section>
  );
};

export default Subscribe;
