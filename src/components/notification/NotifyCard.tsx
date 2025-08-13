interface NotifyProps {
  title: string;
  time: string;
  latest: boolean;
}

export default function NotifyCard({ title, time, latest }: NotifyProps) {
  return (
    <div
      className={`w-[95%] sm:w-[90%] border border-border rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-2 py-3 px-3 transition-all ${
        latest ? "bg-[#72727212]" : "bg-white"
      }`}
    >
      <p
        className={`text-sm sm:text-base md:text-lg mb-4 ${
          latest ? "text-success" : "text-black"
        }`}
      >
        {title}
      </p>
      <h5 className="text-xs sm:text-sm md:text-base mb-4 text-secondaryDark">
        {time}
      </h5>
    </div>
  );
}
