
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function AllLetters() {
//   const [letters, setLetters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchLetters() {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/letters",
//           { signal: controller.signal }
//         );

//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error(data.message || "Unable to load letters.");
//         }

//         setLetters(data.letters);
//       } catch (err) {
//         if (err.name !== "AbortError") {
//           setError(err.message || "Unable to load letters.");
//         }
//       } finally {
//         if (!controller.signal.aborted) {
//           setLoading(false);
//         }
//       }
//     }

//     fetchLetters();

//     return () => controller.abort();
//   }, []);

//   return (
//     <main className="love-page min-h-screen px-4 py-8 text-white sm:px-6 sm:py-12">
//       <div className="mx-auto w-full max-w-5xl">
//         <Link
//           to="/"
//           className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-white/10"
//         >
//           <span aria-hidden="true">←</span> Home
//         </Link>

//         <header className="mx-auto my-8 max-w-xl text-center sm:my-10">
//           <div className="text-5xl sm:text-6xl" aria-hidden="true">
//             💌
//           </div>

//           <h1 className="mt-4 text-2xl font-bold leading-relaxed sm:text-4xl">
//             మన ప్రేమ లేఖలు ❤️
//           </h1>

//           <p className="mt-3 text-sm leading-7 text-rose-200/80 sm:text-base">
//             మనసులోని మాటలు... ఒక్కో అందమైన జ్ఞాపకం.
//           </p>

//           {!loading && !error && (
//             <p className="mt-3 text-xs text-rose-200/70">
//               {letters.length} {letters.length === 1 ? "letter" : "letters"}
//             </p>
//           )}
//         </header>

//         {loading && (
//           <div className="py-16 text-center">
//             <div className="animate-pulse text-4xl">💗</div>
//             <p className="mt-4 text-rose-100">
//               మన ప్రేమ లేఖలను తెరుస్తున్నాం...
//             </p>
//           </div>
//         )}

//         {error && (
//           <div
//             role="alert"
//             className="mx-auto max-w-lg rounded-2xl border border-rose-200/20 bg-white/10 p-6 text-center"
//           >
//             <p className="text-lg font-semibold">లేఖలను తెరవలేకపోయాం 💔</p>
//             <p className="mt-2 break-words text-sm text-rose-100/80">
//               {error}
//             </p>
//             <button
//               onClick={() => window.location.reload()}
//               className="love-button mt-5 rounded-full px-6 py-3 font-semibold"
//             >
//               మళ్ళీ ప్రయత్నించండి
//             </button>
//           </div>
//         )}

//         {!loading && !error && letters.length === 0 && (
//           <div className="mx-auto max-w-lg rounded-3xl border border-white/20 bg-white/10 p-7 text-center sm:p-10">
//             <div className="text-5xl">💌</div>
//             <h2 className="mt-4 text-xl font-bold">
//               ఇంకా లేఖలు లేవు 💗
//             </h2>
//             <p className="mt-3 text-sm leading-7 text-rose-100/80">
//               మొదటి ప్రేమ లేఖను ఇప్పుడే రాయండి.
//             </p>
//             <Link
//               to="/create"
//               className="love-button mt-6 inline-flex rounded-full px-6 py-3 font-semibold"
//             >
//               మొదటి లేఖ రాయండి ❤️
//             </Link>
//           </div>
//         )}

//         {!loading && !error && letters.length > 0 && (
//           <>
//             <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
//               {letters.map((letter) => (
//                 <article
//                   key={letter.shareId}
//                   className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.14] sm:p-6"
//                 >
//                   <div className="flex items-start gap-3">
//                     <span
//                       className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-300/15 text-2xl"
//                       aria-hidden="true"
//                     >
//                       💌
//                     </span>

//                     <div className="min-w-0 flex-1">
//                       <h2 className="break-words text-lg font-bold leading-7 text-rose-100 sm:text-xl">
//                         {letter.recipientName} కు
//                       </h2>

//                       {letter.createdAt && (
//                         <p className="mt-1 text-xs text-rose-200/60">
//                           {new Date(letter.createdAt).toLocaleDateString(
//                             "en-IN",
//                             {
//                               day: "numeric",
//                               month: "short",
//                               year: "numeric",
//                             }
//                           )}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="my-4 h-px bg-white/15" />

//                   <p className="min-w-0 flex-1 whitespace-pre-wrap break-words text-sm leading-7 text-white/90 [overflow-wrap:anywhere]">
//                     {letter.message.length > 110
//                       ? `${letter.message.slice(0, 110).trimEnd()}…`
//                       : letter.message}
//                   </p>

//                   <Link
//                     to={`/letter/${encodeURIComponent(letter.shareId)}`}
//                     className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-rose-200/50 px-4 py-3 text-center text-sm font-semibold text-rose-100 transition hover:border-rose-200 hover:bg-rose-200/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
//                   >
//                     Read More <span aria-hidden="true">❤️ →</span>
//                   </Link>
//                 </article>
//               ))}
//             </div>

//             <div className="mt-8 text-center sm:mt-10">
//               <Link
//                 to="/create"
//                 className="love-button inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 font-semibold text-white transition hover:scale-105"
//               >
//                 + కొత్త ప్రేమ లేఖ రాయండి 💕
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_URL}/api/letters`;

export default function AllLetters() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(true);
  const [error, setError] = useState("");

  // Restore access after refreshing the page.
  useEffect(() => {
    let cancelled = false;

    async function restoreLetters() {
      const wasUnlocked =
        sessionStorage.getItem("lettersUnlocked") === "true";
      const savedPassword =
        sessionStorage.getItem("lettersAccessPassword");

      if (!wasUnlocked || !savedPassword) {
        sessionStorage.removeItem("lettersUnlocked");
        sessionStorage.removeItem("lettersAccessPassword");
        if (!cancelled) setRestoring(false);
        return;
      }

      try {
        const response = await fetch(API_URL, {
          headers: {
            "x-letters-password": savedPassword,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          sessionStorage.removeItem("lettersUnlocked");
          sessionStorage.removeItem("lettersAccessPassword");

          if (!cancelled) {
            setUnlocked(false);
            setLetters([]);
          }
          return;
        }

        if (!cancelled) {
          setLetters(data.letters);
          setUnlocked(true);
        }
      } catch {
        if (!cancelled) {
          setError("లేఖలను లోడ్ చేయలేకపోయాం. మళ్ళీ ప్రయత్నించండి.");
        }
      } finally {
        if (!cancelled) setRestoring(false);
      }
    }

    restoreLetters();

    return () => {
      cancelled = true;
    };
  }, []);

  async function unlockLetters(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        headers: {
          "x-letters-password": password,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          response.status === 401
            ? "తప్పు పాస్‌వర్డ్. మళ్ళీ ప్రయత్నించండి."
            : data.message || "లేఖలను తెరవలేకపోయాం."
        );
      }

      // Remember access for this browser tab session.
      sessionStorage.setItem("lettersUnlocked", "true");
      sessionStorage.setItem("lettersAccessPassword", password);

      setLetters(data.letters);
      setUnlocked(true);
      setPassword("");
    } catch (err) {
      setError(err.message || "Server తో కనెక్ట్ కాలేకపోయాం.");
    } finally {
      setLoading(false);
    }
  }

  function lockLetters() {
    sessionStorage.removeItem("lettersUnlocked");
    sessionStorage.removeItem("lettersAccessPassword");

    setUnlocked(false);
    setLetters([]);
    setPassword("");
    setError("");
  }

  if (restoring) {
    return (
      <main className="love-page flex min-h-screen items-center justify-center px-4 text-white">
        <p className="text-center text-rose-100">
          💌 మన ప్రేమ లేఖలను తెరుస్తున్నాం...
        </p>
      </main>
    );
  }

  return (
    <main className="love-page min-h-screen px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-white/10"
          >
            🏠 Home
          </Link>

          {unlocked && (
            <button
              onClick={lockLetters}
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-white/10"
            >
              🔒 Lock Letters
            </button>
          )}
        </div>

        <header className="mx-auto my-8 max-w-xl text-center sm:my-10">
          <div className="text-5xl sm:text-6xl" aria-hidden="true">
            💌
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-relaxed sm:text-4xl">
            మన ప్రేమ లేఖలు ❤️
          </h1>

          <p className="mt-3 text-sm leading-7 text-rose-200/80 sm:text-base">
            మనసులోని మాటలు... ఒక్కో అందమైన జ్ఞాపకం.
          </p>
        </header>

        {!unlocked ? (
          <div className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm sm:p-9">
            <div className="text-center">
              <div className="text-4xl" aria-hidden="true">
                🔐
              </div>

              <h2 className="mt-4 text-xl font-bold sm:text-2xl">
                మన ప్రేమ లేఖల కోసం
              </h2>

              <p className="mt-3 text-sm leading-6 text-rose-100/80">
                మనకు మాత్రమే తెలిసిన పాస్‌వర్డ్‌ను నమోదు చేయండి.
              </p>
            </div>

            <form onSubmit={unlockLetters} className="mt-6">
              <label
                htmlFor="letters-password"
                className="mb-2 block text-sm font-medium text-rose-100"
              >
                Password
              </label>

              <input
                id="letters-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your shared password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-rose-100/40 focus:border-rose-300 focus:ring-2 focus:ring-rose-300/20"
              />

              {error && (
                <p role="alert" className="mt-3 break-words text-sm text-rose-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="love-button mt-5 flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "తెరుస్తున్నాం..." : "Unlock Our Letters ❤️"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <p className="mb-6 text-center text-xs text-rose-200/70">
              {letters.length} {letters.length === 1 ? "letter" : "letters"}
            </p>

            {letters.length === 0 ? (
              <div className="mx-auto max-w-lg rounded-3xl border border-white/20 bg-white/10 p-8 text-center">
                <div className="text-5xl">💗</div>

                <h2 className="mt-4 text-xl font-bold">
                  ఇంకా లేఖలు లేవు
                </h2>

                <Link
                  to="/create"
                  className="love-button mt-6 inline-flex rounded-full px-6 py-3 font-semibold"
                >
                  మొదటి లేఖ రాయండి ❤️
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                  {letters.map((letter) => (
                    <article
                      key={letter.shareId}
                      className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.14] sm:p-6"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-300/15 text-2xl"
                          aria-hidden="true"
                        >
                          💌
                        </span>

                        <div className="min-w-0 flex-1">
                          <h2 className="break-words text-lg font-bold leading-7 text-rose-100 sm:text-xl">
                            {letter.recipientName} కు
                          </h2>

                          {letter.createdAt && (
                            <p className="mt-1 text-xs text-rose-200/60">
                              {new Date(letter.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-3">
                        {letter.readAt ? (
                          <div className="flex flex-col gap-1 text-xs text-emerald-200">
                            <span className="font-semibold">
                              ✓✓ Read ❤️
                            </span>
                            <span className="text-emerald-100/70">
                              First opened:{" "}
                              {new Date(letter.readAt).toLocaleString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-xs text-rose-200/80">
                            ✉ Not read yet
                          </span>
                        )}
                      </div>

                      <div className="my-4 h-px bg-white/15" />

                      <p className="min-w-0 flex-1 whitespace-pre-wrap break-words text-sm leading-7 text-white/90 [overflow-wrap:anywhere]">
                        {letter.message.length > 110
                          ? `${letter.message.slice(0, 110).trimEnd()}…`
                          : letter.message}
                      </p>

                      <Link
                        to={`/letter/${encodeURIComponent(letter.shareId)}`}
                        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-rose-200/50 px-4 py-3 text-center text-sm font-semibold text-rose-100 transition hover:border-rose-200 hover:bg-rose-200/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
                      >
                        Read More ❤️ →
                      </Link>
                    </article>
                  ))}
                </div>

                <div className="mt-8 text-center sm:mt-10">
                  <Link
                    to="/create"
                    className="love-button inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 font-semibold text-white transition hover:scale-105"
                  >
                    + కొత్త ప్రేమ లేఖ రాయండి 💕
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}