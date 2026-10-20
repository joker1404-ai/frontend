
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";


// const hearts = Array.from({ length: 18 }, (_, i) => ({
//   id: i,
//   left: `${(i * 37 + 11) % 100}%`,
//   delay: `${(i % 9) * 0.65}s`,
//   duration: `${7 + (i % 5)}s`,
//   size: `${12 + (i % 4) * 7}px`,
// }));

// export default function Home() {
//   const [opened, setOpened] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <main className="love-page relative flex min-h-screen
//       items-center justify-center overflow-hidden px-5 py-12">

//       <div className="pointer-events-none absolute inset-0"
//         aria-hidden="true">
//         {hearts.map((heart) => (
//           <span
//             key={heart.id}
//             className="floating-heart absolute bottom-[-30px]"
//             style={{
//               left: heart.left,
//               animationDelay: heart.delay,
//               animationDuration: heart.duration,
//               fontSize: heart.size,
//             }}
//           >
//             ♥
//           </span>
//         ))}
//       </div>

//       <section className="relative z-10 mx-auto w-full max-w-lg
//         text-center text-white">

//         <p className="mb-6 text-xs uppercase tracking-[0.35em]
//           text-rose-200/80">
//           A little piece of my heart
//         </p>

//         {!opened ? (
//           <div className="reveal-in">
//             <div className="heart-glow mx-auto mb-8 flex h-36
//               w-36 items-center justify-center rounded-full">
//               <span className="heartbeat text-8xl text-rose-300"
//                 aria-hidden="true">
//                 ♥
//               </span>
//             </div>

//             <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
//               నీ కోసమే...
//             </h1>

//             <p className="mx-auto mt-5 max-w-sm text-base
//               leading-8 text-rose-100/80 sm:text-lg">
//               కొన్ని మాటలు మనసులోనే ఉండిపోతాయి...
//               ఈ రోజు వాటిని నీకు చెప్పాలనిపించింది.
//             </p>

//             <button
//               onClick={() => navigate("/create")}
//               className="love-button mt-9 rounded-full px-8 py-4
//                 font-semibold text-white transition duration-300
//                 hover:scale-105 focus-visible:outline-2
//                 focus-visible:outline-offset-4
//                 focus-visible:outline-rose-200"
//             >
//               నా ప్రేమ లేఖను తెరువు ❤️
//             </button>

//             <p className="mt-6 text-sm text-rose-200/60">
//               నీ కోసమే రాసిన కొన్ని మాటలు...
//             </p>
//           </div>
//         ) : (
//           <article className="letter-card reveal-in rounded-3xl
//             p-7 text-left shadow-2xl sm:p-10">

//               <div className="message-hearts" aria-hidden="true">
//                 <span>♥</span>
//                 <span>♡</span>
//                 <span>💕</span>
//                 <span>♥</span>
//                 <span>💗</span>
//                 <span>♡</span>
//               </div>

//             <div className="mb-5 text-center text-4xl"
//               aria-hidden="true">
//               💌
//             </div>

//             <p className="text-center text-sm tracking-widest
//               text-rose-700">
//               నా ప్రియమైన నీకు
//             </p>

//             <h2 className="mt-4 text-center text-3xl font-bold
//               leading-relaxed text-rose-950">
//               నా మనసులోని మాట ❤️
//             </h2>

//             <div className="my-6 h-px bg-rose-200" />

//             <div className="space-y-4 text-base leading-8
//               text-rose-950 sm:text-lg">
//               <p>ప్రియమైనా, ❤️</p>

//               <p>
//                 నీ నవ్వు నా రోజును అందంగా మార్చేస్తుంది.
//                 నీతో మాట్లాడే ప్రతి క్షణం నాకు ఎంతో ప్రత్యేకం.
//               </p>

//               <p>
//                 నీకు చెప్పాలనుకున్న మాటలు ఎన్నో ఉన్నాయి.
//                 వాటన్నింటికంటే ఒక చిన్న నిజం ముఖ్యం...
//                 నువ్వు నా జీవితంలో ఉండటం నాకు చాలా ఆనందం.
//               </p>

//               <p>
//                 నీతో కలిసి మరెన్నో అందమైన జ్ఞాపకాలు
//                 సృష్టించాలని నా మనసు కోరుకుంటోంది.
//               </p>

//               <p className="pt-3 text-right font-semibold">
//                 ఎప్పటికీ ప్రేమతో,<br />
//                 నీ సొంత మనిషి ❤️
//               </p>
//             </div>

//             <div className="mt-8 text-center">
//               <span className="text-3xl" aria-hidden="true">
//                 💕
//               </span>
//               <p className="mt-2 text-sm text-rose-700">
//                 ఈ లేఖ నీకోసమే...
//               </p>
//             </div>

//             <button
//               onClick={() => setOpened(false)}
//               className="mt-8 w-full rounded-full border
//                 border-rose-200 px-5 py-3 text-sm
//                 text-rose-800 transition hover:bg-rose-100"
//             >
//               మళ్ళీ చదవాలి ❤️
//             </button>
//           </article>
//         )}
//       </section>
//     </main>
//   );
// }


import { useNavigate } from "react-router-dom";

const hearts = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${(i % 9) * 0.65}s`,
  duration: `${7 + (i % 5)}s`,
  size: `${12 + (i % 4) * 7}px`,
}));

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="love-page relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart absolute bottom-[-30px]"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <section className="relative z-10 mx-auto w-full max-w-lg text-center text-white">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-rose-200/80">
          A little piece of my heart
        </p>

        <div className="reveal-in">
          <div className="heart-glow mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full">
            <span
              className="heartbeat text-8xl text-rose-300"
              aria-hidden="true"
            >
              ♥
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            నీ కోసమే...
          </h1>

          <p className="mx-auto mt-5 max-w-sm text-base leading-8 text-rose-100/80 sm:text-lg">
            ప్రతి రోజూ నా నుంచి నీకో చిన్న మెసేజ్ వస్తుంది… ❤️ నా మనసులో నీకోసం దాచుకున్న ప్రేమను, ప్రతిరోజూ ఒక్కో మాటగా నీకు చెప్పాలని… 💌 ఎందుకంటే, నా ప్రతి రోజులో నువ్వు ఒక అందమైన భాగం… నా ప్రతి మాటలోనూ నువ్వే ఉంటావు… ❤️‍🩹🥹
          </p>

          <button
            onClick={() => navigate("/create")}
            className="love-button mt-9 rounded-full px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-200"
          >
            Write a Message ❤️
          </button>

          
            <button
            onClick={() => navigate("/letters")}
            className="mt-4 rounded-full border border-rose-200/60 px-8 py-3 font-semibold text-rose-100 transition hover:bg-white/10 hover:scale-105"
            >
            అన్ని ప్రేమ లేఖలు చూడండి 💌
            </button>

        </div>
      </section>
    </main>
  );
}
