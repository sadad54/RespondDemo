# 📬 RespondDemo

**A production-grade Unified Business Messaging platform built with React Native.**

> **Context:** This project was architected to mimic the core capabilities of enterprise platforms like **Respond.io**. It focuses on high-volume message handling, team collaboration, and offline-first reliability.

---

## 🏗️ Systems Architecture

Instead of a standard "todo list" architecture, this app uses a **Feature-Based** folder structure to ensure scalability. Each module (Inbox, Chat, Search) is self-contained with its own components, hooks, and data logic.

### Tech Stack
* **Core:** React Native (Expo SDK 50), TypeScript (Strict Mode)
* **State Management:** Zustand + Middleware (Persistence)
* **Storage:** AsyncStorage (via Adapter Pattern)
* **Animation:** Reanimated 3, Lottie, LayoutAnimation
* **Navigation:** React Navigation (Native Stack)

---

## 🚀 Key Technical Highlights

### 1. Performance & List Virtualization
Handling thousands of chat threads requires careful memory management.
* **Virtualization:** Implemented `FlatList` with `getItemLayout`. This skips dynamic height measurement, allowing the engine to calculate scroll offsets instantly without rendering rows.
* **Memoization:** Row components are wrapped in `React.memo` to prevent re-renders when unrelated state (like search filters) changes.
* **Derived State:** Used `useMemo` for filtering logic to ensure expensive array operations only run when absolutely necessary.

### 2. Offline-First "Memory" Engine
The app persists state across reboots using a custom **Storage Adapter Pattern**.
* **Architecture:** I built a generic `StorageInterface` that currently wraps `AsyncStorage` for Expo Go compatibility.
* **Extensibility:** Because of the adapter pattern, the underlying engine can be swapped for **MMKV** (C++ storage) in production builds without changing a single line of business logic.

### 3. Optimistic UI & Data Integrity
To make the app feel "instant" regardless of network conditions:
* **Immediate Updates:** Actions like "Archive" or "Send" update the UI in 0ms.
* **Rollback Mechanism:** If the simulated background API call fails, the app automatically reverts the state and notifies the user, ensuring data consistency is never compromised.

### 4. Advanced Search & Discovery
Search is more than just `.filter()`.
* **Debouncing:** Implemented a custom `useDebounce` hook to prevent UI thread blocking during rapid typing.
* **Regex Highlighting:** A custom text engine breaks message strings apart to visually highlight the matching search term (case-insensitive) inside the preview snippet.

---

## 💎 UX & Micro-Interactions

This project moves beyond standard UI to provide a "Silicon Valley" level of polish:

* **Team Collaboration Mode:**
    * Implemented a "Mode Switcher" in the chat input.
    * **Polymorphic Rendering:** Messages have an `isInternal` flag. Internal notes render visually distinct (yellow box, lock icon) to prevent agents from accidentally sending private notes to customers.
* **Skeleton Loading:** Replaced spinning loaders with shimmer effects (`LinearGradient` + `Reanimated`) for a higher perceived speed.
* **Gestures:** 60fps swipe-to-archive interactions running purely on the UI thread.
* **Native Integration:**
    * **Haptics:** Tactile feedback on long-press actions.
    * **Deep Linking:** Configured `expo-linking` to handle custom URL schemes (e.g., `respond-demo://chat/1`) and simulate push notification routing.

---

## 📂 Project Structure

```text
src/
  ├── components/    # Atomic UI (SkeletonRow, EmptyState, AnimatedFAB)
  ├── features/
  │     ├── inbox/   # The Core Domain
  │     │     ├── api/          # Mock API Service
  │     │     ├── components/   # (ActionSheet, MessageBubble, FilterBar)
  │     │     ├── screens/      # (InboxScreen, ChatDetail, ContactDetails)
  │     │     └── data/         # (Rich Mock Data & Types)
  ├── hooks/         # Shared Logic (useDebounce)
  ├── navigation/    # Deep Linking & Stack Configuration
  ├── store/         # Global Zustand Store & Storage Adapters
  └── types/         # Centralized TypeScript Interfaces
