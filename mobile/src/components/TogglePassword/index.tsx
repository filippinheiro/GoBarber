import React, { useState, forwardRef } from 'react';

import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Input from '../Input';

interface ToggleProps extends TextInputProps {
  inputReference?: any;
}

const TogglePassword: React.FC<ToggleProps> = ({
  inputReference = null,
  ...rest
}) => {
  const [secure, setSecure] = useState(true);

  return (
    <Input
      ref={inputReference}
      name="password"
      icon="lock"
      placeholder="Senha"
      secureTextEntry={secure}
      {...rest}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setSecure(!secure);
        }}
      >
        <Icon name={secure ? 'eye' : 'eye-off'} size={20} color="#666360" />
      </TouchableWithoutFeedback>
    </Input>
  );
};

export default TogglePassword;
