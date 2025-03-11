import Image from "next/image";
import Link from "next/link";

import { CategoryFilter } from "@/components/shared/category-filter";
import { Collection } from "@/components/shared/collection";
import { Search } from "@/components/shared/search";
import { buttonVariants } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { cn } from "@/lib/utils";
import type { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 bg-dotted-pattern bg-contain py-5 md:py-10 text-white">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Code. Create. Conquer: <span className="text-blue-400">Infinity</span> <span className="text-purple-400">Coders</span>
            </h1>
  
            <p className="p-regular-20 md:p-regular-24">
              Join our community of 500+ tech enthusiasts at the forefront of innovation. 
              Learn cutting-edge skills through hackathons, workshops, and collaborative projects.
            </p>
  
            <Link
              href="#projects"
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "default"
                }),
                "button w-full sm:w-fit bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              )}
            >
              Explore Events
            </Link>
          </div>
  
          <Image
            src="/assets/images/hero.png"
            alt="Infinity Coders Tech Team"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          />
        </div>
      </section>
  
      <section
        id="projects"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
         Events by <br /> <span className="text-blue-600">Infinity Coders</span>
        </h2>
  
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search placeholder="Search events by name or tech stack..." />
          <CategoryFilter categories={["Web Dev", "AI/ML", "Blockchain", "Mobile", "IoT", "Cybersecurity"]} />
        </div>
  
        <Collection
          data={events?.data}
          emptyTitle="No event found."
          emptyStateSubtext="Check back soon for new innovations."
          collectionType="All_Projects"
          limit={6}
          page={page}
          total={events?.totalPages}
        />
      </section>
    </>
  );
}
