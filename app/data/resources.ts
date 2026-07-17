export type Resource = {
  name: string;
  description: string;
  phone?: string;
  website: string;
  category: string;
};

export type ResourceGroupKey =
  | "housing"
  | "food"
  | "mentalHealth";

type ResourceGroup = {
  title: string;
  matcher: RegExp;
  resources: Resource[];
};

export const resourceGroups: Record<
  ResourceGroupKey,
  ResourceGroup
> = {
  housing: {
    title: "Housing Resources",
    matcher:
      /\b(housing|rent|rental|eviction|evicted|landlord|shelter|homeless|apartment|lease)\b/i,
    resources: [
      {
        name: "Hillsborough County Social Services",
        description:
          "Case management and support for housing, basic living needs, education, and training for eligible Hillsborough County residents.",
        phone: "(813) 272-5220",
        website:
          "https://www.hillsboroughcounty.org/en/residents/social-services",
        category: "Local government",
      },
      {
        name: "211 Housing Assistance",
        description:
          "Connect with a local 211 specialist for help finding rent, mortgage, utility, and housing-support options.",
        phone: "211",
        website:
          "https://www.211.org/get-help/housing-expenses",
        category: "Community support",
      },
    ],
  },

  food: {
    title: "Food Resources",
    matcher:
      /\b(food|groceries|grocery|pantry|hungry|hunger|snap|wic|meal|meals)\b/i,
    resources: [
      {
        name: "Feeding Tampa Bay",
        description:
          "Find nearby mobile grocery distributions, food pantries, benefits assistance, and other food-support options across the Tampa Bay region.",
        phone: "833-530-3663",
        website: "https://feedingtampabay.org/findfood/",
        category: "Food assistance",
      },
      {
        name: "211 Food Programs & Benefits",
        description:
          "Connect with local food pantries, meal programs, SNAP support, and other food-assistance services.",
        phone: "211",
        website:
          "https://www.211.org/get-help/food-programs-food-benefits",
        category: "Community support",
      },
    ],
  },

  mentalHealth: {
    title: "Mental Health Resources",
    matcher:
      /\b(mental health|depressed|depression|anxiety|anxious|panic|therapy|therapist|counseling|counselor|suicidal|suicide|self harm|self-harm|crisis|emotional distress)\b/i,
    resources: [
      {
        name: "988 Suicide & Crisis Lifeline",
        description:
          "Free, confidential crisis support by call, text, or chat for people experiencing emotional distress, suicidal thoughts, or substance-use concerns.",
        phone: "988",
        website: "https://988lifeline.org/",
        category: "Crisis support",
      },
      {
        name: "FindTreatment.gov",
        description:
          "A confidential and anonymous locator for mental-health and substance-use treatment services across the United States.",
        website: "https://findtreatment.gov/",
        category: "Treatment locator",
      },
    ],
  },
};

export const crisisMatcher =
  /\b(suicidal|suicide|kill myself|killing myself|want to die|end my life|self harm|self-harm|overdose|immediate danger|hurt myself|hurting myself|harm myself)\b/i;