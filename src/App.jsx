import { useEffect, useState, useRef } from "react";
import "./index.css";
import bgMusic from "./music/ytmp3free.cc_14-silent-sanctuary-violin-x-cello-cover-youtubemp3free.org.mp3";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const API_KEY = import.meta.env.VITE_GDRIVE_API_KEY;
const FOLDER_IDS = [
  "1hujmf7T1rFAe_W4n1GZgLUqRGEhtaBjW"
];

// LISTAHAN NG MGA TAHANAN NG KWENTO PER YEAR
const YEARLY_MEMORIES = [
  {
    yearTitle: "Year 1: The Beginning",
    yearSubtitle: "Mga Unang Yakap at Unang Ngiti",
    memories: [
      {
        title: "Unang Pagkakataon",
        date: "Year 1 - Memory 2",
        story: "Sa lahat ng memories natin, ito 'yung pinakapaborito ko. Dito ko mas nakita kung gaano ka ka-special na babae. Na-realize ko na kung ano man 'yung inasahan ko sa 'yo noon, mas higit pa roon ang tunay na ikaw. Ang swerte ko sa 'yo kasi pinagbigyan mo ang isang tulad ko na pumasok sa buhay mo : ).",
        image: "https://lh3.googleusercontent.com/d/1cJui2DXtMKh7BrHFe9KdTwbJcdaUr2L1=s1000"
      },
      {
        title: "Together at 11:00 PM",
        date: "10.23.23 (11:00 PM)",
        story: "Ito talaga 'yung araw na napatunayan kong ako na 'yung pinakaswerteng lalaki sa mundo. Dati pinapangarap lang kita, pero ngayon, hindi ako makapaniwalang na sa-akin ka.",
        image: "https://lh3.googleusercontent.com/d/1CpdYqURO0I3YU4fTYXKV9a9JqnZb47Xo=s1000"
      },
      {
        title: "Sa Pagitan ng Alon at Umaga",
        date: "Year 1 - Memory 3",
        story: "Isa rin 'to sa mga core memories ko. Unang beses nating magpunta sa dagat noon kasama mga classmates natin, pero 'yung pinakamasarap sa pakiramdam... 'yung magkatabi tayong nakatingin sa alon habang hinihintay sumikat ang araw. Ang sarap sa pakiramdam na sinalubong natin ang bagong umaga habang magkasama.",
        image: "https://lh3.googleusercontent.com/d/1sOzXk-KjWQVN75DvwWHyazD1wK6SqNFx=s1000"
      }
    ]
  },
  {
    yearTitle: "Year 2: Growing Together",
    yearSubtitle: "Mga Pagsubok at Mas Malalim na Pagmamahal",
    memories: [
      {
        title: "Pagtataguyod ng Pangarap",
        date: "Year 2 - Memory 1",
        story: "Sa ikalawang taon, naging sandigan natin ang isa't isa noong mga panahong napapagod tayo sa pag-aaral at buhay.",
        image: "https://lh3.googleusercontent.com/d/1IZgAc3CXH5WtpcgEs5-mLxU5ctGLFdgP=s1000"
      },
      {
        title: "Katangian mo",
        date: "Year 2 - Memory 2",
        story: "Sa dami ng magagandang katangian mo, lalo lang akong nahuhulog sa 'yo araw-araw. Ang swerte ko kasi hindi lang ganda ang mayroon ka, kundi isang napakabuting puso na paborito kong makasama.",
        image: "https://lh3.googleusercontent.com/d/1hec4sPMjGNUmQUqqASWwP01q2DGcu_a4=s1000"
      },
      {
        title: "Togang Magkasangga",
        date: "Year 2 - Memory 3",
        story: "Nung mga panahong sobrang hirap at wala talaga akong maipagmalaki o maipang-gastos sa school, hindi mo pinaramdam sa akin na walang-wala ako. Sinalo mo ako sa lahat. Ibinigay mo parin kahit na mawawalan ka din para lang hindi ako mahirapan. Kung wala ka noon, baka hindi ko naipaglaban 'yung pag-aaral ko dahil sa mga gastosin. Nung mga panahong iyon, narealize ko na hindi lang pala basta girlfriend ang binigay sa akin ng diyos kundi isang babaeng handa akong salohin or damayan ako sa mga araw na nahihirapan ako. Sobrang laki ng utang na loob ko sa 'yo, at pangarap kong ibigay sa 'yo ang buong mundo bilang bawi sa lahat ng ibinigay mo para sa akin, Kaya ayon, sobrang saya kasi sa larawang ito, dalawa tayong nakasuot ng togang saksi kung paano mo ako binuo at hindi binitawan nung mga panahong gipit na gipit ang buhay ko.",
        image: "https://lh3.googleusercontent.com/d/1mYRgxxFODc020a4DWIgPt7AaY9GZvWqW=s1000"
      }
    ]
  },
  {
    yearTitle: "Year 3: Milestone & Beyond",
    yearSubtitle: "Ang Patuloy na Pagmamahal",
    memories: [
      {
        title: "Para sa matatamis mong ngiti",
        date: "Year 3 - Memory 1",
        story: "Isa 'to sa mga paborito kong core memories ngayong nag 3 years tayo! Haha! Ito kasi 'yung araw na sobrang natuwa ka kasi inakala mong wala akong maibibigay sa 'yo. Pwes, maling-mali ka roon! Katulad ng naitatak ko na sa puso at isip ko mula simula: handa kitang pasayahin sa abot ng makakaya ko, at handa kong paghirapan ang lahat makuha lang 'yang matatamis mong ngiti.",
        image: "https://lh3.googleusercontent.com/d/1QRLja-7bxyzMWDrLSc7WuZS7EZYqbFW_=s1000"
      },
      {
        title: "Simple Days equal Happy",
        date: "Year 3 - Memory 2",
        story: "Kahit gaano pa kahirap o kahit pahirapan mo pa ako, hindi ako mapapagod. Basta't nakikita kong masaya ka sa piling ko, sapat na 'yun para ipaglaban kita nang paulit-ulit. Sa 'yo lang ako magiging ganito, at sa 'yo lang ako hindi susuko kailanman.",
        image: "https://lh3.googleusercontent.com/d/1W2XSgM9lmJlI_-ZH5_kOQpc5F8Yj8i7v=s1000"
      },
      {
        title: "Ikaw at ang Pangarap",
        date: "Year 3 - Memory 2",
        story: "Isa kang babaeng napakatatag at napakatapang. Alam kong may mga bagay at desisyon sa buhay na hindi natupad, at may mga mabibigat kang kinikimkim... pero buong tapang mo pa ring sinusuyod ang buhay. Ang hiling ko lang ay ang tagumpay mo. Galingan mo lagi kasi siguradong-sigurado akong mananalo ka. Hayaan mo na ang nakaraan at mag-focus ka sa hinaharap. Mahirapan ka man, nandito ako—handang-handa kitang ipanalo. At hiling ko para sa atin, 4 to 5 years from now, mapakasalan ko ang isang tulad mo, iloveyouverymuchh lablovee koo...",
        image: "https://lh3.googleusercontent.com/d/1K_McgS7HYI0GPq1meydtYVINS99S2TsY=s1000"
      }
    ]
  }
];

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState("envelope"); // 'envelope' | 'opening' | 'letter' | 'story' | 'kissCamera'

  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // AI CAMERA DETECTION STATES
  const [cameraActive, setCameraActive] = useState(false);
  const [kissDetected, setKissDetected] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [faceCountStatus, setFaceCountStatus] = useState("Waiting for camera...");

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.log("Audio play prevented:", e);
      });
    }
  };

  const handleOpenEnvelope = () => {
    if (phase !== "envelope") return;
    playAudio();
    setPhase("opening");

    setTimeout(() => {
      setPhase("letter");
    }, 1800);
  };

  const handleNextCard = () => {
    const currentYear = YEARLY_MEMORIES[currentYearIndex];

    if (currentCardIndex < currentYear.memories.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else if (currentYearIndex < YEARLY_MEMORIES.length - 1) {
      setCurrentYearIndex((prev) => prev + 1);
      setCurrentCardIndex(0);
    } else {
      setPhase("kissCamera");
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    } else if (currentYearIndex > 0) {
      const prevYearIndex = currentYearIndex - 1;
      setCurrentYearIndex(prevYearIndex);
      setCurrentCardIndex(YEARLY_MEMORIES[prevYearIndex].memories.length - 1);
    }
  };

  // -------------------------------------------------------------
  // AI MEDIAPIPE FACE & KISS DETECTION LOGIC
  // -------------------------------------------------------------
  const startCameraAndAI = async () => {
    try {
      setCameraError("");
      setFaceCountStatus("Loading AI Face Detector...");

      // 1. Initialize MediaPipe Face Landmarker
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numFaces: 2
      });

      // 2. Request Webcam Stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraActive(true);
          setFaceCountStatus("Tumingin sa camera at maglalaplapan");
          detectFacesLoop();
        };
      }
    } catch (err) {
      console.error("Camera/AI Error:", err);
      setCameraError("Cannot open the camera, please allow it.");
    }
  };

  const detectFacesLoop = () => {
    if (videoRef.current && faceLandmarkerRef.current && videoRef.current.readyState >= 2) {
      const startTimeMs = performance.now();
      const results = faceLandmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);

      if (results && results.faceLandmarks) {
        const numFaces = results.faceLandmarks.length;

        if (numFaces === 0) {
          setFaceCountStatus("Walang nakikitang mukha sa camera...");
        } else if (numFaces === 1) {
          setFaceCountStatus("Isang mukha lang ang nakikita. Kailangan kayong dalawa!");
        } else if (numFaces >= 2) {
          setFaceCountStatus("Nakikita na kayong dalawa! Lapitan at halikan mo na siya! 💋");

          // Bawat mukha ay may landmark 13 (Upper Lip) at landmark 14 (Lower Lip)
          const face1Lips = results.faceLandmarks[0][13];
          const face2Lips = results.faceLandmarks[1][13];

          // Calculate Normalized Euclidean Distance between the 2 faces' lips
          const dx = face1Lips.x - face2Lips.x;
          const dy = face1Lips.y - face2Lips.y;
          const dz = face1Lips.z - face2Lips.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Threshold for kiss/closeness detection (approx < 0.18 normalized space)
          if (distance < 0.18) {
            setKissDetected(true);
            setFaceCountStatus("💋 KISS DETECTED! UNLOCKING GIFT...");
            stopCamera();
            return; // Stop detection loop
          }
        }
      }
    }

    animFrameIdRef.current = requestAnimationFrame(detectFacesLoop);
  };

  const stopCamera = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

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
      <div className="min-h-screen bg-[#12040a] flex items-center justify-center text-rose-200">
        <p className="text-sm animate-pulse font-serif tracking-[0.2em] uppercase">Gathering our memories...</p>
      </div>
    );
  }

  const col1 = images.filter((_, i) => i % 4 === 0);
  const col2 = images.filter((_, i) => i % 4 === 1);
  const col3 = images.filter((_, i) => i % 4 === 2);
  const col4 = images.filter((_, i) => i % 4 === 3);

  const renderTrack = (colImages, trackClass, isExtraMobile = false) => (
    <div className={`w-1/2 sm:w-1/4 overflow-hidden ${isExtraMobile ? 'hidden sm:block' : 'block'}`}>
      <div className={`${trackClass} flex flex-col gap-3 sm:gap-4`}>
        {[...Array(3)].map((_, loopIndex) => (
          <div key={loopIndex} className="flex flex-col gap-3 sm:gap-4 w-full">
            {colImages.map((src, idx) => (
              <div key={`${loopIndex}-${idx}`} className="w-full h-52 sm:h-80 overflow-hidden rounded-xl shadow-xl bg-black/40 border border-white/10 transition-all">
                <img src={src} alt={`Memory ${idx}`} className="w-full h-full object-cover filter brightness-80 contrast-105" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const currentYearData = YEARLY_MEMORIES[currentYearIndex];
  const currentMemory = currentYearData.memories[currentCardIndex];

  return (
    <div className="relative min-h-screen w-full bg-[#12040a] text-white font-sans select-none overflow-x-hidden no-scrollbar">
      <audio ref={audioRef} src={bgMusic} loop />

      {/* BACKGROUND 4-COLUMN INDEPENDENT SCROLLING */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40 flex gap-2 sm:gap-3 p-2 sm:p-3">
        {col1.length > 0 && renderTrack(col1, "track-1", false)}
        {col2.length > 0 && renderTrack(col2, "track-2", false)}
        {col3.length > 0 && renderTrack(col3, "track-3", true)}
        {col4.length > 0 && renderTrack(col4, "track-4", true)}
      </div>

      {/* ATMOSPHERIC VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#12040a] via-black/30 to-[#12040a] pointer-events-none z-10 fixed" />
      <div className="absolute inset-0 bg-rose-950/20 backdrop-brightness-90 pointer-events-none z-10 fixed" />

      {/* SCROLLABLE CONTAINER */}
      <div className="relative z-20 flex flex-col items-center w-full min-h-screen no-scrollbar">

        {/* SECTION 1: INTRO CARD */}
        <div className="h-screen flex flex-col items-center justify-center text-center p-4 w-full">
          <div className="relative max-w-[340px] sm:max-w-md w-full mx-auto px-5 sm:px-8 py-7 sm:py-10 rounded-2xl bg-[#16060e]/70 backdrop-blur-xl border border-rose-400/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center overflow-hidden">

            <div className="absolute -top-16 -left-16 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-[#fca5a5] uppercase tracking-[0.2em] text-[9px] font-medium mb-3">
              <span className="w-1 h-1 rounded-full bg-rose-400 animate-ping" />
              <span>HAPPY 3RD ANNIVERSARY</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-white to-rose-200 tracking-normal mb-2 font-normal drop-shadow-sm">
              Our Journey Together
            </h1>

            <div className="w-8 h-[1px] bg-rose-300/30 my-1" />

            <p className="text-rose-100/70 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-[260px] sm:max-w-xs my-2.5">
              Through the smiles, the silent moments, and the heavy days, thank you for staying by my side.
            </p>

            <div className="mt-2 pt-1 flex flex-col items-center gap-1 text-rose-300/60 text-[9px] tracking-[0.15em] uppercase font-mono">
              <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center gap-1.5">
                <span className="animate-bounce text-[10px]">↓</span>
                <span>SCROLL DOWN FOR THE LETTER</span>
                <span className="animate-bounce text-[10px]">↓</span>
              </div>
            </div>

          </div>
        </div>

        <div className="h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center w-full">

          {(phase === "envelope" || phase === "opening") && (
            <div className="flex flex-col items-center justify-center">
              <div className="mb-6 px-4 py-1.5 rounded-full bg-[#1a0810]/80 backdrop-blur-md border border-rose-400/30 shadow-md">
                <p className="text-rose-200/90 text-[10px] uppercase tracking-[0.2em] animate-pulse font-serif">
                  Click the envelope to open the letter
                </p>
              </div>

              <div
                onClick={handleOpenEnvelope}
                className="relative w-[300px] sm:w-[380px] h-[190px] sm:h-[240px] cursor-pointer group transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <div className="absolute inset-0 bg-[#fbf5e8] rounded-xl border border-[#a37953]/40 shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden">
                  <div className="absolute inset-0 bg-[#ede0c8]" />

                  <div
                    className={`absolute left-5 right-5 bottom-3 bg-[#fffdfa] p-4 rounded-lg border border-[#a37953]/20 text-amber-950 font-serif transition-all duration-1000 ease-in-out z-10 shadow-sm ${phase === "opening"
                      ? "-translate-y-48 scale-100 opacity-100 shadow-xl"
                      : "translate-y-0 scale-95 opacity-90"
                      }`}
                  >
                    <p className="text-xs font-bold border-b border-amber-900/15 pb-1 text-left text-[#6b3e19]">
                      Para sa Aking Mahal,
                    </p>
                    <p className="text-[10px] sm:text-[11px] italic text-amber-900/80 mt-1.5 text-left leading-relaxed">
                      Happy 3rd Anniversary! Tatlong taon na pala ang mabilis na lumipas...
                    </p>
                  </div>

                  <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 100 62" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="animeSideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fdf8ec" />
                        <stop offset="100%" stopColor="#f4e8d3" />
                      </linearGradient>
                      <linearGradient id="animeBottomGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="#f1e3ca" />
                        <stop offset="100%" stopColor="#e5d4b8" />
                      </linearGradient>
                    </defs>
                    <polygon points="0,0 49,31 0,62" fill="url(#animeSideGrad)" stroke="#a37953" strokeWidth="0.5" strokeLinejoin="round" opacity="0.95" />
                    <polygon points="100,0 51,31 100,62" fill="url(#animeSideGrad)" stroke="#a37953" strokeWidth="0.5" strokeLinejoin="round" opacity="0.95" />
                    <polygon points="0,62 50,30 100,62" fill="url(#animeBottomGrad)" stroke="#a37953" strokeWidth="0.6" strokeLinejoin="round" />
                  </svg>
                </div>

                <div
                  className={`absolute top-0 left-0 right-0 h-[52%] origin-top transition-transform duration-700 ease-in-out z-30 ${phase === "opening" ? "[transform:rotateX(180deg)]" : ""
                    }`}
                >
                  <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 32" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="animeTopGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="#fffcf5" />
                        <stop offset="100%" stopColor="#f7ebd9" />
                      </linearGradient>
                    </defs>
                    <polygon points="0,0 50,32 100,0" fill="url(#animeTopGrad)" stroke="#a37953" strokeWidth="0.6" strokeLinejoin="round" />
                  </svg>

                  <div className={`absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-rose-700 via-red-800 to-rose-950 border-2 border-rose-300/40 shadow-md flex items-center justify-center transition-all duration-300 ${phase === "opening" ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-rose-400/30 flex items-center justify-center bg-black/10">
                      <span className="text-rose-100 text-xs sm:text-sm drop-shadow-sm">💌</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PHASE: FULL LETTER VIEW */}
          {phase === "letter" && (
            <div className="max-w-md sm:max-w-2xl w-full mx-auto p-6 sm:p-12 rounded-3xl bg-[#fdfbf7] border border-amber-900/20 shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-amber-950 font-serif z-30 text-left my-auto no-scrollbar max-h-[85vh] overflow-y-auto animate-fade-in">
              <div className="border-b border-amber-900/15 pb-4 mb-6 flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-800/60 font-sans font-medium">October 23, 2026</p>
                  <h2 className="text-2xl sm:text-4xl font-bold text-amber-950 mt-1">For mylablove,</h2>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-lg leading-relaxed text-amber-900/90 font-serif italic">
                <p>
                  Happy 3rd Anniversary Love! Tatlong taon na pala ang mabilis na lumipas mula noong magsimula ang ating kwento.
                </p>
                <p>
                  Sa loob ng tatlong taon na 'to, madami tayong pinagdaanan—mga araw na puno ng tawa at saya, pati narin ang mga panahong parang di na natin kayang mahalin ang isa't isa, tahimik, at puno ng pagsubok ang mga dinaanan natin at patuloy na daraanan natin. Salamat dahil through up's at down's ng ating buhay, ay hindi mo ako binitawan at nanatili ka sa tabi ko.
                </p>
                <p>
                  Salamat sa pag-unawa, sa pagmamahal, at sa pagiging sandigan ko. Pagmasdan mo ang mga litrato na mula sa likod nitong binabasa mo, ang mga litrato natin na dahan-dahang lumilipas sa background, lalo kong na-re-realize kung gaano ko kagusto ibigay ang buhay na gusto mo at sana ay maging patient lang tayo sa pagabot ng mga pangarap natin sa buhay natin.
                </p>
                <p>
                  Sana ay maging MAS matatag pa tayo sa mga darating pa na taon, sana piliin pa rin natin ang isa't isa araw-araw lalo na ang mga araw na naiisip na nating sukuan ang isa't isa.
                </p>
                <p>Nandito man ako sa punto ng buhay ko na napakababa ko, sana please magtiwala ka pa din sakin at suportahan ako, kasi ako yung APOY at ikaw yung nagsisilbing GASOLINA ko para mas tumintindi ang WILL ko para sa pagabot ng mga pangarap ko sa buhay na kasama ka.</p>
                <p className="font-bold text-amber-950 not-italic pt-2">
                  Mananatili ako sa tabi mo, sa lahat ng masaya at kahit pa sa mga araw na sobrang hirap. Patuloy kitang mamahalin ng buo, tapat at hindi ako magbabago.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-amber-900/15 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <button
                  onClick={() => setPhase("envelope")}
                  className="text-xs font-sans text-amber-800/70 hover:text-amber-950 underline cursor-pointer order-2 sm:order-1"
                >
                  Fold letter
                </button>
                <button
                  onClick={() => {
                    setPhase("story");
                    setCurrentYearIndex(0);
                    setCurrentCardIndex(0);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-rose-900 text-rose-100 font-sans text-sm font-semibold hover:bg-rose-950 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
                >
                  <span>Ito tayo makalipas ang tatlong taon</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          )}

          {/* PHASE: EXPANDED WIDE STORY CAROUSEL */}
          {phase === "story" && (
            <div className="max-w-lg sm:max-w-3xl w-full mx-auto p-6 sm:p-10 rounded-3xl bg-[#180810]/90 backdrop-blur-2xl border border-rose-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-30 text-left my-auto animate-fade-in flex flex-col items-center">

              <div className="w-full pb-4 border-b border-rose-500/20 mb-6 flex justify-between items-center">
                <div>
                  <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-rose-300/90 block font-semibold">
                    {currentYearData.yearTitle}
                  </span>
                  <p className="text-xs sm:text-sm font-serif text-amber-200/90 italic mt-0.5">
                    {currentYearData.yearSubtitle}
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-200 text-xs font-mono font-semibold">
                  PHOTO {currentCardIndex + 1} / 3
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 w-full mb-8">
                <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-88 rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-black/40">
                  <img
                    src={currentMemory.image}
                    alt={currentMemory.title}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-3 text-left">
                  <h3 className="text-lg sm:text-2xl font-serif text-rose-100 font-semibold leading-tight">
                    {currentMemory.title}
                  </h3>
                  <p className="text-sm sm:text-base font-sans text-rose-100/85 font-light leading-relaxed italic">
                    "{currentMemory.story}"
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-between items-center pt-4 border-t border-rose-500/20">
                <button
                  onClick={handlePrevCard}
                  disabled={currentYearIndex === 0 && currentCardIndex === 0}
                  className={`text-xs sm:text-sm font-sans px-4 py-2 rounded-full border border-rose-400/20 ${currentYearIndex === 0 && currentCardIndex === 0
                    ? "opacity-30 cursor-not-allowed text-rose-300"
                    : "hover:bg-rose-500/20 text-rose-200 cursor-pointer"
                    }`}
                >
                  ← Back
                </button>

                <button
                  onClick={() => setPhase("letter")}
                  className="text-xs sm:text-sm font-sans text-rose-300/70 hover:text-rose-200 underline cursor-pointer"
                >
                  Read Letter
                </button>

                <button
                  onClick={handleNextCard}
                  className="text-xs sm:text-sm font-sans px-5 py-2 rounded-full bg-rose-700 hover:bg-rose-800 text-white font-medium cursor-pointer transition-all shadow-md flex items-center gap-2"
                >
                  <span>
                    {currentYearIndex === 2 && currentCardIndex === 2
                      ? "Special AI Camera Gift"
                      : currentCardIndex === 2
                        ? `Proceed to Year ${currentYearIndex + 2}`
                        : "Next Photo"}
                  </span>
                  <span>➔</span>
                </button>
              </div>

            </div>
          )}

          {/* PHASE: REAL AI CAMERA KISS DETECTOR SCREEN */}
          {phase === "kissCamera" && (
            <div className="max-w-md sm:max-w-xl w-full mx-auto p-6 sm:p-8 rounded-3xl bg-[#1a0812]/95 backdrop-blur-2xl border border-rose-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-30 text-center my-auto animate-fade-in flex flex-col items-center">

              {!kissDetected ? (
                <div className="flex flex-col items-center space-y-4 w-full">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-200 text-xs font-mono font-semibold">
                    <span>📷 AI KISS DETECTOR ACTIVATED</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-serif text-white font-bold">
                    Kiss mo muna ako, para maopen mo yung gift ko para sayo HAHA! 💋
                  </h2>

                  {/* WEBCAM FEED DISPLAY */}
                  <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-black/80 border-2 border-rose-500/30 shadow-inner flex items-center justify-center my-1">
                    <video
                      ref={videoRef}
                      className={`w-full h-full object-cover transform -scale-x-100 ${cameraActive ? 'block' : 'hidden'}`}
                      playsInline
                      muted
                    />

                    {!cameraActive && (
                      <div className="p-4 text-center">
                        <span className="text-4xl block mb-2">🔒</span>
                        <p className="text-xs text-rose-200/80 max-w-xs">
                          Naka-lock yung QR code ng regalo mo. Click mo yung button para malaplap na kita.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* STATUS TEXT & ALERTS */}
                  <div className="px-4 py-2 rounded-xl bg-black/30 border border-white/10 w-full text-center">
                    <p className="text-xs font-mono text-rose-200/90 animate-pulse">
                      {faceCountStatus}
                    </p>
                  </div>

                  {cameraError && (
                    <p className="text-xs text-red-400 font-sans">{cameraError}</p>
                  )}

                  {!cameraActive ? (
                    <button
                      onClick={startCameraAndAI}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-xs sm:text-sm shadow-xl transition-all cursor-pointer border border-rose-300/30"
                    >
                      Open Camera for Kiss Detection
                    </button>
                  ) : (
                    <button
                      onClick={() => setKissDetected(true)}
                      className="text-[10px] font-sans text-rose-300/50 hover:text-rose-200 underline cursor-pointer pt-1"
                    >
                      (Bypass camera & unlock manually)
                    </button>
                  )}
                </div>
              ) : (
                /* AFTER UNLOCK: THE QR CODE & GIFT REVEAL */
                <div className="flex flex-col items-center space-y-4 animate-fade-in w-full">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-200 text-xs font-mono font-semibold">
                    <span>KISS DETECTED! UNLOCKED!</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif text-rose-100 font-bold">
                    Ang Regalo Ko Para Sa'yo
                  </h2>

                  <p className="text-xs sm:text-sm text-rose-100/80 max-w-sm leading-relaxed">
                    I-scan ang QR code na ito para pumili ng kahit anong regalo na gusto mo—ako na ang magbabayad!
                  </p>

                  <div className="p-4 bg-white rounded-2xl shadow-2xl border-2 border-rose-400/40 my-2 group transition-transform hover:scale-105">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://shopee.ph"
                      alt="Anniversary Gift QR Code"
                      className="w-44 h-44 sm:w-52 sm:h-52 object-contain"
                    />
                  </div>

                  <p className="text-[11px] font-mono text-amber-200/90 italic">
                    Happy 3rd Anniversary, my love! I love you so much! 💖
                  </p>

                  <button
                    onClick={() => {
                      setPhase("envelope");
                      setKissDetected(false);
                      setCurrentYearIndex(0);
                      setCurrentCardIndex(0);
                    }}
                    className="mt-2 text-xs font-sans text-rose-300/60 hover:text-rose-100 underline cursor-pointer"
                  >
                    Bumalik sa Simula ↺
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}