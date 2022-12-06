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
import {array, boolean, string} from 'yargs';
import testObject from './tests.json';

// Initialize module
Hooks.once('init', async () => {
  console.log('knowledge-recalled | Initializing knowledge-recalled');

    type actorDescriptionStructure = {
        value: string | string[];
        isVisibleForPlayer: boolean;
    }

    type abilities = actorDescriptionStructure

    type statStructure = {
        value?: number;
        beforeDC?: number;
        afterDC?:  number;
        isVisibleForPlayer: boolean;
    }

    type objectStructure = {
        value: object;
        isVisibleForPlayer: boolean;
    }


    interface ActorDescription {
        name: actorDescriptionStructure;
        actorId: actorDescriptionStructure;
        description: actorDescriptionStructure;
        profileImg: actorDescriptionStructure;
        rarity: actorDescriptionStructure;
        traits: actorDescriptionStructure;
    }

    interface Stats {
        ac: statStructure;
        fortitude: statStructure;
        reflex: statStructure;
        will: objectStructure;
        immunities?: objectStructure;
        resistance?: objectStructure;
        weakness?: objectStructure;
    }


    interface Abilities {
        attacks: abilities;
        abilities?: abilities;
        passives?: abilities;
        spells?: abilities;
    }

    class actorTemplate implements ActorDescription, Stats, Abilities {

        name: actorDescriptionStructure;
        actorId: actorDescriptionStructure;
        description: actorDescriptionStructure;
        profileImg: actorDescriptionStructure;
        rarity: actorDescriptionStructure;
        traits: actorDescriptionStructure;
        ac: statStructure;
        fortitude: statStructure;
        reflex: statStructure;
        will: objectStructure;
        immunities: objectStructure;
        resistance: objectStructure
        weakness: objectStructure;
        attacks: abilities;
        /// passiveAbilities: string[];
        //spells: string[];


        constructor(actorId: string, actor: object) {
            //the properties can be found inside ui.combat.combats[arrayId].turns[arrayId]
            // actorId is at the very top of this and everything else is nested inside of the
            // actor object.
            this.name =
                {
                    value: actor.name,
                    isVisibleForPlayer: false
                };
            this.actorId =
                {
                    value: actorId,
                    isVisibleForPlayer: false
                };
            this.description =
                {
                    value: actor.system.details.publicNotes,
                    isVisibleForPlayer: false
                };
            this.profileImg =
                {
                    value: actor.img,
                    isVisibleForPlayer: false
                };
            this.rarity =
                {
                    value: actor.system.traits.rarity,
                    isVisibleForPlayer: false
                };
            this.traits =
                {
                    value: actor.system.traits.value,
                    isVisibleForPlayer: false
                };


            this.immunities =
                {
                    value: actor.system.traits.di.value,
                    isVisibleForPlayer: false
                };
            this.resistance =
                {
                    value: actor.system.traits.dr,
                    isVisibleForPlayer: false
                };
            this.weakness =
                {
                    value: actor.system.traits.dv,
                    isVisibleForPlayer: false
                };

            this.ac =
                {
                    value: actor.system.attributes.ac.value,
                    //beforeDC
                    //afterDC
                    //beforeDC
                    //afterDC
                    isVisibleForPlayer: false
                };
            this.fortitude =
                {
                    value: actor.system.saves.fortitude.value,
                    //beforeDC
                    //afterDC
                    isVisibleForPlayer: false
                }
            this.reflex =
                {
                    value: actor.system.saves.reflex.value,
                    //beforeDC;
                    //afterDc
                    isVisibleForPlayer: false
                };
            this.will =
                {
                    //beforeDC
                    //afterDC
                    value: actor.system.saves.will.value,
                    isVisibleForPlayer: false
                }



            //this.attacks =  actor.system.actions[0].slug;
            //this.passiveAbilities = actor.passiveAbilities
            //this.spells = actor.spells


        }

    }
    class GMCombatKnowledgeJournal {        //PASS IN UI
        actors: object[] = [];
        ui: object;

        constructor(ui: object) {
            this.ui = ui;
        }

        getActorsFromEncounters(ui:object): void {
            let encounters = ui.combat.combats;
            for (let encountersCounter = 0; encountersCounter < encounters.length; encountersCounter++) {
                if (encounters[encountersCounter].isActive) {
                    this.addActorsToActorObjectArray(encounters[encountersCounter])
                } else {
                    console.log('not active; skipping')
                }

            }
        }
        addActorsToActorObjectArray(encounter: object) {
            let combatants = encounter.turns;
            for (let combatantsCounter = 0; combatantsCounter < combatants.length; combatantsCounter++) {
                if (combatants[combatantsCounter].isNPC) {
                    let combatant = combatants[combatantsCounter];
                    let actorId = combatants[combatantsCounter].actorId;
                    let actor = combatant.actor;

                    if(this.isDuplicate(actorId)) {
                        console.log("Duplicated actor")
                    }
                    else{
                        let actorObject = new actorTemplate(actorId, actor);
                        this.actors.push(actorObject);
                    }

                    //jsonify actorObjectArray
                } else {
                    console.log('not an npc; skipping')
                }
            }
        }
        isDuplicate(actorId: string): boolean {
            for(let actorCounter = 0; actorCounter <= this.actors.length; actorCounter++) {
                if(actorId == this.actors[actorCounter].actorId) {
                    return true
                }
            }
            return false
        }
    }

  class PlayerJournal implements GMCombatKnowledgeJournal {
      actors: object[] = [];
     // set



  }
  registerSettings();
  await preloadTemplates();

});



// Setup module
Hooks.once('setup', async () => {
  // Do anything after initialization but before
  // ready
    let GMJournal = new GMCombatKnowledgeJournal(ui)
    //let PlayerJournal = new PlayerJournal
    //PlayerJournal = GMJournal    ---- How to check for visibility? Would it be on the front end?

});

// When ready
Hooks.once('ready', async () => {
  // Do anything once the module is ready

    //Open GM Journal
        //GmJournal.getActorsEncounters() this stores the actors in GMJournal.actors
        //click on a particular actor in the gm journal
        //roll DC check
        //if DC check is passed make values visible



}

