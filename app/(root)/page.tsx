// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import Hero from "@/components/Hero"; 
// import Header from "@/components/shared/header";
// import { getAllEvents } from "@/lib/actions/event.actions";

// // Define associations data
// const associations = [
//   {
//     name: "Google Developer Student Club, RCET BHILAI",
//     description:
//       "Developer Student Club RCET is inspired by the Google Developers' Family. The motive is to create a local ecosystem of Developers in and around the Campus and have fun doing it.",
//     logo: "/images/gdg-logo.jpg",
//   },
//   {
//     name: "GeeksforGeeks Student Chapter, RCET BHILAI",
//     description:
//       "GeeksforGeeks Student Chapters are university-based communities for students interested in Computer Science and other core tech competencies. Students grow their knowledge in a peer-to-peer learning environment.",
//     logo: "/images/gfg-logo.jpg",
//   },
//   {
//     name: "Microsoft Learn Student Ambassador, RCET BHILAI",
//     description:
//       "Microsoft Learn Student Ambassador is committed to empowering students through coding, development, and technology workshops. We aim to foster innovation with hands-on projects, hackathons, and API literacy sessions.",
//     logo: "/images/mlsa-logo.jpg",
//   },
// ];

// export default function HomePage() {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [events, setEvents] = useState([]); // State to store events

//   // Fetch Events on Mount
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const eventData = await getAllEvents({ query: "", category: "", page: 1, limit: 6 });
//         setEvents(eventData?.data || []);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!heroRef.current || !contentRef.current) return;
      
//       const scrollY = window.scrollY;
//       const heroHeight = heroRef.current.offsetHeight;
      
//       if (scrollY <= heroHeight) {
//         heroRef.current.style.transform = `translateY(0)`;
//         contentRef.current.style.transform = `translateY(${heroHeight}px)`;
//       } else {
//         heroRef.current.style.transform = `translateY(${scrollY - heroHeight}px)`;
//         contentRef.current.style.transform = `translateY(${heroHeight}px)`;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     if (contentRef.current && heroRef.current) {
//       contentRef.current.style.transform = `translateY(${heroRef.current.offsetHeight}px)`;
//     }
    
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="relative">
//       <div ref={heroRef} className="fixed top-0 left-0 w-full z-10">
//         <Header />
//         <div className="-mt-4"> 
//           <Hero />
//         </div>
//       </div>
      
//       {/* Scrollable Content */}
//       <div ref={contentRef} className="relative z-20 bg-white">
//         {/* About Section */}
//         <section id="aboutSection" className="bg-gray-100 text-gray-800 py-20 px-6 md:px-20">
//           <div className="max-w-4xl mx-auto text-left">
//             <h2 className="text-5xl font-extrabold">
//               About <span className="text-indigo-600">Infinity Coders</span>
//             </h2>
//             <div className="w-16 h-1 bg-indigo-600 mt-2"></div>

//             <p className="mt-6 text-lg leading-relaxed text-gray-700">
//               Infinity Coders is a dynamic coding community committed to fostering
//               a strong coding culture. Our mission is to{" "}
//               <strong>collaborate, innovate, and provide opportunities</strong>{" "}
//               for students passionate about{" "}
//               <strong>
//                 Web Development, Open Source, AI, Blockchain, and more
//               </strong>.
//               <br /><br />
//               We host <strong>hackathons, workshops, and coding events</strong> to
//               help students refine their skills and prepare for{" "}
//               <strong>real-world challenges</strong>. Our experienced mentors and
//               collaborative approach ensure that every coder gets the guidance
//               they need to succeed.
//               <br /><br />
//               Join us to <strong>create, build, and innovate together!</strong>
//             </p>

//             <div className="mt-8">
//               <Link
//                 href="/about"
//                 className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-full text-lg transition duration-300 hover:bg-indigo-600 hover:text-white"
//               >
//                 View More
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* Events Section */}
//         <section className="container mx-auto py-16 text-center">
//           <h2 className="text-4xl font-bold text-gray-800">Our Events</h2>
//           <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
//             Explore our latest events, workshops, and hackathons. Join us to
//             learn, build, and innovate!
//           </p>

//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {events.length > 0 ? (
//               events.map((event, index) => (
//                 <div key={index} className="bg-white shadow-md p-6 rounded-lg transition duration-300 hover:shadow-lg">
//                   <img src={event.image || "/images/default-event.jpg"} alt={event.name} className="w-full h-40 object-cover rounded-md" />
//                   <h3 className="text-xl font-bold mt-4">{event.name}</h3>
//                   <p className="text-gray-600 mt-2">{event.description}</p>
//                   <Link href={`/events/${event.id}`} className="mt-4 inline-block text-indigo-600 hover:underline">
//                     Learn More
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 mt-6">No upcoming events. Stay tuned!</p>
//             )}
//           </div>
//         </section>

