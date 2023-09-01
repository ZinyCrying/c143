# """
# The code above creates a recommendation system using cosine similarity to recommend movies based on
# their similarity to a given movie title.

# :param title: The title of the movie for which you want to get recommendations
# :return: The function `get_recommendations` returns a DataFrame containing the original title,
# poster link, runtime, release date, and weighted rating of the top 10 movies that are most similar
# to the input title.
# """
#


# The code is importing the necessary libraries for the recommendation system.
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# creating df
# The line `df = pd.read_csv("final.csv")` is reading a CSV file named "final.csv" and creating a
# DataFrame called `df` from the data in the CSV file.
df = pd.read_csv("C:/Users/arnav/Documents/coding/python/C140-142/C142/final.csv")

# notna function maps exisitng elements with true and non exisiting elements to false
# this operation removes rows mapped to false
# The line `df = df[df["soup"].notna()]` is filtering the DataFrame `df` to remove rows where the
# "soup" column is not populated (i.e., not NaN). This operation removes rows that have missing values
# in the "soup" column.
df = df[df["soup"].notna()]

# creating matix / vector
# The code is creating a CountVectorizer object called `count` and using it to transform the "soup"
# column of the DataFrame `df` into a matrix representation called `count_matrix`.
count = CountVectorizer(stop_words="english")
count_matrix = count.fit_transform(df["soup"])

# similarity object : classifier
# `cosine_sim2 = cosine_similarity(count_matrix, count_matrix)` is calculating the cosine similarity
# between each pair of movies in the `count_matrix`.
cosine_sim2 = cosine_similarity(count_matrix, count_matrix)

# resetting index of dataframe
# The code `df = df.reset_index()` is resetting the index of the DataFrame `df`. This is done to
# ensure that the index of the DataFrame is sequential and starts from 0.
df = df.reset_index()
indices = pd.Series(df.index, index=df["original_title"])


def get_recommendations(title):
    #    """
    #    The `get_recommendations` function takes a movie title as input and returns a list of 10 recommended
    #    movies based on similarity scores.

    #    :param title: The `title` parameter is the title of a movie for which you want to get
    #    recommendations
    #    :return: The function `get_recommendations` returns a DataFrame containing information about 10
    #    recommended movies. The DataFrame includes columns for the original title, poster link, runtime,
    #    release date, and weighted rating of each recommended movie.
    #    """
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim2[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    movie_indices = [i[0] for i in sim_scores]

    return df[
        ["original_title", "poster_link", "runtime", "release_date", "weighted_rating"]
    ].iloc[movie_indices]
