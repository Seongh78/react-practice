/** --------------------
 *  Action
 *  --------------------
 *  src/actions/index.js
 */
export const SELECTED = 'SELECTED';

export function selected(id) {
    return {
        type: SELECTED,
        selectedId: id
    }
}