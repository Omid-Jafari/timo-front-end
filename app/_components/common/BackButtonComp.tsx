"use client";

import { useRouter } from "next/navigation";

const BackButtonComp = () => {
  const router = useRouter();

  return (
    <button
      className="font-bold flex items-center gap-1"
      type="button"
      onClick={() => router.back()}
    >
      برگشت
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M13.8297 19.0003C13.5271 19.0013 13.2403 18.8653 13.0497 18.6303L8.21968 12.6303C7.91636 12.2613 7.91636 11.7293 8.21968 11.3603L13.2197 5.3603C13.5731 4.93504 14.2044 4.87684 14.6297 5.2303C15.0549 5.58376 15.1131 6.21504 14.7597 6.6403L10.2897 12.0003L14.6097 17.3603C14.8594 17.66 14.912 18.0776 14.7444 18.4299C14.5769 18.7822 14.2198 19.0049 13.8297 19.0003Z"
          fill="#212B36"
        />
      </svg>
    </button>
  );
};

export default BackButtonComp;
