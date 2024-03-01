import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  pickerContainer: {
    height: 40,
    fontSize: theme.fontSizes.subheading,
    backgroundColor: theme.colors.backgroundComponent,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const navigate = useNavigate();
  const onPress = (id) => {
    navigate(`/repositoryList/${id}`);
  };

  return (
    <View style={styles.backgroundColor}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
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
  const { repositories, refetch } = useRepositories();
  const [orderBy, setOrderBy] = useState('latestReview');

  useEffect(() => {
    refetch(orderBy);
  }, [orderBy]);

  return (
    <View>
      <Picker
        selectedValue={orderBy}
        onValueChange={(itemValue) => setOrderBy(itemValue)}
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
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;
