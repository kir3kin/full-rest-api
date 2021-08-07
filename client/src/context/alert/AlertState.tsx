import React, { useReducer } from "react"
import { alertMessageType, alertText, iAlertState } from "../../interfaces/alertContext"
import { AlertActionType } from "../types/alertTypes"
import { alertContext } from "./alertContext"
import { alertReducer } from "./alertReducer"

export const AlertState: React.FC = ({ children }) => {
	const initialAlertState: iAlertState = {
		visible: false,
		text: alertText.DEFAULT,
		type: alertMessageType.DEFAULT
	}
	const ALERT_LIVE_TIME = 1500

	const [state, dispatch] = useReducer(alertReducer, initialAlertState)

	const show = (text: alertText, type: alertMessageType): void => {
		dispatch({
			type: AlertActionType.SHOW_ALERT,
			payload: {text, type}
		})
		setTimeout(() => {
			hide()
		}, ALERT_LIVE_TIME)
	}

	const hide = (): void => dispatch({type: AlertActionType.HIDE_ALERT})

	return (
		<alertContext.Provider value={{
			show, hide,
			alert: state
		}}>
			{children}
		</alertContext.Provider>
	)
}