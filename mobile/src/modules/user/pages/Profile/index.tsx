import React, { useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Form } from '@unform/mobile';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import { useAuth } from '../../../../hooks/auth';
import TogglePassword from '../../../../components/TogglePassword';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import {
  Container,
  Title,
  UserAvatar,
  UserAvatarButton,
  BackButton,
} from './styles';
import getValidationError from '../../../../utils/getValidationErrors';
import api from '../../../../services/api';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

interface User {
  name: string;
  avatar_url: string;
  email: string;
  id: string;
}

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailRef = useRef<TextInput>(null);
  const oldPasswordRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { user, updateUser } = useAuth();

  const handleUpdateUser = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Senhas não batem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          name: data.name,
          email: data.email,
          ...(data.old_password
            ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
              }
            : {}),
        };

        const { data: updatedUSer } = await api.put<User>('/profile', formData);
        updateUser(updatedUSer);

        Alert.alert('Perfil atualizado com sucesso');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro na atualização do perfil, tente novamente',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar Camera',
        chooseFromLibraryButtonTitle: 'Escolha da Galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          Alert.alert(
            'Erro',
            'Ocorreu um erro ao selecionar a imagem, verifique suas permissões',
          );
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}-${new Date().getTime()}.jpg`,
          uri: response.uri,
        });

        api
          .patch('users/avatar', data)
          .then((apiResponse) => updateUser(apiResponse.data))
          .catch((err) => console.log(err));
      },
    );
  }, [updateUser, user.id]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <BackButton
              onPress={() => {
                handleGoBack();
              }}
            >
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton
              onPress={() => {
                handleUpdateAvatar();
              }}
            >
              <UserAvatar
                source={{
                  uri: user.avatar_url,
                }}
              />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>
            <Form initialData={user} ref={formRef} onSubmit={handleUpdateUser}>
              <Input
                name="name"
                autoCapitalize="words"
                returnKeyType="next"
                icon="user"
                placeholder="Nome"
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
              />
              <Input
                ref={emailRef}
                name="email"
                returnKeyType="next"
                keyboardType="email-address"
                autoCompleteType="email"
                autoCapitalize="none"
                icon="mail"
                placeholder="E-mail"
                onSubmitEditing={() => {
                  oldPasswordRef.current?.focus();
                }}
              />
              <TogglePassword
                containerStyle={{
                  marginTop: 16,
                }}
                inputReference={oldPasswordRef}
                name="old_password"
                placeholder="Senha atual"
                autoCompleteType="password"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
              />

              <TogglePassword
                inputReference={passwordRef}
                placeholder="Nova senha"
                autoCompleteType="password"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordRef.current?.focus();
                }}
              />

              <TogglePassword
                name="password_confirmation"
                placeholder="Confirmar senha"
                inputReference={confirmPasswordRef}
                autoCompleteType="password"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
