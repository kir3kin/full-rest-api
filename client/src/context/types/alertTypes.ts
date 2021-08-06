import { alertMessageType, alertText } from "../../interfaces/alertContext";

export enum AlertActionType {
	SHOW_ALERT,
	HIDE_ALERT
}


// actions
export interface showAlert {
	type: AlertActionType.SHOW_ALERT,
	payload: {
		text: alertText
		type: alertMessageType
	}
}

export interface hideAlert {
	type: AlertActionType.HIDE_ALERT
}

export type AlertActions = showAlert | hideAlert