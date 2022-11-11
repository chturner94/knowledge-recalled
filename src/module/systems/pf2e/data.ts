export const RARITIES = ["common", "uncommon", "rare", "unique"] as const;
type Rarity = typeof RARITIES[number];

export {
    Rarity
}
