import qs from 'qs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function SearchPage({ events = [] }) {
  const router = useRouter();
  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <h1>Search results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events found</h3>}
      {events.map(event => {
        return <EventItem key={event.slug} event={event} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          { name: { $contains: term } },
          { description: { $contains: term } },
          { slug: { $contains: term } },
          { venue: { $contains: term } },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/events?populate=*&${query}`);
  const events = await res.json();
  console.log(events);
  return {
    props: { events: events.data.map(event => event.attributes) },
  };
}
