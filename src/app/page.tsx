import Cover from "@/components/Cover";
import Friends from "@/components/Friends";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="max-w-[670px] mx-auto pb-14 px-4">
      <Header />
      <Friends />
      <Cover />
      <TodoList />
    </div>
  );
}
