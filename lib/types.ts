export enum CocktailCategory {
  COCKTAIL = "Cocktail",
  ORDINARY_DRINK = "Ordinary Drink",
  PUNCH_PARTY_DRINK = "Punch / Party Drink",
  SHAKE = "Shake",
  OTHER_UNKNOWN = "Other / Unknown",
  COCOA = "Cocoa",
  SHOT = "Shot",
  COFFEE_TEA = "Coffee / Tea",
  HOMEMADE_LIQUEUR = "Homemade Liqueur",
  SOFT_DRINK = "Soft Drink",
}

export enum CocktailGlass {
  HIGHBALL_GLASS = "Highball glass",
  OLD_FASHIONED_GLASS = "Old-fashioned glass",
  COCKTAIL_GLASS = "Cocktail glass",
  COPPER_MUG = "Copper Mug",
  WHISKEY_GLASS = "Whiskey Glass",
  COLLINS_GLASS = "Collins glass",
  POUSSE_CAFE_GLASS = "Pousse cafe glass",
  CHAMPAGNE_FLUTE = "Champagne flute",
  WHISKEY_SOUR_GLASS = "Whiskey sour glass",
  BRANDY_SNIFTER = "Brandy snifter",
  WHITE_WINE_GLASS = "White wine glass",
  NICK_AND_NORA_GLASS = "Nick and Nora Glass",
  HURRICANE_GLASS = "Hurricane glass",
  COFFEE_MUG = "Coffee mug",
  SHOT_GLASS = "Shot glass",
  JAR = "Jar",
  IRISH_COFFEE_CUP = "Irish coffee cup",
  PUNCH_BOWL = "Punch bowl",
  PITCHER = "Pitcher",
  PINT_GLASS = "Pint glass",
  CORDIAL_GLASS = "Cordial glass",
  BEER_MUG = "Beer mug",
  MARGARITA_COUPETTE_GLASS = "Margarita/Coupette glass",
  BEER_PILSNER = "Beer pilsner",
  BEER_GLASS = "Beer Glass",
  PARFAIT_GLASS = "Parfait glass",
  WINE_GLASS = "Wine Glass",
  MASON_JAR = "Mason jar",
  MARTINI_GLASS = "Martini Glass",
  BALLOON_GLASS = "Balloon Glass",
  COUPE_GLASS = "Coupe Glass",
}

export interface Cocktail {
  id: number;
  name: string;
  instructions: string | null;
  alcoholic: boolean;
  category: CocktailCategory | null;
  glass: CocktailGlass | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type PaginationProps = {
  setPage: (page: number) => void;
  page: number;
  totalPages: number;
};
