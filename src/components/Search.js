import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const Search = ({data, onClickModal}) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  useEffect(() => {
    // console.log(searchText)
    if (searchText == '') {
      setResults([]);
    } else {
      search();
    }
    console.log(results.length);
  }, [searchText]);

  const search = () => {
    var x = _.filter(data, function (item) {
      return item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||item.author.toLowerCase().indexOf(searchText.toLowerCase())>-1;
    });
    setResults(x);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item.title);
          onClickModal(item);
        }}>
        <View style={styles.card}>
          <Text style={styles.cardtitle}>{item.title}</Text>
          <Text style={styles.cardauthor}>by: {item.author}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchbox}>
        <View style={styles.textinput}>
          <TextInput
            placeholder="search text"
            style={{flex: 1}}
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
        </View>
        <View style={styles.clearbtn}>
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Text>clear</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.resultmodal}>
        {results.length ? (
          <>
            <Text>Search Results</Text>
            <FlatList
              data={results}
              renderItem={renderItem}
              keyExtractor={(item, index) => item.story_id + index}
            />
          </>
        ) : null}
      </View>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    margin: 10,
  },
  searchbox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    height: 50,
  },
  textinput: {
    justifyContent: 'center',
    width: 310,
  },
  clearbtn: {
    margin: 5,
  },
  resultmodal: {
    marginTop: 10,
    marginBottom:10
  },

  card: {
    backgroundColor: 'white',
    margin: 8,
    padding: 10,
    borderRadius: 40,
    borderColor: 'orange',
    borderWidth: 2,
  },
  cardtitle: {
    marginHorizontal: 10,
    color: 'black',
    fontSize: 15,
  },
  cardauthor: {
    marginHorizontal: 10,
    color: 'grey',
    fontSize: 15,
  },
});
