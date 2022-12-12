import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  ContainerForm,
  ContactForm,
  Lable,
  Button,
  Input,
} from './ContactForm.styled';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().min(5).max(12).required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const Form = ({ contacts, onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (contacts.some(contact => contact.name === values.name)) {
      alert(`${values.name} is already in contacts`);
    } else {
      onSubmit(values);
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <ContainerForm>
        <ContactForm>
          <Lable>
            Name
            <Input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ErrorMessage name="name" />
          </Lable>
          <Lable>
            Number
            <Input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <ErrorMessage name="number" />
          </Lable>

          <Button type="submit">Add contacts</Button>
        </ContactForm>
      </ContainerForm>
    </Formik>
  );
};

Form.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onSubmit: PropTypes.func,
};
