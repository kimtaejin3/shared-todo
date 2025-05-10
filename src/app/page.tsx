import Cover from "@/components/shared/DayView";
import Friends from "@/components/friend/FriendContainer";
import Header from "@/components/shared/Header";
import TodoList from "@/components/todo/TodoList";
import { Container, Flex, Section } from "@radix-ui/themes";

export default function Home() {
  return (
    <Container size="2" px="4" pb="8">
      <Flex direction="column" gap="4">
        <Section py="0">
          <Header />
        </Section>
        <Section py="0">
          <Friends />
        </Section>
        <Section py="0">
          <Cover />
        </Section>
        <Section pt="4">
          <TodoList />
        </Section>
      </Flex>
    </Container>
  );
}
