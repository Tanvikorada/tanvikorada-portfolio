export default function SkyBand() {
  return (
    <div className="sky-band-section">
      <svg
        className="sky-band-svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 60 C 180 20 360 90 540 55 C 720 20 900 80 1080 50 C 1260 20 1380 70 1440 45 L1440 120 L0 120 Z"
          fill="var(--bg-base)"
        />
        <path
          d="M0 80 C 200 45 400 95 600 65 C 800 35 1000 85 1200 60 C 1320 45 1400 70 1440 60"
          stroke="var(--border)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
