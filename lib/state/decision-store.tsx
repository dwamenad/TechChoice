"use client";

import type { ReactNode } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { buildDefaultProfile } from "@/lib/mock-data";
import { runRecommendation } from "@/lib/recommendation-engine";
import type {
  DecisionProfile,
  HardConstraintId,
  ProductCategory,
  RecommendationResult,
  SavedSession,
  ScoreDimension
} from "@/lib/types";

const initialPreferences = buildDefaultProfile("smartphones");

interface DecisionStoreState {
  hydrated: boolean;
  step: number;
  preferences: DecisionProfile;
  result: RecommendationResult | null;
  savedSessions: SavedSession[];
  setHydrated: (hydrated: boolean) => void;
  setStep: (step: number) => void;
  setCategory: (category: ProductCategory) => void;
  setPreferences: (patch: Partial<DecisionProfile>) => void;
  setPriority: (dimension: ScoreDimension, value: number) => void;
  toggleConstraint: (constraint: HardConstraintId) => void;
  calculateResult: () => RecommendationResult;
  saveSession: (session: SavedSession) => void;
  removeSession: (sessionId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: (category?: ProductCategory) => void;
}

export const useDecisionStore = create<DecisionStoreState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      step: 0,
      preferences: initialPreferences,
      result: null,
      savedSessions: [],
      setHydrated: (hydrated) => set({ hydrated }),
      setStep: (step) => set({ step }),
      setCategory: (category) =>
        set({
          preferences: buildDefaultProfile(category),
          result: null,
          step: 1
        }),
      setPreferences: (patch) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...patch
          },
          result: null
        })),
      setPriority: (dimension, value) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            priorities: {
              ...state.preferences.priorities,
              [dimension]: value
            }
          },
          result: null
        })),
      toggleConstraint: (constraint) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            hardConstraints: state.preferences.hardConstraints.includes(constraint)
              ? state.preferences.hardConstraints.filter((item) => item !== constraint)
              : [...state.preferences.hardConstraints, constraint]
          },
          result: null
        })),
      calculateResult: () => {
        const result = runRecommendation(get().preferences);
        set({ result });
        return result;
      },
      saveSession: (session) =>
        set((state) => ({
          savedSessions: [session, ...state.savedSessions.filter((item) => item.id !== session.id)].slice(0, 8)
        })),
      removeSession: (sessionId) =>
        set((state) => ({
          savedSessions: state.savedSessions.filter((session) => session.id !== sessionId)
        })),
      nextStep: () =>
        set((state) => ({
          step: Math.min(3, state.step + 1)
        })),
      prevStep: () =>
        set((state) => ({
          step: Math.max(0, state.step - 1)
        })),
      reset: (category = "smartphones") =>
        set({
          hydrated: true,
          step: 0,
          preferences: buildDefaultProfile(category),
          result: null
        })
    }),
    {
      name: "techchoice-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        step: state.step,
        preferences: state.preferences,
        savedSessions: state.savedSessions
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      }
    }
  )
);

export function DecisionStoreProvider({ children }: { children: ReactNode }) {
  return children;
}
