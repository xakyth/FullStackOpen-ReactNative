import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import Button from './Button';

const RepositoryInfo = ({ item }) => {
  const handleOpenInGitHub = (url) => {
    Linking.openURL(url);
  };
  return (
    <View>
      <RepositoryItem item={item} />
      <Button
        onPress={() => handleOpenInGitHub(item.url)}
        label='Open in GutHub'
      ></Button>
    </View>
  );
};

const SingleRepository = () => {
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
  return <RepositoryInfo item={item} />;
};

export default SingleRepository;
