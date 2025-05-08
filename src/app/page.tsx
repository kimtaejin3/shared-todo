import Cover from "@/components/shared/DayView";
import Friends from "@/components/friend/Friends";
import Header from "@/components/shared/Header";
import TodoList from "@/components/todo/TodoList";

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
