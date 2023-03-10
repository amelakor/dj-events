import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events found</h3>}
      {events.map(event => {
        return <EventItem key={event.slug} event={event} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC`);
  const events = await res.json();
  return {
    props: { events: events.data.map(event => event.attributes) },
  };
}
