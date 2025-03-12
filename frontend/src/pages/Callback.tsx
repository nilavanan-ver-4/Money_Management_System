import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error during callback:', error.message);
        navigate('/login');
      } else if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  return <div>Loading...</div>;
}