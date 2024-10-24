import Snackbar from "react-native-snackbar";

function CustomSnackBar(props: { text: string, backGroundColor: any, textColor: any }) {
  const { text, backGroundColor, textColor } = props
  return (
    Snackbar.show({
      text: text,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: backGroundColor,
      textColor: textColor
    })
  )
}
export default CustomSnackBar;
