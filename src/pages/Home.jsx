import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import WelcomeSection from '../components/WelcomeSection';
import HomeForm, { cardSchema } from '../components/HomeForm';

function Home() {
  const navigate = useNavigate()
  const [mobileView, setMobileView] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, ...formState }
  } = useForm({
    resolver: zodResolver(cardSchema),
  });

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onSubmit = (data) => {
    localStorage.setItem('formInputs', JSON.stringify(data));
    navigate('/Tasks');
  };

  return (
    <div className={`grid ${mobileView ? 'grid-cols-1' : 'grid-cols-2'} w-full h-screen font-poppins animate-fade`} style={{ overflow: mobileView ? 'hidden' : 'auto' }}>
      {!mobileView && <WelcomeSection mobileView={mobileView} />}
      <HomeForm
        onSubmit={handleSubmit(onSubmit)}
        mobileView={mobileView}
        errors={errors}
        register={register}
      />
    </div>
  );
}

export default Home;
