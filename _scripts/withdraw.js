function Withdraw() {
	const [show, setShow]                   = React.useState(true);
	const [disabled, setDisabled]           = React.useState(true);
	const [status, setStatus]   	        = React.useState('');
	const [currentuser, setCurrentuser]     = React.useState('');
	const [currentemail, setCurrentemail]   = React.useState('');
	const [currentpass, setCurrentpass]     = React.useState('');
	const [balance, setBalance]				= React.useState('');
	const [withdraw, setWithdraw]			= React.useState('');
	const ctx = React.useContext(UserContext);
	
	//Check if any user is currently logged in
	if (show) {
		for (const {name, email, password, balance, loggedin} of ctx.users) {
			console.log(`Current User: ${name}, Logged in: ${loggedin}`);
			if (loggedin) {
				setShow(false);
				setCurrentuser(name);
				setCurrentemail(email);
				setCurrentpass(password);
				setBalance(balance);
				console.log(`${name} is logged in`)
				return;
			}
		}
	}
	
	//Determine if to set the button disabled or not
	if (!withdraw) {
		//Check if button should be enabled
		if (disabled) {
			console.log(disabled);
			console.log(`button disabled ${disabled}`);
		} else {
			setDisabled(true);
			console.log(`button disabled ${disabled}`);
		}
	} else {
		if (disabled) {
			setDisabled(false);
			console.log(`button disabled ${disabled}`);
		} else {
			console.log(`button disabled ${disabled}`);
		}
	}
	// Validates that it is a number and you will not overdraft
	function withdrawMoney() {
		if (!isNaN(withdraw) && withdraw > 0 && withdraw <= balance){
			let newBalance = Number(balance) - Number(withdraw);
			console.log(Number(newBalance));
      setBalance(newBalance);
      setStatus(`$${withdraw} was successfully withdrawn from your account`);
      setDeposit('');
      
			let tracker = false;
			
			
			//Check if the username or passwords match anyone is the database
			for (const {email, password, balance} of ctx.users) {
				console.log(`Checking ${currentemail} ${currentpass} against ${email} ${password}`);
				if (currentemail == email && currentpass == password) {
					console.log(`${currentemail} ${currentpass} is correct`);
					for (var i=0, length=ctx.users.length; i<length; i++) {
						if (ctx.users[i].email == currentemail) {
							console.log(`Checking ${email}`)
							ctx.users[i].balance = Number(newBalance);
							var datetime = `Withdrew $${withdraw} on ${newDate.today()}`;
							ctx.users[i].submissions.push(datetime);
							tracker = true;
						}
					}
				}
			}
			
			//Making all changes to state
			if (tracker) {
				setStatus(`$${withdraw} successfully withdrawn from account`);
				setTimeout(() => setStatus(''), 5000);
				setWithdraw('');
				setBalance(Number(newBalance))
			}
		} else if (withdraw > balance) {
			setStatus(`Error: No puede retirar mas de lo que tiene en su balance $${balance}. Intente denuevo.`);
			setWithdraw('');
			setTimeout(() => setStatus(''), 5000);
		} else if (!isNaN(withdraw)) {
			setStatus('Error: El monto de retiro debe ser mayor a $0.00. Intente denuevo.');
			setWithdraw('');
			setTimeout(() => setStatus(''), 5000);
		} else {
			setStatus('Error: El retiro debe ser un numero. Intente denuevo.');
			setWithdraw('');
			setTimeout(() => setStatus(''), 5000);
		}
		return;
	}
	
	return (
		<Card
			bgcolor="light"	
			txtcolor="dark"
			header = "Retiros"
			status = {status}
			body = {show ? (
        <>
				<div className="text-left">	
						<img src="../_img/bitcoin_logo.png" className="img-fluid left" alt="Responsive image" width="30%"/><br/><br/>
					</div>

				Por Favor <a href='#/login/' className="btnDeposit" data-toggle="tooltip" title="Ingrese a su Cuenta">Inicie Sesion</a> para depositar fondos y ver su Balance. <br/><br/><br/>
				No tienes una cuenta? Crea una <a href="#/createaccount/" className="btnDeposit" data-toggle="tooltip" title="Cree na Nueva Cuenta"> aqui</a>. 
				</>
			):(
				<>
				Balance Actual: ${balance.toFixed(2)}<br/><br/>

				Monto Retiro:<br/>
				<input type="input" className="form-control" id="deposit" placeholder="$0.00" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}/><br/>
				{disabled ? (
					<>
					<button type="submit" className="btn btn-primary" disabled="disabled" onClick={withdrawMoney}>Retiro</button>
					</>
				):(
					<>
					<button type="submit" className="btn btn-primary" onClick={withdrawMoney}>Retiro</button><br/><br/>
					</>
				)}
				</>
			)}
		/>
	)
}

