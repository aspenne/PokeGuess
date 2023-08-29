export function scheduleCacheCleanup() {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 2);

  const lastExecutionDate = localStorage.getItem('lastCacheCleanup');

  if (!lastExecutionDate || new Date(lastExecutionDate).getDate() !== currentDate.getDate()) {
    localStorage.removeItem('pokemonsStorageShadow');
    localStorage.removeItem('pokemonsStorageClassic');
    localStorage.removeItem('pokemonsStorageHard');
    localStorage.removeItem('pokemonFound');

    localStorage.setItem('lastCacheCleanup', currentDate.toISOString());
  }
}