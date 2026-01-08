import { useState, useRef, useEffect } from 'react';
import bgsound from './assets/bgsound-1.mp3';

// Komponen Utama
function App() {
  // Data untuk undangan (bisa diganti)
  const invitationData = {
    name: "Aulia Salsa",
    nim: "(2217010003)",
    title: "Undangan",
    subtitle: "Seminar Proposal",
    thesisTitle:
      "Penerapan Markov Switching Autoregressive (MSAR) pada Data Ekspor Sumatera Barat 2020-2024",
    date: "Jumat, 09 Januari",
    time: "07:30 - 09:30",
    location: "https://telkomsel.zoom.us/j/94399895292?pwd=ztVGBbNQKOtdArbIcImpvWGBy0NKLD.1", // Ganti dengan link zoom anda
    imageUrl: "https://res.cloudinary.com/dpogx7hak/image/upload/v1767838609/pp_nvm4ii.jpg", // Menggunakan placeholder
    examiners: [
      { name: "LILIS HARIANTI HASIBUAN, M. Si", role: "Dosen Penguji 1" },
      { name: "SYARTO MUSTHOFA, M. Sc", role: "Dosen Penguji 2" },
      { name: "DARVI MAILISA PUTRI, M. Si", role: "Dosen Penguji 3" },
    ],
  };

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
      // Re-enable scrolling by removing the 'loading' class from the body
      document.body.classList.remove('loading');
    }, 1000); // 2-second delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Memblokir klik kanan
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Memblokir tombol keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
      }
      // Ctrl+Shift+C (Shortcut lain untuk DevTools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
      }
      // Ctrl+U (Lihat Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center p-4">
      <>
        {/* Komponen untuk doodle di latar belakang */}
        <BackgroundDoodles />

        {/* Konten Utama */}
        <main className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center flex-grow space-y-7 pt-8">
          <Header
            title={invitationData.title}
            subtitle={invitationData.subtitle}
          />

          <ProfileCard
            name={invitationData.name}
            nim={invitationData.nim}
            imageUrl={invitationData.imageUrl}
          />

          <ThesisInfo title={invitationData.thesisTitle} />

          <EventDetails
            date={invitationData.date}
            time={invitationData.time}
            location={invitationData.location}
            thesisTitle={invitationData.thesisTitle}
          />

          <ExaminerDetails examiners={invitationData.examiners} />
        </main>

        <Footer />

        <audio ref={audioRef} src={bgsound} loop />
        <button
          onClick={toggleMusic}
          className="fixed bottom-5 right-5 bg-gradient-to-r from-brand-pink to-brand-purple text-white p-3 rounded-full shadow-lg focus:outline-none z-50 hover:scale-110 transition-transform duration-300"
          aria-label="Toggle Music"
        >
          {isMusicPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </>
    </div>
  );
}

// Komponen untuk Teks Bergelombang
function WavyText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`flex justify-center ${className}`} style={style}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="animate-wave"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

// Komponen Header
function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <WavyText
        text={title}
        className="text-5xl sm:text-6xl font-title font-bold text-brand-dark"
        style={{ textShadow: "2px 2px 4px rgba(255,255,255,0.5)" }}
      />
      <WavyText
        text={subtitle}
        className="text-4xl sm:text-5xl font-title font-bold text-[#6B4E71] -mt-2"
        style={{ textShadow: "2px 2px 4px rgba(255,255,255,0.8)" }}
      />
    </div>
  );
}

// Komponen Kartu Profil (Polaroid)
function ProfileCard({ name, nim, imageUrl }: { name: string; nim: string; imageUrl: string }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  // Definisikan gambar placeholder Anda di sini
  const placeholderImage = "https://placehold.co/400x500?text=😌";

  return (
    <div className="flex flex-col items-center w-full max-w-xs">
      {/* Container dengan Polaroid */}
      <div className="relative">
        {/* Paperclip Decoration */}
        <div className="paperclip"></div>

        {/* Frame Polaroid */}
        <div
          className={`polaroid-frame transform transition-transform duration-300 cursor-pointer ${isClicked ? 'rotate-0 scale-105' : '-rotate-3'}`}
          onClick={handleClick}
        >
          <div
            className="w-64 sm:w-72 h-72 sm:h-80 bg-brand-pink/20 rounded-sm overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl}), url(${placeholderImage})`,
            }}
            role="img"
            aria-label={name}
          >
          </div>
        </div>
      </div>

      {/* Nama */}
      <h3
        className="text-4xl sm:text-5xl font-name text-brand-dark mt-6 text-center font-bold"
        style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.5)" }}
      >
        {name}
      </h3>
      <p className="text-2xl font-title text-[#6B4E71] mt-2" style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }}>{nim}</p>
    </div>
  );
}

