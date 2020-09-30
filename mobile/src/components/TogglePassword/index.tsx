import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Input, { InputProps } from '../Input';

interface TogglePasswordProps extends InputProps {
  inputReference?: any;
}

const TogglePassword: React.FC<TogglePasswordProps> = ({
  inputReference = null,
  name = 'password',
  icon = 'lock',
  ...rest
}) => {
  const [secure, setSecure] = useState(true);

  return (
    <Input
      name={name}
      ref={inputReference}
      icon={icon}
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
