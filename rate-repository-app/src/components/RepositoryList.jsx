import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import TextInput from './TextInput';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  pickerContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    height: 40,
    fontSize: theme.fontSizes.subheading,
    backgroundColor: theme.colors.backgroundComponent,
  },
  filterContainer: {
    margin: 10,
    height: 40,
    backgroundColor: theme.colors.backgroundComponent,
  },
  filterText: {
    height: 40,
    fontSize: theme.fontSizes.subheading,
    paddingLeft: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const navigate = useNavigate();
  const onPress = (id) => {
    navigate(`/repositoryList/${id}`);
  };

  return (
    <View style={styles.backgroundColor}>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => onPress(item.id)}>
              <RepositoryItem item={item} />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [repositoryOrder, setRepositoryOrder] = useState('latestReview');
  const [orderBy, setOrderby] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [filter, setFilter] = useState('');
  const [searchKeyword] = useDebounce(filter, 500);
  const first = 8;
  const { repositories, refetch, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword,
    first,
  });

  useEffect(() => {
    refetch();
  }, [orderBy, orderDirection, searchKeyword]);

  const onEndReach = () => {
    fetchMore();
  };

  useEffect(() => {
    switch (repositoryOrder) {
      case 'latestReview':
        setOrderby('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highestReview':
        setOrderby('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowestReview':
        setOrderby('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        break;
    }
  }, [repositoryOrder]);

  return (
    <View>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterText}
          placeholder='Filter...'
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
        />
      </View>
      <Picker
        selectedValue={repositoryOrder}
        onValueChange={(itemValue) => setRepositoryOrder(itemValue)}
        style={styles.pickerContainer}
      >
        <Picker.Item
          key=''
          label='Select an item...'
          value={undefined}
          enabled={false}
        />
        <Picker.Item label='Latest repositories' value='latestReview' />
        <Picker.Item label='Highest rated repositories' value='highestReview' />
        <Picker.Item label='Lowest rated repositories' value='lowestReview' />
      </Picker>
      <RepositoryListContainer
        onEndReach={onEndReach}
        repositories={repositories}
      />
    </View>
  );
};

export default RepositoryList;
