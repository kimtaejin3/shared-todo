import Cover from "@/components/Cover";
import Friends from "@/components/Friends";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="max-w-[670px] mx-auto">
      <Header />
      <Friends />
      <Cover />
    </div>
  );
}
