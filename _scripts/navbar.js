function NavBar(){
  return(
    <>
    
    <nav   fill variant="tabs"  className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="./index.html">
          <img src="./_img/bitcoin_logo.png" width="30" height="30" />
          BadBank-Crypto
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/" hover={ {color: 'green', opacity: 1}}>Crear Cuenta</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Depositos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Retiros</a>
          </li>
  
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">Todos los Datos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Iniciar Sesion</a>
          </li>          
        </ul>
      </div>
    </nav>
    
    </>
  );
}