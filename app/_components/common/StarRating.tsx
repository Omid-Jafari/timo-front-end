import Image from "next/image";

const StarRating = ({ score, size = 16 }: { score: number; size?: number }) => {
  return (
    <div dir="ltr" className="flex items-center text-xs">
      {[...Array(score)]?.map((e, i) => (
        <div
          key={`star${i}`}
          className={`rounded-full flex items-center justify-center `}
        >
          <Image src="/common/star.svg" width={size} height={size} alt="star" />
        </div>
      ))}
      {[...Array(5 - score)]?.map((e, i) => (
        <div
          key={`star${i}`}
          className={`rounded-full flex items-center justify-center `}
        >
          <Image
            key={`emptyStar${i}`}
            src="/common/emptyStar.svg"
            width={size}
            height={size}
            alt="star"
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
