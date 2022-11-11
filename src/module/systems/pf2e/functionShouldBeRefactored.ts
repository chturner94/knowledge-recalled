import Rarity from "./data";

export type NegativeDCAdjustment = "incredibly easy" | "very easy" | "easy" | "normal";

export type PositiveDCAdjustment = "normal" | "hard" | "very hard" | "incredibly hard";

export DCAdjustment = NegativeDCAdjustment | PositiveDCAdjustment;

const adjustmentScale: DCAdjustment[] = [
    "incredibly easy",
    "very easy",
    "easy",
    "normal",
    "hard",
    "very hard",
    "incredibly hard",
];

const dcAdjustments = new Map<DCAdjustment, number>();
dcAdjustments.set("incredibly easy", -10);
dcAdjustments.set("very easy", -5);
dcAdjustments.set("easy", -2);
dcAdjustments.set("normal", 0);
dcAdjustments.set("hard", 2);
dcAdjustments.set("very hard", 5);
dcAdjustments.set("incredibly hard", 10);

const dcByLevel = new Map<number, number>();
dcByLevel.set(-1, 13);
dcByLevel.set(0, 14);
dcByLevel.set(1, 15);
dcByLevel.set(2, 16);
dcByLevel.set(3, 18);
dcByLevel.set(4, 19);
dcByLevel.set(5, 20);
dcByLevel.set(6, 22);
dcByLevel.set(7, 23);
dcByLevel.set(8, 24);
dcByLevel.set(9, 26);
dcByLevel.set(10, 27);
dcByLevel.set(11, 28);
dcByLevel.set(12, 30);
dcByLevel.set(13, 31);
dcByLevel.set(14, 32);
dcByLevel.set(15, 34);
dcByLevel.set(16, 35);
dcByLevel.set(17, 36);
dcByLevel.set(18, 38);
dcByLevel.set(19, 39);
dcByLevel.set(20, 40);
dcByLevel.set(21, 42);
dcByLevel.set(22, 44);
dcByLevel.set(23, 46);
dcByLevel.set(24, 48);
dcByLevel.set(25, 50);

const simpleDc = new map<ProfeciencyRank, number>();
simpleDc.set("untrained", 10);
simpleDc.set("trained", 15);
simpleDc.set("expert", 20);
simpleDc.set("master", 35);
simpleDc.set("legendary", 30);

export function rarityToDcAdjustment(rarity: Rarity = "Common"): PositiveDCAdjustment {
    switch (rarity) {
        case "Common":
            return "normal";
        case "Uncommon":
            return "hard";
        case "Rare":
            return "very hard";
        case "Very Rare":
            return "incredibly hard";
        default:
            return "normal";
    }
}

export interface DCOPtions {
    proficiencyWithoutLevel?: boolean;
    rarity?: Rarity;
}


export function getDc(
    level: number,
    { proficiencyWithoutLevel = false, rarity = "Common" }: DCOptions = {},
): number {
    const dc = dcByLevel.get(level) ?? 14;
    if (proficiencyWithoutLevel) {
        return 
    }
}
