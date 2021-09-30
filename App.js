import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
  Button,
  Linking,
} from 'react-native';
import Search from './src/components/Search';

const App = props => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [currentUrl, setCurrentUrl] = useState('http://google.com');

  useEffect(() => {
    setIsLoading(true);
    getData();
    // console.log(data)
  }, [pageNumber]);

  const getData = async () => {
    const apiUrl =
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' +
      pageNumber;
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        setData(data.concat(res.hits));
        setIsLoading(false);
      });
  };
  const startModal = item => {
    setModalData(item);
    setModalVisible(true);
    setCurrentUrl(item.url);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item.title);
          startModal(item);
        }}>
        <View style={styles.card}>
          <Text style={styles.carddate}>** {item.created_at.slice(0, 10)}</Text>
          <Text style={styles.cardtitle}>{item.title}</Text>
          <Text style={styles.cardauthor}>by: {item.author}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
  };
  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
    setIsLoading(true);
  };
  return (
    <View style={styles.root}>
      <Search data={data} onClickModal={startModal}/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => {
            setModalVisible(false);
          }}>
          <TouchableOpacity
            style={styles.modal}
            onPress={() => Linking.openURL(currentUrl)}
            activeOpacity={1}>
            <Button
              title="close"
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <ScrollView>
              <Text>{JSON.stringify(modalData)}</Text>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.story_id + index}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modal: {
    width: 350,
    height: 300,
    backgroundColor: 'white',
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    margin: 8,
    padding: 20,
    borderRadius: 10,
  },
  carddate: {
    color: 'blue',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardtitle: {
    marginTop: 5,
    color: 'black',
    fontSize: 20,
  },
  cardauthor: {
    marginTop: 10,
    color: 'grey',
    fontSize: 15,
  },
  footer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
});
