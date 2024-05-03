import { Text, View } from "react-native";

type ListCardProps = {
  title: string;
  content: string[];
};

const style = {
  card: "m-5 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  text: "text-xl font-extrabold text-center m-2.5 text-quaternary_light dark:text-quaternary_dark",
  content:
    "m-5 text-xl text-center text-quaternary_light dark:text-quaternary_dark",
};

const ListCard = ({ title, content }: ListCardProps): React.JSX.Element => {
  return (
    <View className={style.card}>
      <Text className={style.text}>{title}</Text>
      <View>
        {content.map((item: string, index: number) => (
          <Text key={index} className={style.content}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

export { ListCard, ListCardProps };
