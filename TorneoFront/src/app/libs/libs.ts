/**
 * Consulta la información almacenada en el localstorage del explorador y extrae el token
 * @returns token: String
 */
export function getToken() {
  let storageData = null;
  try {
    storageData = JSON.parse(getLocalStorage('torneo'));
    const aux: string = storageData.token;
    return aux !== null ? aux : '';
  } catch (error) {
    return '';
  }
}

/**
 * Consulta la información almacenada en el localstorage del explorador y extrae el usuario
 * @returns string
 */
 export function getUsuario() {
  let storageData = null;
  try {
    storageData = JSON.parse(getLocalStorage('torneo'));
    let aux: string = storageData.usuario;
    return aux !== null ? aux : '';
  } catch (error) {
    return '';
  }
}

/**
 * Consulta la información almacenada en el localstorage del explorador
 * @returns obj: {}
 */
export function getLocalStorage(key: string): any {
  const aux = localStorage.getItem(key);
  return aux != null ? aux : '';
}

/**
 * Guardar datos en el localstorage del explorador
 * @returns Boolean
 */
 export function saveLocalStorage(key: string, value: any): any {
  const valor = JSON.stringify(value);
  try {
    localStorage.setItem(key, valor);
  } catch (error) {
    return false;
  }
  return true;
}

/**
 * Eliminar datos del localstorage del explorador
 * @returns Boolean
 */
 export function deleteLocalStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    return false;
  }
  return true;
}