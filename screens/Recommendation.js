import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import Star from 'react-native-star-view';

export default class RecommendedMoviesScreen extends Component {
  /**
   * The constructor function initializes the state with an empty array for data and an empty string
   * for ngrok_url.
   * @param props - The `props` parameter in the constructor is used to pass data from a parent
   * component to the current component. It is an object that contains properties and values that are
   * passed as attributes when the component is used. These props can be accessed within the component
   * using `this.props`.
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ngrok_url: ""
    };
  }

  /**
   * The componentDidMount function is called when the component is mounted and it calls the getData
   * function.
   */
  componentDidMount() {
    this.getData();
  }

  /* The `getData` function is responsible for making an HTTP GET request to retrieve data from the
  server. It constructs the URL by appending the `ngrok_url` from the component's state with the
  endpoint `/recommended_movies`. It then uses the `axios` library to send the GET request to the
  constructed URL. */
  getData = () => {
    const url = this.state.ngrok_url + "/recommended_movies";
    axios
      .get(url)
      .then(async (response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /* The `keyExtractor` function is used in the `FlatList` component to extract a unique key for each
  item in the `data` array. It takes two parameters, `item` and `index`, and returns a string that
  represents the key for the item. In this case, it simply returns the index of the item converted
  to a string using the `toString()` method. This ensures that each item in the list has a unique
  key, which is required by React Native's `FlatList` component for efficient rendering and updating
  of the list items. */
  keyExtractor = (item, index) => index.toString();

  /* The `renderItems` function is a helper function used in the `FlatList` component's `renderItem`
  prop. It is responsible for rendering each item in the `data` array as a view with the specified
  styles. */
  renderItems = ({ item, index }) => {
    return (
      <View style={styles.cardContainer}>
        <Image
          style={styles.posterImage}
          source={{ uri: item.poster_link }}
        ></Image>
        <View style={styles.movieTitleContainer}>
          <Text style={styles.title}>{item.original_title}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.subtitle}>{item.duration} mins | </Text>
            <Star score={item.rating} style={styles.starStyle} />
          </View>
        </View>
      </View>
    );
  };

  /**
   * The render function returns a View component with an ImageBackground and a FlatList component
   * inside it, using data from the state.
   * @returns The render method is returning a View component that contains an ImageBackground
   * component and a FlatList component. The ImageBackground component is using an image file as its
   * source and has a flex value of 1. The FlatList component is using the data from the state, a
   * keyExtractor function, and a renderItem function to render a list of items.
   */
  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
          <FlatList
            data={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItems}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    borderRadius: RFValue(10),
    height: RFValue(200),
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(15),
  },
  posterImage: {
    flex: 1,
    borderRadius: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  movieTitleContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: RFValue(250),
    padding: RFValue(10),
    bottom: RFValue(10),
    left: RFValue(10),
    borderRadius: RFValue(10),
    borderWidth: RFValue(2),
    borderColor: "#3c8ed9"
  },
  starStyle: {
    width: RFValue(75),
    height: RFValue(15),
  }
});