//         {/* Associations Section */}
//         <section className="bg-gray-100 text-gray-800 py-20 px-6 md:px-20">
//           <div className="max-w-5xl mx-auto">
//             <h2 className="text-5xl font-extrabold text-center">
//               Our <span className="text-indigo-600">Associations</span>
//             </h2>
//             <div className="w-16 h-1 bg-indigo-600 mx-auto mt-2"></div>

//             <div className="mt-10 space-y-8">
//               {associations.map((association, index) => (
//                 <div key={index} className="flex items-center gap-6 p-6 rounded-lg shadow-lg bg-white transform transition-all duration-700 hover:scale-105">
//                   <div className="w-24 h-24 flex-shrink-0">
//                     <img src={association.logo} alt={association.name} className="w-full h-full object-contain rounded-full border-4 border-indigo-500 shadow-md" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-black">{association.name}</h3>
//                     <p className="text-gray-600 mt-2">{association.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <div className="h-screen"></div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Hero from "@/components/Hero";
import { CategoryFilter } from "@/components/shared/category-filter";
import { Collection } from "@/components/shared/collection";
import { Search } from "@/components/shared/search";
import { buttonVariants } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { cn } from "@/lib/utils";
import type { SearchParamProps } from "@/types";


// Define associations data
const associations = [
  {
    name: "Google Developer Student Club, RCET BHILAI",
    description:
      "Developer Student Club RCET is inspired by the Google Developers' Family. The motive is to create a local ecosystem of Developers in and around the Campus and have fun doing it.",
    logo: "/images/gdg-logo.jpg",
  },
  {
    name: "GeeksforGeeks Student Chapter, RCET BHILAI",
    description:
      "GeeksforGeeks Student Chapters are university-based communities for students interested in Computer Science and other core tech competencies. Students grow their knowledge in a peer-to-peer learning environment.",
    logo: "/images/gfg-logo.jpg",
  },
  {
    name: "Microsoft Learn Student Ambassador, RCET BHILAI",
    description:
      "Microsoft Learn Student Ambassador is committed to empowering students through coding, development, and technology workshops. We aim to foster innovation with hands-on projects, hackathons, and API literacy sessions.",
    logo: "/images/mlsa-logo.jpg",
  },
];

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
    <div className="relative">
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
        <div className="-mt-4"> 
          <Hero />
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="relative z-20 bg-white" style={{ transform: "translateY(100vh)" }}>
        {/* About Section */}
        <section id="aboutSection" className="bg-gray-100 text-gray-800 py-20 px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-left">
            <h2 className="text-5xl font-extrabold">
              About <span className="text-indigo-600">Infinity Coders</span>
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mt-2"></div>

            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Infinity Coders is a dynamic coding community committed to fostering
              a strong coding culture. Our mission is to{" "}
              <strong>collaborate, innovate, and provide opportunities</strong>{" "}
              for students passionate about{" "}
              <strong>
                Web Development, Open Source, AI, Blockchain, and more
              </strong>.
              <br /><br />
              We host <strong>hackathons, workshops, and coding events</strong> to
              help students refine their skills and prepare for{" "}
              <strong>real-world challenges</strong>. Our experienced mentors and
              collaborative approach ensure that every coder gets the guidance
              they need to succeed.
              <br /><br />
              Join us to <strong>create, build, and innovate together!</strong>
            </p>

            <div className="mt-8">
              <Link
                href="/about"
                className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-full text-lg transition duration-300 hover:bg-indigo-600 hover:text-white"
              >
                View More
              </Link>
            </div>
          </div>
        </section>

        {/* Events Section - Keeping Original Implementation */}
        <section
          id="projects"
          className="wrapper my-8 flex flex-col gap-8 md:gap-12 py-16"
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

        {/* Associations Section */}
        <section className="bg-gray-100 text-gray-800 py-20 px-6 md:px-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-extrabold text-center">
              Our <span className="text-indigo-600">Associations</span>
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-2"></div>

            <div className="mt-10 space-y-8">
              {associations.map((association, index) => (
                <div key={index} className="flex items-center gap-6 p-6 rounded-lg shadow-lg bg-white transform transition-all duration-700 hover:scale-105">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img src={association.logo} alt={association.name} className="w-full h-full object-contain rounded-full border-4 border-indigo-500 shadow-md" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">{association.name}</h3>
                    <p className="text-gray-600 mt-2">{association.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
   

        <div className="h-screen"></div>
  
      </div>

    </div>
  );
}