"use client";
import { useEffect, useState } from "react";

export default function Fit({ params }) {
  const { id } = params;
  const [data, setData] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetch(`/api/fit?id=${id}`)
      .then((r) => r.json())
      .then(setData);
  }, [id]);

  async function vote(num) {
    await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({ id, score: num }),
    });
    setVoted(true);
  }

  if (!data) return "Loading...";

  return (
    <div className="wrap">
      <style>{`
        body {
          background: #ffeaf5;
          font-family: sans-serif;
        }
        .wrap {
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          text-align: center;
        }
        h1 {
          color: #ff7fbf;
          margin-bottom: 20px;
        }
        img {
          width: 100%;
          max-width: 400px;
          border-radius: 15px;
          box-shadow: 0px 4px 12px rgba(255, 150, 200, 0.4);
          margin-bottom: 20px;
        }
        button {
          background: #ff99cc;
          border: none;
          color: white;
          padding: 10px;
          margin: 5px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s;
          width: 45px;
        }
        button:hover {
          background: #ff7fba;
        }
        p {
          color: #d948a0;
        }
      `}</style>

      <h1>Rate this fit</h1>

      <img src={data.url} alt="fit" />

      {!voted ? (
        <div>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => vote(n)}>
              {n}
            </button>
          ))}
        </div>
      ) : (
        <p>Thanks for voting!</p>
      )}
    </div>
  );
}
