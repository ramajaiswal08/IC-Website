"use client";

import { EventForm } from "@/components/shared/event-form";
import { useAuth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { userId } = useAuth(); // ✅ Correct way to get userId in a client component

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId || ""} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
