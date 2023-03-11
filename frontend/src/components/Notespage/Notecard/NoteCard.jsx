import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function NoteCard({ title, body, user, _id }) {
  return (
    <Card className='note-card' w={200} h={200}>
      <CardBody>
        <VStack>
          <Heading>{title}</Heading>
          <Text>{body}</Text>
          <Flex gap={2.2}>
            <Button>Update</Button>
            <Button>Delete</Button>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
}
