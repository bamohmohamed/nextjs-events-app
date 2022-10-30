import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../helpers/api-util";

function AllEventsPage(props) {
  const { allEvents } = props;
  const router = useRouter();

  function filterEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onFilter={filterEventHandler} />
      <EventList events={allEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      allEvents,
    },
    revalidate: 30,
  };
}

export default AllEventsPage;
