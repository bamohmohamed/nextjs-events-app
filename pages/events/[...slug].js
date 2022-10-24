import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

function FilteredEventsPage() {
  const router = useRouter();
  const filterDate = router.query.slug;
  if (!filterDate) {
    return <p className="center">Loading...</p>;
  }

  const year = +filterDate[0];
  const month = +filterDate[1];
  if (isNaN(year) || isNaN(month) || month < 0 || month > 12) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Invalid Filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year, month });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">No Events Found For The Given Filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
