/* The HomeScreen class is a React component that displays movie details and allows users to like,
dislike, or mark movies as not watched. 

#J6PMVJRCATD2Q5VIUOAIXZ5PEWWZDTQC

The routes were---
he Flask app is returning JSON responses for various routes. The routes include:
# - "/movies": Returns details of a movie.
# - "/like": Adds a movie to the liked movies list.
# - "/liked": Returns the list of liked movies.
# - "/dislike": Adds a movie to the not liked movies list.
# - "/did_not_watch": Adds a movie to the did not watch list.
# - "/popular_movies": Returns the list of popular movies .
# - "/recommended_movies": Returns the list of recommended movies .
*/
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import Star from "react-native-star-view";

export default class HomeScreen extends Component {
  /**
   * The above code snippet is a constructor function in JavaScript that initializes the state of a
   * component with two properties: "movieDetails" and "ngrok_url".
   */
  constructor() {
    super();
    this.state = {
      movieDetails: {},
      ngrok_url: "",
    };
  }

  /**
   * The componentDidMount function is called when the component is mounted and it calls the getMovie
   * function.
   */
  componentDidMount() {
    this.getMovie();
  }

  /*define getmovie(), likedMovie(), dislikedMovie() ,notWatched() functions here*/

  /* The `getMovie` function is making a GET request to the `/movies` endpoint using the `axios` library.
  It is then handling the response by updating the `movieDetails` state with the data received from
  the response. If there is an error, it logs the error message to the console. This function is used
  to fetch a new movie recommendation and update the state with the details of the fetched movie. */
  getMovie = () => {
    const url = this.state.ngrok_url + "/movies";
    axios
      .get(url)
      .then((response) => {
        this.setState({ movieDetails: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /* The `likedMovie` function is making a GET request to the `/like` endpoint using the `axios` library.
  It is then handling the response by calling the `getMovie` function to fetch a new movie. If there
  is an error, it logs the error message to the console. This function is used to mark the current
  movie as "liked" and fetch a new movie recommendation. */
  likedMovie = () => {
    const url = this.state.ngrok_url + "/like";
    axios
      .get(url)
      .then((response) => {
        this.getMovie();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /* The `dislikedMovie` function is making a GET request to the `/dislike` endpoint using the `axios`
  library. It is then handling the response by calling the `getMovie` function to fetch a new movie.
  If there is an error, it logs the error message to the console. This function is used to mark the
  current movie as "disliked" and fetch a new movie recommendation. */
  dislikedMovie = () => {
    const url = this.state.ngrok_url + "/dislike";
    axios
      .get(url)
      .then((response) => {
        this.getMovie();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /* The `notWatched` function is making a GET request to the `/did_not_watch` endpoint using the `axios`
  library. It is then handling the response by calling the `getMovie` function to fetch a new movie.
  If there is an error, it logs the error message to the console. This function is used to mark the
  current movie as "not watched" and fetch a new movie recommendation. */
  notWatched = () => {
    const url = this.state.ngrok_url + "/did_not_watch";
    axios
      .get(url)
      .then((response) => {
        this.getMovie();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /**
   * The `render()` function displays movie details including the poster image, movie name, release
   * date, duration, and rating, along with buttons to like, dislike, or mark the movie as not watched.
   * @returns The render() method is returning a JSX code that renders a view with various components
   * such as ImageBackground, Text, Image, and TouchableOpacity. The components are used to display
   * movie details such as the poster image, movie name, release date, duration, and rating. It also
   * includes buttons for liking, disliking, and marking the movie as not watched. If the movieDetails
   * object does not have
   */
  render() {
    const { movieDetails } = this.state;
    if (movieDetails.poster_link) {
      const { poster_link, original_title, release_date, duration, rating } =
        movieDetails;

      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/bg.png")}
            style={{ flex: 1 }}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Movie Recommendation</Text>
              <Icon
                name="chevron-right"
                type="feather"
                color={"white"}
                size={RFValue(30)}
                containerStyle={{ position: "absolute", right: RFValue(5) }}
                onPress={() => {
                  this.props.navigation.navigate("Movies");
                }}
              ></Icon>
            </View>

            <View style={styles.subContainer}>
              <View style={styles.posterContainer}>
                {/*Add the component for poster image below*/}
                <Image
                  style={styles.posterImage}
                  source={{ uri: poster_link }}
                />
              </View>
              <View style={{ flex: 0.15 }}>
                {/*Add the components to show the movie name and 
                other details ( release date & duration) below*/}
                <View style={styles.detailsContainer}>
                  <Text style={styles.title}>{original_title}</Text>
                  <Text style={styles.subtitle}>
                    {release_date.split("-")[0]} | {duration} mins
                  </Text>
                </View>
              </View>
              <View style={styles.ratingContainer}>
                {/*Add the components to show rating of the movie below*/}
                <Star score={rating} style={styles.starStyle} />
              </View>
              <View style={styles.iconButtonContainer}>
                {/*Add the code for like, dislike and notWatched button below*/}
                <TouchableOpacity onPress={this.likedMovie}>
                  <Image
                    style={styles.iconImage}
                    source={require("../assets/like.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.dislikedMovie}>
                  <Image
                    style={styles.iconImage}
                    source={require("../assets/dislike.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.notWatched}>
                  <Image
                    style={styles.iconImage}
                    source={require("../assets/didNotWatch.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flex: 0.07,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#182854",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18),
    fontFamily: "monospace",
    textAlign: "center",
    flex: 1,
  },
  subContainer: {
    flex: 0.9,
  },
  posterContainer: {
    flex: 0.65,
    marginBottom: RFValue(10),
    justifyContent: "center",
    alignItems: "center",
  },
  posterImage: {
    width: RFValue(280),
    height: RFValue(380),
    resizeMode: "stretch",
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(5),
  },
  detailsContainer: {
    width: RFValue(280),
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    padding: RFValue(10),
    borderColor: "#182854",
    borderWidth: RFValue(2),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#182854",
    fontFamily: "monospace",
    marginVertical: RFValue(5),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "#182854",
    fontFamily: "monospace",
    marginVertical: RFValue(5),
  },
  ratingContainer: {
    flex: 0.1,
    alignItems: "center",
  },
  overview: {
    fontSize: RFValue(13),
    color: "#182854",
    fontFamily: "monospace",
    marginVertical: RFValue(5),
  },
  iconButtonContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  iconImage: {
    width: RFValue(50),
    height: RFValue(50),
  },
  starStyle: {
    width: RFValue(200),
    height: RFValue(40),
  },
});