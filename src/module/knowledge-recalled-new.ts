/**
 *@module knowledge-recalled
 * */

/**
 * @extends Application
 */

export default class KnowledgeRecalled extends Application {
  constructor(options = {}) {
    super(options);

    this.combat = null;
    this.turn = null;
  }

  /**
   * @override
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: 'knowledge-recalled',
      template: 'modules/knowledge-recalled/templates/knowledge-recalled.html',
      classes: ['knowledge-recalled'],
      width: 600,
      height: 'auto',
      resizable: true,
      minimizable: true,
      title: 'Knowledge Recalled',
      popOut: true,
      dragDrop: [{ dragSelector: '.item', dropSelector: null }],
      tabs: [{ navSelector: '.tabs', contentSelector: 'tab', initial: 'knowledge' }],
    });
  }
}
const controlledTokens = canvas?.tokens?.controlled;
