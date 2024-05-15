import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import React from "react";
import { ProfileStackNav } from "@src/navigations/ProfileStackNav";
import { colors } from "@src/styles/tailwindColors";
import { useColorScheme } from "react-native";
import { DocumentsScreen } from "@src/screens/profile/DocumentsScreen";

const Tab = createMaterialTopTabNavigator();

const getOptions = (
  isLight: boolean,
  title: string,
): MaterialTopTabNavigationOptions => {
  return {
    title: title,
    tabBarActiveTintColor: isLight
      ? colors.quaternary_light
      : colors.quaternary_dark,
    tabBarInactiveTintColor: isLight
      ? colors.quaternary_light
      : colors.quaternary_dark,
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
