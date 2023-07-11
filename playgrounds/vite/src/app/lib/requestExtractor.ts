export function getNameFromEntities(entities: { name: string }[]) {
  return entities.map((entity) => entity.name);
}
