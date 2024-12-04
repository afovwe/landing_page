import { ServiceCard } from "../components";
import { useGetActiveServicesQuery } from "../state/api";
import Spinner from "../components/Spinner";

const Services = () => {
  const { data: servicesData, isLoading } = useGetActiveServicesQuery();

  if (isLoading) return <Spinner />;

  return (
    <section className='max-container flex justify-center flex-wrap gap-9'>
      {servicesData?.services.map((service) => (
        <ServiceCard key={service._id} {...service} />
      ))}
    </section>
  );
};

export default Services;
