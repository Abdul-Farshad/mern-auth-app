
function LoadingAnimation() {
  return (
    <svg
    //   xmlns:svg="http://www.w3.org/2000/svg"
    //   xmlns="http://www.w3.org/2000/svg"
    //   xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.0"
      width="64px"
      height="64px"
      viewBox="0 0 128 128"
    //   xml:space="preserve"
    >
      <g>
        <circle cx="16" cy="64" r="16" fill="#ffffff" />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill="#ffffff"
          transform="rotate(45,64,64)"
        />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill="#ffffff"
          transform="rotate(90,64,64)"
        />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill="#ffffff"
          transform="rotate(135,64,64)"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64;0 64 64"
          calcMode="discrete"
          dur="640ms"
          repeatCount="indefinite"
        ></animateTransform>
      </g>
    </svg>
  );
}

export default LoadingAnimation;
