class authValidators{

  static textField(text){
    if(text === ""){
      throw new Error("Le champ ne peut être vide");
    }
    return text;
  };

  static emailField(email){
    if (email === ""){
      throw new Error("Le champ ne peut être vide");
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email.toLowerCase())){
      throw new Error("Format de l'email non valide");
    }
    return email;
  };

  static passwordField(password){
    if (password === ""){
      throw new Error("Le champ ne peut être vide");
    }
    const re = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if (!re.test(password)){
      throw new Error("Mot de passe pas assez fort");
    }
  };
}

export default authValidators;
