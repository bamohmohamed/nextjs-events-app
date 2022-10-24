import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../dummy-data";

function AllEventsPage() {
  const allEvents = getAllEvents();
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

export default AllEventsPage;
