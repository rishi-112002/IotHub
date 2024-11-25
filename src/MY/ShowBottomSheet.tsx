import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView, Modal } from 'react-native';
import BottomSheet, { BottomSheetRefProp } from './BottomSheet';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ShowBottomSheet: React.FC = () => {
  const ref = useRef<BottomSheetRefProp>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenSheet = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
      setIsVisible(false);
    } else {
      ref?.current?.scrollTo(-SCREEN_HEIGHT);
      setIsVisible(true);
    }
  }, []);

  const handleSendComment = () => {
    if (commentText.trim()) {
      setComments((prev) => [commentText, ...prev]);
      setCommentText('');
    }
  };

  const handleCloseSheet = () => {
    ref?.current?.scrollTo(0);
    setIsVisible(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOpenSheet} style={styles.button}>
          <Text style={styles.buttonText}>Show Comments</Text>
        </TouchableOpacity>

        {/* Background overlay when the sheet is open */}
        {isVisible && (
          <Modal transparent={true} visible={isVisible} animationType="fade" onRequestClose={handleCloseSheet}>
            <View style={styles.overlay} onTouchStart={handleCloseSheet} />
          </Modal>
        )}

        <BottomSheet ref={ref}>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {comments.map((comment, index) => (
                <View key={index} style={styles.commentCard}>
                  <Text style={styles.commentText}>{comment}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Add a comment..."
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContainer: {
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
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingLeft: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ShowBottomSheet;
