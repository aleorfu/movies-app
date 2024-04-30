/*
I you want to add an image into the dictionary you must add it first to "ImageKeys".
This is because I want "images" to return numbers, which is the data type for images source.
*/

type ImageKeys = "back_icon" | "home_icon" | "list_icon" | "profile_icon";

type ImageDictionary = {
  [k in ImageKeys]: number;
};

const images: ImageDictionary = {
  back_icon: require("../../assets/img/back-icon.png"),
  home_icon: require("../../assets/img/home-icon.png"),
  list_icon: require("../../assets/img/list-icon.png"),
  profile_icon: require("../../assets/img/profile-icon.png"),
};

export { images, ImageDictionary };
