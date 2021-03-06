import React, { Component } from 'react';

class AddAdminForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			channelId: this.props.channel.id,
			channelName: this.props.channel.name,
		};
	}

	render() {

		return(
			<div id='addmemberform' className='container-fluid'>
				<h3>Add an Admin to {this.props.channel.name}</h3>

				<br />
				<form onSubmit={this.submitForm}>

					<label className='pt-label'>User E-mail
					  <div className='pt-input-group'>
					    <input  className='pt-input' type='email' name='email' dir='auto' required/>
					  </div>
					</label>

					<hr />

					<div>
						<button type='submit' className='pt-button pt-intent-success'>Submit</button>
					</div>
				</form>

		  </div>
		)
	}

	submitForm = (e) => {
		e.preventDefault();
		this.setState({
			email: e.target.email.value,
		}, () => {
			this.props.submitInvite(this.state)
			.then(() => {
				this.props.toggleForm()
			})
		})
	};

};

export default AddAdminForm;
