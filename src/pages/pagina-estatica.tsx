import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';

interface ListaProps {
  cities: Array<ICity>;
}

export default function Lista({ cities }: ListaProps) {
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
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities/10`);
    const cities = await res.json();

    if (!res.ok) {
      throw new Error('Failed to fetch cities');
    }

    return {
      props: {
        cities,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        cities: [
          { id: '1', name: 'Fallback City 1' },
          { id: '2', name: 'Fallback City 2' },
        ],
      },
      revalidate: 60,
    };
  }
}
