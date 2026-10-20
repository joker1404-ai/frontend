
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

export default function ReadLetter() {
  const { shareId } = useParams();
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const floatingHearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    delay: `${(i % 9) * 0.7}s`,
    duration: `${7 + (i % 5)}s`,
    size: `${14 + (i % 4) * 6}px`,
  }));

  useEffect(() => {
    const controller = new AbortController();

    async function loadLetter() {
      try {
        const response = await fetch(
        `${API_URL}/api/letters/${encodeURIComponent(shareId)}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Letter not found.");
        }

        setLetter(data.letter);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load this letter.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLetter();
    return () => controller.abort();
  }, [shareId]);

  if (loading) {
    return (
      <main className="love-page flex min-h-screen items-center justify-center p-6 text-center text-white">
        <p className="text-xl">నీ ప్రేమ లేఖ తెరుచుకుంటోంది... 💕</p>
      </main>
    );
  }

  if (error || !letter) {
    return (
      <main className="love-page flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center text-white">
        <h1 className="text-3xl font-bold">లేఖ దొరకలేదు 💔</h1>
        <p>{error || "This love letter could not be found."}</p>
        <Link to="/" className="text-rose-200 underline">
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="love-page relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      {/* Floating hearts in the background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {floatingHearts.map((heart) => (
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

      {/* Love letter */}
      <article className="letter-card reveal-in relative z-10 w-full max-w-lg rounded-3xl p-7 shadow-2xl sm:p-10">
        <div className="mb-5 text-center text-5xl" aria-hidden="true">
          💌
        </div>

        <p className="text-center text-sm tracking-widest text-rose-700">
          నా ప్రియమైన {letter.recipientName} కు
        </p>

        <h1 className="mt-4 text-center text-3xl font-bold leading-relaxed text-rose-950">
          నా మనసులోని మాట ❤️
        </h1>

        <div className="my-6 h-px bg-rose-200" />

        <div className="whitespace-pre-wrap break-words text-base leading-8 text-rose-950 sm:text-lg">
          {letter.message}
        </div>

        <div className="mt-8 text-center text-3xl" aria-hidden="true">
          💕 🌹 💕
        </div>

        <p className="mt-3 text-center text-sm text-rose-700">
          ఈ లేఖ నీకోసమే...
        </p>

        
        <div className="mt-8 text-center">
        <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-300 px-6 py-3 font-semibold text-rose-800 transition hover:bg-rose-100"
        >
            🏠 Home
        </Link>

        </div>
        <div className="text-center">
          <button
            onClick={() => navigate("/create")}
            className="love-button mt-9 rounded-full px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-200"
          >
            Write a Message ❤️
          </button>
        </div>

      </article>
    </main>
  );
}
