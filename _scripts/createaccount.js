import { Formik } from 'formik';

function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),5000);
        return false;
      }
      return true;
  }

  function checkPass (){
    var psw = document.getElementById('password');
    if (psw.value.length < 8){
      setStatus('Password debe tener 8 caracters como minimo.');
      setTimeout(() => setStatus(''),5000);
      return;
    }else{
      
      return true;
    }
    
  }

  function isEmail(val) {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(val)){
      setStatus('Email invalido.');
      setTimeout(() => setStatus(''),5000);
      return;
    }
    else {
      return true;
    }
  }

  //Determine if to set the button disabled or not
  if (!name & !email & !password) {
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

 function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'Ingrese su Nombre'))     return;
    if (!validate(email,    'Ingrese Email valido'))    return;
    if (!validate (password, 'Password debe incluir 8 caracteres')) return;
    if (!checkPass(password)) return;
    if (!isEmail(email)) return;
    ctx.users.push({name,email,password,balance:100});
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      txtcolor="dark"
      bgcolor="light"
      header="Crear Cuenta"
      status={status}
      body={show ? (  
        <>
        <div className="text-left">	
					<img src="./_img/bitcoin_logo.png" className="img-fluid left" alt="Responsive image" width="22%"/>
          <br/><br/>
				</div>
        Nombre<br/>
        <input type="input" className="form-control" id="name" placeholder="Ingrese Nombre" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              
        Email<br/>
        <input type="input" className="form-control" id="email" placeholder="Ingrese Email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              
        Password<br/>
        <input type="password" className="form-control" id="password" placeholder="Ingrese Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
        { disabled ? (
            <>
            <button type="submit" disabled="disabled" className="btn btn-primary" onClick={handleCreate}>Crear Cuenta</button>
            </>
          ) : (
            <>
            <button type="submit" className="btn btn-primary" onClick={handleCreate}>Crear Cuenta</button>
            </> 
          )
        }              
        </>
      ):(
        <>
        <div className="text-left">	
          <img src="./_img/bitcoin_logo.png" className="img-fluid left" alt="Responsive image" width="22%"/><br/><br/>
        </div>
        <h6>Cuenta Creada! <a href="#Login" class="btnDeposit">Inicie Sesion</a> </h6>  <br/><br/>
        <button type="submit" className="btn btn-primary" onClick={clearForm}>Crear Otra Cuenta</button>
        </>
      )}
    />
  )
}