// Komponen Info Judul Skripsi
function ThesisInfo({ title }: { title: string }) {
  return (
    <div className="text-center px-4">
      <div className="relative inline-block pb-2">
        <h4 className="text-lg font-bold text-brand-dark">
          Judul:
        </h4>
        <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8A4C9] to-transparent rounded-full"></div>
      </div>
      <p className="text-base sm:text-lg font-body font-medium text-brand-dark mt-4">{title}</p>
    </div>
  );
}

// Komponen Detail Acara (Box Kuning)
function EventDetails({ date, time, location, thesisTitle }: { date: string; time: string; location: string; thesisTitle: string }) {
  const generateGoogleCalendarUrl = (eventDate: string, eventTime: string, eventTitle: string, eventLocation: string) => {
    // Assuming the year is the current year (2025)
    const year = new Date().getFullYear();

    // Parse date: "Kamis, 20 November" -> "20 November"
    const datePart = eventDate.split(', ')[1];
    const [day, monthName] = datePart.split(' ');

    const monthMap: { [key: string]: string } = {
      "Januari": "01", "Februari": "02", "Maret": "03", "April": "04",
      "Mei": "05", "Juni": "06", "Juli": "07", "Agustus": "08",
      "September": "09", "Oktober": "10", "November": "11", "Desember": "12"
    };
    const month = monthMap[monthName];

    // Parse time: "13:00 - Selesai" -> "13:00" (start) and "14:00" (end, assuming 1 hour)
    const startTimeStr = eventTime.split(' ')[0];
    const [startHour, startMinute] = startTimeStr.split(':').map(Number);

    const startDate = new Date(year, parseInt(month) - 1, parseInt(day), startHour, startMinute);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour

    const formatDateTime = (dt: Date) => {
      return dt.toISOString().replace(/[-:]|\.\d{3}/g, '');
    };

    const dates = `${formatDateTime(startDate)}/${formatDateTime(endDate)}`;
    const details = encodeURIComponent(`Seminar Proposal: ${eventTitle}`);
    const locationEncoded = encodeURIComponent(eventLocation);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${details}&dates=${dates}&location=${locationEncoded}&sf=true&output=xml`;
  };

  const calendarUrl = generateGoogleCalendarUrl(date, time, thesisTitle, location);

  return (
    <div className="w-full glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col items-start gap-4 text-brand-dark font-bold">
        {/* Tanggal */}
        <div className="flex items-center gap-3">
          <div className="bg-white/30 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg transition-all duration-300 hover:scale-105 hover:text-brand-pink"
          >
            {date}
          </a>
        </div>

        {/* Waktu */}
        <div className="flex items-center gap-3">
          <div className="bg-white/30 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg transition-all duration-300 hover:scale-105 hover:text-brand-pink"
          >
            {time}
          </a>
        </div>

        {/* Link Zoom Meeting */}
        <div className="mt-2 w-full">
          <a
            href={location}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-purple hover:to-brand-pink text-white py-3 px-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-white/20 p-1.5 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span>Join Zoom Meeting</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// Komponen Detail Dosen Penguji
function ExaminerDetails({ examiners }: { examiners: { name: string; role: string }[] }) {
  return (
    <div className="w-full glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col items-start gap-4 text-brand-dark font-bold">
        <h4 className="text-lg font-bold text-brand-dark">
          Dosen Penguji:
        </h4>
        {examiners.map((examiner, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="bg-white/30 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <span className="text-lg">{examiner.name}</span>
              <p className="text-sm font-medium text-brand-light">{examiner.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Komponen Footer
function Footer() {
  return (
    <footer className="w-full text-center mt-12 mb-4">
      <a
        href="https://github.com/Ikiiloh"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-brand-dark hover:text-brand-pink transition-colors duration-300"
        aria-label="GitHub Profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-10 h-10"
          role="img"
        >
          <title>Github</title>
          <path
            d="M32 0a32.021 32.021 0 0 0-10.1 62.4c1.6.3 2.2-.7 2.2-1.5v-6c-8.9 1.9-10.8-3.8-10.8-3.8-1.5-3.7-3.6-4.7-3.6-4.7-2.9-2 .2-1.9.2-1.9 3.2.2 4.9 3.3 4.9 3.3 2.9 4.9 7.5 3.5 9.3 2.7a6.93 6.93 0 0 1 2-4.3c-7.1-.8-14.6-3.6-14.6-15.8a12.27 12.27 0 0 1 3.3-8.6 11.965 11.965 0 0 1 .3-8.5s2.7-.9 8.8 3.3a30.873 30.873 0 0 1 8-1.1 30.292 30.292 0 0 1 8 1.1c6.1-4.1 8.8-3.3 8.8-3.3a11.965 11.965 0 0 1 .3 8.5 12.1 12.1 0 0 1 3.3 8.6c0 12.3-7.5 15-14.6 15.8a7.746 7.746 0 0 1 2.2 5.9v8.8c0 .9.6 1.8 2.2 1.5A32.021 32.021 0 0 0 32 0z"
            fill="currentColor"
          />
        </svg>
      </a>
    </footer>
  );
}

// Komponen Bunga Latar Belakang
function BackgroundDoodles() {
  return (
    <>
      {/* Bunga Kiri Atas */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        className="absolute top-8 left-8 z-0"
      >
        <ellipse cx="50" cy="30" rx="15" ry="25" fill="white" stroke="#E8A4C9" strokeWidth="2" opacity="0.9" />
        <ellipse cx="50" cy="70" rx="15" ry="25" fill="white" stroke="#E8A4C9" strokeWidth="2" opacity="0.9" />
        <ellipse cx="30" cy="50" rx="25" ry="15" fill="white" stroke="#E8A4C9" strokeWidth="2" opacity="0.9" />
        <ellipse cx="70" cy="50" rx="25" ry="15" fill="white" stroke="#E8A4C9" strokeWidth="2" opacity="0.9" />
        <circle cx="50" cy="50" r="12" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      </svg>

      {/* Bunga Kanan Atas */}
      <svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        className="absolute top-12 right-10 z-0"
      >
        <ellipse cx="50" cy="25" rx="12" ry="20" fill="#FFF5F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.85" />
        <ellipse cx="50" cy="75" rx="12" ry="20" fill="#FFF5F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.85" />
        <ellipse cx="25" cy="50" rx="20" ry="12" fill="#FFF5F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.85" />
        <ellipse cx="75" cy="50" rx="20" ry="12" fill="#FFF5F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.85" />
        <ellipse cx="30" cy="30" rx="12" ry="18" fill="#FFF0F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.85" transform="rotate(-45 30 30)" />
        <ellipse cx="70" cy="30" rx="12" ry="18" fill="#FFF0F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.85" transform="rotate(45 70 30)" />
        <ellipse cx="30" cy="70" rx="12" ry="18" fill="#FFF0F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.85" transform="rotate(45 30 70)" />
        <ellipse cx="70" cy="70" rx="12" ry="18" fill="#FFF0F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.85" transform="rotate(-45 70 70)" />
        <circle cx="50" cy="50" r="10" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      </svg>

      {/* Bunga Kiri Tengah */}
      <svg
        width="55"
        height="55"
        viewBox="0 0 100 100"
        className="absolute top-1/3 left-3 z-0"
      >
        <ellipse cx="50" cy="28" rx="10" ry="18" fill="white" stroke="#C9A9C9" strokeWidth="2" opacity="0.8" />
        <ellipse cx="50" cy="72" rx="10" ry="18" fill="white" stroke="#C9A9C9" strokeWidth="2" opacity="0.8" />
        <ellipse cx="28" cy="50" rx="18" ry="10" fill="white" stroke="#C9A9C9" strokeWidth="2" opacity="0.8" />
        <ellipse cx="72" cy="50" rx="18" ry="10" fill="white" stroke="#C9A9C9" strokeWidth="2" opacity="0.8" />
        <circle cx="50" cy="50" r="10" fill="#FFCC00" stroke="#DAA520" strokeWidth="1" />
      </svg>

      {/* Bunga Kiri Bawah - Besar */}
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="absolute bottom-48 left-5 z-0"
      >
        <ellipse cx="50" cy="22" rx="16" ry="28" fill="#FFFAFA" stroke="#E8A4C9" strokeWidth="2" opacity="0.9" />
        <ellipse cx="50" cy="78" rx="16" ry="28" fill="#FFFAFA" stroke="#E8A4C9" strokeWidth="2" opacity="0.9" />
        <ellipse cx="22" cy="50" rx="28" ry="16" fill="#FFFAFA" stroke="#E8A4C9" strokeWidth="2" opacity="0.9" />
        <ellipse cx="78" cy="50" rx="28" ry="16" fill="#FFFAFA" stroke="#E8A4C9" strokeWidth="2" opacity="0.9" />
        <ellipse cx="28" cy="28" rx="14" ry="22" fill="#FFF5F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.9" transform="rotate(-45 28 28)" />
        <ellipse cx="72" cy="28" rx="14" ry="22" fill="#FFF5F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.9" transform="rotate(45 72 28)" />
        <ellipse cx="28" cy="72" rx="14" ry="22" fill="#FFF5F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.9" transform="rotate(45 28 72)" />
        <ellipse cx="72" cy="72" rx="14" ry="22" fill="#FFF5F5" stroke="#D4A5A5" strokeWidth="2" opacity="0.9" transform="rotate(-45 72 72)" />
        <circle cx="50" cy="50" r="14" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
        <circle cx="50" cy="50" r="6" fill="#FFA500" />
      </svg>

      {/* Bunga Kanan Tengah */}
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        className="absolute top-1/2 right-5 z-0"
      >
        <ellipse cx="50" cy="25" rx="12" ry="20" fill="white" stroke="#B8A9C9" strokeWidth="2" opacity="0.85" />
        <ellipse cx="50" cy="75" rx="12" ry="20" fill="white" stroke="#B8A9C9" strokeWidth="2" opacity="0.85" />
        <ellipse cx="25" cy="50" rx="20" ry="12" fill="white" stroke="#B8A9C9" strokeWidth="2" opacity="0.85" />
        <ellipse cx="75" cy="50" rx="20" ry="12" fill="white" stroke="#B8A9C9" strokeWidth="2" opacity="0.85" />
        <circle cx="50" cy="50" r="12" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      </svg>

      {/* Bunga Kanan Bawah */}
      <svg
        width="75"
        height="75"
        viewBox="0 0 100 100"
        className="absolute bottom-52 right-8 z-0"
      >
        <ellipse cx="50" cy="20" rx="14" ry="24" fill="#FFF8F8" stroke="#C9A9C9" strokeWidth="2" opacity="0.9" />
        <ellipse cx="75" cy="40" rx="14" ry="24" fill="#FFF8F8" stroke="#C9A9C9" strokeWidth="2" opacity="0.9" transform="rotate(72 75 40)" />
        <ellipse cx="65" cy="75" rx="14" ry="24" fill="#FFF8F8" stroke="#C9A9C9" strokeWidth="2" opacity="0.9" transform="rotate(144 65 75)" />
        <ellipse cx="35" cy="75" rx="14" ry="24" fill="#FFF8F8" stroke="#C9A9C9" strokeWidth="2" opacity="0.9" transform="rotate(-144 35 75)" />
        <ellipse cx="25" cy="40" rx="14" ry="24" fill="#FFF8F8" stroke="#C9A9C9" strokeWidth="2" opacity="0.9" transform="rotate(-72 25 40)" />
        <circle cx="50" cy="50" r="14" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
        <circle cx="50" cy="50" r="6" fill="#FFA500" />
      </svg>

      {/* Bunga Kecil Tengah Bawah */}
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        className="absolute bottom-1/4 left-1/4 z-0"
      >
        <ellipse cx="50" cy="30" rx="10" ry="16" fill="white" stroke="#D4B5D8" strokeWidth="2" opacity="0.8" />
        <ellipse cx="50" cy="70" rx="10" ry="16" fill="white" stroke="#D4B5D8" strokeWidth="2" opacity="0.8" />
        <ellipse cx="30" cy="50" rx="16" ry="10" fill="white" stroke="#D4B5D8" strokeWidth="2" opacity="0.8" />
        <ellipse cx="70" cy="50" rx="16" ry="10" fill="white" stroke="#D4B5D8" strokeWidth="2" opacity="0.8" />
        <circle cx="50" cy="50" r="8" fill="#FFCC00" stroke="#DAA520" strokeWidth="1" />
      </svg>
    </>
  );
}

export default App;