export type EmploymentMemory = {
  status?: string;
  occupation?: string;
  employer?: string;
  workSchedule?: string;
};

export type HouseholdMemory = {
  householdSize?: number;
  dependents?: number;
  hasChildren?: boolean;
};

export type HousingMemory = {
  status?: string;
  housingType?: string;
  monthlyCost?: number;
  isAtRisk?: boolean;
};

export type TransportationMemory = {
  primaryMode?: string;
  hasReliableAccess?: boolean;
  hasDriverLicense?: boolean;
};

export type IncomeMemory = {
  sources?: string[];
  monthlyAmount?: number;
  frequency?: string;
};

export type ConversationMemory = {
  location?: string;
  goals: string[];
  needs: string[];
  employment: EmploymentMemory;
  household: HouseholdMemory;
  housing: HousingMemory;
  transportation: TransportationMemory;
  benefits: string[];
  income: IncomeMemory;
  documents: string[];
  applications: string[];
  deadlines: string[];
  additionalFacts: Record<string, string[]>;
};

export type ConversationMemoryUpdate = Partial<
  Omit<
    ConversationMemory,
    "employment" | "household" | "housing" | "transportation" | "income"
  >
> & {
  employment?: Partial<EmploymentMemory>;
  household?: Partial<HouseholdMemory>;
  housing?: Partial<HousingMemory>;
  transportation?: Partial<TransportationMemory>;
  income?: Partial<IncomeMemory>;
};

export function createEmptyConversationMemory(): ConversationMemory {
  return {
    goals: [],
    needs: [],
    employment: {},
    household: {},
    housing: {},
    transportation: {},
    benefits: [],
    income: {},
    documents: [],
    applications: [],
    deadlines: [],
    additionalFacts: {},
  };
}
