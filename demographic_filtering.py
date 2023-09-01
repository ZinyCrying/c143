# The code is importing the pandas library and assigning it the alias "pd". Then, it creates a
# dataframe by reading the data from a CSV file called "final.csv". The dataframe is then sorted in
# ascending order based on the values in the "weighted_rating" column. Finally, a new dataframe called
# "output" is created by selecting specific columns from the sorted dataframe and taking the first 20
# rows.
import pandas as pd

# create a dataframe using final.csv file
df = pd.read_csv('C:/Users/arnav/Documents/coding/python/C140-142/C142/final.csv')

# sorting dataframe : wrt to weighted rating col in ascending order
df = df.sort_values('weighted_rating' , ascending = False)

# final dataframe
output = df[['original_title' , 'poster_link' , 'runtime', 'release_date' , 'weighted_rating' ]].head(20)
