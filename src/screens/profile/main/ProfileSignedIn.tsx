import { Fragment, useContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert, Text } from "react-native";
import { Button } from "../../../components/Button";
import { UserContext } from "../../../contexts/UserContext";

const style = {
  email:
    "text-lg my-3 text-center text-quaternary_light dark:text-quaternary_dark",
  button: {
    button:
      "mx-8 rounded-md p-3 my-2 shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const ProfileSignedIn = (): React.JSX.Element => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Fragment>
      <Text className={style.email}>{user?.email}</Text>
      <Button
        text="Sign-Out"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={() => {
          setLoading(true);
          auth()
            .signOut()
            .catch(() => {
              Alert.alert(
                "There was an error while signing you out.",
                "Please, try again later."
              );
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        loading={loading}
      />
    </Fragment>
  );
};

export { ProfileSignedIn };
