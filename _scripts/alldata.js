function AllData(){
  const ctx = React.useContext(UserContext);
  return (
    <>    
    {
      ctx.users.map((ctx,i) => 
        <Card 
          key={i}        
          bgcolor="light"
          txtcolor="black"
          header={"Usuario: " + ctx.name}
          text={
            "Email: " + ctx.email }
          text1={
            "Password: " +  ctx.password
          }
          body={"Balance: $" + ctx.balance}
        />
      )
    } 
    </>
  );
}
