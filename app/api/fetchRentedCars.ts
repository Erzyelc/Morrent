import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Props = {
  id: string;
};

async function fetchRentedCars({ id }: Props) {
  const supabase = createClientComponentClient();
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('borrower_id', id);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching car data from database:', error);
    return [];
  }
}

export default fetchRentedCars;
