"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { WobbleCard } from "@/components/ui/wobble-card";

// export  function Services() {
//   return (
//     <div className="h-[100vh] w-full flex items-center justify-center bg-white dark:bg-black">
//       <div className="w-[80vw] px-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-34 items-start">
//           {[
//             {
//               title: "Know More",
//               href: "https://twitter.com/",
//               h3: "Security Audit",
//               h1: "We create individual auditing strategies and dive deep into the business logic of the protocol. We audit smart contracts, SDKs, bridges, dApps, and other web3 platform components.",
//             },
//             {
//               title: "Learn More",
//               href: "https://example.com/",
//               h3: "Penetration Testing",
//               h1: "Comprehensive penetration tests for web3 apps, infrastructure, and integrations to surface risks before they become incidents.",
//             },
//             {
//               title: "Explore",
//               href: "https://example.org/",
//               h3: "Security Consulting",
//               h1: "Strategic security guidance, threat modeling, and secure design reviews to harden your protocol and UX.",
//             },
//             {
//               title: "Know More",
//               href: "https://twitter.com/",
//               h3: "Security Audit",
//               h1: "We create individual auditing strategies and dive deep into the business logic of the protocol. We audit smart contracts, SDKs, bridges, dApps, and other web3 platform components.",
//             },
//             {
//               title: "Learn More",
//               href: "https://example.com/",
//               h3: "Penetration Testing",
//               h1: "Comprehensive penetration tests for web3 apps, infrastructure, and integrations to surface risks before they become incidents.",
//             },
//             {
//               title: "Explore",
//               href: "https://example.org/",
//               h3: "Security Consulting",
//               h1: "Strategic security guidance, threat modeling, and secure design reviews to harden your protocol and UX.",
//             },
//           ].map((card, idx) => (
//             <PinContainer
//               key={card.h3 + idx}
//               title={card.title}
//               href={card.href}
//             >
//               <div className="flex flex-col items-center basis-full p-4 tracking-tight text-slate-600 dark:text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem]">
//                 <span className="align-center justify-center inline-block w-[25%] h-1 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500"></span>

//                 <h3 className="max-w-xs !py-2 !m-0 font-bold text-2xl text-slate-900 dark:text-slate-100">
//                   {card.h3}
//                 </h3>

//                 <div className="flex flex-1 w-full rounded-lg mt-8 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 items-center justify-center">
//                   <h1 className="p-4 text-xl text-center text-white">
//                     {card.h1}
//                   </h1>
//                 </div>
//               </div>
//             </PinContainer>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

const services = [
  {
    title: "Security Audit",
    description:
      "We create individual auditing strategies and dive deep into the business logic of the protocol. We audit smart contracts, SDKs, bridges, dApps, and other Web3 platform components.",
  },
  {
    title: "Penetration Testing",
    description:
      "Comprehensive penetration tests for Web3 apps, infrastructure, and integrations to surface risks before they become incidents.",
  },
  {
    title: "Security Consulting",
    description:
      "Strategic security guidance, threat modeling, and secure design reviews to harden your protocol and UX.",
  },
];

export default function SecurityCards() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...services, ...services].map((service, i) => (
          <WobbleCard
            key={i}
            containerClassName="h-[300px]"
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              {service.title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {service.description}
            </p>
          </WobbleCard>
        ))}
      </div>
    </div>
  );
}
