import { useEffect, useState, useRef } from "react";
import "./index.css";
import bgMusic from "./music/ytmp3free.cc_14-silent-sanctuary-violin-x-cello-cover-youtubemp3free.org.mp3";

const API_KEY = import.meta.env.VITE_GDRIVE_API_KEY;
const FOLDER_IDS = [
  "1hujmf7T1rFAe_W4n1GZgLUqRGEhtaBjW"
];

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState("envelope"); // 'envelope' | 'opening' | 'letter'
  
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Audio play prevented:", e);
      });
    }
  };

  const handleOpenEnvelope = () => {
    if (phase !== "envelope") return;
    playAudio();
    setPhase("opening");
    
    // Sapat na oras para mag-unfold ang flap at umakyat ang papel bago maging full view
    setTimeout(() => {
      setPhase("letter");
    }, 1800);
  };

  useEffect(() => {
    async function fetchAllFoldersImages() {
      try {
        const promises = FOLDER_IDS.map(async (folderId) => {
          const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
          const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)&key=${API_KEY}`;
          
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.files) {
            return data.files.map((file) => `https://lh3.googleusercontent.com/d/${file.id}=s1000`);
          }
          return [];
        });

        const results = await Promise.all(promises);
        const allImages = results.flat();
        setImages(allImages);
      } catch (error) {
        console.error("Error fetching images from Google Drive:", error);
      } finally {
        setLoading(false);
      }
    }

    if (API_KEY && FOLDER_IDS.length > 0) {
      fetchAllFoldersImages();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#18050e] flex items-center justify-center text-rose-200">
        <p className="text-lg animate-pulse font-serif tracking-widest">Inaayos ang ating mga alaala...</p>
      </div>
    );
  }

  const col1 = images.filter((_, i) => i % 4 === 0);
  const col2 = images.filter((_, i) => i % 4 === 1);
  const col3 = images.filter((_, i) => i % 4 === 2);
  const col4 = images.filter((_, i) => i % 4 === 3);

  const renderTrack = (colImages, trackClass) => (
    <div className="w-1/4 overflow-hidden">
      <div className={`${trackClass} flex flex-col gap-4`}>
        {[...Array(3)].map((_, loopIndex) => (
          <div key={loopIndex} className="flex flex-col gap-4 w-full">
            {colImages.map((src, idx) => (
              <div key={`${loopIndex}-${idx}`} className="w-full h-72 sm:h-88 overflow-hidden rounded-xl shadow-2xl bg-black/40 border border-white/5">
                <img src={src} alt={`Memory ${idx}`} className="w-full h-full object-cover filter brightness-75 contrast-110" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full bg-[#18050e] text-white font-sans select-none overflow-x-hidden no-scrollbar">
      {/* DIRECT MP3 AUDIO PLAYER CONNECTED TO IMPORTED FILE */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* BACKGROUND 4-COLUMN INDEPENDENT SCROLLING */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40 flex gap-3 p-3">
        {col1.length > 0 && renderTrack(col1, "track-1")}
        {col2.length > 0 && renderTrack(col2, "track-2")}
        {col3.length > 0 && renderTrack(col3, "track-3")}
        {col4.length > 0 && renderTrack(col4, "track-4")}
      </div>

      {/* VIGNETTE OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#18050e] via-transparent to-[#18050e] pointer-events-none z-10 fixed" />
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-90 pointer-events-none z-10 fixed" />

      {/* SCROLLABLE CONTAINER */}
      <div className="relative z-20 flex flex-col items-center w-full min-h-screen no-scrollbar">
        
        {/* SECTION 1: INTRO GLASS CARD */}
        <div className="h-screen flex flex-col items-center justify-center text-center p-6 w-full">
          <div className="max-w-2xl w-full mx-auto px-8 sm:px-12 py-12 sm:py-14 rounded-[28px] bg-[#14060b]/80 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center">
            <p className="text-[#fca5a5] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-4">
              HAPPY 3RD ANNIVERSARY
            </p>
            <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight mb-6 font-normal drop-shadow-md">
              Our Journey Together
            </h1>
            <p className="text-rose-100/80 text-sm sm:text-base font-sans font-light leading-relaxed max-w-lg mb-8">
              Through the smiles, the silent moments, and the heavy days, thank you for staying by my side.
            </p>
            <div className="animate-bounce text-rose-200/60 text-[11px] tracking-[0.2em] uppercase font-mono flex items-center gap-2 pt-2">
              <span>↓</span> MAG-SCROLL PABABA PARA SA LIHAM <span>↓</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: VECTOR ENVELOPE & LETTER EXTENSION */}
        <div className="h-screen flex flex-col items-center justify-center p-6 text-center w-full">
          
          {(phase === "envelope" || phase === "opening") && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-rose-200/80 text-xs uppercase tracking-[0.3em] mb-8 animate-pulse font-serif">
                I-click ang sobre para buksan ang liham
              </p>

              <div 
                onClick={handleOpenEnvelope}
                className="relative w-[320px] sm:w-[420px] h-[200px] sm:h-[260px] cursor-pointer group perspective-1000"
              >
                {/* ENVELOPE BASE */}
                <div className="absolute inset-0 bg-[#fce3b8] rounded-md border-3 border-[#6b3e19] shadow-2xl overflow-hidden">
                  
                  {/* INNER POCKET BACKGROUND */}
                  <div className="absolute inset-0 bg-[#e3c28d]" />

                  {/* LIHAM PAPEL NA UMAAKYAT PATAAS */}
                  <div 
                    className={`absolute left-6 right-6 bottom-3 bg-[#FAF6EE] p-5 rounded border-2 border-[#6b3e19]/30 text-amber-950 font-serif transition-all duration-1000 ease-in-out z-10 ${
                      phase === "opening" 
                        ? "-translate-y-48 scale-100 opacity-100 shadow-2xl" 
                        : "translate-y-0 scale-95 opacity-90"
                    }`}
                  >
                    <p className="text-xs font-bold border-b border-amber-900/15 pb-1 text-left text-amber-900">
                      Para sa Aking Mahal,
                    </p>
                    <p className="text-[11px] italic text-amber-900/80 mt-2 text-left leading-relaxed">
                      Happy 3rd Anniversary! Tatlong taon na pala ang mabilis na lumipas...
                    </p>
                  </div>

                  {/* BOTTOM & SIDE VECTOR FLAPS */}
                  <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 100 62" preserveAspectRatio="none">
                    <polygon points="0,0 48,32 0,62" fill="#fce3b8" stroke="#6b3e19" strokeWidth="1.2" strokeLinejoin="round" />
                    <polygon points="100,0 52,32 100,62" fill="#fce3b8" stroke="#6b3e19" strokeWidth="1.2" strokeLinejoin="round" />
                    <polygon points="0,62 50,30 100,62" fill="#f3d7a8" stroke="#6b3e19" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>

                </div>

                {/* ANIMATED TOP FLAP */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-[52%] origin-top transition-transform duration-700 ease-in-out z-30 ${
                    phase === "opening" ? "[transform:rotateX(180deg)]" : ""
                  }`}
                >
                  <svg className="w-full h-full" viewBox="0 0 100 32" preserveAspectRatio="none">
                    <polygon points="0,0 50,32 100,0" fill="#fce3b8" stroke="#6b3e19" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                </div>

              </div>
            </div>
          )}

          {/* SECTION 3: FULL DISPLAYED LETTER */}
          {phase === "letter" && (
            <div className="max-w-2xl w-full mx-auto p-6 sm:p-10 rounded-xl bg-[#fdfbf7] border border-amber-900/20 shadow-2xl text-amber-950 font-serif z-30 text-left my-auto no-scrollbar max-h-[85vh] overflow-y-auto animate-fade-in">
              <div className="border-b border-amber-900/15 pb-4 mb-6 flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-800/60 font-sans">October 2026</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 mt-1">Para sa Aking Mahal,</h2>
                </div>
                <span className="text-2xl">🌹</span>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-amber-900/90 font-serif italic">
                <p>
                  Happy 3rd Anniversary! Tatlong taon na pala ang mabilis na lumipas mula noong magsimula ang ating kwento. 
                </p>
                <p>
                  Sa loob ng tatlong taon na 'to, madami tayong pinagdaanan—mga araw na puno ng tawa at saya, pero maging ang mga panahong mabigat, tahimik, at puno ng pagsubok. Salamat dahil sa bawat taas at baba ng ating buhay, hindi mo ako binitawan at nanatili ka sa tabi ko.
                </p>
                <p>
                  Salamat sa pag-unawa, sa pagmamahal, at sa pagiging sandigan ko. Habang pinapanood ko ang mga litrato natin na dahan-dahang lumilipas sa background, lalo kong na-re-realize kung gaano ko kamahal ang bawat alaala natin.
                </p>
                <p className="font-bold text-amber-950 not-italic pt-2">
                  Mananatili ako sa tabi mo, sa lahat ng masaya at mahihirap na bukas. Mahal na mahal kita!
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-900/15 flex justify-between items-center">
                <p className="text-xs text-amber-800/60 font-sans">Forever & Always</p>
                <button 
                  onClick={() => setPhase("envelope")}
                  className="text-xs font-sans text-amber-800 hover:text-amber-950 underline cursor-pointer"
                >
                  I-tupi ulit ang liham
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}