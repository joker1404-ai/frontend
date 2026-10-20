
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function CreateLetter() {
//   const [recipientName, setRecipientName] = useState("");
//   const [message, setMessage] = useState("");
//   const [shareUrl, setShareUrl] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(event) {
//     event.preventDefault();
//     setError("");
//     setShareUrl("");
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://10.237.43.137:5000/api/letters",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             recipientName,
//             message,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Could not save the letter.");
//       }

//       const url = `${window.location.origin}/letter/${data.letter.shareId}`;
//       setShareUrl(url);
//     } catch (err) {
//       setError(
//         err.message === "Failed to fetch"
//           ? "Cannot connect to the backend. Check that your server is running."
//           : err.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function copyLink() {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       alert("Love letter link copied! ❤️");
//     } catch {
//       setError("Copy failed. Please select and copy the link manually.");
//     }
//   }

//   return (
//     <main className="love-page flex min-h-screen items-center justify-center px-5 py-12">
//       <section className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-7 text-white shadow-2xl backdrop-blur-md sm:p-10">
//         <p className="text-center text-sm tracking-[0.25em] text-rose-200">
//           YOUR LITTLE LOVE STORY
//         </p>

//         <h1 className="mt-4 text-center text-3xl font-bold">
//           Create a Love Letter 💌
//         </h1>

//         <p className="mt-3 text-center leading-7 text-rose-100">
//           Write something beautiful, straight from your heart.
//         </p>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-5">
//           <div>
//             <label htmlFor="recipient" className="mb-2 block">
//               Recipient's name
//             </label>
//             <input
//               id="recipient"
//               value={recipientName}
//               onChange={(event) => setRecipientName(event.target.value)}
//               maxLength={100}
//               required
//               placeholder="Enter their name"
//               className="w-full rounded-xl border border-rose-200/30 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-rose-100/50 focus:border-rose-300"
//             />
//           </div>

//           <div>
//             <label htmlFor="message" className="mb-2 block">
//               Your love message
//             </label>
//             <textarea
//               id="message"
//               value={message}
//               onChange={(event) => setMessage(event.target.value)}
//               maxLength={10000}
//               required
//               rows={8}
//               placeholder="నీ మనసులోని మాట ఇక్కడ రాయండి... ❤️"
//               className="w-full resize-y rounded-xl border border-rose-200/30 bg-black/20 px-4 py-3 leading-7 text-white outline-none placeholder:text-rose-100/50 focus:border-rose-300"
//             />
//             <p className="mt-1 text-right text-xs text-rose-100/70">
//               {message.length}/10000
//             </p>
//           </div>

//           {error && (
//             <p role="alert" className="rounded-lg bg-red-950/50 p-3 text-sm text-rose-100">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="love-button w-full rounded-full px-6 py-4 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Saving your letter..." : "Save My Love Letter ❤️"}
//           </button>
//         </form>

//         {shareUrl && (
//           <div className="mt-6 rounded-2xl border border-rose-200/30 bg-black/20 p-4">
//             <h2 className="font-semibold text-rose-200">
//               Your letter has been saved! 💕
//             </h2>
//             <p className="mt-3 break-all text-sm">{shareUrl}</p>
//             <button
//               type="button"
//               onClick={copyLink}
//               className="mt-4 w-full rounded-full bg-rose-200 px-4 py-3 font-semibold text-rose-950 hover:bg-rose-100"
//             >
//               Copy link
//             </button>
//             <p className="mt-3 text-xs leading-5 text-rose-100/70">
//               The recipient page will be connected in our next step.
//             </p>
//           </div>
//         )}

//         <p className="mt-7 text-center text-sm">
//           <Link to="/" className="text-rose-200 underline">
//             ← Back to the homepage
//           </Link>
//         </p>
//       </section>
//     </main>
//   );
// }



import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function CreateLetter() {
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setShareUrl("");
    setCopied(false);
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/letters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipientName,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not save the letter.");
      }

      const url = `${window.location.origin}/letter/${encodeURIComponent(
        data.letter.shareId
      )}`;

      setShareUrl(url);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Check that your server is running and your phone can reach your laptop."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!shareUrl) return;

    setError("");
    setCopied(false);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "0";
        textarea.style.top = "0";
        textarea.style.width = "1px";
        textarea.style.height = "1px";
        textarea.style.padding = "0";
        textarea.style.border = "0";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        const success = document.execCommand("copy");
        textarea.remove();

        if (!success) {
          throw new Error("Automatic copy is unavailable.");
        }
      }

      setCopied(true);
    } catch {
      // Allow the user to copy manually if the browser blocks clipboard access.
      window.prompt("Copy your love letter link:", shareUrl);
    }
  }

  async function shareLink() {
    if (!shareUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "A Love Letter for You ❤️",
          text: "Someone has written you a special love letter 💌",
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Sharing failed. Please use Copy Link instead.");
        }
      }
    } else {
      await copyLink();
    }
  }

  return (
    <main className="love-page flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-7 text-white shadow-2xl backdrop-blur-md sm:p-10">
        <p className="text-center text-sm tracking-[0.25em] text-rose-200">
          YOUR LITTLE LOVE STORY
        </p>

        <h1 className="mt-4 text-center text-3xl font-bold">
          Create a Love Letter 💌
        </h1>

        <p className="mt-3 text-center leading-7 text-rose-100">
          Write something beautiful, straight from your heart.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="recipient" className="mb-2 block">
              Recipient's name
            </label>
            <input
              id="recipient"
              value={recipientName}
              onChange={(event) => setRecipientName(event.target.value)}
              maxLength={100}
              required
              placeholder="Enter their name"
              className="w-full rounded-xl border border-rose-200/30 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-rose-100/50 focus:border-rose-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block">
              Your love message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={10000}
              required
              rows={8}
              placeholder="నీ మనసులోని మాట ఇక్కడ రాయండి... ❤️"
              className="w-full resize-y rounded-xl border border-rose-200/30 bg-black/20 px-4 py-3 leading-7 text-white outline-none placeholder:text-rose-100/50 focus:border-rose-300"
            />
            <p className="mt-1 text-right text-xs text-rose-100/70">
              {message.length}/10000
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-950/50 p-3 text-sm text-rose-100"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="love-button w-full rounded-full px-6 py-4 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving your letter..." : "Save My Love Letter ❤️"}
          </button>
        </form>

        {shareUrl && (
          <div className="mt-6 rounded-2xl border border-rose-200/30 bg-black/20 p-4">
            <h2 className="font-semibold text-rose-200">
              Your letter has been saved! 💕
            </h2>

            <p className="mt-3 break-all text-sm">{shareUrl}</p>

            <button
              type="button"
              onClick={copyLink}
              className="mt-4 w-full rounded-full bg-rose-200 px-4 py-3 font-semibold text-rose-950 hover:bg-rose-100"
            >
              {copied ? "✓ Link Copied! ❤️" : "📋 Copy Link"}
            </button>

            {/* <button
              type="button"
              onClick={shareLink}
              className="mt-3 w-full rounded-full border border-rose-200/50 px-4 py-3 font-semibold text-rose-100 hover:bg-rose-200/10"
            >
              📲 Share via WhatsApp or other apps
            </button> */}

            <p className="mt-3 text-xs leading-5 text-rose-100/70">
              Share this link with your special person. They must be able to
              access your website to read the letter.
            </p>
          </div>
        )}

        <p className="mt-7 text-center text-sm">
          <Link to="/" className="text-rose-200 underline">
            ← Back to the homepage
          </Link>
        </p>
      </section>
    </main>
  );
}
