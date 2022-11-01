// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module.
 */
// Requirements and workflows
// Persist data to the database for registered creatures
// Initialize creature with the actorTemplate when an encounter begins
// Once encounter begins add each creature to an array to track them in the GM tracker
// Once creature is defeated log it as defeated tally and persist the creatures object for future reference
//


// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { array, string } from "yargs";

// Initialize module
Hooks.once('init', async () => {
  console.log('knowledge-recalled | Initializing knowledge-recalled');

  // Assign custom classes and constants here
  const actor = combatant.actor;

  interface actorInterface {
    // types
    // -- description --
    name: string;
    actorId: string;

    description: string;
    profileImg: string;
    rarity: string;
    traits: string[];
    // -- stats --
    ac: number;
    fortitude: object;
    reflex: object;
    will: object;

    immunities: number;
    resistance: number
    weakness: number;

    // -- abilities --
    attacks: string[];
    abilities: string[];
    passives: string[];
    spells: string[];
  }

  public class actorTemplate implements actorInterface{
      //let encounters = ui.combat?.combats.map((combat) => { return combat.name });
      constructor() {
      }

    // Constructors
    //constructor(name: string, description: string, profileImg: string, rarity: string, traits: string[], ac: number,
    //            fortitude: object, reflex: object, will: object, immunities: number, resistance: number, weakness: number,
    //            attacks: string[], abilities: string[], passives: string[], spells: string[])
    //{

      //the properties can be found inside ui.combat.combats[arrayId].turns[arrayId]
      // actorId is at the very top of this and everything else is nested inside of the
      // actor object.
      name = (): String => this.actor.prototypeToken.name;
      actorid= (): String => this.actorId;
      description = (): String => this.actor.system.details.publicNotes;
      profileImg = (): String => this.actor.img;
      rarity = (): String => this.actor.system.traits.rarity;
      traits = (): String[] => this.system.traits.value;

      ac = (): String => this.actor.system.attributes.ac.value;
      fortitude = (): Object => this.actor.system.saves.fortitude;
      //{ ability: 'attr', base: #, breakdown: 'modifier +#', dc: val+10[dc = result], label: 'Fortitude', saveDetail: '', slug: 'fortitude',
      // totalModifier: #, value: #, _modifier: {}
      reflex = (): Object => this.actor.system.saves.reflex;
      //{ ability: 'attr', base: #, breakdown: 'modifier +#', dc: val+10[dc = result], label: 'Will', saveDetail: '', slug: 'reflex',
      // totalModifier: #, value: #, _modifier: {}
      will = (): Object => this.actor.system.saves.will;
      //{ ability: 'attr', base: #, breakdown: 'modifier +#', dc: val+10[dc = result], label: 'Reflex', saveDetail: '', slug: 'will',
      // totalModifier: #, value: #, _modifier: {}

      //immunity
      immunities = (): String[] => this.actor.system.traits.immunity;
      //resistance
      resistance = (): String[] => this.actor.system.traits.resistance;
      //weakness
      weakness = (): String[] => this.actor.system.traits.weakness;
      //attacks
      attacks = (): String[] => this.actor.system.actions.name;
      //abilities

      //passives
      passives = (): String[] => this.actor.system._itemTypes.action.name;


    }



  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
});

// Setup module
Hooks.once('setup', async () => {
  // Do anything after initialization but before
  // ready
});

