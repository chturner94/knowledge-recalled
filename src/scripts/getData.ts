import actors from '../data/actors.json';

interface Actor {
  difficultyAdjustment: Array<DiffulcultyAdjustment>;
  name: ActorInfo;
  actorID: number; //likely need some sort of verifyer and ActorID type
  description: ActorInfo;
  profileImage: ActorInfo;
  rarity: ActorInfo; //likely need some sort of verifyer and Rarity type
  traits: traits;
  ac: Attributes;
  fort: Attributes;
  ref: Attributes;
  will: Attributes;
  immunities: Vulnerabilities;
  resistances: Vulnerabilities;
  weaknesses: Vulnerabilities;
  abilities: Abilities;
  attacks: Attacks;
  passives: Passives;
  spells: Spells;
  notes: Notes;
}
interface DiffulcultyAdjustment {
  adjustment: string; //needs to be changed to dc adjustment mapping
  playerID: string;
}
interface ActorInfo {
  value: string;
  isVisibleForPlayers: boolean;
}
interface traits {
  value: Array<string>;
  isVisibleForPlayers: boolean;
}
interface Attributes {
  value: number;
  beforeDC: number;
  afterDC: number;
  isVisibleForPlayers: boolean;
}
interface Vulnerabilities {
  value: Array<string>;
  beforeDC: number;
  afterDC: number;
  isVisibleForPlayers: boolean;
}
interface Ability {
  name: string;
  description: string;
  isVisibleForPlayers: boolean;
}
interface Attack {
  name: string;
  attack: string;
  description: string;
  isVisibleForPlayers: boolean;
}

interface Abilities {
  ability: Array<Ability>;
  beforeDC: number;
  afterDC: number;
}
interface Attacks {
  attack: Array<Attack>;
  beforeDC: number;
  afterDC: number;
}
interface Passives {
  value: Array<Ability>;
  beforeDC: number;
  afterDC: number;
}
interface Spells {
  value: Array<Ability>;
  beforeDC: number;
  afterDC: number;
}
interface GMNotes {
  description: string;
  isVisibleForPlayers: boolean;
}
interface PlayerNotes {
  description: string;
  actorID: string;
}
interface Notes {
  gmNotes: GMNotes;
  playerNotes: Array<PlayerNotes>;
}
export const getCreatures = () => {
  const creatureArrayOfObjects: Actor[] = actors.map((creature: Actor) => {
    creature.difficultyAdjustment = creature.difficultyAdjustment.map(
        (dc: DiffulcultyAdjustment) => {
            return {
                adjustment: dc.adjustment,
                playerID: dc.playerID,
            };
        }
    );
    creature.name = {
        value: creature.name.value,
        isVisibleForPlayers: creature.name.isVisibleForPlayers,
    };
    }
      creature.name,
      creature.actorID,
      creature.description,
      creature.profileImage,
      creature.rarity,
      creature.traits,
      creature.ac,
      creature.fort,
      creature.ref,
      creature.will,
      creature.immunities,
      creature.resistances,
      creature.weaknesses,
      creature.abilities,
      creature.attacks,
      creature.passives,
      creature.spells,
      creature.notes
  });
  return creatureArrayOfObjects;
};
