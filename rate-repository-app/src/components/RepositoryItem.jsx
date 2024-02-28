import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { roundStatNumber } from '../utils';
import { useParams } from 'react-router-native';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import { useEffect } from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundComponent,
    padding: 10,
  },
  profilePicture: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  bodyContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  statsContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tagContainer: {
    backgroundColor: theme.colors.primary,
    marginTop: 5,
    padding: 5,
    borderRadius: 4,
  },
  tagText: {
    color: '#ffffff',
  },
  statItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const RepositoryItemById = () => {
  const [item, setItem] = useState();
  const { id } = useParams();
  const [getRepositoryById] = useLazyQuery(GET_REPOSITORY_BY_ID, {
    variables: { repositoryId: id },
  });

  const findById = async () => {
    const response = await getRepositoryById();
    setItem(response.data.repository);
  };

  useEffect(() => {
    findById();
  }, []);

  if (!item) return null;
  return <RepositoryItem item={item} />;
};

const RepositoryItem = ({ item }) => {
  return (
    <View testID='repositoryItem' style={styles.container}>
      <View style={styles.bodyContainer}>
        <Image
          style={styles.profilePicture}
          source={{ uri: item.ownerAvatarUrl }}
        ></Image>
        <View style={styles.infoContainer}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text color='textSecondary'>{item.description}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text fontWeight='bold'>{roundStatNumber(item.stargazersCount)}</Text>
          <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight='bold'>{roundStatNumber(item.forksCount)}</Text>
          <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight='bold'>{roundStatNumber(item.reviewCount)}</Text>
          <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight='bold'>{roundStatNumber(item.ratingAverage)}</Text>
          <Text color='textSecondary'>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
