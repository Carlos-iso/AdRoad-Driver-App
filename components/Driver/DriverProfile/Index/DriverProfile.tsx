import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import backgroundImage from "../../../../assets/arts/background-adroad.png";
import tokenManager, { TokenDataLocal } from "../../../Utils/tokenManager";
import {
	DriverProfile,
	AdvertiserProfile,
} from "../../../../types/TypesAuthService";
import Graphic from "../../../Graphic/Index/Graphic";
import styles from "../Stylesheet/StyleDriverProfile";
const Profile = () => {
	// const { getTokenLocal } = tokenManager();
	const [usuario, setUsuario] = useState<{
		id: string;
		displayName: string;
		email: string;
		createdAt: string;
	} | null>(null);
	const loadProfile = async () => {
		try {
			const getProfileData = await tokenManager.getAuthData();
			if (getProfileData?.dataUser) {
				const userData: DriverProfile | AdvertiserProfile =
					getProfileData.dataUser;
				setUsuario({
					id: userData.id,
					displayName:
						"name" in userData ? userData.name : userData.name_enterprise,
					email: userData.email,
					createdAt: userData.createdAt,
				});
			}
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		loadProfile();
	}, []);
	return (
		<View style={styles.containerProfile}>
			<StatusBar translucent={true} backgroundColor="transparent" />
			<Image source={backgroundImage} style={styles.fundo} resizeMode="cover" />
			<View style={styles.filtro} />
			<View style={styles.mainProfileCard}>
				<View style={styles.profileCard}>
					<View style={styles.profilePhoto}>
						<Feather name="camera" size={64} color={"#000"} />
					</View>
					<View style={styles.profileInfo}>
						<View style={styles.profileInfoDivision}>
							<Text style={styles.profileInfoName}>
								Nome: {usuario?.displayName}
							</Text>
							<Text style={styles.profileInfoId}>ID: {usuario?.id}</Text>
						</View>
						<View style={styles.profileInfoDivision}>
							<Text style={styles.profileInfoaAdCount}>
								Anuncios Exibidos: {"000"}
							</Text>
							<TouchableOpacity
								style={styles.profileInfoButton}
								onPress={() => console.log("Botão Editar Pressionado!")}
							>
								<Text style={styles.profileInfoPlataform}>
									Editar Perfil <Feather name="edit" size={18} color={"#fff"} />
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<Graphic />
				<TouchableOpacity
					style={styles.profileInfoButton}
					onPress={() => console.log("Botão Ver Detalhes pressionado!")}
				>
					<Text style={styles.profileInfoButtonText}>Ver Detalhes</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default Profile;
