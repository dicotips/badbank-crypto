function Home(){
  return (
    <Card 
      bgcolor="light"
      txtcolor="black"
      header="Bienvenido a BadBank-Crypto" 
      title={(<img src="../_img/bitcoin_logo.png" className="img-fluid" alt="Responsive image"/>)}
      body={<>
      Para iniciar presione la pestaña <a href="#Login" class="btnDeposit">Iniciar Sesion</a>.    
      </>}
    />    
  );  
}
