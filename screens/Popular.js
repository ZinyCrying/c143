/* The `PopularMoviesScreen` class is a React component that displays a list of popular movies with
their titles, durations, and ratings. */
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

export default class PopularMoviesScreen extends Component {
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

 /* The `getData` function is an arrow function that is used to fetch data from a specified URL and
 update the state of the component with the fetched data. */
  getData = () => {
    const url = this.state.ngrok_url + "/popular_movies";
    axios
      .get(url)
      .then(async (response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItems = ({ item, index }) => {
    return (
      <View style={styles.cardContainer}>
        {/* The code `<Image
                  style={styles.posterImage}
                  source={{ uri: item.poster_link }}
                ></Image>` is rendering an `<Image>` component with the style defined in the
        `styles.posterImage` object. It displays an image with the source specified by the
        `poster_link` property of the `item` object. The `poster_link` is a URL that points to the
        image file. */}
        <Image
          style={styles.posterImage}
          source={{ uri: item.poster_link }}
        ></Image>

        <View style={styles.movieTitleContainer}>
          {/* The code `<Text style={styles.title}>{item.original_title}</Text>` is rendering a `<Text>`
         component with the style defined in the `styles.title` object. It displays the
         `original_title` property of the `item` object, which is a title of a movie. */}
          <Text style={styles.title}>{item.original_title}</Text>

          <View style={{ flexDirection: "row" }}>
            {/* The code `<Text style={styles.subtitle}>{item.duration} mins | </Text>
            <Star score={item.rating} style={styles.starStyle}/>` is rendering two components inside
            the `renderItems` function of the `PopularMoviesScreen` class. */}
            <Text style={styles.subtitle}>{item.duration} mins | </Text>
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