# Timer App

A React Native application for creating, managing, and tracking multiple customizable timers with category organization.

## Features

- **Timer Creation**: Create timers with custom names, durations, and categories
- **Category Organization**: Group timers by categories for better organization
- **Visual Progress Tracking**: See your timer progress with visual indicators
- **Bulk Actions**: Start, pause, or reset all timers in a category at once
- **Completion Tracking**: Get notifications when timers complete and view history
- **Persistent Storage**: All data is saved and persists between app sessions

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Joel-Johny/RN-Timer
cd my-timer-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

## Running the App

### Using Expo Go (for development)

1. Install the Expo Go app on your device from the App Store or Google Play Store
2. Run `npx expo start` in your project directory
3. Scan the QR code with your camera (iOS) or the Expo Go app (Android)
4. The app will load on your device

### Installing the APK

The compiled APK can be found in the `release` folder of the project. Transfer this file to your Android device and install it.

## Project Structure

```
src/
  components/
    Timer.jsx       # Individual timer component
    Category.jsx    # Category component with grouped timers
    Categories.jsx  # List of all categories
    AddTimerModal.jsx # Modal for adding new timers
  context/
    TimerContext.jsx # Global state management
  screens/
    TimerScreen.jsx  # Main screen with timer list
    HistoryScreen.jsx # Screen showing completed timers
  navigation/
    AppNavigator.jsx # Navigation configuration
App.js              # Entry point
```

## Technologies Used

- React Native
- Expo
- React Navigation
- AsyncStorage
- React Native Progress

## Key Implementation Details

- Each timer manages its own state independently to allow multiple timers to run simultaneously
- Local state for UI updates with optimized context updates for persistence
- Custom styled components for a cohesive look and feel
- Proper cleanup of intervals to prevent memory leaks
