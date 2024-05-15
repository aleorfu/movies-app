import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import React from "react";
import { colors } from "@src/styles/tailwindColors";
import { useColorScheme } from "react-native";
import { DocumentsScreen } from "@src/screens/profile/DocumentsScreen";
import { ProfileStackNav } from "@src/navigations/ProfileStackNav";

const Tab = createMaterialTopTabNavigator();

const getOptions = (
  isLight: boolean,
  title: string,
): MaterialTopTabNavigationOptions => {
  return {
    title: title,
    tabBarStyle: isLight
      ? {
          backgroundColor: colors.primary_light,
          shadowColor: "black",
        }
      : {
          backgroundColor: colors.primary_dark,
          shadowColor: "white",
        },
    tabBarLabelStyle: isLight
      ? { color: colors.quaternary_light, fontWeight: "bold" }
      : { color: colors.quaternary_dark, fontWeight: "bold" },
  };
};

const ProfileTabNav = (): React.JSX.Element => {
  const isLight = useColorScheme() === "light";

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ProfileInfoTab"
        component={ProfileStackNav}
        options={getOptions(isLight, "Info")}
      />
      <Tab.Screen
        name="ProfileDocumentsTab"
        component={DocumentsScreen}
        options={getOptions(isLight, "Documents")}
      />
    </Tab.Navigator>
  );
};

export { ProfileTabNav };
