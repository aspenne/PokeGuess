export function scheduleCacheCleanup() {
  const currentDate = new Date();
  const lastExecutionDate = localStorage.getItem('lastCacheCleanup');

  if (!lastExecutionDate || new Date(lastExecutionDate).getDate() !== currentDate.getDate()) {
    localStorage.removeItem('pokemonsStorageShadow');
    localStorage.removeItem('pokemonsStorageClassic');
    localStorage.removeItem('pokemonFound');

    localStorage.setItem('lastCacheCleanup', currentDate.toISOString());
  }
}
