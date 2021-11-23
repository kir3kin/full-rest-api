export interface iAlertState {
	visible: boolean
	text: alertText
	type: alertMessageType
}

export interface iAlertContext {
	show: (text: alertText, type: alertMessageType) => void
	hide: () => void
	alert: iAlertState
}

export enum alertMessageType {
	SUCCESS = 'success',
	WARN = 'warning',
	DANGER = 'danger',
	DEFAULT = ''
}

export enum alertText {
	CONTACT_ADD = 'Contact has been added!',
	CONTACT_ADD_FAILED = 'Contact has not been added!',
	CONTACT_UPDATE = 'Contact has been updated!',
	CONTACT_UPDATE_FAILED = 'Contact has not been updated!',
	CONTACT_DELETE = 'Contact has been deleted!',
	CONTACT_DELETE_FAILED = 'Contact has not been deleted!',
	CONTACT_IMAGE_SIZE = 'The image size should be less than 512 KB!',
	CONTACT_IMAGE_TYPE = 'You can upload only image with ".jpg" or ".png" extentions',
	DEFAULT = ''
}