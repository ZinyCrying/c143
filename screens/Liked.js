/* The LikedMoviesScreen class is a React Native component that displays a list of liked movies with
their titles, durations, and star ratings. */
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

export default class LikedMoviesScreen extends Component {
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
   * The componentDidMount function is used to fetch data when the component is mounted.
   */
  componentDidMount() {
    this.getData();
  }
  /* The `getData` function is responsible for fetching data from the server. It constructs the URL by
  appending "/liked" to the `ngrok_url` stored in the component's state. Then, it uses the `axios`
  library to send a GET request to that URL. If the request is successful, the response data is
  extracted and stored in the component's state using `setState`. If there is an error, the error
  message is logged to the console. */

  getData = () => {
    const url = this.state.ngrok_url + "/liked";
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
item in the data array. In this case, it takes two parameters `item` and `index`, and returns the
index converted to a string. This ensures that each item in the list has a unique key, which is
required by React Native's `FlatList` component to efficiently render and update the list. */
  keyExtractor = (item, index) => index.toString();

  renderItems = ({ item, index }) => {
    return (
      <View style={styles.cardContainer}>
        <Image
          style={styles.posterImage}
          source={{ uri: item.poster_link }}
        ></Image>
        <View style={styles.movieTitleContainer}>
          {/* The line `<Text style={styles.title}>{item.original_title}</Text>` is rendering the
         original title of the movie as a text component. It uses the `styles.title` style to apply
         the specified styling to the text. The value of `item.original_title` is dynamically
         inserted into the text component using curly braces `{}`. */}
          <Text style={styles.title}>{item.original_title}</Text>
          <View style={{ flexDirection: "row" }}>
            { /* The line `<Text style={styles.subtitle}>{item.duration} mins | </Text>` is rendering the
            duration of the movie as a text component. It uses the `styles.subtitle` style to apply
            the specified styling to the text. The value of `item.duration` is dynamically inserted
            into the text component using curly braces `{}`. The text " mins | " is also rendered
            after the duration. */}
            <Text style={styles.subtitle}>{item.duration} mins | </Text>
            { /* The `<Star>` component is rendering a star rating based on the `item.rating` value. It
           takes two props: `score` and `style`. */}
            <Star score={item.rating} style={styles.starStyle} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
          {/* The `<FlatList>` component is a built-in component in React Native that is used to
          efficiently render and display a list of items. In this code, the `<FlatList>` component
          is used to render a list of liked movies. */}
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