import React, { useRef, useState, useContext, useEffect } from 'react';

import { userContext } from '~/contexts/UserContext';
import { authContext } from '~/contexts/AuthContext';
import Background from '~/components/Background';

import {
  Container,
  Title,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  LogOutButton,
} from './styles';

import Colors from '~/styles/colors';

function Profile() {
  // Contexts
  const { logOutRequest } = useContext(authContext);
  const { updateUserRequest, user, loading } = useContext(userContext);

  // Field's reference
  const emailRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const passwordConfirmationRef = useRef();

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    function loadUserInfo() {
      setName(user.name);
      setEmail(user.email);
    }

    if (user) {
      loadUserInfo();
    }
  }, [user]);

  function handleSubmit() {
    const data = {
      name,
      email,
      password,
      oldPassword,
      passwordConfirmation,
    };

    updateUserRequest(data);

    setOldPassword('');
    setPassword('');
    setPasswordConfirmation('');
  }

  function handleLogOut() {
    logOutRequest();
  }

  return (
    <Background>
      <Container>
        <Title>My Profile</Title>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Type your full name"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Type your email"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Type your current password"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Type your new password"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordConfirmationRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Type your new password confirmation"
            ref={passwordConfirmationRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
          />

          <SubmitButton
            color={Colors.secondary}
            loading={loading}
            onPress={handleSubmit}
          >
            Update Profile
          </SubmitButton>
          <LogOutButton
            color={Colors.light}
            loading={loading}
            onPress={handleLogOut}
          >
            Log Out
          </LogOutButton>
        </Form>
      </Container>
    </Background>
  );
}

export default Profile;
