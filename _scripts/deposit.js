function Deposit() {
	const [show, setShow]                   = React.useState(true);//
	const [disabled, setDisabled]           = React.useState(true);//
	const [status, setStatus]   	        = React.useState('');
	const [currentuser, setCurrentuser]     = React.useState('');
	const [currentemail, setCurrentemail]   = React.useState('');
	const [currentpass, setCurrentpass]     = React.useState('');
	const [balance, setBalance]				= React.useState('');
	const [deposit, setDeposit]				= React.useState('');
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
				console.log(`${name} is logged in`);
				return;
			}
		}
	}
	
	//Determine if to set the button disabled or not
	if (!deposit) {
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

	function depositMoney() {
		if (!isNaN(deposit) && deposit > 0){
			let newBalance = Number(balance) + Number(deposit);
			console.log(Number(newBalance));
			let tracker = false;
      setBalance(newBalance)
      setDeposit('')
			setStatus(`$${deposit} depositados exitosamente en su cuenta`);
			
//Check if the username or passwords match anyone is the database
			for (const {email, password, balance} of ctx.users) {
				console.log(`Checking ${currentemail} ${currentpass} against ${email} ${password}`);
				if (currentemail == email && currentpass == password) {
					console.log(`${currentemail} ${currentpass} is correct`);
					for (var i=0, length=ctx.users.length; i<length; i++) {
						if (ctx.users[i].email == currentemail) {
							console.log(`Checking ${email}`)
							ctx.users[i].balance = Number(newBalance);
							var datetime = `Deposited $${deposit} on ${newDate.today()}`;
							ctx.users[i].submissions.push(datetime);
							tracker = true;
						}
					}
				}
			}
			
			//Making all changes to state
			if (tracker) {
				setStatus(`$${deposit} depositados exitosamente en su cuenta`);
				setTimeout(() => setStatus(''), 5000);
				setDeposit('');
				setBalance(Number(newBalance))
			} 
		} else if (!isNaN(deposit)) {
			setStatus('Error: Deposite un monto mayor a  $0.00. Intente denuevo.');
			setDeposit('');
			setTimeout(() => setStatus(''), 5000);
		} else {
		setStatus('Error: Ingrese un valor numerico en deposito. intente denuevo.');
		setDeposit('');
		setTimeout(() => setStatus(''), 5000);
	}
		return;
	}
	
	return (
		<Card
			bgcolor="light"	
			txtcolor="dark"
			header = "Deposito"
			status = {status}
			body = {show ? (
				<>
				<div className="text-left">	
						<img src="../_img/bitcoin_logo.png" className="img-fluid left" alt="Responsive image" width="30%"/><br/><br/>
					</div>

				Por favor <a href='#/login/' className="btnDeposit" data-toggle="tooltip" title="Ingrese a su Cuenta">Inicie Sesion</a> para depositar fondos y verificar su balance. <br/><br/><br/>
				No tienes una cuenta? Crea una cuenta <a href="#/createaccount/" className="btnDeposit" data-toggle="tooltip" title="Crear Nueva Cuenta"> aqui...</a>. 
				</>
			):(
				<>
				Balance Actual: ${balance.toFixed(2)}<br/><br/>
				
				Monto Deposito:<br/>
				<input type="input" className="form-control" id="deposit" placeholder="$0.00" value={deposit} onChange={e => setDeposit(e.currentTarget.value)}/><br/>
				{disabled ? (
					<>
					<button type="submit" className="btn btn-primary" disabled="disabled" onClick={depositMoney}>Deposit</button>
					</>
				):(
					<>
					<button type="submit" className="btn btn-primary" onClick={depositMoney}>Deposit</button><br/><br/>
					<div className="text-left">	
					
					</div>
					</>
				)}
				</>
			)}
		/>
	)
}
