import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events found</h3>}
      {events.map(event => {
        return <EventItem key={event.slug} event={event} />;
      })}
      {events.length > 0 && <Link href="/events">View All Events</Link>}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`
  );
  const events = await res.json();
  return {
    props: { events: events.data.map(event => event.attributes) },
  };
}
