import { useEffect, useState } from 'react';
import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';

async function fetchCities() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities/10`);
    const cities = await res.json();

    if (!res.ok) {
      throw new Error('Failed to fetch cities');
    }

    return cities;
  } catch (error) {
    console.error('Failed to fetch cities', error);
    return [
      { id: '1', name: 'Fallback City 1' },
      { id: '2', name: 'Fallback City 2' },
    ];
  }
}

interface ListaProps {
  initialCities: Array<ICity>;
}

export default function Lista({ initialCities }: Readonly<ListaProps>) {
  const [cities, setCities] = useState<Array<ICity>>(initialCities);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const updatedCities = await fetchCities();
      setCities(updatedCities);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de cidades</h2>

        <div data-list-container>
          {cities.map((city) => (
            <div data-list-item key={city.id}>
              {city.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const cities = await fetchCities();

  return {
    props: {
      initialCities: cities,
    },
    revalidate: 60,
  };
}
