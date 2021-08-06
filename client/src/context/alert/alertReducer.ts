import { iAlertState } from "../../interfaces/alertContext"
import { AlertActionType, AlertActions } from "../types/alertTypes"

export const alertReducer = (
	state: iAlertState,
	action: AlertActions
): iAlertState => {
	switch (action.type) {
		case AlertActionType.SHOW_ALERT: {
			return {
				...action.payload,
				visible: true
			}
		}
		case AlertActionType.HIDE_ALERT: {
			return {	...state, visible: false }
		}
		default: return state
	}
}
