import { primary } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  title: string;
  url: string;
}

const CustomLink = ({ title, url }: Props) => {
  return (
    <Link
      href={url}
      className={cn(
        primary.className,
        "animate-shimmer inline-flex h-12 items-center justify-center rounded-md border border-l-orange-400 border-r-cyan-400  border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-thin uppercase text-slate-400 hover:text-slate-200 transition-colors focus:outline-none "
      )}
    >
      {title}
    </Link>
  );
};

export default CustomLink;
