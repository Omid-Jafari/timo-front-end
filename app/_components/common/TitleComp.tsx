const TitleComp = ({
  title,
  smaller = false,
  className = "",
}: {
  title: string;
  smaller?: boolean;
  className?: string;
}) => {
  return (
    <h5
      className={`font-semibold relative w-fit pb-3 ${
        smaller ? "text-xl" : "text-2xl"
      } ${className}`}
    >
      <div
        className={`absolute bottom-0 h-[3px] bg-primary w-8 rounded-[800px] ${
          smaller ? "rtl:right-0 ltr:left-0" : " left-1/2 -translate-x-1/2"
        }`}
      ></div>
      {title}
    </h5>
  );
};

export default TitleComp;
