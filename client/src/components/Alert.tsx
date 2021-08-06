import React, { useContext } from "react"
import { alertContext } from "../context/alert/alertContext"
import { CSSTransition } from 'react-transition-group'
import { ExclamationTriangleFill, CheckCircleFill } from 'react-bootstrap-icons'
import '../assets/scss/Alert.scss'

export const Alert: React.FC = () => {
	const { hide, alert} = useContext(alertContext)

	const iconParams = {
		className: 'me-2',
		height: '1.5rem',
		width: '1.5rem'
	}

	return (
		<CSSTransition
			in={alert.visible}
			timeout={{
				enter: 500,
				exit: 350
			}}
			classNames={'alert-transition'}
			mountOnEnter
			unmountOnExit
		>
			<div
				className={`alert alert-${alert.type} alert-dismissible text-center`}
				role="alert"
			>
				{(alert.type === 'danger') ? (
					<ExclamationTriangleFill {...iconParams} />
				) : (
					<CheckCircleFill {...iconParams} />
				)}
				{alert.text}
				<button
					onClick={hide}
					type="button"
					className="btn-close"
					data-bs-dismiss="alert"
					aria-label="Close"
				></button>
			</div>
		</CSSTransition>
	)
}