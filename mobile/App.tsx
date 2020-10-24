import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'

import mapMarlerImg from './src/images/map-marker.png';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -19.9289259,
          longitude: -44.0471957,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
      >
        <Marker
          icon={mapMarlerImg}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: -19.9289259,
            longitude: -44.0471957,
          }}
        >
          <Callout tooltip onPress={() => {}}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>
                Lar das Meninas
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText} >
            2 Orfanatos encontrados
          </Text>
          <TouchableOpacity 
            style={styles.createOrphanageButton} 
            onPress={() => {}}
          >
            <Feather name='plus' size={20} color="#fff" />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',

  },

  calloutText: {
    color: '#0089a5',

  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 44,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  }

});
