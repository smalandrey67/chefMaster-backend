export class UserDto {
	_id;
	email;
	userName;
	createdAt;

	constructor(model) {
		this.id = model._id;
		this.email = model.email;
		this.userName = model.userName;
		this.createdAt = model.createdAt;
	}
}
