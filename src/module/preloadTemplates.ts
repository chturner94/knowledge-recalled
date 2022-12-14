export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/knowledge-recalled/templates"
    'modules/knowledge-recalled/templates/gmCombatJournal.html',
    'modules/knowledge-recalled/templates/playerJournalV2.html',
  ];

  return loadTemplates(templatePaths);
}
