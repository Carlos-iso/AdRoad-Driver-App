//   	const sessionTokenString = await JSON.stringify(sessionToken);
//   	
//   	      const sessionTokenObject = await JSON.parse(sessionTokenString);
//   	
//   	      const expiresAt = await sessionTokenObject?.expiresAt;
//   	      const dataNow = await new Date().getTime();
//   	      const difference = await dataNow - expiresAt;
//   	      console.log(difference)
//   	      
//   	      if (difference > timeToken(30)) {
//   	
//   	        	console.log("Tentando relogin");
//   	
//   	          //Tentativa de relogin
//   	          async () => {
//   	          	const idSend = await JSON.stringify({
//   	              id: sessionTokenObject.userData._id,
//   	              token: sessionTokenObject.token
//   	            });
//   	            console.log(idSend)
//   	            
//   	        }
//   	    	}
//   		    	
//   	{
//   		data:{
//   		date: "2025-02-14T00:27:19.634Z",
//   		"email": "teste13@gmail.com",
//   		"name": "A25"
//   		},
//   		message:{
//   			"Login Atualizado Com Sucesso",
//   		}
//   		token:{
//   			expiresAt: 1739554916251,
//   			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWU4ZGU3MDI1MTJlOGM3YzM1NzI1MSIsIm5hbWUiOiJBMjUiLCJlbWFpbCI6InRlc3RlMTNAZ21haWwuY29tIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE3Mzk1NTQ5MTYsImV4cCI6MTczOTY0MTMxNn0.gXkux-Q6zPLbdXL9Ye0-mLBntOlN-cvEYYN34VHYKZ0"
//   			
//   		}}
//   		
//   	try {
//   	    		const responseRefreshToken = await fetch(
//   	    			`${apiUrl}/driver/refresh-token?token=${sessionToken.token}`,
//   	    			{
//   	    				method: "POST",
//   	          	headers: {
//   	               "Content-Type": "application/json",
//   	                  },
//   	                  body: sessionToken.userData.id
//   	                }
//   	              );
//   	              const dataRefreshToken = await responseRefreshToken.json();
//   	              await console.log("Bem Vindo De Volta!");
//   	              await console.log(dataRefreshToken.userData);
//   	              await tokenManager.updateTokenLocal(
//   	              	dataRefreshToken.token.token,
//   	              	dataRefreshToken.token.expiresAt,
//   	              	JSON.parse(dataRefreshToken.userData)
//   	              	);
//   	              await navigation.reset({
//   	              	index: 0,
//   	              	routes: [{ name: "Home" }],
//   	              });
//   	            } catch (error) {
//   	            console.error(error);
//   	            console.error("Relogin Falhou!");
//   	            await navigation.reset({ index: 0, routes: [{ name: "Login" }] });
//   	            	Alert.alert(
//   	              	`Bem Vindo De Volta!`,
//   	              	"Sessão Expirou, Faça Login Novamente!"
//   	              	);
//   	            }
//   	    	