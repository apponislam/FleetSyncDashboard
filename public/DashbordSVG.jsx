const DashbordSVG = ({ strokeColor = "#0B3666" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.3333 11.3598V5.3065C29.3333 3.4265 28.48 2.6665 26.36 2.6665H20.9733C18.8533 2.6665 18 3.4265 18 5.3065V11.3465C18 13.2398 18.8533 13.9865 20.9733 13.9865H26.36C28.48 13.9998 29.3333 13.2398 29.3333 11.3598Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.3333 26.36V20.9733C29.3333 18.8533 28.48 18 26.36 18H20.9733C18.8533 18 18 18.8533 18 20.9733V26.36C18 28.48 18.8533 29.3333 20.9733 29.3333H26.36C28.48 29.3333 29.3333 28.48 29.3333 26.36Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0003 11.3598V5.3065C14.0003 3.4265 13.147 2.6665 11.027 2.6665H5.64033C3.52033 2.6665 2.66699 3.4265 2.66699 5.3065V11.3465C2.66699 13.2398 3.52033 13.9865 5.64033 13.9865H11.027C13.147 13.9998 14.0003 13.2398 14.0003 11.3598Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0003 26.36V20.9733C14.0003 18.8533 13.147 18 11.027 18H5.64033C3.52033 18 2.66699 18.8533 2.66699 20.9733V26.36C2.66699 28.48 3.52033 29.3333 5.64033 29.3333H11.027C13.147 29.3333 14.0003 28.48 14.0003 26.36Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashbordSVG;