// When ready
Hooks.once('ready', async () => {
  // Do anything once the module is ready
  class gmCombatKnowledgeJornal {

    launchWithActiveEncounters({ encounters }: {encounters: any[] }) {
        //Represents the journal storing active encounters, each item in array represents a tab in the journal.
        let gmCombatKnowledgeJournal = [];
        let gmCombatKnowledgeJournalTab = [];

    }




            getCombatants(): void {
                let encounters = ui.combat.combats;


                for (let i = 0; i < encounters.length; i++) {
                    let encounterArray = [];
                    let combatantArray = [];
                    // only add encounters that are active
                    if (encounters[i].isActive) {
                        // add each creature to the journal under it's associated encounter
                        for (let j = 0; j < encounters[i].turns.length; j++) {
                            // combatants = ui.combat.combats[i].turns (this is the array of each creature in the encounter)
                            let combatants = encounters[i].turns;

                            // only add creatures that are NPCs.
                            //addNPCS():
                            if (combatants[j].isNPC) {
                                let combatant: any, actor: any, actorTemplate: any, actorId: any, actorName: any,
                                    actorDescription: any, actorProfileImg: any, actorRarity: any, actorTraits: any,
                                    actorAc: any, actorFortitude: any, actorReflex: any, actorWill: any,
                                    actorImmunities: any,
                                    actorResistance: any, actorWeakness: any, actorAttacks: any,
                                    actorAbilities: string[],
                                    actorPassives: any, actorSpells: string[],
                                    actorObject: {
                                        actorResistance: any; actorReflex: any; actorWeakness: any; actorAttacks: any;
                                        actorWill: any; actorPassives: any; actorName: any; actorFortitude: any; actorDescription: any;
                                        actorAbilities: string[]; actorProfileImg: any; actorId: any; actorRarity: any; actorAc: any;
                                        actorSpells: string[]; actorImmunities: any; actorTraits: any
                                    },
                                    actorObjectArray: any[];
                                // combatant = ui.combat.combats[i].turns[j] (this is the individual creature in the encounter)
                                combatant = combatants[j];
                                // actor = ui.combat.combats[i].turns[j].actor (this is the individual creature's actor)
                                actor = combatant.actor;
                                actorTemplate = new actorTemplate(actor);
                                actorId = combatant.actorId;
                                actorName = actorTemplate.name;
                                actorDescription = actorTemplate.description;
                                actorProfileImg = actorTemplate.profileImg;
                                actorRarity = actorTemplate.rarity;
                                actorTraits = actorTemplate.traits;
                                actorAc = actorTemplate.ac;
                                actorFortitude = actorTemplate.fortitude;
                                actorReflex = actorTemplate.reflex;
                                actorWill = actorTemplate.will;
                                actorImmunities = actorTemplate.immunities;
                                actorResistance = actorTemplate.resistance;
                                actorWeakness = actorTemplate.weakness;
                                actorAttacks = actorTemplate.attacks;
                                actorAbilities = actorTemplate.abilities;
                                actorPassives = actorTemplate.passives;
                                actorSpells = actorTemplate.spells;
                                actorObject = {
                                    actorId: actorId,
                                    actorName: actorName,
                                    actorDescription: actorDescription,
                                    actorProfileImg: actorProfileImg,
                                    actorRarity: actorRarity,
                                    actorTraits: actorTraits,
                                    actorAc: actorAc,
                                    actorFortitude: actorFortitude,
                                    actorReflex: actorReflex,
                                    actorWill: actorWill,
                                    actorImmunities: actorImmunities,
                                    actorResistance: actorResistance,
                                    actorWeakness: actorWeakness,
                                    actorAttacks: actorAttacks,
                                    actorAbilities: actorAbilities,
                                    actorPassives: actorPassives,
                                    actorSpells: actorSpells
                                };
                                actorObjectArray = [];

                                actorObjectArray.push(actorObject);

                                let actorObjectString = JSON.stringify(actorObjectArray);
                                let actorObjectStringParse = JSON.parse(actorObjectString);

                                let actorObjectStringify = JSON.stringify(actorObjectStringParse);

                                let actorObjectStringifyParse = JSON.parse(actorObjectStringify);

                                let actorObjectStringifyParseString = JSON.stringify(actorObjectStringifyParse);

                                let actorObjectStringifyParseStringParse = JSON.parse(actorObjectStringifyParseString);

                                let actorObjectStringifyParseStringParseString = JSON

                                //adds the newly created object to the journal
                                // I need to store each pass of this in a new array to be represented as tabs in the journal.
                                // each tab should represent the encounter[0-x] and each tab should contain the combatants[0-x].
                                combatantArray.push(actorObjectStringifyParseStringParseString);
                            } else {
                                console.log('not an npc; skipping')
                            }
                        }
                    } else {
                        console.log('not active; skipping')
                    }
                    //adds the array of combatants for the encounter to the encounter array
                    // this should appear as encounterArray[0].combatantArray[0]...
                    // encounterArray[0].combatantArray[1]... Once finished,
                    // do the same at eA[1] through all of those combatants.
                    encounterArray.push(combatantArray);
                }
            }
            }

      //let encounters = ui.combat.combats.filter(combat => combat.active);
//

  //    let combatants = [];
      //you can find the NPC TAG under ui.combat.combats[arrayId].turns[arrayId].turns[arrayId].actor.type
      // type in this case will === "npc".
    //  for (let i = 0; i < encounterLength; i++) {
      //  combatants.push(encounters[i].turns);
     // }
     // }

    }

// class activePlayer {
//   const token = turn.token;
//   const actor = turn.actor ?? (token ? token.actor : null);
//
//   if (!actor)
//     return null;
// };

//need to cycle or select players whose turn it is


//fun createKnowledgeArray() {
//  const activeCombat = game.combat;
  //let i = 0;
  //const activeCombatant = activeCombat.turns[i].actor;
  //if (activeCombatant.type == "npc") {
  //  let knowledgeArray = [];
    //activeCombatant.push(knowledgeArray);


  //}

//}

// Add any additional hooks if necessary

