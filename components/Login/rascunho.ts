const verifyToken = async () => {
    const sessionToken = await getTokenLocal();
    console.log(sessionToken.expiresAt);
    const expiresAt = sessionToken.expiresAt;
    const dateNow = Date.now();
    console.log(dateNow);
    const diference = dateNow - expiresAt;
    console.log(diference + "Cai squi");
    if (diference >= 30000) {
        console.log("Cheguei no if");
        const bodyToken = await JSON.parse({ token: sessionToken.token });
        console.log(bodyToken + "cheguei no try");
        try {
            const response = await fetch(`${apiUrl}/refresh-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${bodyToken.token}`
                },
                body: { id: bodyToken.id }
            });
            const data = await response.json();
            console.log("AQUI");
            console.log(data.message);
            // await updateTokenLocal(data.token, data.expiresAt);
            navigation.navigate("Home");
        } catch (error) {
            console.error(error);
        }
    }
};
const handleLogin = async () => {
  try {
    const response = await fetch(`${apiUrl}/driver/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });
    const data = await response.json();
    console.log(data?.message);

    if (data.message === "Login Bem Sucedido") {
      const { token } = data;
      const userData = JSON.stringify(data.userData); // Convertendo objeto em string
      await saveTokenLocal(token.token, token.issuedAt, userData);
      await Alert.alert(`Sucesso!`, `Bem vindo(a) ${data.userData.name}!`);
      await navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } else {
      Alert.alert(`Falha!`, data.message);
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};


const handleLogin = async () => {
  try {
    const response = await fetch(`${apiUrl}/driver/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });
    const data = await response.json();
    console.log(data);

    if (data.message === "Login Bem Sucedido") {
      const { token, userData } = data;
      const userDataString = JSON.stringify(userData); // Convertendo objeto em string
      await saveTokenLocal(token.token, token.issuedAt, userDataString);
      await Alert.alert(`Sucesso!`, `Bem vindo(a) ${userData.name}!`);
      await navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } else {
      Alert.alert(`Falha!`, data.message);
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};

O problema é que você está tentando acessar a propriedade `userData` como se fosse uma variável, mas na verdade é uma propriedade do objeto `data`.

Para resolver isso, você precisa acessar a propriedade `userData` do objeto `data` da seguinte forma:

```
const handleLogin = async () => {
  try {
    const response = await fetch(`${apiUrl}/driver/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });
    const data = await response.json();
    if (data.message === "Login Bem Sucedido") {
      const { token, dataUser } = data;
      await saveTokenLocal(token.token, token.issuedAt, JSON.stringify(dataUser));
      await Alert.alert(`Sucesso!`, `Bem vindo(a) ${dataUser.name}!`);
      await navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } else {
      Alert.alert(`Falha!`, data.message);
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};
```

Nessa versão, eu acesso a propriedade `dataUser` do objeto `data` e uso-a para exibir a mensagem de sucesso. Além disso, eu converto o objeto `dataUser` em uma string antes de salvá-lo no SecureStore.