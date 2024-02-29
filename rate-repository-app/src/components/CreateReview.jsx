import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Button from './Button';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  createButton: {
    marginTop: 10,
  },
});

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  reviewText: '',
};

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('${label} is required')
    .label('Repository owner name'),
  name: yup.string().required('${label} is required').label('Repository name'),
  rating: yup
    .number()
    .required('${label} is required')
    .min(0)
    .max(100)
    .label('Rating'),
  review: yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const handleSubmit = async ({ owner, name, rating, reviewText }) => {
    const review = {
      ownerName: owner,
      repositoryName: name,
      rating: Number(rating),
      text: reviewText,
    };

    createReview({
      variables: {
        review,
      },
    }).then((response) =>
      navigate(`/repositoryList/${response.data.createReview.repositoryId}`)
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput
            name='owner'
            placeholder='Repository owner name'
          ></FormikTextInput>
          <FormikTextInput
            name='name'
            placeholder='Repository name'
          ></FormikTextInput>
          <FormikTextInput
            name='rating'
            placeholder='Rating between 0 and 100'
          ></FormikTextInput>
          <FormikTextInput
            name='reviewText'
            placeholder='Review'
            multiline
          ></FormikTextInput>
          <Button
            style={styles.createButton}
            label='Create a review'
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;
