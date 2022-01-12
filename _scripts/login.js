function Login() {
	const [show, setShow]                   = React.useState(true);
	const [status, setStatus]   	        = React.useState('');
	const [name, setName]                   = React.useState('');
	const [email, setEmail]                 = React.useState('');
	const [currentuser, setCurrentuser]     = React.useState('');
	const [emailinput, setEmailinput]       = React.useState('');
	const [passwordinput, setPasswordinput] = React.useState('');
	const ctx = React.useContext(UserContext);
	
	//Check if any user is currently logged in
	if (show) {
		for (const {name, email, loggedin} of ctx.users) {
			console.log(`Current User: ${name}, Logged in: ${loggedin}`);
			if (loggedin) {
				setShow(false);
				setEmail(email);
        setName(name);
				console.log(`${name} is logged in`)
				return;
			}
		}
	}
	
	function validate(field, label){
		if (!field) {
			setStatus('Error: Missing ' + label);
			setTimeout(() => setStatus(''), 3000);
			return false;
		}
		return true;
	}
	
	//Login Fuction
	function attemptLogin(){
		console.log(email,password);
		
		//Check if the fields are empty
		if (!validate(emailinput,    'email'))    return;
		if (!validate(passwordinput, 'password')) return;
		let tracker = false;
		
		//Check if the username or passwords match anyone is the database
		for (const {email, password, loggedin} of ctx.users) {
			console.log(`Verificando ${emailinput} ${passwordinput} comparado con ${email} ${password}`);
			if (emailinput == email && passwordinput == password) {
				console.log(`${emailinput} ${passwordinput} es el correcto`);
				for (var i=0, length=ctx.users.length; i<length; i++) {
					if (ctx.users[i].email == email) {
						console.log(`Verificando ${email}`)
						ctx.users[i].loggedin = true;
						tracker = true;
					}
				}
			}
		}
		
		if (tracker) {
			setShow(false);
			setCurrentuser(emailinput)
      
      
		} else {
			setStatus('Error: Email o Password incorrectos');
			setTimeout(() => setStatus(''), 8000);
		}
	}
	
	// Logout of all accounts
	function logout(){
		for (var i=0, length=ctx.users.length; i<length; i++) {
			ctx.users[i].loggedin = false;
		};
		setShow(true);
	}
	
	return (
		<Card
			bgcolor="light"	
			txtcolor="dark"
			header = "Iniciar Sesion"
			status = {status}
			body = {show ? (
				<>
				<div className="text-left">	
						<img src="../_img/bitcoin_logo.png" className="img-fluid left" alt="Responsive image" width="22%"/><br/><br/>
					</div>
				Email<br/>
				<input type="input" className="form-control" id="email" placeholder="Ingrese Email" value={emailinput} onChange={e => setEmailinput(e.currentTarget.value)}/><br/>
				Password<br/>
				<input type="password" className="form-control" id="password" placeholder="Ingrese Password" value={passwordinput} onChange={e => setPasswordinput(e.currentTarget.value)}/><br/>
				<button type="submit" className="btn btn-primary" onClick={attemptLogin}>Iniciar Sesion</button><br/><br/>
				Para recuperar el email o password <a href='#/alldata/' data-toggle="tooltip" title="Verifique sus datos">Click Aqui!</a><br/><br/>
				No tienes una cuenta? <br/> <a href="#/createaccount/" className="btnDeposit" data-toggle="tooltip" title="Cree una cuenta para entrar al sitio">Click aqui para crear una nueva cuenta.</a>
				</>
			):(
				<>
				<h5>Bienvenido {currentuser}. Inicio su sesion correctamente!</h5> <br/><br/>
				<h6>Haga un <a href="#deposit" class="btnDeposit">Deposito.</a></h6>  <br/><br/>
				<h6>Haga un <a href="#withdraw" class="btnDeposit">Retiro.</a></h6>  <br/><br/>
				<h6>Vea todos sus <a href="#alldata" class="btnDeposit">Datos.</a></h6>  <br/><br/>
				<button type="submit" className="btnDeposit" onClick={logout}>Cerrar Sesion</button>
				</>
			)}
		/>
	)
}