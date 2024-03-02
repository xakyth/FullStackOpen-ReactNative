import { Alert, FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import { useMutation, useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import theme from '../theme';
import { convertDate } from '../utils';
import Button from './Button';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexDirection: 'column',
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: theme.colors.backgroundComponent,
    paddingBottom: 10,
  },
  viewRepositoryButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteReviewButton: {
    backgroundColor: theme.colors.error,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, refetchReviews }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleViewRepository = (repositoryId) => {
    navigate(`/repositoryList/${repositoryId}`);
  };
  const handleDeleteReview = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure to delete review?',
      [
        {
          text: 'DELETE',
          onPress: async () => {
            await deleteReview({
              variables: {
                reviewId,
              },
            });
            refetchReviews();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
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
          <Text fontWeight='bold'>{review.repository.fullName}</Text>
          <Text color='textSecondary'>{convertDate(review.createdAt)}</Text>
          <View style={styles.reviewTextContainer}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.viewRepositoryButton}
          label='View repository'
          onPress={() => {
            handleViewRepository(review.repository.id);
          }}
        />
        <Button
          style={styles.deleteReviewButton}
          label='Delete review'
          onPress={() => handleDeleteReview(review.id)}
        />
      </View>
    </View>
  );
};

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { data, refetch } = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true,
    },
  });

  useEffect(() => {
    if (data) {
      setReviews(data.me.reviews.edges.map((edge) => edge.node));
    }
  }, [data]);

  if (!data)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} refetchReviews={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;
