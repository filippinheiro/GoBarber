import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Platform, Alert, ActivityIndicator, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker, {
  AndroidEvent,
} from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../services/api';
import {
  Container,
  BackButton,
  Header,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersList,
  ProvidersListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePicker,
  OpenDatePickerText,
  Schedule,
  Section,
  SectionTitle,
  Hour,
  HourText,
  SectionContainer,
  CreateAppointmentButton,
  CreateAccountButtonText,
} from './styles';

import { useAuth } from '../../../../hooks/auth';

interface RouteParams {
  providerId: string;
  providers: IProvider[];
}

export interface IProvider {
  name: string;
  avatar_url: string;
  id: string;
}

export interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const { providerId } = useRoute().params as RouteParams;

  const [loadingHours, setLoadingHours] = useState(true);
  const [loadingProvider, setLoadingProvider] = useState(true);
  const [providers, setProviders] = useState<IProvider[]>();
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailabilty] = useState<AvailabilityItem[]>([]);
  const [selectedHour, setSelectedHour] = useState(0);

  useEffect(() => {
    setLoadingProvider(true);
    api.get<IProvider[]>('providers').then((response) => {
      setProviders(response.data);
      setLoadingProvider(false);
    });
  }, []);

  useEffect(() => {
    setLoadingHours(true);
    api
      .get<AvailabilityItem[]>(
        `providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      )
      .then((response) => {
        setAvailabilty(response.data);
        setLoadingHours(false);
      });
  }, [selectedDate, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const handleSelectedHour = useCallback((hour) => {
    setSelectedHour(hour);
  }, []);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((oldShow) => !oldShow);
  }, []);

  const handleDateChanged = useCallback(
    (_: AndroidEvent, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) setSelectedDate(date);
    },
    [],
  );

  const handleCreateAppointment = useCallback(async () => {
    try {
      if (selectedHour !== 0) {
        const date = new Date(selectedDate);

        date.setHours(selectedHour);
        date.setMinutes(0);

        await api.post('appointments', {
          provider_id: selectedProvider,
          date,
        });

        navigate('AppointmentCreated', {
          date: date.getTime(),
        });

        return;
      }

      Alert.alert(
        'Selecione uma data',
        'Você deve selecionar uma data para agendar o corte',
      );
    } catch {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro na agendar seu corte de cabelo',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar
          source={{
            uri: user.avatar_url,
          }}
        />
      </Header>
      <Content>
        <ProvidersListContainer>
          {loadingProvider && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                alignContent: 'center',
                paddingTop: 10,
              }}
            >
              <ActivityIndicator size="large" color="#999" />
            </View>
          )}
          {!loadingProvider && (
            <>
              <ProvidersList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={providers}
                keyExtractor={(provider) => provider.id}
                renderItem={({ item: provider }) => (
                  <ProviderContainer
                    onPress={() => handleSelectProvider(provider.id)}
                    selected={provider.id === selectedProvider}
                  >
                    <ProviderAvatar
                      source={{
                        uri: provider.avatar_url,
                      }}
                    />
                    <ProviderName selected={provider.id === selectedProvider}>
                      {provider.name}
                    </ProviderName>
                  </ProviderContainer>
                )}
              />
            </>
          )}
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha uma data</Title>
          <OpenDatePicker onPress={handleToggleDatePicker}>
            <OpenDatePickerText>Selecionar outra data</OpenDatePickerText>
          </OpenDatePicker>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              onChange={handleDateChanged}
              display="calendar"
              textColor="#f4edf8"
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          {loadingHours && <ActivityIndicator size="large" color="#999" />}

          {!loadingHours && (
            <>
              <Section>
                <SectionTitle>Manhã</SectionTitle>

                <SectionContainer>
                  {morningAvailability.map(
                    ({ formattedHour, hour, available }) => (
                      <Hour
                        enabled={available}
                        selected={selectedHour === hour}
                        available={available}
                        key={formattedHour}
                        onPress={() => handleSelectedHour(hour)}
                      >
                        <HourText selected={selectedHour === hour}>
                          {formattedHour}
                        </HourText>
                      </Hour>
                    ),
                  )}
                </SectionContainer>
              </Section>

              <Section>
                <SectionTitle>Tarde</SectionTitle>
                <SectionContainer>
                  {afternoonAvailability.map(
                    ({ formattedHour, hour, available }) => (
                      <Hour
                        enabled={available}
                        selected={selectedHour === hour}
                        available={available}
                        key={formattedHour}
                        onPress={() => handleSelectedHour(hour)}
                      >
                        <HourText selected={selectedHour === hour}>
                          {formattedHour}
                        </HourText>
                      </Hour>
                    ),
                  )}
                </SectionContainer>
              </Section>

              <CreateAppointmentButton onPress={handleCreateAppointment}>
                <CreateAccountButtonText>Agendar</CreateAccountButtonText>
              </CreateAppointmentButton>
            </>
          )}
        </Schedule>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
