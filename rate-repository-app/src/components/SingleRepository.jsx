import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import { FlatList, StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';
import Button from './Button';
import theme from '../theme';
import Text from './Text';
import { convertDate } from '../utils';

const styles = StyleSheet.create({
  openInGitHubButton: {
    marginBottom: 10,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  reviewContainer: {
    backgroundColor: theme.colors.backgroundComponent,
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  reviewRatingContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 'medium',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  reviewRatingText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  reviewContentContainer: {
    marginTop: 5,
    flex: 1,
  },
  reviewTextContainer: {
    marginTop: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  const handleOpenInGitHub = (url) => {
    Linking.openURL(url);
  };
  return (
    <View>
      <RepositoryItem item={repository} />
      <Button
        onPress={() => handleOpenInGitHub(repository.url)}
        label='Open in GutHub'
        style={styles.openInGitHubButton}
      ></Button>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRatingContainer}>
        <Text
          fontSize='subheading'
          color='primary'
          style={styles.reviewRatingText}
        >
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewContentContainer}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text color='textSecondary'>{convertDate(review.createdAt)}</Text>
        <View style={styles.reviewTextContainer}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const [repository, setRepository] = useState();
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const first = 5;
  const { data, fetchMore } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { repositoryId: id, first },
    fetchPolicy: 'cache-and-network',
    skip: !id,
  });

  useEffect(() => {
    if (data) {
      setRepository(data.repository);
      setReviews(data.repository.reviews.edges.map((edge) => edge.node));
    }
  }, [data]);

  const onEndReach = async () => {
    const response = await fetchMore({
      variables: {
        repository: id,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
    setReviews(
      reviews.concat(
        response.data.repository.reviews.edges.map((edge) => edge.node)
      )
    );
  };

  if (!repository) return null;
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
