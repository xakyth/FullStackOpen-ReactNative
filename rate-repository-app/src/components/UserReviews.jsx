import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import { ReviewItem } from './SingleRepository';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const user = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true,
    },
  });

  if (!user || !user.data)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  const reviews = user.data.me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;
