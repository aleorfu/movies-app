import { View, Image, Text, ScrollView } from "react-native";

function ListCard({ title, content }: { title: string; content: string[] }) {
  return (
    <View className="bg-tertiary_color m-5 rounded-lg">
      <Text className="text-xl font-extrabold text-center m-2.5 text-quaternary_color">
        {title}
      </Text>
      <View>
        {content.map((item, index) => (
          <Text
            key={index}
            className="text-quaternary_color m-5 text-xl text-center"
          >
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

function TextCard({ title, content }: { title: string; content: string }) {
  return (
    <View className="bg-tertiary_color m-5 rounded-lg">
      <Text className="text-xl font-extrabold text-center m-2.5 text-quaternary_color">
        {title}
      </Text>
      <Text className="text-quaternary_color m-5 text-xl text-center">
        {content}
      </Text>
    </View>
  );
}

export default function MovieDetailsScreen({ route }: { route: any }) {
  const { item } = route.params;

  return (
    <ScrollView className="flex-1 bg-secondary_color">
      <Image
        source={{ uri: item.pictureUrl }}
        className="aspect-square"
        resizeMode="cover"
      />
      <Text className="text-quaternary_color text-3xl font-extrabold text-center m-2.5">
        {item.name}
      </Text>
      <TextCard title={"Descripción"} content={item.description} />
      <ListCard title={"Actores"} content={item.actors} />
      <ListCard title={"Categoría"} content={item.categories} />
      <ListCard
        title={"Otros datos"}
        content={[`Duración: ${item.duration}`, `Valoración: ${item.rating}/5`]}
      />
    </ScrollView>
  );
}
