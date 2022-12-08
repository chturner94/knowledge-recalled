export function registerHandlebarsHelpers() {
  Handlebars.registerHelper('add', (a, b) => {
    return a + b;
  });
}
