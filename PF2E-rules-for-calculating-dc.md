Difficulty Class for recalling knowledge is determined based on the creatures CR, the creatures rarity, and the specificity of knowledge the players have to recall information about the monster. The first step to determining a creatures DC is by the Level-Based DC. Refer to the following table for finding the DC for the creatures CR.

| Level | DC   |
| ----- | ---- |
| 0     | 14   |
| 1     | 15   |
| 2     | 16   |
| 3     | 18   |
| 4     | 19   |
| 5     | 20   |
| 6     | 22   |
| 7     | 23   |
| 8     | 24   |
| 9     | 26   |
| 10    | 27   |
| 11    | 28   |
| 12    | 30   |
| 13    | 31   |
| 14    | 32   |
| 15    | 34   |
| 16    | 35   |
| 17    | 36   |
| 18    | 38   |
| 19    | 39   |
| 20    | 40   |
| 21    | 42   |
| 22    | 44   |
| 23    | 46   |
| 24    | 48   |
| 25    | 50   |

Once you have the creatures DC based on the CR of the creature you can further adjust the DC based on the creatures rarity. The value associated with each rarity value can be found on the table below.

| Rarity   | Adjustment |
| -------- | ---------- |
| Common   | +0         |
| Uncommon | +2         |
| Rare     | +5         |
| Unique   | +10        |

An example would be to use the Alghollthu Master which is a CR 7 creature and is Uncommon. Based on the creatures level the original DC would be 23 and you would adjust the DC by adding 2 since it is uncommon. This results in the creatures DC to be a 25.

Based on our example, the PC would need to succeed at a DC 25 occultism check (it's an Aberation; more on creature types and associated skills below). There are situations where the player may have a more specified scope of knowledge in the form of a lore skill. These will often be very specialized, and an excerpt from the core rulebook sums it up nicely.

>### Determining Scope of Lore
>
>[Lore](https://2e.aonprd.com/Skills.aspx?ID=8) skills are one of the most specialized aspects of Pathfinder, but they  require GM oversight, particularly in determining which Lore  subcategories are acceptable for characters to select. A Lore  subcategory represents a narrow focus, and thus it shouldn’t replace all or even most of an entire skill, nor should it convey vast swaths of  information. For example, a single Lore subcategory doesn’t cover all  religions—that’s covered by the Religion skill—but a character could  have a Lore subcategory that covers a single deity. One Lore subcategory won’t cover an entire country or all of history, but it could cover a  city, an ancient civilization, or one aspect of a modern country, like  Taldan History Lore. A single Lore subcategory couldn’t cover the entire multiverse, but it could cover a whole plane other than the Material  Plane.

Specific lore will most often fall into two categories, unspecific lore and specific lore. Should the lore satisfy the GMs discretion regarding the relevancy will also adjust the DC. The table below will provide the values.

| Lore                                             | Adjustment |
| ------------------------------------------------ | ---------- |
| Standard Skill (Occultism, Arcana, Nature, etc.) | +0         |
| Unspecific Lore                                  | -2         |
| Specific Lore                                    | -5         |

Similar to the way that rarity can adjust the DC, specialized knowledge can also adjust the DC in the players favor. There could be reasons to use the -10 adjustment, but this should be done very very rarely.

The standard skills that will be used for recall knowledge based on the creatures type trait can be found below.

| Creature Trait | Skills           |
| -------------- | ---------------- |
| Aberration     | Occultism        |
| Animal         | Nature           |
| Astral         | Occultism        |
| Beast          | Arcana, Nature   |
| Celestial      | Religion         |
| Construct      | Arcana, Crafting |
| Dragon         | Arcana           |
| Elemental      | Arcana, Nature   |
| Ethereal       | Occultism        |
| Fey            | Nature           |
| Fiend          | Religion         |
| Fungus         | Nature           |
| Humanoid       | Society          |
| Monitor        | Religion         |
| Ooze           | Occultism        |
| Plant          | Nature           |
| Spirit         | Occultism        |
| Undead         | Religion         |

The skills listed above are the standard skills used depending on the creature that you are attempting to recall knowledge for. The GM can decide to allow a player to use another one of the listed skills in applicable circumstances. For instance, hags are humanoids but have a strong connection to occult spells and live outside society, so you might allow a character to use occultism to identify them without any DC adjustment, while Society is harder.

Alternative skills not listed above can also be used. For the application, this means that the above skills should be listed higher in the list for ease of access but all skills should be made available to allow the GM some flexibility for these checks. For instance, a character might attempt a recall knowledge using a different skill than what is listed by default. If the skill is highly applicable, like using medicine to identify a medicinal tonic, you can likely allow the checks DC to go unadjusted. If its relevance is a stretch, adjust the DC upward as described in Adjusting Difficulty.

## Adjusting DC 

There are various reason you may choose to adjust the DC from it's default value, and adjustments can best be made and described by this table

| Difficulty      | Adjustment |
| --------------- | ---------- |
| Incredibly Easy | -10        |
| Very Easy       | -5         |
| Easy            | -2         |
| Hard            | +2         |
| Very hard       | +5         |
| Incredibly Hard | +10        |

These adjustments should be made available as a selection in the UI and stored whenever we return to a creature that the adjustment was made for. Bear in mind it may not be applicable for the adjustment to apply to all of the characters. We either need to associate a player ID to the adjustment to by dynamic or the GM needs to bear in mind that what is being tracked is not player specific.

---

## Example of Algorithms

Creating the DC adjustment mapping

```typescript
const dcAdjustments = new Map<DCAdjustment, number>();
dcAdjustments.set("incredibly easy", -10);
dcAdjustments.set("very easy", -5);
dcAdjustments.set("easy", -2);
dcAdjustments.set("normal", 0);
dcAdjustments.set("hard", +2);
dcAdjustments.set("very hard", +5);
dcAdjustments.set("incredibly hard", +10)
```

create rarity adjustment mapping

```typescript
function rarityToDCAdjustment(rarity: Rarity = "common"): PositiveDCAdjustment {
if (rarity === "uncommon") {
    return "hard";
} else if (rarity === "rare") {
    return "very hard";
} else if (rarity === "unique") {
    return "incredibly hard";
} else {
    return "normal";
}
}
```

