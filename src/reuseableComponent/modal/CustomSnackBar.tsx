import { useEffect } from 'react';
import Snackbar from 'react-native-snackbar';

function CustomSnackBar({
  text,
  backGroundColor,
  textColor,
  duration = Snackbar.LENGTH_SHORT,
}: {
  text: string;
  backGroundColor: string;
  textColor: string;
  duration?: number; // Allow configurable duration
}) {
  useEffect(() => {
    if (text) {
      Snackbar.show({
        text,
        duration,
        backgroundColor: backGroundColor,
        textColor: textColor,
      });
    }
  }, [text, backGroundColor, textColor, duration]);

  return null; // No UI component, it's purely to trigger the Snackbar
}

export default CustomSnackBar;
