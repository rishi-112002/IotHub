import React, {useState, useRef, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetRefProp} from './BottomSheet';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';

const ShowBottomSheet: React.FC = () => {
  const ref = useRef<BottomSheetRefProp>(null);
  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Show Comments</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>Show Comments</Text>
        </TouchableOpacity>

        <BottomSheet ref={ref}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {Array.from({length: 20}, (_, index) => (
              <View key={index} style={styles.commentCard}>
                <Text style={styles.commentText}>Comment {index + 1}</Text>
              </View>
            ))}
          </ScrollView>
        </BottomSheet>
        {/* {isModalVisible && <BottomSheet />} */}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  button1: {
    flex: 1,
    // marginTop: -100,
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  scrollContainer: {
    // flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  commentCard: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
  },
  commentText: {
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ShowBottomSheet;
