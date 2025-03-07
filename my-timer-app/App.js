import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";
import { TimerProvider } from "./src/context/TimerContext";

export default function App() {
  return (
    <>
      <TimerProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </TimerProvider>
    </>
  );
}
