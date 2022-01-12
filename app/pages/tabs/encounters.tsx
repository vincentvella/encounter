import * as React from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { useEncountersQuery, EncountersQuery } from '../../generated/types'
import { useTheme } from '../../services/theme';
import { ArrayElement } from '../../types/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    paddingHorizontal: 8,
  },
  inputContainer: {
    paddingVertical: 16
  }
})

type EncounterType = ArrayElement<Exclude<EncountersQuery['findAllEncounters'], null | undefined>>

type EncounterProps = {
  encounter: EncounterType
}

const Encounter: React.FC<EncounterProps> = ({ encounter }) => {
  const { colors } = useTheme()
  return (
    <Text style={[{ color: colors.text }]}>{JSON.stringify(encounter)}</Text>
  )
}

const renderItem = ({ item }: { item: EncounterType }) => <Encounter encounter={item} />

const keyExtractor = (item: EncounterType) => `${item.id}`

const Encounters = () => {
  const { colors } = useTheme()
  const { data, refetch, loading } = useEncountersQuery()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        keyExtractor={keyExtractor}
        refreshing={!!data && loading}
        onRefresh={refetch}
        data={data?.findAllEncounters}
        ListEmptyComponent={<ActivityIndicator size="large" />}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Encounters 